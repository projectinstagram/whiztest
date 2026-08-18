import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import LegalContent from '../components/LegalContent';

const SECTIONS=[
  {
    heading:'1. Overview',
    body:"WhizTest Pvt Ltd (\"WhizTest\", \"we\", \"us\") operates whiztest.in and this website. This Privacy Policy explains what information we collect when you use our site, why we collect it, and how it's handled.",
  },
  {
    heading:'2. Information We Collect',
    body:'We collect information in a few limited ways:',
    list:[
      'Contact form — your name, email, phone number, service of interest, and project message, submitted when you fill out our contact form.',
      'Live chat conversations — messages you send to Whiz, our AI assistant, and (if you request a human agent) your email address and the conversation shared with our support team.',
      'Standard hosting logs — basic technical data such as IP address, browser type, and pages visited, collected automatically by our hosting provider for security and performance purposes.',
    ],
  },
  {
    heading:'3. How We Use Your Information',
    body:'We use the information you provide to respond to your inquiries, prepare quotes, deliver our services, and improve this website. We do not sell your personal information, and we do not use it for advertising or marketing to third parties.',
  },
  {
    heading:'4. AI Chat & Third-Party Processing',
    body:[
      'Our live chat assistant, Whiz, is powered by NVIDIA\'s Nemotron AI model. When you chat with Whiz, your messages are sent to NVIDIA\'s API to generate a response. Please avoid sharing sensitive personal information (passwords, financial details, etc.) in the chat.',
      'If you ask to speak with a human agent, the relevant part of your conversation — and your email address if you provide one — is forwarded to our internal support team via Telegram so a team member can respond to you directly inside the chat widget.',
    ],
  },
  {
    heading:'5. Local Storage (not cookies)',
    body:'This site does not use tracking cookies. It uses your browser\'s local storage only to remember your dark/light theme preference and to keep an in-progress chat conversation available for up to 10 minutes if you close the chat window or navigate between pages. You can clear this at any time by clearing your browser\'s site data.',
  },
  {
    heading:'6. Data Sharing',
    body:'We share information only with the service providers needed to run this site and respond to you: NVIDIA (AI chat processing), Telegram (routing chat conversations to our support team), and our hosting provider. We do not sell, rent, or trade your personal information to anyone else.',
  },
  {
    heading:'7. Data Retention',
    body:'We retain contact form submissions and chat handoff records for as long as reasonably necessary to respond to your inquiry and maintain business records, after which they are deleted or anonymised.',
  },
  {
    heading:'8. Your Rights',
    body:'You may request access to, correction of, or deletion of your personal information at any time by emailing us at support.whiztest@gmail.com. We will respond within a reasonable timeframe.',
  },
  {
    heading:'9. Security',
    body:'We take reasonable technical measures to protect the information you share with us, including transmitting data over encrypted (HTTPS) connections. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    heading:"10. Children's Privacy",
    body:'This website and our services are intended for businesses and individuals capable of entering into a contract. We do not knowingly collect information from children under 13.',
  },
  {
    heading:'11. Changes to This Policy',
    body:'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.',
  },
  {
    heading:'12. Contact Us',
    body:'Questions about this Privacy Policy? Reach us at support.whiztest@gmail.com, WhatsApp +977 9866697309, or Pratappur-7, Suryapura, Nawalparasi -33008, Nepal.',
  },
];

export default function PrivacyPolicyPage(){
  return(
    <Layout title="Privacy Policy — WhizTest Pvt Ltd" description="How WhizTest Pvt Ltd collects, uses, and protects your information.">
      <PageHeader eyebrow="LEGAL" title="Privacy" accent="Policy" subtitle="How we collect, use, and protect your information."/>
      <LegalContent sections={SECTIONS} updated="17 August 2026"/>
    </Layout>
  );
}
