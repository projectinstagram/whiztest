import Layout from '../components/Layout';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import AboutSection from '../components/sections/AboutSection';
import WhyChooseSection from '../components/sections/WhyChooseSection';
import TechnologiesSection from '../components/sections/TechnologiesSection';
import FaqSection from '../components/sections/FaqSection';
import CtaSection from '../components/sections/CtaSection';

export default function HomePage(){
  return(
    <Layout>
      <HeroSection/>
      <StatsSection/>
      <AboutSection/>
      <WhyChooseSection/>
      <TechnologiesSection/>
      <FaqSection/>
      <CtaSection/>
    </Layout>
  );
}
