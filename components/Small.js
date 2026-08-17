import { useState, useEffect, useRef } from 'react';

export function Stars({count=5}){
  return <span>{Array.from({length:5}).map((_,i)=><span key={i} style={{color:i<count?'#F59E0B':'#D1D5DB',fontSize:'0.95rem'}}>★</span>)}</span>;
}

export function AnimatedNumber({value,suffix=''}){
  const [n,setN]=useState(0);
  const ref=useRef(null);
  const done=useRef(false);
  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!done.current){
        done.current=true;
        const start=Date.now();const dur=1800;
        const tick=()=>{
          const t=Math.min((Date.now()-start)/dur,1);
          const ease=1-Math.pow(1-t,3);
          setN(Math.round(ease*value));
          if(t<1)requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },{threshold:.5});
    if(ref.current)ob.observe(ref.current);
    return()=>ob.disconnect();
  },[value]);
  return <span ref={ref}>{n}{suffix}</span>;
}
