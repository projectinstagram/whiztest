import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSite } from '../SiteContext';
import { CERTIFICATES } from '../../lib/data';
import CertificateDisplay from '../CertificateDisplay';

function formatDate(iso){
  return new Date(iso).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
}

export default function VerifyCertificateSection(){
  const router=useRouter();
  const [result,setResult]=useState(null); // null = no link opened yet, cert object = valid, false = invalid
  const [showCert,setShowCert]=useState(false);
  const {sec,wrap,CARD,BD,T1,T2,ACC,BG}=useSite();

  // The only way in is a direct link, e.g. /verify-certificate?id=WT-2026-2421 —
  // there's no on-page search, so nobody can browse or guess other certificates.
  useEffect(()=>{
    if(!router.isReady)return;
    const q=router.query.id;
    if(!q)return;
    const id=(Array.isArray(q)?q[0]:q).trim().toUpperCase();
    const found=CERTIFICATES.find(c=>c.id.toUpperCase()===id);
    setResult(found||false);
    setShowCert(!!found);
  },[router.isReady,router.query.id]);

  return(
    <section style={sec(BG)}>
      <div style={{...wrap,maxWidth:'640px'}}>
        {result===null&&(
          <p style={{color:T2,fontSize:'.88rem',lineHeight:1.7,textAlign:'center'}}>
            This page verifies a specific certificate using the private link provided with it. If you were given a verification link, open it directly — no certificate is shown without one.
          </p>
        )}

        {result===false&&(
          <div style={{padding:'28px',borderRadius:'18px',background:CARD,border:'1px solid rgba(239,68,68,.3)',textAlign:'center'}}>
            <div style={{fontSize:'2.4rem',marginBottom:'10px'}}>❌</div>
            <h3 style={{color:'#EF4444',fontWeight:800,fontSize:'1.05rem',marginBottom:'6px'}}>Certificate Not Found</h3>
            <p style={{color:T2,fontSize:'.88rem'}}>We couldn't find a certificate matching that ID. Double-check it and try again, or contact us if you believe this is an error.</p>
          </div>
        )}

        {result&&(
          <div style={{padding:'32px',borderRadius:'20px',background:CARD,border:'1px solid rgba(34,197,94,.35)',boxShadow:'0 20px 50px rgba(34,197,94,.1)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'22px',paddingBottom:'18px',borderBottom:`1px solid ${BD}`}}>
              <span style={{fontSize:'1.6rem'}}>✅</span>
              <div>
                <div style={{color:'#22C55E',fontWeight:800,fontSize:'.95rem'}}>Verified Certificate</div>
                <div style={{color:T2,fontSize:'.78rem'}}>Issued by WhizTest Pvt Ltd</div>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'18px'}}>
              {[
                ['Certificate ID',result.id],
                ['Recipient',result.name],
                ['Role',result.role],
                ['Type',result.type],
                ['Project',result.project],
                ['Duration',`${formatDate(result.startDate)} – ${formatDate(result.endDate)}`],
                ['Issued By',result.issuedBy],
              ].map(([label,val])=>(
                <div key={label}>
                  <div style={{color:T2,fontSize:'.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:'4px'}}>{label}</div>
                  <div style={{color:T1,fontWeight:700,fontSize:'.9rem'}}>{val}</div>
                </div>
              ))}
            </div>

            <p style={{color:T2,fontSize:'.82rem',lineHeight:1.7,marginTop:'22px',paddingTop:'18px',borderTop:`1px solid ${BD}`}}>
              {result.name} successfully completed their {result.type.toLowerCase()} as a {result.role} from {formatDate(result.startDate)} to {formatDate(result.endDate)}, contributing to {result.projectDesc}.
            </p>

            <button onClick={()=>setShowCert(p=>!p)}
              style={{marginTop:'20px',width:'100%',background:'transparent',border:`1.5px solid ${ACC}`,color:ACC,borderRadius:'12px',
                padding:'12px',fontWeight:700,fontSize:'.88rem',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
              {showCert?'Hide Certificate ▲':'🎓 View Certificate ▼'}
            </button>
          </div>
        )}
      </div>

      {result&&showCert&&(
        <div style={{...wrap,maxWidth:'880px',marginTop:'28px'}}>
          <CertificateDisplay cert={result}/>
          <div style={{textAlign:'center',marginTop:'20px'}}>
            <button onClick={()=>window.print()}
              style={{background:'linear-gradient(135deg,#2563EB,#4F46E5)',color:'#fff',border:'none',borderRadius:'12px',
                padding:'12px 28px',fontWeight:700,fontSize:'.88rem',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",
                boxShadow:'0 6px 18px rgba(37,99,235,.3)'}}>
              🖨️ Print / Save as PDF
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
