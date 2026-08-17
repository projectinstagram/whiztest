import { useSite } from './SiteContext';

export default function PageHeader({eyebrow,title,accent,subtitle}){
  const {T1,T2,ACC,BD,dark,isMobile,wrap}=useSite();
  return(
    <section style={{
      paddingTop:isMobile?'128px':'148px',paddingBottom:isMobile?'40px':'56px',
      background:dark?'radial-gradient(ellipse at 50% 0%,rgba(37,99,235,.14),transparent 60%)':'radial-gradient(ellipse at 50% 0%,rgba(37,99,235,.08),transparent 60%)',
      borderBottom:`1px solid ${BD}`,textAlign:'center',
    }}>
      <div style={wrap}>
        <div style={{fontSize:'.8rem',fontWeight:700,color:ACC,letterSpacing:'.1em',textTransform:'uppercase',marginBottom:'12px'}}>{eyebrow}</div>
        <h1 style={{fontSize:'clamp(1.9rem,5vw,2.8rem)',fontWeight:800,color:T1,lineHeight:1.2,marginBottom:'12px'}}>
          {title} {accent&&<span style={{color:ACC}}>{accent}</span>}
        </h1>
        {subtitle&&<p style={{fontSize:'1.05rem',color:T2,lineHeight:1.7,maxWidth:'600px',margin:'0 auto'}}>{subtitle}</p>}
      </div>
    </section>
  );
}
