import { useSite } from '../SiteContext';

export default function AboutSection(){
  const {isMobile,sec,wrap,sh,ht,hs,BG2,CARD,BD,ACC,T2}=useSite();
  return(
    <section id="about" style={sec(BG2)}>
      <div style={{...wrap,display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?'36px':'64px',alignItems:'center'}}>
        <div>
          <div style={sh()}>ABOUT US</div>
          <h2 style={ht}>We Build Products<br/>That <span style={{color:ACC}}>Last</span></h2>
          <p style={{...hs,marginBottom:'20px'}}>WhizTest Pvt Ltd was founded with a simple mission: deliver enterprise-grade digital products at prices startups can actually afford.</p>
          <p style={{...hs,marginBottom:'32px'}}>Our team of 20+ engineers, designers, and digital strategists has delivered 10+ projects across fintech, edtech, healthcare, e-commerce, and more — with a 99% client satisfaction rate.</p>
          <div style={{display:'flex',gap:'20px',flexWrap:'wrap'}}>
            {[{v:'2019',l:'Founded'},{v:'20+',l:'Team Members'},{v:'12+',l:'Industries Served'},{v:'4',l:'Countries'}].map(({v,l})=>(
              <div key={l} style={{textAlign:'center',padding:'18px 22px',background:CARD,borderRadius:'16px',border:`1px solid ${BD}`}}>
                <div style={{fontSize:'1.6rem',fontWeight:800,color:ACC}}>{v}</div>
                <div style={{fontSize:'.8rem',color:T2,fontWeight:600,marginTop:'4px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:'relative'}}>
          <div style={{borderRadius:'24px',overflow:'hidden',background:'linear-gradient(135deg,#2563EB,#4F46E5,#7C3AED)',padding:'40px',aspectRatio:'1',display:'flex',flexDirection:'column',justifyContent:'center',gap:'16px'}}>
            {['Customer-First Approach','Agile Development','Transparent Communication','Quality Over Quantity','Innovation-Driven'].map((v,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'14px',background:'rgba(255,255,255,.1)',borderRadius:'14px',padding:'14px 18px'}}>
                <span style={{fontSize:'1.2rem'}}>✓</span>
                <span style={{color:'#fff',fontWeight:700,fontSize:'.95rem'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
