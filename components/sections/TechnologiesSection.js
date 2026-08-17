import { useState } from 'react';
import { useSite } from '../SiteContext';
import { TECHNOLOGIES, TECH_CAT_ICONS, TECH_CAT_COLORS } from '../../lib/data';

export default function TechnologiesSection(){
  const [activeTech,setActiveTech]=useState('Frontend');
  const {dark,sec,wrap,sh,ht,hs,BG2,CARD,BD,T1,T2}=useSite();
  return(
    <section id="technologies" style={{...sec(BG2),position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'-10%',left:'-8%',width:'380px',height:'380px',borderRadius:'50%',background:'radial-gradient(circle,rgba(37,99,235,.12) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'-10%',right:'-8%',width:'420px',height:'420px',borderRadius:'50%',background:'radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{...wrap,position:'relative'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={sh()}>TECH STACK</div>
          <h2 style={{...ht,textAlign:'center'}}>Modern Technologies,<br/><span style={{color:'#2563EB'}}>Proven Results</span></h2>
          <p style={{...hs,margin:'0 auto',textAlign:'center'}}>Battle-tested tools chosen for performance, scalability, and long-term maintainability.</p>
        </div>
        {/* Tabs */}
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap',justifyContent:'center',padding:'6px',borderRadius:'18px',
          background:dark?'rgba(255,255,255,.05)':'rgba(255,255,255,.65)',border:`1px solid ${BD}`,
          width:'fit-content',margin:'0 auto 40px',
          boxShadow:dark?'0 4px 20px rgba(0,0,0,.2)':'0 4px 20px rgba(37,99,235,.06)'}}>
          {Object.keys(TECHNOLOGIES).map(t=>(
            <button key={t} onClick={()=>setActiveTech(t)}
              style={{padding:'10px 20px',borderRadius:'13px',fontWeight:700,fontSize:'.85rem',cursor:'pointer',border:'none',
                display:'flex',alignItems:'center',gap:'7px',whiteSpace:'nowrap',
                background:activeTech===t?`linear-gradient(135deg,${TECH_CAT_COLORS[t]},${TECH_CAT_COLORS[t]}CC)`:'transparent',
                color:activeTech===t?'#fff':T2,transition:'all .25s ease',fontFamily:"'Plus Jakarta Sans',sans-serif",
                boxShadow:activeTech===t?`0 6px 18px ${TECH_CAT_COLORS[t]}55`:'none'}}>
              <span>{TECH_CAT_ICONS[t]}</span>{t}
            </button>
          ))}
        </div>
        {/* Chips */}
        <div key={activeTech} style={{display:'flex',flexWrap:'wrap',gap:'14px',justifyContent:'center'}}>
          {TECHNOLOGIES[activeTech].map((t,i)=>(
            <div key={i}
              style={{padding:'13px 24px',background:CARD,borderRadius:'14px',border:`1px solid ${BD}`,
                fontWeight:700,fontSize:'.9rem',color:T1,display:'flex',alignItems:'center',gap:'10px',cursor:'default',
                transition:'transform .2s ease,box-shadow .2s ease,border-color .2s ease',
                animation:`slideUp .4s ease ${i*0.05}s both`}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 12px 28px ${TECH_CAT_COLORS[activeTech]}33`;e.currentTarget.style.borderColor=TECH_CAT_COLORS[activeTech];}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor=BD;}}>
              <span style={{width:'8px',height:'8px',borderRadius:'50%',background:TECH_CAT_COLORS[activeTech],flexShrink:0}}/>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
