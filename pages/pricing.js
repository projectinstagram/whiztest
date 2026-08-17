import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import PricingSection from '../components/sections/PricingSection';

export default function PricingPage(){
  return(
    <Layout title="Pricing — WhizTest Pvt Ltd" description="Transparent, affordable pricing plans for websites, apps, and custom software. No hidden fees.">
      <PageHeader eyebrow="PRICING" title="Transparent," accent="Affordable Plans" subtitle="No hidden fees. No surprises. Just great work at honest prices."/>
      <PricingSection showHeading={false}/>
    </Layout>
  );
}
