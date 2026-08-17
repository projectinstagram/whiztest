import { useState, useEffect } from 'react';
import { useSite } from '../SiteContext';
import { TESTIMONIALS } from '../../lib/data';
import { Stars } from '../Small';

export default function TestimonialsSection({showHeading=true}){
  const [tIdx,setTIdx]=useState(0);
  const {dark,sec,wrap,sh,ht,BG,CARD,BD,T1,T2,ACC}=useSite();

  useEffect(()=>{const t=setInterval(()=>setTIdx(p=>(p+1)%TESTIMONIALS.length),5000);return()=>clearInterval(t);},[]);

  return(
    <section id="testimonials" style={sec(BG)}>
      <div style={wrap}>
        {showHeading&&(
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div style={sh()}>TESTIMONIALS</div>
            <h2 style={{...ht,textAlign:'center'}}>What Our Clients <span style={{color:ACC}}>Say</span></h2>
          </div>
        )}
        <div style={{maxWidth:'720px',margin:'0 auto'}}>
          <div style={{padding:'40px',background:CARD,borderRadius:'24px',border:`1px solid ${BD}`,boxShadow:dark?'0 16px 40px rgba(37,99,235,.12)':'0 16px 40px rgba(37,99,235,.08)',textAlign:'center',minHeight:'240px',display:'flex',flexDirection:'column',justifyContent:'center',transition:'all .4s ease'}}>
            <Stars count={TESTIMONIALS[tIdx].rating}/>
            <p style={{color:T2,fontSize:'1.05rem',lineHeight:1.75,margin:'20px 0',fontStyle:'italic'}}>"{TESTIMONIALS[tIdx].text}"</p>
            <div style={{display:'flex',alignItems:'center',gap:'12px',justifyContent:'center'}}>
              <div style={{width:'46px',height:'46px',borderRadius:'50%',background:'linear-gradient(135deg,#2563EB,#4F46E5)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'#fff',fontSize:'.9rem'}}>
                {TESTIMONIALS[tIdx].avatar}
              </div>
              <div style={{textAlign:'left'}}>
                <div style={{fontWeight:700,color:T1}}>{TESTIMONIALS[tIdx].name}</div>
                <div style={{color:T2,fontSize:'.82rem'}}>{TESTIMONIALS[tIdx].role}</div>
              </div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'center',gap:'8px',marginTop:'20px'}}>
            {TESTIMONIALS.map((_,i)=>(
              <div key={i} onClick={()=>setTIdx(i)}
                style={{width:i===tIdx?'24px':'8px',height:'8px',borderRadius:'4px',
                  background:i===tIdx?ACC:dark?'rgba(255,255,255,.2)':'rgba(0,0,0,.15)',
                  transition:'all .3s ease',cursor:'pointer'}}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
