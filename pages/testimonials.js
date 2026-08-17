import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import TestimonialsSection from '../components/sections/TestimonialsSection';

export default function TestimonialsPage(){
  return(
    <Layout title="Testimonials — WhizTest Pvt Ltd" description="What our clients say about working with WhizTest Pvt Ltd.">
      <PageHeader eyebrow="TESTIMONIALS" title="What Our Clients" accent="Say"/>
      <TestimonialsSection showHeading={false}/>
    </Layout>
  );
}
