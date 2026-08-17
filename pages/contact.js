import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/sections/ContactSection';

export default function ContactPage(){
  return(
    <Layout title="Contact — WhizTest Pvt Ltd" description="Get in touch with WhizTest Pvt Ltd — email, WhatsApp, or send us a message about your project.">
      <PageHeader eyebrow="CONTACT" title="Let's" accent="Work Together"/>
      <ContactSection showHeading={false}/>
    </Layout>
  );
}
