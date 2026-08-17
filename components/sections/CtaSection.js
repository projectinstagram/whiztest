import { useSite } from '../SiteContext';

export default function CtaSection(){
  const {wrap}=useSite();
  return(
    <section style={{padding:'88px 0',background:'linear-gradient(135deg,#2563EB,#4F46E5,#7C3AED)',position:'relative',overflow:'hidden',textAlign:'center'}}>
      <div style={{position:'absolute',top:'-30%',left:'-10%',width:'500px',height:'500px',borderRadius:'50%',background:'rgba(255,255,255,.06)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'-30%',right:'-10%',width:'600px',height:'600px',borderRadius:'50%',background:'rgba(255,255,255,.04)',pointerEvents:'none'}}/>
      <div style={{...wrap,position:'relative'}}>
        <h2 style={{fontSize:'clamp(2rem,4vw,3rem)',fontWeight:800,color:'#fff',marginBottom:'16px',lineHeight:1.2}}>Ready to Build Something<br/>Amazing?</h2>
        <p style={{color:'rgba(255,255,255,.8)',fontSize:'1.1rem',marginBottom:'36px',maxWidth:'540px',margin:'0 auto 36px'}}>Let's talk about your project. Free consultation, no strings attached.</p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/contact" style={{background:'#fff',color:'#2563EB',padding:'14px 32px',borderRadius:'14px',textDecoration:'none',fontWeight:800,fontSize:'1rem',boxShadow:'0 8px 24px rgba(0,0,0,.2)'}}>Start a Project</a>
          <a href="https://wa.me/9779866697309" target="_blank" rel="noopener" style={{border:'2px solid rgba(255,255,255,.5)',color:'#fff',padding:'14px 32px',borderRadius:'14px',textDecoration:'none',fontWeight:700,fontSize:'1rem'}}>WhatsApp Us</a>
        </div>
      </div>
    </section>
  );
}
