import { useState } from 'react';
import { useSite } from '../SiteContext';
import { FAQS } from '../../lib/data';

export default function FaqSection(){
  const [openFaq,setOpenFaq]=useState(null);
  const {sec,wrap,sh,ht,BG,CARD,BD,T1,T2,ACC}=useSite();
  return(
    <section id="faq" style={sec(BG)}>
      <div style={wrap}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={sh()}>FAQ</div>
          <h2 style={{...ht,textAlign:'center'}}>Common <span style={{color:ACC}}>Questions</span></h2>
        </div>
        <div style={{maxWidth:'760px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'10px'}}>
          {FAQS.map((f,i)=>(
            <div key={i} style={{background:CARD,borderRadius:'16px',border:`1px solid ${BD}`,overflow:'hidden',transition:'box-shadow .2s'}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'18px 22px',background:'transparent',border:'none',cursor:'pointer',color:T1,fontWeight:700,fontSize:'.95rem',textAlign:'left',fontFamily:"'Plus Jakarta Sans',sans-serif",gap:'12px'}}>
                <span>{f.q}</span>
                <span style={{color:ACC,flexShrink:0,fontSize:'1.1rem',transition:'transform .3s',transform:openFaq===i?'rotate(45deg)':'rotate(0)'}}>{openFaq===i?'−':'+'}</span>
              </button>
              {openFaq===i&&(
                <div style={{padding:'0 22px 18px',color:T2,fontSize:'.9rem',lineHeight:1.72,borderTop:`1px solid ${BD}`,paddingTop:'14px',animation:'fadeIn .2s ease'}}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
