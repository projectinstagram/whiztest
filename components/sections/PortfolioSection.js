import { useState } from 'react';
import { useSite } from '../SiteContext';
import { PORTFOLIO } from '../../lib/data';
import PortfolioCard from '../PortfolioCard';

export default function PortfolioSection({showHeading=true}){
  const [pfFilter,setPfFilter]=useState('All');
  const {dark,sec,wrap,sh,ht,hs,BG2,T2}=useSite();
  const pfCats=['All',...[...new Set(PORTFOLIO.map(p=>p.cat))]];
  const pfItems=pfFilter==='All'?PORTFOLIO:PORTFOLIO.filter(p=>p.cat===pfFilter);
  return(
    <section id="portfolio" style={{...sec(BG2),position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'-8%',right:'-6%',width:'420px',height:'420px',borderRadius:'50%',background:'radial-gradient(circle,rgba(37,99,235,.14) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'-10%',left:'-6%',width:'380px',height:'380px',borderRadius:'50%',background:'radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{...wrap,position:'relative'}}>
        {showHeading&&(
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <div style={sh()}>PORTFOLIO</div>
            <h2 style={{...ht,textAlign:'center'}}>Projects We're <span style={{color:'#2563EB'}}>Proud Of</span></h2>
            <p style={{...hs,margin:'0 auto',textAlign:'center'}}>Real products, shipped and live — click a card to visit the site.</p>
          </div>
        )}
        <div style={{display:'flex',gap:'8px',justifyContent:'center',flexWrap:'wrap',marginBottom:'40px'}}>
          {pfCats.map(c=>(
            <button key={c} onClick={()=>setPfFilter(c)}
              style={{padding:'8px 22px',borderRadius:'20px',fontWeight:700,fontSize:'.8rem',cursor:'pointer',border:'none',
                background:pfFilter===c?'linear-gradient(135deg,#2563EB,#4F46E5)':dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.05)',
                color:pfFilter===c?'#fff':T2,transition:'all .2s ease',fontFamily:"'Plus Jakarta Sans',sans-serif",
                boxShadow:pfFilter===c?'0 8px 20px rgba(37,99,235,.35)':'none',
                transform:pfFilter===c?'translateY(-2px)':'none'}}>
              {c}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'24px'}}>
          {pfItems.map((p,i)=><PortfolioCard key={p.id} p={p} dark={dark} index={i}/>)}
        </div>
      </div>
    </section>
  );
}
