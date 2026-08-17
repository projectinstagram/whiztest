import { useSite } from '../SiteContext';
import HeroScene3D from '../HeroScene3D';

export default function HeroSection(){
  const {dark,isMobile,T1,T2,BD,ACC,wrap}=useSite();
  return(
    <section style={{minHeight:isMobile?'auto':'100vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',paddingTop:'104px',paddingBottom:isMobile?'48px':0}}>
      {/* bg orbs */}
      <div style={{position:'absolute',top:'10%',right:'5%',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(37,99,235,.15) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'10%',left:'5%',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(79,70,229,.12) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <div style={{...wrap,display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?'36px':'60px',alignItems:'center'}}>
        <div style={{animation:'slideUp .7s ease'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 16px',borderRadius:'20px',background:dark?'rgba(37,99,235,.15)':'rgba(37,99,235,.1)',border:`1px solid ${BD}`,marginBottom:'24px'}}>
            <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#4ADE80',display:'inline-block',animation:'pulseRing 1.5s infinite'}}/>
            <span style={{color:ACC,fontSize:'.8rem',fontWeight:700,letterSpacing:'.06em'}}>AVAILABLE FOR NEW PROJECTS</span>
          </div>
          <h1 style={{fontSize:'clamp(2rem,8vw,3.8rem)',fontWeight:800,lineHeight:1.15,marginBottom:'20px',color:T1}}>
            Build Digital Products<br/>
            <span style={{background:'linear-gradient(135deg,#2563EB,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>That Actually Work</span>
          </h1>
          <p style={{fontSize:'1.1rem',color:T2,lineHeight:1.75,marginBottom:'32px',maxWidth:'520px'}}>
            WhizTest Pvt Ltd crafts premium websites, mobile apps, and custom software for startups and enterprises — on time, every time.
          </p>
          <div style={{display:'flex',gap:'14px',flexWrap:'wrap',marginBottom:'40px'}}>
            <a href="/contact" style={{background:'linear-gradient(135deg,#2563EB,#4F46E5)',color:'#fff',padding:'14px 28px',borderRadius:'14px',textDecoration:'none',fontWeight:700,fontSize:'1rem',boxShadow:'0 8px 24px rgba(37,99,235,.35)'}}>Start Your Project →</a>
            <a href="/portfolio" style={{border:`1.5px solid ${BD}`,color:T1,padding:'14px 28px',borderRadius:'14px',textDecoration:'none',fontWeight:700,fontSize:'1rem',background:'transparent'}}>View Portfolio</a>
          </div>
        </div>
        {/* Hero visual — interactive 3D scene */}
        <HeroScene3D isMobile={isMobile}/>
      </div>
    </section>
  );
}
