import { useState } from 'react';
import { useSite } from '../SiteContext';
import { SERVICES } from '../../lib/data';

export default function ContactSection({showHeading=true}){
  const [form,setForm]=useState({name:'',email:'',phone:'',service:'',message:''});
  const [formState,setFormState]=useState(null);
  const {isMobile,sec,wrap,sh,ht,BG,CARD,BD,T1,T2,ACC}=useSite();

  const submitForm=async(e)=>{
    e.preventDefault();setFormState('sending');
    try{
      const serviceLabel=SERVICES.find(s=>s.id===form.service)?.title||'';
      const res=await fetch('/api/telegram-forward',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({form:{...form,serviceLabel}})});
      if(!res.ok)throw new Error('forward failed');
      setFormState('success');
      setForm({name:'',email:'',phone:'',service:'',message:''});
    }catch{
      setFormState('error');
    }
  };

  return(
    <section id="contact" style={sec(BG)}>
      <div style={wrap}>
        {showHeading&&(
          <div style={{textAlign:'center',marginBottom:'56px'}}>
            <div style={sh()}>CONTACT</div>
            <h2 style={{...ht,textAlign:'center'}}>Let's <span style={{color:ACC}}>Work Together</span></h2>
          </div>
        )}
        <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?'32px':'52px',maxWidth:'1000px',margin:'0 auto'}}>
          {/* Info */}
          <div>
            <h3 style={{fontWeight:700,color:T1,marginBottom:'20px',fontSize:'1.2rem'}}>Get in Touch</h3>
            {[
              {icon:'📧',label:'Email',val:'support.whiztest@gmail.com',href:'mailto:support.whiztest@gmail.com'},
              {icon:'📱',label:'WhatsApp/Call',val:'+977 9866697309',href:'https://wa.me/9779866697309'},
              {icon:'📍',label:'Location',val:'Pratappur-7, Suryapura, Nawalparasi -33008',href:null},
              {icon:'⏱',label:'Response Time',val:'Within 24 hours',href:null},
            ].map((c,i)=>(
              <div key={i} style={{display:'flex',gap:'16px',marginBottom:'20px',padding:'16px',background:CARD,borderRadius:'14px',border:`1px solid ${BD}`}}>
                <span style={{fontSize:'1.4rem',flexShrink:0}}>{c.icon}</span>
                <div>
                  <div style={{color:T2,fontSize:'.78rem',fontWeight:700,marginBottom:'2px'}}>{c.label}</div>
                  {c.href?<a href={c.href} style={{color:ACC,fontWeight:700,textDecoration:'none'}}>{c.val}</a>:<span style={{color:T1,fontWeight:600}}>{c.val}</span>}
                </div>
              </div>
            ))}
          </div>
          {/* Form */}
          <form onSubmit={submitForm}>
            {formState==='success'?(
              <div style={{textAlign:'center',padding:'40px',background:CARD,borderRadius:'20px',border:`1px solid ${BD}`}}>
                <div style={{fontSize:'3rem',marginBottom:'16px'}}>🎉</div>
                <h3 style={{color:T1,fontWeight:700,marginBottom:'8px'}}>Message Sent!</h3>
                <p style={{color:T2}}>We'll get back to you within 24 hours.</p>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                {[{id:'name',label:'Name',type:'text',placeholder:'Your full name',required:true},{id:'email',label:'Email',type:'email',placeholder:'your@email.com',required:true},{id:'phone',label:'Phone',type:'tel',placeholder:'+91 98765 43210',required:false}].map(f=>(
                  <div key={f.id}>
                    <label style={{display:'block',color:T2,fontSize:'.8rem',fontWeight:700,marginBottom:'6px'}}>{f.label}{f.required&&' *'}</label>
                    <input type={f.type} required={f.required} placeholder={f.placeholder} value={form[f.id]} onChange={e=>setForm(p=>({...p,[f.id]:e.target.value}))}
                      style={{width:'100%',padding:'11px 14px',borderRadius:'12px',border:`1px solid ${BD}`,background:CARD,color:T1,fontSize:'.9rem',outline:'none',fontFamily:"'Plus Jakarta Sans',sans-serif",boxSizing:'border-box'}}/>
                  </div>
                ))}
                <div>
                  <label style={{display:'block',color:T2,fontSize:'.8rem',fontWeight:700,marginBottom:'6px'}}>Service Needed</label>
                  <select value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))}
                    style={{width:'100%',padding:'11px 14px',borderRadius:'12px',border:`1px solid ${BD}`,background:CARD,color:T1,fontSize:'.9rem',outline:'none',fontFamily:"'Plus Jakarta Sans',sans-serif",boxSizing:'border-box'}}>
                    <option value="">Select a service…</option>
                    {SERVICES.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{display:'block',color:T2,fontSize:'.8rem',fontWeight:700,marginBottom:'6px'}}>Message *</label>
                  <textarea required rows={4} placeholder="Tell us about your project…" value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                    style={{width:'100%',padding:'11px 14px',borderRadius:'12px',border:`1px solid ${BD}`,background:CARD,color:T1,fontSize:'.9rem',outline:'none',fontFamily:"'Plus Jakarta Sans',sans-serif",boxSizing:'border-box',resize:'vertical'}}/>
                </div>
                {formState==='error'&&(
                  <div style={{padding:'12px 14px',borderRadius:'12px',background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.25)',color:'#EF4444',fontSize:'.82rem',fontWeight:600}}>
                    Something went wrong sending your message. Please try again, or WhatsApp us directly at +977 9866697309.
                  </div>
                )}
                <button type="submit" disabled={formState==='sending'}
                  style={{background:'linear-gradient(135deg,#2563EB,#4F46E5)',color:'#fff',border:'none',borderRadius:'14px',padding:'14px',fontWeight:700,fontSize:'1rem',cursor:formState==='sending'?'wait':'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:'0 6px 18px rgba(37,99,235,.3)'}}>
                  {formState==='sending'?'Sending…':'Send Message →'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
