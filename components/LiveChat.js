import { useState, useEffect, useRef } from 'react';

const SESSION_LIMIT_MS = 30*60*1000;   // handoff sessions live at most 30 minutes
const INACTIVITY_LIMIT_MS = 5*60*1000; // ...and auto-close after 5 minutes of no activity
const PERSIST_KEY = 'wt-chat-session';
const PERSIST_TTL_MS = 10*60*1000; // conversation survives close/reopen and page navigation for 10 minutes

const WELCOME = {role:'assistant',content:"Hi! 👋 I'm **Whiz**, the AI assistant for WhizTest Pvt Ltd.\n\nAsk me anything about our services, pricing, or technology stack!"};

export default function LiveChat({dark}){
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([WELCOME]);
  const [input,setInput]=useState('');
  const [loading,setLoading]=useState(false);
  const [streaming,setStreaming]=useState(false);
  const [handoff,setHandoff]=useState('idle'); // idle | awaiting-email | pending | active
  const [visitorEmail,setVisitorEmail]=useState('');
  const scrollRef=useRef(null);
  const inputRef=useRef(null);
  const handoffMsgIdsRef=useRef([]); // every Telegram message id in this handoff thread (original + follow-ups)
  const seenUpdatesRef=useRef(new Set());
  const pollRef=useRef(null);
  const handoffStartRef=useRef(0);
  const lastActivityRef=useRef(0);
  const restoredRef=useRef(false);

  // Restore a still-fresh conversation on mount — the widget remounts on every
  // page navigation (each page is its own Layout instance), so without this the
  // chat looked like it "reset" any time someone browsed to another page.
  useEffect(()=>{
    try{
      const raw=localStorage.getItem(PERSIST_KEY);
      if(raw){
        const saved=JSON.parse(raw);
        if(saved&&Date.now()-saved.savedAt<=PERSIST_TTL_MS){
          if(saved.msgs?.length)setMsgs(saved.msgs);
          if(saved.visitorEmail)setVisitorEmail(saved.visitorEmail);
          handoffMsgIdsRef.current=saved.handoffMsgIds||[];
          handoffStartRef.current=saved.handoffStart||0;
          lastActivityRef.current=saved.lastActivity||0;
          if(saved.handoff&&saved.handoff!=='idle'){
            setHandoff(saved.handoff);
            if(saved.handoff==='active'&&handoffMsgIdsRef.current.length)startPolling();
          }
        }else{
          localStorage.removeItem(PERSIST_KEY);
        }
      }
    }catch{}
    restoredRef.current=true;
  },[]);

  // Persist after restore, whenever the visible conversation state changes.
  useEffect(()=>{
    if(!restoredRef.current)return;
    try{
      localStorage.setItem(PERSIST_KEY,JSON.stringify({
        savedAt:Date.now(),
        msgs,handoff,visitorEmail,
        handoffMsgIds:handoffMsgIdsRef.current,
        handoffStart:handoffStartRef.current,
        lastActivity:lastActivityRef.current,
      }));
    }catch{}
  },[msgs,handoff,visitorEmail]);

  useEffect(()=>{if(scrollRef.current)scrollRef.current.scrollTop=scrollRef.current.scrollHeight;},[msgs]);
  useEffect(()=>{if(open&&inputRef.current)inputRef.current.focus();},[open]);
  useEffect(()=>()=>{if(pollRef.current)clearInterval(pollRef.current);},[]);

  const closeHandoff=(reason)=>{
    if(pollRef.current){clearInterval(pollRef.current);pollRef.current=null;}
    handoffMsgIdsRef.current=[];
    seenUpdatesRef.current=new Set();
    setHandoff('idle');
    setMsgs(p=>[...p,{role:'system',content:reason==='session'
      ?'⏱️ Chat session ended (30-minute limit). Tap "Talk to a human agent" to start a new one.'
      :'⏱️ Chat closed — agent left.'}]);
  };

  const startPolling=()=>{
    if(pollRef.current)return;
    pollRef.current=setInterval(async()=>{
      if(!handoffMsgIdsRef.current.length)return;

      const now=Date.now();
      if(now-handoffStartRef.current>=SESSION_LIMIT_MS){closeHandoff('session');return;}
      if(now-lastActivityRef.current>=INACTIVITY_LIMIT_MS){closeHandoff('inactivity');return;}

      try{
        const res=await fetch(`/api/telegram-poll?messageIds=${handoffMsgIdsRef.current.join(',')}`);
        const data=await res.json();
        const fresh=(data.replies||[]).filter(r=>!seenUpdatesRef.current.has(r.updateId));
        if(fresh.length){
          fresh.forEach(r=>seenUpdatesRef.current.add(r.updateId));
          lastActivityRef.current=Date.now();
          setMsgs(p=>[...p,...fresh.map(r=>({role:'agent',content:r.text,from:r.from}))]);
        }
      }catch{}
    },3500);
  };

  const requestHuman=()=>{
    if(handoff!=='idle')return;
    setHandoff('awaiting-email');
    setMsgs(p=>[...p,{role:'assistant',content:"📧 Sure! Before I connect you, what's your email so our team can follow up if we can't finish here? (You can skip this.)"}]);
  };

  const connectHuman=async(email)=>{
    setHandoff('pending');
    setMsgs(p=>[...p,{role:'system',content:"🧑‍💼 Connecting you with a human agent — they'll reply right here shortly."}]);
    try{
      const body=msgs.map(m=>({role:m.role,content:m.content}));
      const res=await fetch('/api/telegram-forward',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:body,email})});
      const data=await res.json();
      if(!res.ok||!data.messageId)throw new Error('forward failed');
      handoffMsgIdsRef.current=[data.messageId];
      handoffStartRef.current=Date.now();
      lastActivityRef.current=Date.now();
      setHandoff('active');
      startPolling();
    }catch{
      setMsgs(p=>[...p,{role:'system',content:"Sorry, couldn't reach our team right now. Please WhatsApp us at +977 9866697309."}]);
      setHandoff('idle');
    }
  };

  const submitEmail=(value)=>{
    const email=value.trim();
    setInput('');
    if(email){
      setVisitorEmail(email);
      setMsgs(p=>[...p,{role:'user',content:email}]);
    }else{
      setMsgs(p=>[...p,{role:'user',content:'(skipped)'}]);
    }
    connectHuman(email);
  };

  const sendToAgent=async(content)=>{
    setMsgs(p=>[...p,{role:'user',content}]);
    setInput('');
    lastActivityRef.current=Date.now();
    try{
      const replyTo=handoffMsgIdsRef.current[handoffMsgIdsRef.current.length-1];
      const res=await fetch('/api/telegram-forward',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({followUp:{text:content,replyToMessageId:replyTo}})});
      const data=await res.json();
      if(res.ok&&data.messageId)handoffMsgIdsRef.current=[...handoffMsgIdsRef.current,data.messageId];
    }catch{}
  };

  const send=async(text)=>{
    const content=(text||input).trim();
    if(!content||loading)return;
    if(handoff==='active'){sendToAgent(content);return;}
    const userMsg={role:'user',content};
    setMsgs(p=>[...p,userMsg,{role:'assistant',content:''}]);
    setInput('');
    setLoading(true);setStreaming(true);
    try{
      const body=[...msgs,userMsg]
        .filter(m=>m.role==='user'||m.role==='assistant'||m.role==='agent')
        .map(m=>({role:m.role==='agent'?'assistant':m.role,content:m.content}));
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:body})});
      if(!res.ok)throw new Error('API error');
      const reader=res.body.getReader();
      const dec=new TextDecoder();
      let acc='';
      while(true){
        const{done,value}=await reader.read();
        if(done)break;
        const lines=dec.decode(value).split('\n');
        for(const line of lines){
          if(!line.startsWith('data: '))continue;
          const d=line.slice(6).trim();
          if(d==='[DONE]')continue;
          try{
            const j=JSON.parse(d);
            const delta=j.choices?.[0]?.delta?.content||'';
            if(delta){acc+=delta;setMsgs(p=>[...p.slice(0,-1),{role:'assistant',content:acc}]);}
          }catch{}
        }
      }
    }catch{
      setMsgs(p=>[...p.slice(0,-1),{role:'assistant',content:'Sorry, I had an issue connecting. Please email **support.whiztest@gmail.com** or WhatsApp **+977 9866697309** — we reply within minutes!'}]);
    }finally{setLoading(false);setStreaming(false);}
  };

  const QUICK=['What services do you offer?','How much does a website cost?','How long to build an app?','Do you offer support after launch?'];

  const renderContent=(text)=>{
    return text.split(/(\*\*[^*]+\*\*)/).map((part,i)=>{
      if(part.startsWith('**')&&part.endsWith('**'))
        return<strong key={i}>{part.slice(2,-2)}</strong>;
      return part;
    });
  };

  const BG=dark?'#07111F':'#fff';
  const BD=dark?'rgba(79,70,229,.3)':'rgba(79,70,229,.15)';
  const T1=dark?'#E2E8F0':'#1E293B';
  const T2=dark?'#94A3B8':'#64748B';
  const msgBg=dark?'#0D1F3C':'#F1F5F9';

  return(
    <>
      {/* Floating button */}
      <div style={{position:'fixed',bottom:'24px',right:'24px',zIndex:999}}>
        {!open&&(
          <div style={{position:'absolute',top:'-4px',right:'-4px',width:'14px',height:'14px',borderRadius:'50%',background:'#EF4444',border:'2px solid white',zIndex:1000}}>
            <div style={{position:'absolute',inset:'-3px',borderRadius:'50%',border:'2px solid rgba(239,68,68,.5)',animation:'pulseRing 1.5s ease infinite'}}/>
          </div>
        )}
        <button onClick={()=>setOpen(p=>!p)}
          style={{width:'58px',height:'58px',borderRadius:'50%',background:'linear-gradient(135deg,#4F46E5,#2563EB)',
            border:'none',cursor:'pointer',boxShadow:'0 8px 24px rgba(79,70,229,.4)',display:'flex',alignItems:'center',
            justifyContent:'center',fontSize:'1.5rem',transition:'transform .3s ease',
            transform:open?'rotate(90deg) scale(.9)':'scale(1)'}}>
          {open?'✕':'🤖'}
        </button>
      </div>

      {/* Chat window */}
      {open&&(
        <div style={{position:'fixed',bottom:'96px',right:'24px',width:'360px',
          maxWidth:'calc(100vw - 32px)',height:'500px',maxHeight:'calc(100vh - 190px)',borderRadius:'22px',background:BG,
          border:`1px solid ${BD}`,boxShadow:'0 24px 64px rgba(79,70,229,.22)',
          zIndex:998,display:'flex',flexDirection:'column',overflow:'hidden',
          animation:'chatSlideUp .3s ease'}}>

          {/* Header */}
          <div style={{padding:'14px 18px',background:'linear-gradient(135deg,#4F46E5,#2563EB)',display:'flex',alignItems:'center',gap:'12px',flexShrink:0}}>
            <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'rgba(255,255,255,.18)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',flexShrink:0}}>🤖</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{color:'#fff',fontWeight:700,fontSize:'.92rem'}}>Whiz — AI Assistant</div>
              <div style={{color:'rgba(255,255,255,.78)',fontSize:'.72rem',display:'flex',alignItems:'center',gap:'6px'}}>
                <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#4ADE80',display:'inline-block',flexShrink:0}}/>
                Online · Powered by NVIDIA Nemotron
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{background:'rgba(255,255,255,.15)',border:'none',borderRadius:'50%',width:'28px',height:'28px',cursor:'pointer',color:'#fff',fontSize:'.9rem',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>✕</button>
          </div>

          {/* Human handoff */}
          <button onClick={requestHuman} disabled={handoff!=='idle'}
            style={{margin:'10px 12px 0',padding:'8px 12px',borderRadius:'10px',
              border:`1px solid ${dark?'rgba(16,185,129,.3)':'rgba(16,185,129,.25)'}`,
              background:handoff==='idle'?(dark?'rgba(16,185,129,.08)':'rgba(16,185,129,.06)'):'transparent',
              color:'#059669',fontSize:'.76rem',fontWeight:700,cursor:handoff==='idle'?'pointer':'default',
              display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',flexShrink:0,
              fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
            {handoff==='idle'&&<>🧑‍💼 Talk to a human agent</>}
            {handoff==='awaiting-email'&&<>📧 Waiting for your email…</>}
            {handoff==='pending'&&<>⏳ Connecting…</>}
            {handoff==='active'&&<>✅ Connected{visitorEmail?` — we'll also follow up at ${visitorEmail}`:' — an agent will reply here'}</>}
          </button>

          {/* Messages */}
          <div ref={scrollRef} style={{flex:1,overflowY:'auto',padding:'14px',display:'flex',flexDirection:'column',gap:'10px'}}>
            {msgs.map((m,i)=>{
              if(m.role==='system'){
                return <div key={i} style={{textAlign:'center',color:T2,fontSize:'.72rem',fontWeight:600,padding:'2px 8px'}}>{m.content}</div>;
              }
              const isUser=m.role==='user';
              const isAgent=m.role==='agent';
              return(
                <div key={i} style={{display:'flex',justifyContent:isUser?'flex-end':'flex-start',gap:'8px',alignItems:'flex-end'}}>
                  {!isUser&&(
                    <div style={{width:'26px',height:'26px',borderRadius:'50%',
                      background:isAgent?'linear-gradient(135deg,#059669,#10B981)':'linear-gradient(135deg,#4F46E5,#2563EB)',
                      display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',flexShrink:0}}>
                      {isAgent?'🧑‍💼':'🤖'}
                    </div>
                  )}
                  <div style={{maxWidth:'78%',padding:'10px 14px',
                    borderRadius:isUser?'18px 18px 4px 18px':'18px 18px 18px 4px',
                    background:isUser?'linear-gradient(135deg,#4F46E5,#2563EB)':isAgent?(dark?'#0B2E22':'#ECFDF5'):msgBg,
                    border:isAgent?`1px solid ${dark?'rgba(16,185,129,.35)':'rgba(16,185,129,.3)'}`:'none',
                    color:isUser?'#fff':T1,fontSize:'.84rem',lineHeight:1.62,whiteSpace:'pre-wrap'}}>
                    {isAgent&&<div style={{fontSize:'.68rem',fontWeight:800,color:'#059669',marginBottom:'3px'}}>{m.from||'Agent'} · Human Support</div>}
                    {renderContent(m.content)}
                    {i===msgs.length-1&&streaming&&m.role==='assistant'&&(
                      <span style={{display:'inline-block',marginLeft:'2px',animation:'blink .8s infinite',color:'#4F46E5'}}>▋</span>
                    )}
                  </div>
                </div>
              );
            })}
            {loading&&!streaming&&(
              <div style={{display:'flex',gap:'8px',alignItems:'flex-end'}}>
                <div style={{width:'26px',height:'26px',borderRadius:'50%',background:'linear-gradient(135deg,#4F46E5,#2563EB)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem'}}>🤖</div>
                <div style={{padding:'12px 16px',borderRadius:'18px 18px 18px 4px',background:msgBg,display:'flex',gap:'4px',alignItems:'center'}}>
                  {[0,160,320].map(d=>(
                    <div key={d} style={{width:'7px',height:'7px',borderRadius:'50%',background:'#4F46E5',animation:`typingDot 1s ${d}ms ease infinite`}}/>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick questions */}
          {msgs.length===1&&handoff==='idle'&&(
            <div style={{padding:'0 12px 10px',display:'flex',flexWrap:'wrap',gap:'6px',flexShrink:0}}>
              {QUICK.map((q,i)=>(
                <button key={i} onClick={()=>send(q)}
                  style={{padding:'5px 12px',borderRadius:'20px',fontSize:'.72rem',fontWeight:600,
                    border:`1px solid ${dark?'rgba(79,70,229,.3)':'rgba(79,70,229,.2)'}`,
                    background:'transparent',color:'#4F46E5',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                  {q}
                </button>
              ))}
            </div>
          )}
          {handoff==='awaiting-email'&&(
            <div style={{padding:'0 12px 10px',display:'flex',flexWrap:'wrap',gap:'6px',flexShrink:0}}>
              <button onClick={()=>submitEmail('')}
                style={{padding:'5px 12px',borderRadius:'20px',fontSize:'.72rem',fontWeight:600,
                  border:`1px solid ${dark?'rgba(148,163,184,.3)':'rgba(100,116,139,.25)'}`,
                  background:'transparent',color:T2,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                Skip →
              </button>
            </div>
          )}

          {/* Input */}
          <div style={{padding:'10px 12px',borderTop:`1px solid ${dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.07)'}`,display:'flex',gap:'8px',alignItems:'center',flexShrink:0}}>
            <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handoff==='awaiting-email'?submitEmail(input):send();}}}
              disabled={loading||handoff==='pending'}
              type={handoff==='awaiting-email'?'email':'text'}
              placeholder={handoff==='awaiting-email'?'your@email.com':'Ask about our services…'}
              style={{flex:1,border:`1px solid ${dark?'rgba(79,70,229,.25)':'#E2E8F0'}`,borderRadius:'12px',
                padding:'9px 13px',background:dark?'#0D1F3C':'#F8FAFC',color:T1,fontSize:'.84rem',
                outline:'none',fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'border-color .2s'}}/>
            <button onClick={()=>handoff==='awaiting-email'?submitEmail(input):send()}
              disabled={handoff==='awaiting-email'?loading:(loading||!input.trim())}
              style={{width:'38px',height:'38px',borderRadius:'12px',flexShrink:0,
                background:(handoff!=='awaiting-email'&&(loading||!input.trim()))?'rgba(79,70,229,.35)':'linear-gradient(135deg,#4F46E5,#2563EB)',
                border:'none',cursor:(loading||(handoff!=='awaiting-email'&&!input.trim()))?'not-allowed':'pointer',
                display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'1rem',
                transition:'all .2s'}}>→</button>
          </div>
        </div>
      )}
    </>
  );
}
