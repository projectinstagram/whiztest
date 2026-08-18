function formatDate(iso){
  const d=new Date(iso);
  const day=d.getDate();
  const suffix=day%10===1&&day!==11?'st':day%10===2&&day!==12?'nd':day%10===3&&day!==13?'rd':'th';
  return `${d.toLocaleDateString('en-US',{month:'long'})} ${day}${suffix} ${d.getFullYear()}`;
}

export default function CertificateView({cert}){
  return (
    <div id="certificate-print-area" style={{
      position:'relative',background:'#fff',borderRadius:'6px',overflow:'hidden',
      padding:'clamp(20px,4vw,48px)',border:'2px solid #1E3A8A',
      boxShadow:'0 20px 60px rgba(0,0,0,.15)',fontFamily:"'Plus Jakarta Sans',sans-serif",
    }}>
      {/* inner border */}
      <div style={{position:'absolute',inset:'10px',border:'1px solid #2563EB',borderRadius:'4px',pointerEvents:'none'}}/>

      {/* corner ribbons */}
      <div style={{position:'absolute',top:'-38px',left:'-58px',width:'160px',height:'44px',background:'linear-gradient(135deg,#1E3A8A,#2563EB,#1E3A8A)',transform:'rotate(-45deg)',boxShadow:'0 4px 10px rgba(0,0,0,.2)'}}/>
      <div style={{position:'absolute',bottom:'-38px',right:'-58px',width:'160px',height:'44px',background:'linear-gradient(135deg,#1E3A8A,#2563EB,#1E3A8A)',transform:'rotate(-45deg)',boxShadow:'0 4px 10px rgba(0,0,0,.2)'}}/>

      <div style={{position:'relative',padding:'8px 4px'}}>
        {/* header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'16px',marginBottom:'36px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <img src="/logo.jpg" alt="WhizTest logo" style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',border:'2px solid #2563EB'}}/>
            <span style={{fontFamily:'Georgia,"Times New Roman",serif',fontWeight:700,fontSize:'clamp(1.2rem,3vw,1.7rem)',color:'#0F172A'}}>WhizTest Pvt Ltd</span>
          </div>
          <div style={{fontSize:'.82rem',color:'#1E293B',lineHeight:1.9,textAlign:'right'}}>
            <div>📞 Ph no: 9866697309</div>
            <div>✉️ Email: support.whiztest@gmail.com</div>
            <div>📍 Pratappur-7, Suryapura, Nawalparasi -33008</div>
          </div>
        </div>

        {/* title */}
        <div style={{textAlign:'center',marginBottom:'22px'}}>
          <div style={{fontWeight:900,fontSize:'clamp(1.8rem,5vw,2.8rem)',color:'#0F172A',letterSpacing:'.03em',lineHeight:1.1}}>{cert.type.toUpperCase()}</div>
          <div style={{display:'flex',alignItems:'center',gap:'16px',justifyContent:'center',marginTop:'4px'}}>
            <span style={{flex:1,maxWidth:'80px',height:'2px',background:'#2563EB'}}/>
            <span style={{fontWeight:900,fontSize:'clamp(1.6rem,4.5vw,2.4rem)',color:'#2563EB',letterSpacing:'.03em'}}>CERTIFICATE</span>
            <span style={{flex:1,maxWidth:'80px',height:'2px',background:'#2563EB'}}/>
          </div>
        </div>

        <div style={{textAlign:'center',color:'#475569',fontSize:'.8rem',fontWeight:700,letterSpacing:'.1em',marginBottom:'14px'}}>THIS IS TO CERTIFY THAT</div>

        <div style={{textAlign:'center',marginBottom:'22px'}}>
          <span style={{fontFamily:"'Great Vibes',cursive",fontSize:'clamp(2.2rem,6vw,3.4rem)',color:'#1D4ED8',lineHeight:1,display:'inline-block',borderBottom:'1px solid #94A3B8',padding:'0 24px 8px'}}>
            {cert.name}
          </span>
        </div>

        <p style={{textAlign:'center',color:'#1E293B',fontSize:'.95rem',lineHeight:1.85,maxWidth:'640px',margin:'0 auto 36px'}}>
          has successfully completed {cert.type==='Internship'?'his/her internship':'the program'} as a <strong>{cert.role}</strong> from <strong>{formatDate(cert.startDate)}</strong> to <strong>{formatDate(cert.endDate)}</strong>.
          During the {cert.type.toLowerCase()}, {cert.name.split(' ')[0]} contributed to the design and development of <strong>{cert.project}</strong>, {cert.projectDesc}.
          The {cert.type.toLowerCase()} involved practical work in web development, responsive UI implementation, feature development, testing, debugging, and performance optimisation.
          {' '}{cert.name.split(' ')[0]} proved to be a dedicated, hardworking, and collaborative team member.
        </p>

        {/* footer: stamp + signature */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'20px'}}>
          <div style={{width:'92px',height:'92px',borderRadius:'50%',border:'2px dashed #2563EB',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',transform:'rotate(-8deg)',color:'#2563EB',flexShrink:0}}>
            <div style={{fontSize:'.58rem',fontWeight:800,letterSpacing:'.04em'}}>WHIZ TEST</div>
            <div style={{fontSize:'1.1rem',margin:'2px 0'}}>🌿</div>
            <div style={{fontSize:'.5rem',fontWeight:700}}>PRATAPPUR-7, N.P.</div>
          </div>

          <div style={{textAlign:'center'}}>
            <span style={{fontFamily:"'Great Vibes',cursive",fontSize:'2rem',color:'#0F172A',display:'block'}}>{cert.issuedBy.split(',')[0]}</span>
            <div style={{borderTop:'1px solid #0F172A',paddingTop:'4px',marginTop:'2px',fontSize:'.82rem',color:'#0F172A',fontWeight:600}}>{cert.issuedBy.split(',').slice(1).join(',').trim()||'Managing Director'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
