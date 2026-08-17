import { useSite } from '../SiteContext';
import { WHY_CHOOSE } from '../../lib/data';

export default function WhyChooseSection(){
  const {dark,sec,wrap,sh,ht,BG,CARD,BD,T1,T2}=useSite();
  return(
    <section id="why" style={sec(BG)}>
      <div style={wrap}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div style={sh()}>WHY WHIZTEST</div>
          <h2 style={{...ht,textAlign:'center'}}>What Sets Us <span style={{color:'#2563EB'}}>Apart</span></h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px'}}>
          {WHY_CHOOSE.map((w,i)=>(
            <div key={i} style={{padding:'28px',background:CARD,borderRadius:'20px',border:`1px solid ${BD}`,transition:'transform .2s,box-shadow .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=dark?'0 16px 40px rgba(37,99,235,.18)':'0 16px 40px rgba(37,99,235,.12)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}>
              <div style={{fontSize:'2rem',marginBottom:'14px'}}>{w.icon}</div>
              <h3 style={{fontWeight:700,fontSize:'1.05rem',color:T1,marginBottom:'8px'}}>{w.title}</h3>
              <p style={{color:T2,fontSize:'.875rem',lineHeight:1.7}}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
