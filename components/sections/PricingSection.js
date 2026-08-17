import { useSite } from '../SiteContext';
import { PRICING } from '../../lib/data';

export default function PricingSection({showHeading=true}){
  const {sec,wrap,sh,ht,hs,BG2,CARD,BD,T1,T2,ACC}=useSite();
  return(
    <section id="pricing" style={sec(BG2)}>
      <div style={wrap}>
        {showHeading&&(
          <div style={{textAlign:'center',marginBottom:'56px'}}>
            <div style={sh()}>PRICING</div>
            <h2 style={{...ht,textAlign:'center'}}>Transparent, <span style={{color:ACC}}>Affordable</span> Plans</h2>
            <p style={{...hs,margin:'0 auto',textAlign:'center'}}>No hidden fees. No surprises. Just great work at honest prices.</p>
          </div>
        )}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'20px'}}>
          {PRICING.map((p,i)=>(
            <div key={i} style={{padding:'32px 28px',borderRadius:'22px',background:p.highlight?'linear-gradient(135deg,#2563EB,#4F46E5)':CARD,
              border:p.highlight?'none':`1px solid ${BD}`,position:'relative',
              boxShadow:p.highlight?'0 20px 50px rgba(37,99,235,.35)':undefined,
              transform:p.highlight?'scale(1.03)':undefined}}>
              {p.highlight&&<div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'#F59E0B',color:'#fff',padding:'5px 16px',borderRadius:'20px',fontSize:'.72rem',fontWeight:800,whiteSpace:'nowrap',letterSpacing:'.06em'}}>⭐ MOST POPULAR</div>}
              <div style={{fontWeight:800,fontSize:'1.1rem',color:p.highlight?'rgba(255,255,255,.85)':T1,marginBottom:'4px'}}>{p.name}</div>
              <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'6px'}}>
                <span style={{fontSize:'2.2rem',fontWeight:800,color:p.highlight?'#fff':ACC}}>{p.price}</span>
                <span style={{color:p.highlight?'rgba(255,255,255,.7)':T2,fontSize:'.85rem'}}>{p.period}</span>
              </div>
              <div style={{color:p.highlight?'rgba(255,255,255,.7)':T2,fontSize:'.82rem',marginBottom:'20px'}}>{p.desc}</div>
              <div style={{marginBottom:'24px'}}>
                {p.features.map((f,j)=>(
                  <div key={j} style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'8px',color:p.highlight?'rgba(255,255,255,.88)':T2,fontSize:'.84rem'}}>
                    <span style={{color:p.highlight?'#86EFAC':'#22C55E',flexShrink:0}}>✓</span>{f}
                  </div>
                ))}
              </div>
              <a href="/contact" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:'12px',fontWeight:700,fontSize:'.9rem',textDecoration:'none',
                background:p.highlight?'rgba(255,255,255,.2)':'linear-gradient(135deg,#2563EB,#4F46E5)',
                color:p.highlight?'#fff':'#fff',
                border:p.highlight?'1px solid rgba(255,255,255,.3)':'none'}}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
