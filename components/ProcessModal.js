import { useEffect } from 'react';
import { PROCESS } from '../lib/data';

export default function ProcessModal({dark,onClose}){
  useEffect(()=>{
    document.body.style.overflow='hidden';
    const esc=(e)=>{if(e.key==='Escape')onClose();};
    window.addEventListener('keydown',esc);
    return()=>{document.body.style.overflow='';window.removeEventListener('keydown',esc);};
  },[onClose]);
  const bd=dark?'rgba(37,99,235,0.18)':'rgba(37,99,235,0.1)';
  const card=dark?'#0D1F3C':'#fff';
  const cardInner=dark?'#0A1628':'#F8FAFC';
  const t1=dark?'#F1F5F9':'#0F172A';
  const t2=dark?'#94A3B8':'#64748B';
  return(
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(6px)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
      <div onClick={e=>e.stopPropagation()} style={{background:card,borderRadius:'24px',padding:'clamp(20px,5vw,36px)',maxWidth:'860px',width:'100%',border:`1px solid ${bd}`,boxShadow:'0 30px 80px rgba(0,0,0,0.3)',position:'relative',animation:'slideUp .3s ease'}}>
        <button onClick={onClose} style={{position:'absolute',top:'20px',right:'20px',background:'rgba(100,116,139,0.12)',border:'none',width:'36px',height:'36px',borderRadius:'50%',cursor:'pointer',fontSize:'1.1rem',color:t2,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
        <div style={{fontSize:'.8rem',fontWeight:700,color:'#2563EB',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:'8px'}}>Our Process</div>
        <h2 style={{fontSize:'1.6rem',fontWeight:800,color:t1,marginBottom:'24px'}}>How We Turn Ideas Into Products</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px'}}>
          {PROCESS.map((p,i)=>(
            <div key={i} style={{padding:'22px',background:cardInner,borderRadius:'16px',border:`1px solid ${bd}`}}>
              <div style={{fontSize:'2rem',fontWeight:800,background:'linear-gradient(135deg,#2563EB,#4F46E5)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'10px'}}>{p.step}</div>
              <h3 style={{fontWeight:700,fontSize:'1rem',color:t1,marginBottom:'6px'}}>{p.title}</h3>
              <p style={{color:t2,fontSize:'.84rem',lineHeight:1.65}}>{p.desc}</p>
            </div>
          ))}
        </div>
        <a href="/contact" onClick={onClose} style={{display:'block',background:'linear-gradient(135deg,#2563EB,#4F46E5)',color:'#fff',borderRadius:'14px',padding:'14px 28px',fontWeight:700,textAlign:'center',textDecoration:'none',fontSize:'1rem',marginTop:'24px'}}>Start Your Project →</a>
      </div>
    </div>
  );
}
