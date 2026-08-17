import { useEffect } from 'react';

export default function ServiceModal({svc,dark,onClose}){
  useEffect(()=>{
    document.body.style.overflow='hidden';
    const esc=(e)=>{if(e.key==='Escape')onClose();};
    window.addEventListener('keydown',esc);
    return()=>{document.body.style.overflow='';window.removeEventListener('keydown',esc);};
  },[onClose]);
  const bd=dark?'rgba(37,99,235,0.18)':'rgba(37,99,235,0.1)';
  const card=dark?'#0D1F3C':'#fff';
  const t1=dark?'#F1F5F9':'#0F172A';
  const t2=dark?'#94A3B8':'#64748B';
  return(
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(6px)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
      <div onClick={e=>e.stopPropagation()} style={{background:card,borderRadius:'24px',padding:'clamp(20px,5vw,36px)',maxWidth:'680px',width:'100%',border:`1px solid ${bd}`,boxShadow:'0 30px 80px rgba(0,0,0,0.3)',position:'relative',animation:'slideUp .3s ease'}}>
        <button onClick={onClose} style={{position:'absolute',top:'20px',right:'20px',background:'rgba(100,116,139,0.12)',border:'none',width:'36px',height:'36px',borderRadius:'50%',cursor:'pointer',fontSize:'1.1rem',color:t2,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        <div style={{width:'64px',height:'64px',borderRadius:'18px',background:svc.gradient,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',marginBottom:'16px'}}>{svc.icon}</div>
        <h2 style={{fontSize:'1.6rem',fontWeight:800,color:t1,marginBottom:'8px'}}>{svc.title}</h2>
        <p style={{color:t2,lineHeight:1.7,marginBottom:'24px'}}>{svc.overview}</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'20px',marginBottom:'24px'}}>
          <div style={{background:dark?'rgba(37,99,235,0.08)':'rgba(37,99,235,0.05)',borderRadius:'16px',padding:'18px'}}>
            <div style={{fontWeight:700,color:t1,marginBottom:'10px'}}>🎯 Problems We Solve</div>
            {svc.problems.map((p,i)=><div key={i} style={{color:t2,fontSize:'.875rem',marginBottom:'6px',display:'flex',gap:'8px',alignItems:'flex-start'}}><span style={{color:'#2563EB',marginTop:'2px'}}>✓</span>{p}</div>)}
          </div>
          <div style={{background:dark?'rgba(37,99,235,0.08)':'rgba(37,99,235,0.05)',borderRadius:'16px',padding:'18px'}}>
            <div style={{fontWeight:700,color:t1,marginBottom:'10px'}}>📦 Deliverables</div>
            {svc.deliverables.map((d,i)=><div key={i} style={{color:t2,fontSize:'.875rem',marginBottom:'6px',display:'flex',gap:'8px',alignItems:'flex-start'}}><span style={{color:'#059669',marginTop:'2px'}}>✓</span>{d}</div>)}
          </div>
        </div>
        <div style={{marginBottom:'20px'}}>
          <div style={{fontWeight:700,color:t1,marginBottom:'10px'}}>🛠 Tech Stack</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
            {svc.tech.map((t,i)=><span key={i} style={{padding:'5px 14px',borderRadius:'20px',background:dark?'rgba(79,70,229,0.15)':'rgba(79,70,229,0.08)',color:'#4F46E5',fontSize:'.8rem',fontWeight:600}}>{t}</span>)}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'16px',background:dark?'rgba(37,99,235,0.1)':'rgba(37,99,235,0.06)',borderRadius:'14px',marginBottom:'24px'}}>
          <span style={{fontSize:'1.3rem'}}>⏱</span>
          <div><div style={{fontWeight:700,color:t1,fontSize:'.9rem'}}>Typical Timeline</div><div style={{color:t2,fontSize:'.85rem'}}>{svc.timeline}</div></div>
        </div>
        <a href="/contact" onClick={onClose} style={{display:'block',background:svc.gradient,color:'#fff',borderRadius:'14px',padding:'14px 28px',fontWeight:700,textAlign:'center',textDecoration:'none',fontSize:'1rem'}}>Get a Free Quote →</a>
      </div>
    </div>
  );
}
