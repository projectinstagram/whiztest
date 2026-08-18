import { useSite } from './SiteContext';

export default function LegalContent({sections,updated}){
  const {wrap,T1,T2,CARD,BD}=useSite();
  return (
    <section style={{padding:'48px 0 100px'}}>
      <div style={{...wrap,maxWidth:'820px'}}>
        {updated&&(
          <div style={{display:'inline-block',padding:'6px 14px',borderRadius:'20px',background:CARD,border:`1px solid ${BD}`,color:T2,fontSize:'.8rem',fontWeight:600,marginBottom:'32px'}}>
            Last updated: {updated}
          </div>
        )}
        {sections.map((s,i)=>(
          <div key={i} style={{marginBottom:'34px'}}>
            <h2 style={{fontSize:'1.15rem',fontWeight:800,color:T1,marginBottom:'10px'}}>{s.heading}</h2>
            {(Array.isArray(s.body)?s.body:[s.body]).filter(Boolean).map((p,j)=>(
              <p key={j} style={{color:T2,fontSize:'.92rem',lineHeight:1.8,marginBottom:'10px'}}>{p}</p>
            ))}
            {s.list&&(
              <ul style={{color:T2,fontSize:'.92rem',lineHeight:1.8,paddingLeft:'22px',marginTop:'4px'}}>
                {s.list.map((li,k)=><li key={k} style={{marginBottom:'6px'}}>{li}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
