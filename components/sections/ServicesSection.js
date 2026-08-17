import { useSite } from '../SiteContext';
import { SERVICES } from '../../lib/data';
import ServiceCards3D from '../ServiceCards3D';

export default function ServicesSection({showHeading=true}){
  const {dark,sec,wrap,sh,ht,hs,BG,setModal}=useSite();
  return(
    <section id="services" style={sec(BG)}>
      <div style={wrap}>
        {showHeading&&(
          <div style={{textAlign:'center',marginBottom:'56px'}}>
            <div style={sh()}>SERVICES</div>
            <h2 style={{...ht,marginLeft:'auto',marginRight:'auto'}}>Everything You Need to<br/><span style={{background:'linear-gradient(135deg,#2563EB,#38BDF8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Succeed Online</span></h2>
            <p style={{...hs,margin:'0 auto'}}>From idea to launch and beyond — we cover every digital touchpoint your business needs to grow.</p>
          </div>
        )}
        <ServiceCards3D services={SERVICES} onOpenModal={setModal} dark={dark}/>
      </div>
    </section>
  );
}
