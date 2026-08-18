import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import LegalContent from '../components/LegalContent';

const SECTIONS=[
  {
    heading:'1. Acceptance of Terms',
    body:'By using this website or engaging WhizTest Pvt Ltd ("WhizTest", "we", "us") for any service, you agree to these Terms of Service. If you do not agree, please do not use this site or our services.',
  },
  {
    heading:'2. Services Provided',
    body:'WhizTest provides website development, mobile app development, UI/UX design, custom software, SEO & digital marketing, testing & QA, API & backend development, and website maintenance services. Specific project scope, deliverables, and timelines are agreed with each client individually before work begins.',
  },
  {
    heading:'3. Quotes, Payment & Project Terms',
    body:'Quotes provided through this website, our contact form, or our AI chat assistant are estimates and are not binding until confirmed in writing by a member of our team. Unless otherwise agreed, payment is typically 50% upfront and 50% on delivery for smaller projects, with milestone-based payments for larger projects. Flexible payment arrangements can be discussed on request.',
  },
  {
    heading:'4. Intellectual Property',
    body:'Once a project is paid in full, the client owns 100% of the resulting code, designs, and assets, unless a separate written agreement states otherwise. Until full payment is received, all deliverables remain the property of WhizTest Pvt Ltd.',
  },
  {
    heading:'5. Confidentiality',
    body:'We are happy to sign a mutual Non-Disclosure Agreement (NDA) on request. Your business ideas and confidential information shared with us during a project are treated as confidential and are not disclosed to third parties without your consent.',
  },
  {
    heading:'6. Client Responsibilities',
    body:'To keep your project on schedule, you agree to provide timely feedback, necessary content/assets, and access to any required accounts or systems. Delays in providing these may affect the agreed project timeline.',
  },
  {
    heading:'7. AI Chat Assistant Disclaimer',
    body:'Our website includes an AI assistant ("Whiz") that can answer general questions about our services and pricing. Responses from Whiz are provided for general informational purposes only, are not a substitute for a formal proposal from our team, and do not constitute a binding quote or contractual commitment.',
  },
  {
    heading:'8. Acceptable Use',
    body:'You agree not to misuse this website — including attempting to disrupt its operation, submitting false information through our forms, or using our chat assistant for unlawful purposes.',
  },
  {
    heading:'9. Warranty & Support',
    body:'Support periods vary by service (typically 1–6 months of post-launch support, as specified for each service) and are detailed in your project agreement. Beyond the included support period, ongoing maintenance is available through separate maintenance plans.',
  },
  {
    heading:'10. Limitation of Liability',
    body:'WhizTest Pvt Ltd will make every reasonable effort to deliver quality work, but we are not liable for indirect, incidental, or consequential damages arising from the use of our services or this website, to the fullest extent permitted by law.',
  },
  {
    heading:'11. Termination',
    body:'Either party may terminate an ongoing project engagement by written notice, subject to payment for work completed up to the termination date, as detailed in the specific project agreement.',
  },
  {
    heading:'12. Governing Law',
    body:'These Terms are governed by the laws of Nepal. Any disputes arising from these Terms or our services will be subject to the jurisdiction of the courts of Nepal.',
  },
  {
    heading:'13. Changes to These Terms',
    body:'We may update these Terms from time to time. Continued use of this website or our services after changes are posted constitutes acceptance of the updated Terms.',
  },
  {
    heading:'14. Contact Us',
    body:'Questions about these Terms? Reach us at support.whiztest@gmail.com, WhatsApp +977 9866697309, or Pratappur-7, Suryapura, Nawalparasi -33008, Nepal.',
  },
];

export default function TermsOfServicePage(){
  return(
    <Layout title="Terms of Service — WhizTest Pvt Ltd" description="The terms that govern your use of the WhizTest Pvt Ltd website and services.">
      <PageHeader eyebrow="LEGAL" title="Terms of" accent="Service" subtitle="The terms that govern your use of this website and our services."/>
      <LegalContent sections={SECTIONS} updated="17 August 2026"/>
    </Layout>
  );
}
