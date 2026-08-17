// Derives the site's theme tokens + shared style helpers from the dark-mode
// and mobile-breakpoint flags. Kept as a pure function (not a hook) so it can
// be called identically from Layout and any component that needs it.
export function getTheme(dark, isMobile){
  const BG=dark?'#060F20':'#F4F8FF';
  const BG2=dark?'#0A1628':'#EBF1FF';
  const CARD=dark?'#0D1F3C':'#FFFFFF';
  const T1=dark?'#F1F5F9':'#0F172A';
  const T2=dark?'#94A3B8':'#64748B';
  const BD=dark?'rgba(37,99,235,.18)':'rgba(37,99,235,.1)';
  const ACC='#2563EB';
  const sec=(bgColor)=>({padding:isMobile?'56px 0':'88px 0',background:bgColor});
  const wrap={maxWidth:'1200px',margin:'0 auto',padding:'0 20px'};
  const sh=(s)=>({fontSize:s||'.8rem',fontWeight:700,color:ACC,letterSpacing:'.1em',textTransform:'uppercase',marginBottom:'12px'});
  const ht={fontSize:'clamp(1.7rem,5vw,2.8rem)',fontWeight:800,color:T1,lineHeight:1.2,marginBottom:'16px'};
  const hs={fontSize:'1.1rem',color:T2,lineHeight:1.7,maxWidth:'600px'};
  return {BG,BG2,CARD,T1,T2,BD,ACC,sec,wrap,sh,ht,hs};
}
