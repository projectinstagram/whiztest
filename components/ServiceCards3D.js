import { useState, useRef, useCallback } from 'react';

export default function ServiceCards3D({services,onOpenModal,dark}){
  const n=services.length;
  const [topIdx,setTopIdx]=useState(0);
  const [topX,setTopX]=useState(0);
  const [noTrans,setNoTrans]=useState(false);
  const [animating,setAnimating]=useState(false);
  const isDragging=useRef(false);
  const startX=useRef(0);
  const currX=useRef(0);
  const isAnimRef=useRef(false);

  const mid=(topIdx+1)%n;
  const back=(topIdx+2)%n;
  const dragPct=Math.min(Math.abs(topX)/200,1);

  const go=useCallback((dir)=>{
    if(isAnimRef.current)return;
    isAnimRef.current=true;
    setAnimating(true);
    isDragging.current=false;
    setNoTrans(false);
    // fly out
    setTopX(dir>0?-820:820);
    setTimeout(()=>{
      setTopIdx(p=>(p+dir+n)%n);
      setNoTrans(true);
      setTopX(dir>0?820:-820);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        setNoTrans(false);
        setTopX(0);
        setTimeout(()=>{isAnimRef.current=false;setAnimating(false);},400);
      }));
    },310);
  },[n]);

  const onPtrDown=(e)=>{
    if(isAnimRef.current)return;
    isDragging.current=true;
    startX.current=e.clientX;
    currX.current=0;
    try{e.currentTarget.setPointerCapture(e.pointerId);}catch{}
  };
  const onPtrMove=(e)=>{
    if(!isDragging.current)return;
    const x=e.clientX-startX.current;
    currX.current=x;
    setTopX(x);
    setNoTrans(true);
  };
  const onPtrUp=()=>{
    if(!isDragging.current)return;
    isDragging.current=false;
    setNoTrans(false);
    if(Math.abs(currX.current)>85){go(currX.current<0?1:-1);}
    else{setTopX(0);}
  };

  const svc=services[topIdx];
  const svcMid=services[mid];
  const svcBack=services[back];

  const cardBase={position:'absolute',inset:0,borderRadius:'24px',overflow:'hidden'};
  const cardBg=dark?'linear-gradient(145deg,#0D1F3C 0%,#0A1628 100%)':'#FFFFFF';
  const cardBorder=dark?'1px solid rgba(37,99,235,0.22)':'1px solid rgba(37,99,235,0.12)';

  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      {/* Card stack */}
      <div style={{position:'relative',width:'100%',maxWidth:'440px',height:'460px',perspective:'1200px',margin:'0 auto'}}>

        {/* BACK card */}
        <div style={{...cardBase,zIndex:1,
          transform:`translateY(${48-dragPct*18}px) scale(${0.88+dragPct*0.07})`,
          opacity:0.72+dragPct*0.12,
          transition:noTrans?'none':'all .38s ease',
          background:cardBg,border:cardBorder,
          boxShadow:dark?'0 6px 20px rgba(0,0,0,.25)':'0 4px 14px rgba(0,0,0,.07)',
        }}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:'4px',background:svcBack.gradient}}/>
          <div style={{padding:'28px',opacity:.55}}>
            <div style={{fontSize:'2rem',marginBottom:'10px'}}>{svcBack.icon}</div>
            <div style={{fontWeight:800,fontSize:'1.15rem',color:dark?'#F1F5F9':'#0F172A'}}>{svcBack.title}</div>
          </div>
        </div>

        {/* MID card */}
        <div style={{...cardBase,zIndex:2,
          transform:`translateY(${24-dragPct*14}px) scale(${0.94+dragPct*0.06})`,
          opacity:0.86+dragPct*0.08,
          transition:noTrans?'none':'all .38s ease',
          background:cardBg,border:cardBorder,
          boxShadow:dark?'0 12px 32px rgba(0,0,0,.3)':'0 8px 24px rgba(0,0,0,.09)',
        }}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:'4px',background:svcMid.gradient}}/>
          <div style={{padding:'28px',opacity:.72}}>
            <div style={{fontSize:'2rem',marginBottom:'10px'}}>{svcMid.icon}</div>
            <div style={{fontWeight:800,fontSize:'1.15rem',color:dark?'#F1F5F9':'#0F172A',marginBottom:'6px'}}>{svcMid.title}</div>
            <div style={{fontSize:'.82rem',color:dark?'#94A3B8':'#64748B',lineHeight:1.6}}>{svcMid.shortDesc.slice(0,90)}…</div>
          </div>
        </div>

        {/* TOP card — interactive */}
        <div
          style={{...cardBase,zIndex:3,
            transform:`translateX(${topX}px) rotate(${topX*.038}deg)`,
            transition:noTrans?'none':'transform .38s cubic-bezier(.34,1.56,.64,1)',
            background:cardBg,border:cardBorder,
            boxShadow:dark?'0 28px 60px rgba(37,99,235,.22)':'0 24px 50px rgba(37,99,235,.13)',
            cursor:isDragging.current?'grabbing':'grab',userSelect:'none',
          }}
          onPointerDown={onPtrDown}
          onPointerMove={onPtrMove}
          onPointerUp={onPtrUp}
          onPointerCancel={onPtrUp}
        >
          {/* Gradient strip */}
          <div style={{position:'absolute',top:0,left:0,right:0,height:'5px',background:svc.gradient}}/>

          {/* Swipe hint overlay */}
          {Math.abs(topX)>28&&(
            <div style={{position:'absolute',inset:0,borderRadius:'24px',pointerEvents:'none',zIndex:10,
              background:topX<0?'rgba(239,68,68,.06)':'rgba(34,197,94,.06)',
              border:`2.5px solid ${topX<0?'rgba(239,68,68,.4)':'rgba(34,197,94,.4)'}`,
              display:'flex',alignItems:'center',justifyContent:topX<0?'flex-start':'flex-end',padding:'22px',
            }}>
              <span style={{fontSize:'2.5rem'}}>{topX<0?'⬅️':'➡️'}</span>
            </div>
          )}

          {/* Content */}
          <div style={{padding:'28px',display:'flex',flexDirection:'column',height:'100%',boxSizing:'border-box'}}>
            {/* Header row */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'18px'}}>
              <div style={{width:'62px',height:'62px',borderRadius:'18px',background:svc.gradient,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',flexShrink:0}}>
                {svc.icon}
              </div>
              <div style={{background:dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.05)',borderRadius:'20px',padding:'5px 14px',fontSize:'.72rem',fontWeight:700,color:dark?'#94A3B8':'#64748B',letterSpacing:'.04em'}}>
                {topIdx+1} / {n}
              </div>
            </div>

            <h3 style={{fontSize:'1.38rem',fontWeight:800,color:dark?'#F1F5F9':'#0F172A',marginBottom:'10px',lineHeight:1.25}}>{svc.title}</h3>
            <p style={{color:dark?'#94A3B8':'#64748B',fontSize:'.9rem',lineHeight:1.72,flex:1,marginBottom:'14px'}}>{svc.shortDesc}</p>

            {/* Chips */}
            <div style={{display:'flex',flexWrap:'wrap',gap:'7px',marginBottom:'18px'}}>
              {svc.features.map((f,i)=>(
                <span key={i} style={{padding:'4px 13px',borderRadius:'20px',fontSize:'.72rem',fontWeight:700,
                  background:dark?'rgba(37,99,235,.15)':'rgba(37,99,235,.08)',color:'#3B82F6'}}>
                  {f}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{fontSize:'.78rem',color:dark?'#64748B':'#94A3B8',whiteSpace:'nowrap',flexShrink:0}}>⏱ {svc.timeline}</span>
              <button
                onPointerDown={e=>e.stopPropagation()}
                onClick={()=>onOpenModal(svc)}
                style={{flex:1,background:svc.gradient,color:'#fff',border:'none',borderRadius:'14px',
                  padding:'12px 18px',fontWeight:700,cursor:'pointer',fontSize:'.875rem',
                  fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:'.01em',
                }}>
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{display:'flex',alignItems:'center',gap:'14px',marginTop:'30px'}}>
        <button onClick={()=>go(-1)} disabled={animating}
          style={{width:'44px',height:'44px',borderRadius:'50%',border:dark?'1px solid rgba(255,255,255,.12)':'1px solid rgba(0,0,0,.1)',
            background:dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.04)',color:dark?'#94A3B8':'#64748B',
            cursor:animating?'not-allowed':'pointer',fontSize:'1.1rem',display:'flex',alignItems:'center',justifyContent:'center',
            transition:'all .2s ease',opacity:animating?.5:1}}>←</button>

        {/* Dots */}
        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
          {services.map((_,i)=>(
            <div key={i} onClick={()=>{if(!animating){if(i>topIdx)go(1);else if(i<topIdx)go(-1);}}}
              style={{width:i===topIdx?'28px':'8px',height:'8px',borderRadius:'4px',
                background:i===topIdx?svc.bgAccent:dark?'rgba(255,255,255,.18)':'rgba(0,0,0,.13)',
                transition:'all .3s ease',cursor:'pointer'}}>
            </div>
          ))}
        </div>

        <button onClick={()=>go(1)} disabled={animating}
          style={{width:'44px',height:'44px',borderRadius:'50%',border:'none',
            background:'linear-gradient(135deg,#2563EB,#4F46E5)',color:'#fff',
            cursor:animating?'not-allowed':'pointer',fontSize:'1.1rem',display:'flex',alignItems:'center',justifyContent:'center',
            boxShadow:'0 4px 14px rgba(37,99,235,.35)',transition:'all .2s ease',opacity:animating?.5:1}}>→</button>
      </div>

      <p style={{textAlign:'center',color:dark?'#475569':'#94A3B8',fontSize:'.75rem',marginTop:'10px',letterSpacing:'.08em',textTransform:'uppercase'}}>
        Drag · Swipe · Tap arrows to explore all {n} services
      </p>
    </div>
  );
}
