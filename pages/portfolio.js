import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import PortfolioSection from '../components/sections/PortfolioSection';

export default function PortfolioPage(){
  return(
    <Layout title="Portfolio — WhizTest Pvt Ltd" description="Real products we've shipped and launched — websites, mobile apps, e-commerce platforms, and more.">
      <PageHeader eyebrow="PORTFOLIO" title="Projects We're" accent="Proud Of" subtitle="Real products, shipped and live — click a card to visit the site."/>
      <PortfolioSection showHeading={false}/>
    </Layout>
  );
}
