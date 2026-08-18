import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import CareersSection from '../components/sections/CareersSection';

export default function CareersPage(){
  return(
    <Layout title="Careers — WhizTest Pvt Ltd" description="Open positions at WhizTest Pvt Ltd — join our team building premium digital products.">
      <PageHeader eyebrow="CAREERS" title="Join the" accent="WhizTest Team" subtitle="Open positions at WhizTest Pvt Ltd — see something that fits?"/>
      <CareersSection showHeading={false}/>
    </Layout>
  );
}
