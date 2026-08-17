import { useSite } from '../SiteContext';
import { STATS } from '../../lib/data';
import { AnimatedNumber } from '../Small';

export default function StatsSection(){
  const {dark,T2,BD,wrap}=useSite();
  return(
    <section style={{padding:'56px 0',background:dark?'#0A1628':'#EBF1FF',borderTop:`1px solid ${BD}`,borderBottom:`1px solid ${BD}`}}>
      <div style={{...wrap,display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'24px'}}>
        {STATS.map(s=>(
          <div key={s.label} style={{textAlign:'center'}}>
            <div style={{fontSize:'2.6rem',fontWeight:800,background:'linear-gradient(135deg,#2563EB,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
              <AnimatedNumber value={s.value} suffix={s.suffix}/>
            </div>
            <div style={{color:T2,fontWeight:600,fontSize:'.875rem',marginTop:'4px'}}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
