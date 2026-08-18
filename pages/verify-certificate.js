import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import VerifyCertificateSection from '../components/sections/VerifyCertificateSection';

export default function VerifyCertificatePage(){
  return(
    <Layout title="Verify Certificate — WhizTest Pvt Ltd" description="Verify the authenticity of an internship or completion certificate issued by WhizTest Pvt Ltd.">
      <PageHeader eyebrow="VERIFICATION" title="Verify a" accent="Certificate" subtitle="Confirm the authenticity of an internship or completion certificate issued by WhizTest Pvt Ltd."/>
      <VerifyCertificateSection/>
    </Layout>
  );
}
