import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import ServicesSection from '../components/sections/ServicesSection';

export default function ServicesPage(){
  return(
    <Layout title="Services — WhizTest Pvt Ltd" description="Website development, mobile apps, UI/UX design, custom software, SEO, testing & QA, API development, and website maintenance.">
      <PageHeader eyebrow="SERVICES" title="Everything You Need to" accent="Succeed Online" subtitle="From idea to launch and beyond — we cover every digital touchpoint your business needs to grow."/>
      <ServicesSection showHeading={false}/>
    </Layout>
  );
}
