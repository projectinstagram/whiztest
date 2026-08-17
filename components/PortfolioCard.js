import { useState, useRef, useEffect } from 'react';

export default function PortfolioCard({p,dark,index}){
  const ref=useRef(null);
  const [visible,setVisible]=useState(false);
  const [tilt,setTilt]=useState({x:0,y:0});
  const [hover,setHover]=useState(false);

  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){setVisible(true);ob.disconnect();}
    },{threshold:.15});
    if(ref.current)ob.observe(ref.current);
    return()=>ob.disconnect();
  },[]);

  const onMove=(e)=>{
    const r=e.currentTarget.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width-0.5;
    const py=(e.clientY-r.top)/r.height-0.5;
    setTilt({x:py*-9,y:px*11});
  };
  const onLeave=()=>{setHover(false);setTilt({x:0,y:0});};

  const BD=dark?'rgba(37,99,235,.18)':'rgba(37,99,235,.1)';
  const CARD=dark?'#0D1F3C':'#FFFFFF';
  const T1=dark?'#F1F5F9':'#0F172A';
  const T2=dark?'#94A3B8':'#64748B';

  return(
    <div ref={ref} style={{
      opacity:visible?1:0,
      transform:visible?'translateY(0)':'translateY(30px)',
      transition:`opacity .6s ease ${index*70}ms,transform .6s cubic-bezier(.22,1,.36,1) ${index*70}ms`,
      perspective:'900px',
    }}>
      <div
        onMouseEnter={()=>setHover(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={()=>{if(p.link)window.open(p.link,'_blank','noopener');}}
        style={{
          borderRadius:'22px',overflow:'hidden',cursor:'pointer',background:CARD,
          border:`1px solid ${BD}`,transformStyle:'preserve-3d',
          transform:`rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hover?-6:0}px) scale(${hover?1.02:1})`,
          transition:'transform .25s ease,box-shadow .3s ease',
          boxShadow:hover?`0 22px 48px ${p.colors[0]}4D`:(dark?'0 4px 16px rgba(0,0,0,.25)':'0 4px 16px rgba(0,0,0,.06)'),
        }}>
        {/* Image */}
        <div style={{position:'relative',height:'170px',background:`linear-gradient(135deg,${p.colors[0]},${p.colors[1]})`,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,.35) 1.5px,transparent 1.5px)',backgroundSize:'18px 18px',opacity:.5}}/>
          <span style={{fontSize:'3.6rem',filter:'drop-shadow(0 6px 14px rgba(0,0,0,.25))',
            transform:hover?'scale(1.14) rotate(-4deg)':'scale(1)',
            transition:'transform .35s cubic-bezier(.34,1.56,.64,1)',
            display:'inline-block',animation:`float ${3.5+(index%3)*.4}s ease-in-out infinite`}}>{p.emoji}</span>
          <div style={{position:'absolute',top:'14px',left:'14px',padding:'5px 12px',borderRadius:'20px',background:'rgba(0,0,0,.32)',backdropFilter:'blur(4px)',color:'#fff',fontSize:'.66rem',fontWeight:800,letterSpacing:'.06em'}}>
            {p.cat.toUpperCase()}
          </div>
          {p.ongoing&&(
            <div style={{position:'absolute',top:'14px',right:'14px',padding:'5px 12px',borderRadius:'20px',background:'rgba(245,158,11,.9)',backdropFilter:'blur(4px)',color:'#fff',fontSize:'.66rem',fontWeight:800,letterSpacing:'.06em',display:'flex',alignItems:'center',gap:'5px'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#fff',display:'inline-block'}}/>
              ONGOING
            </div>
          )}
          {p.link&&(
            <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.4)',display:'flex',alignItems:'center',justifyContent:'center',opacity:hover?1:0,transition:'opacity .3s ease',pointerEvents:'none'}}>
              <span style={{background:'#fff',color:'#0F172A',padding:'9px 18px',borderRadius:'20px',fontWeight:800,fontSize:'.8rem',
                transform:hover?'translateY(0)':'translateY(8px)',transition:'transform .3s ease'}}>
                Visit Live Site ↗
              </span>
            </div>
          )}
        </div>
        {/* Content */}
        <div style={{padding:'20px'}}>
          <h3 style={{fontWeight:800,color:T1,marginBottom:'8px',fontSize:'1.02rem',display:'flex',alignItems:'center',gap:'6px'}}>
            {p.title}
            {p.link&&<span style={{fontSize:'.75rem',color:p.colors[0],transform:hover?'translate(3px,-3px)':'none',transition:'transform .25s ease',display:'inline-block'}}>↗</span>}
          </h3>
          <p style={{color:T2,fontSize:'.86rem',lineHeight:1.6}}>{p.desc}</p>
        </div>
      </div>
    </div>
  );
}
