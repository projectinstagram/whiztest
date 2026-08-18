import { useEffect } from 'react';

export default function JobModal({job,dark,onClose}){
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
  const isOpen=job.status==='open';
  const posted=new Date(job.date).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'});

  return(
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(6px)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',overflowY:'auto'}}>
      <div onClick={e=>e.stopPropagation()} style={{background:card,borderRadius:'24px',padding:'clamp(20px,5vw,36px)',maxWidth:'640px',width:'100%',border:`1px solid ${bd}`,boxShadow:'0 30px 80px rgba(0,0,0,0.3)',position:'relative',animation:'slideUp .3s ease'}}>
        <button onClick={onClose} style={{position:'absolute',top:'20px',right:'20px',background:'rgba(100,116,139,0.12)',border:'none',width:'36px',height:'36px',borderRadius:'50%',cursor:'pointer',fontSize:'1.1rem',color:t2,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>

        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px',flexWrap:'wrap'}}>
          <span style={{padding:'4px 12px',borderRadius:'20px',fontSize:'.7rem',fontWeight:800,letterSpacing:'.06em',
            background:isOpen?'rgba(34,197,94,.14)':'rgba(148,163,184,.16)',color:isOpen?'#22C55E':'#94A3B8'}}>
            {isOpen?'● OPEN':'● CLOSED'}
          </span>
          <span style={{color:t2,fontSize:'.8rem'}}>Posted {posted}</span>
        </div>

        <h2 style={{fontSize:'1.5rem',fontWeight:800,color:t1,marginBottom:'10px',lineHeight:1.3}}>{job.title} <span style={{color:t2,fontWeight:600}}>({job.level} level)</span></h2>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'20px'}}>
          <span style={{padding:'5px 14px',borderRadius:'20px',background:dark?'rgba(37,99,235,.15)':'rgba(37,99,235,.08)',color:'#3B82F6',fontSize:'.78rem',fontWeight:700}}>{job.type}</span>
          <span style={{padding:'5px 14px',borderRadius:'20px',background:dark?'rgba(37,99,235,.15)':'rgba(37,99,235,.08)',color:'#3B82F6',fontSize:'.78rem',fontWeight:700}}>{job.mode}</span>
        </div>

        <p style={{color:t2,lineHeight:1.75,marginBottom:'24px'}}>{job.summary}</p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'20px',marginBottom:'24px'}}>
          <div style={{background:cardInner,borderRadius:'16px',padding:'18px',border:`1px solid ${bd}`}}>
            <div style={{fontWeight:700,color:t1,marginBottom:'10px'}}>🎯 Responsibilities</div>
            {job.responsibilities.map((r,i)=>(
              <div key={i} style={{color:t2,fontSize:'.875rem',marginBottom:'6px',display:'flex',gap:'8px',alignItems:'flex-start'}}>
                <span style={{color:'#2563EB',marginTop:'2px'}}>✓</span>{r}
              </div>
            ))}
          </div>
          <div style={{background:cardInner,borderRadius:'16px',padding:'18px',border:`1px solid ${bd}`}}>
            <div style={{fontWeight:700,color:t1,marginBottom:'10px'}}>📋 Requirements</div>
            {job.requirements.map((r,i)=>(
              <div key={i} style={{color:t2,fontSize:'.875rem',marginBottom:'6px',display:'flex',gap:'8px',alignItems:'flex-start'}}>
                <span style={{color:'#059669',marginTop:'2px'}}>✓</span>{r}
              </div>
            ))}
          </div>
        </div>

        {isOpen?(
          <a href={`mailto:support.whiztest@gmail.com?subject=${encodeURIComponent('Application: '+job.title+' ('+job.level+' level)')}`}
            onClick={onClose}
            style={{display:'block',background:'linear-gradient(135deg,#2563EB,#4F46E5)',color:'#fff',borderRadius:'14px',padding:'14px 28px',fontWeight:700,textAlign:'center',textDecoration:'none',fontSize:'1rem'}}>
            Apply for This Role →
          </a>
        ):(
          <div style={{textAlign:'center',padding:'16px',borderRadius:'14px',background:dark?'rgba(148,163,184,.08)':'rgba(100,116,139,.06)',color:t2,fontWeight:600,fontSize:'.9rem'}}>
            This position is no longer accepting applications. Check back soon for new openings.
          </div>
        )}
      </div>
    </div>
  );
}
