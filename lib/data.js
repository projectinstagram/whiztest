// ─────────────────────────────────────────────
// SHARED SITE DATA — used across pages/components
// ─────────────────────────────────────────────
export const SERVICES = [
  {
    id:'web-dev', icon:'🌐', title:'Website Development',
    shortDesc:'Custom, blazing-fast websites built with React, Next.js, and WordPress — designed to convert visitors into customers.',
    features:['React & Next.js','WordPress CMS','E-Commerce','SEO Optimised'],
    gradient:'linear-gradient(135deg,#2563EB,#38BDF8)', bgAccent:'#2563EB',
    overview:'We build websites that look stunning AND drive measurable business results — from landing pages to complex web applications.',
    problems:['Low website traffic','Poor mobile experience','Slow loading speeds','Low conversion rates'],
    tech:['React.js','Next.js','WordPress','Webflow','HTML5/CSS3','JavaScript'],
    deliverables:['Fully responsive design','SEO setup','Performance optimisation','CMS integration','3 months support'],
    timeline:'2–4 weeks',
  },
  {
    id:'mobile-app', icon:'📱', title:'Mobile App Development',
    shortDesc:'Native-quality iOS & Android apps built with React Native and Flutter. One codebase, two platforms, full performance.',
    features:['React Native','Flutter','iOS & Android','Push Notifications'],
    gradient:'linear-gradient(135deg,#7C3AED,#A78BFA)', bgAccent:'#7C3AED',
    overview:'We develop cross-platform mobile apps that deliver native performance and beautiful UX — from MVPs to enterprise solutions.',
    problems:['No mobile presence','Losing mobile users','Need offline capability','App store visibility'],
    tech:['React Native','Flutter','Firebase','Redux','REST APIs','App Store/Play Store'],
    deliverables:['iOS & Android apps','App store submission','Analytics integration','Push notifications','3 months support'],
    timeline:'6–12 weeks',
  },
  {
    id:'ui-ux', icon:'🎨', title:'UI/UX Design',
    shortDesc:'Research-driven design that converts. We create interfaces users love through wireframes, prototypes, and A/B testing.',
    features:['Figma Prototypes','User Research','Design Systems','A/B Testing'],
    gradient:'linear-gradient(135deg,#DB2777,#F472B6)', bgAccent:'#DB2777',
    overview:'Our design process starts with user research and ends with tested, conversion-optimised interfaces that delight users.',
    problems:['High bounce rates','Poor user engagement','Brand inconsistency','Complex user flows'],
    tech:['Figma','Adobe XD','Miro','Zeplin','Hotjar','Google Analytics'],
    deliverables:['User research report','Wireframes','Interactive prototype','Design system','Handoff files'],
    timeline:'1–3 weeks',
  },
  {
    id:'software', icon:'⚙️', title:'Custom Software',
    shortDesc:'Scalable SaaS platforms, ERPs, CRMs, and automation tools tailored to your business workflows and growth needs.',
    features:['SaaS Platforms','ERP & CRM','Automation','API Integration'],
    gradient:'linear-gradient(135deg,#059669,#34D399)', bgAccent:'#059669',
    overview:'From internal tools to customer-facing platforms, we build software that scales with your business and eliminates repetitive work.',
    problems:['Manual repetitive tasks','Disconnected systems','No automation','Scaling limits'],
    tech:['Node.js','Python','Django','PostgreSQL','Redis','Docker'],
    deliverables:['Custom software','Admin dashboard','API documentation','User training','6 months support'],
    timeline:'8–16 weeks',
  },
  {
    id:'seo', icon:'📈', title:'SEO & Digital Marketing',
    shortDesc:'Data-driven SEO strategies that get you to page one on Google. Technical SEO, content strategy, and link building.',
    features:['Technical SEO','Content Strategy','Google Rankings','Analytics'],
    gradient:'linear-gradient(135deg,#D97706,#FCD34D)', bgAccent:'#D97706',
    overview:'We help businesses grow organically with proven SEO strategies, content marketing, and data-driven optimisations.',
    problems:['Low Google rankings','No organic traffic','Poor content strategy','Losing to competitors'],
    tech:['Google Analytics','Search Console','SEMrush','Ahrefs','Screaming Frog'],
    deliverables:['SEO audit','Keyword strategy','Monthly reports','Content calendar','Backlink building'],
    timeline:'Ongoing (3+ months)',
  },
  {
    id:'testing', icon:'🧪', title:'Testing & QA',
    shortDesc:'Comprehensive testing — manual, automated, performance, and security — to ensure your software ships bug-free.',
    features:['Automated Testing','Performance Tests','Security Audits','Bug Reports'],
    gradient:'linear-gradient(135deg,#0891B2,#22D3EE)', bgAccent:'#0891B2',
    overview:'Our QA engineers find bugs before your users do. We implement testing frameworks that prevent regressions and ensure quality.',
    problems:['Frequent production bugs','No test coverage','Slow regression testing','Security vulnerabilities'],
    tech:['Selenium','Cypress','Jest','Playwright','OWASP','JMeter'],
    deliverables:['Test strategy','Automated test suite','Bug report','Performance report','Security audit'],
    timeline:'2–4 weeks',
  },
  {
    id:'api', icon:'🔗', title:'API & Backend Dev',
    shortDesc:'Robust REST APIs, GraphQL endpoints, and microservices that handle millions of requests reliably and securely.',
    features:['REST & GraphQL','Microservices','Cloud Native','Serverless'],
    gradient:'linear-gradient(135deg,#7C3AED,#2563EB)', bgAccent:'#4F46E5',
    overview:'We design and build APIs that are fast, secure, and scalable — from simple REST endpoints to complex microservices.',
    problems:['Slow API responses','No documentation','Security vulnerabilities','Scaling issues'],
    tech:['Node.js','Express','GraphQL','PostgreSQL','Redis','AWS Lambda'],
    deliverables:['API endpoints','Swagger docs','Auth system','Rate limiting','Monitoring setup'],
    timeline:'3–6 weeks',
  },
  {
    id:'maintenance', icon:'🛡️', title:'Website Maintenance',
    shortDesc:'Keep your website secure, fast, and up-to-date with managed maintenance plans. Monthly performance reports included.',
    features:['Security Updates','Performance Tuning','Content Updates','Uptime Monitoring'],
    gradient:'linear-gradient(135deg,#374151,#6B7280)', bgAccent:'#374151',
    overview:"Your website is your 24/7 salesperson. We keep it secure, fast, and current so you can focus on your business.",
    problems:['Security vulnerabilities','Slow performance','Outdated content','Downtime issues'],
    tech:['WordPress','Cloudflare','Google PageSpeed','Uptime monitoring','cPanel'],
    deliverables:['Monthly maintenance','Security scans','Performance report','Content updates','Priority support'],
    timeline:'Ongoing (monthly)',
  },
];

export const STATS=[
  {value:10,suffix:'+',label:'Projects Delivered'},
  {value:99,suffix:'%',label:'Client Satisfaction'},
  {value:24,suffix:'/7',label:'Support Available'},
  {value:5,suffix:'★',label:'Average Rating'},
];

export const WHY_CHOOSE=[
  {icon:'💰',title:'Affordable Pricing',desc:'Premium quality without premium price tags. Great software should be accessible to every business.'},
  {icon:'✅',title:'Quality Guaranteed',desc:'Every project goes through rigorous QA. We never ship until it meets our high standards.'},
  {icon:'🚀',title:'Modern Technology',desc:'We use the latest frameworks and best practices — no outdated tech, ever.'},
  {icon:'🔍',title:'Transparent Process',desc:'Real-time updates, clear communication, and detailed progress reports every step of the way.'},
  {icon:'⏱️',title:'On-Time Delivery',desc:'95% of our projects are delivered on or before the deadline. Your time is money.'},
  {icon:'💬',title:'24/7 Support',desc:'Dedicated support via WhatsApp, email, and phone. We are always here when you need us.'},
];

export const TECHNOLOGIES={
  Frontend:['React.js','Next.js','Vue.js','Angular','TypeScript','Tailwind CSS','Three.js'],
  Backend:['Node.js','Python','Django','Laravel','Express.js','FastAPI','GraphQL'],
  Mobile:['React Native','Flutter','Swift','Kotlin','Expo','Firebase'],
  Database:['PostgreSQL','MongoDB','Redis','MySQL','Supabase','Prisma'],
  DevOps:['AWS','Google Cloud','Docker','Kubernetes','Vercel','CI/CD','Nginx'],
};
export const TECH_CAT_ICONS={Frontend:'🎨',Backend:'⚙️',Mobile:'📱',Database:'🗄️',DevOps:'☁️'};
export const TECH_CAT_COLORS={Frontend:'#2563EB',Backend:'#7C3AED',Mobile:'#DB2777',Database:'#059669',DevOps:'#0891B2'};

export const PROCESS=[
  {step:'01',title:'Discover',desc:'Deep dive into your business goals, target audience, and technical requirements.'},
  {step:'02',title:'Strategy',desc:'Define the architecture, tech stack, timeline, and measurable success metrics.'},
  {step:'03',title:'Design',desc:'Create wireframes, prototypes, and visual designs for your approval before a single line of code.'},
  {step:'04',title:'Develop',desc:'Agile development sprints with bi-weekly demos, changelogs, and feedback loops.'},
  {step:'05',title:'Test',desc:'Comprehensive QA: functionality, performance, security, and accessibility across devices.'},
  {step:'06',title:'Launch',desc:'Smooth deployment, DNS setup, uptime monitoring, and go-live support.'},
  {step:'07',title:'Support',desc:'Ongoing maintenance, updates, and growth support post-launch. We are here for the long run.'},
];

// Ordered: custom-domain sites first, then Vercel-hosted, then everything else
// (marked `ongoing:true` since those don't have a live site to point to yet).
export const PORTFOLIO=[
  // ── Custom domain ──
  {id:7,title:'EntranceLab',cat:'Websites',desc:'Exam prep platform with 6,900+ questions and mock tests for IOE Engineering & CEE Medical entrance exams.',colors:['#DC2626','#FCA5A5'],emoji:'🎓',link:'https://www.entrancelab.in.net/'},
  {id:8,title:'Biratnagar Resale',cat:'E-commerce',desc:'Local marketplace for buying and selling electronics, vehicles, furniture, and more in Biratnagar.',colors:['#65A30D','#BEF264'],emoji:'♻️',link:'https://resalebrt.com/'},
  // ── Vercel-hosted ──
  {id:10,title:'YouTube Automation',cat:'Software',desc:'Automation dashboard for streamlining YouTube Shorts creation and publishing workflows.',colors:['#B91C1C','#FB923C'],emoji:'🎬',link:'https://youtube-automation-nu-six.vercel.app/'},
  {id:11,title:'Duo',cat:'Apps',desc:'Relationship-matching app with match discovery, in-app chat, and location-based browsing.',colors:['#E11D48','#FDA4AF'],emoji:'💞',link:'https://duonepal.vercel.app/'},
  // ── Remaining ──
  {id:1,title:'HealthTrack Pro',cat:'Apps',desc:'React Native health monitoring app with real-time vitals and AI insights.',colors:['#2563EB','#38BDF8'],emoji:'💊',ongoing:true},
  {id:2,title:'EduLearn LMS',cat:'Websites',desc:'Next.js learning platform with video streaming, quizzes, and certificates.',colors:['#7C3AED','#A78BFA'],emoji:'📚',ongoing:true},
  {id:3,title:'ShopEase Commerce',cat:'E-commerce',desc:'Full-stack e-commerce with payment gateway and inventory management.',colors:['#059669','#34D399'],emoji:'🛒',ongoing:true},
  {id:4,title:'FinDash Analytics',cat:'Software',desc:'Real-time financial dashboard with D3 charts and ML-powered predictions.',colors:['#D97706','#FCD34D'],emoji:'📊',ongoing:true},
  {id:5,title:'BrandFlow Agency',cat:'Design',desc:'Complete brand identity, design system, and website for creative agency.',colors:['#DB2777','#F472B6'],emoji:'🎨',ongoing:true},
  {id:6,title:'LogiTrack Shipping',cat:'Software',desc:'Automated logistics platform with GPS tracking and route optimisation.',colors:['#0891B2','#22D3EE'],emoji:'🚚',ongoing:true},
  {id:9,title:'Kitchen Flavorist',cat:'Apps',desc:'Recipe discovery app with step-by-step cooking guides and meal inspiration for home cooks.',colors:['#EA580C','#FDBA74'],emoji:'🍳',link:'https://play.google.com/store/apps/details?id=com.kitchenrecipes.flavorist',ongoing:true},
];

// Hero 3D scene data
export const HERO_TECH=[
  {emoji:'⚛️',label:'React / Next.js',glow:'#38BDF8'},
  {emoji:'📱',label:'Flutter / React Native',glow:'#818CF8'},
  {emoji:'☁️',label:'AWS / GCP',glow:'#22D3EE'},
  {emoji:'🎨',label:'UI/UX Design',glow:'#A78BFA'},
  {emoji:'🔒',label:'Security & QA',glow:'#60A5FA'},
];
// Each label keeps to its own vertical "lane" (baseY) with a small oscillation
// (radiusY) so orbits never cross paths and stack on top of each other.
export const HERO_ORBITS=[
  {radiusX:150,radiusY:22,tilt:20,speed:0.42,dir:1,baseY:-180},
  {radiusX:172,radiusY:24,tilt:-18,speed:0.34,dir:-1,baseY:95},
  {radiusX:134,radiusY:20,tilt:26,speed:0.4,dir:1,baseY:-30},
  {radiusX:182,radiusY:24,tilt:-24,speed:0.3,dir:-1,baseY:165},
  {radiusX:160,radiusY:22,tilt:16,speed:0.37,dir:1,baseY:-115},
];
export const CODE_SYMBOLS=['{ }','</>','01','*','#'];

export const TESTIMONIALS=[
  {name:'Rahul Sharma',role:'CEO, TechStartup India',rating:5,text:'WhizTest Pvt Ltd delivered our platform 2 weeks early. Quality was outstanding and communication was excellent throughout. Will definitely work with them again!',avatar:'RS'},
  {name:'Priya Patel',role:'Founder, StyleHub',rating:5,text:'Our e-commerce conversion rate went up 40% after WhizTest Pvt Ltd redesigned our website. They understood our brand perfectly and executed flawlessly.',avatar:'PP'},
  {name:'Ahmed Khan',role:'CTO, FinTech Startup',rating:5,text:'Exceptional testing and QA work. They found critical security vulnerabilities we had missed. Our app launch was completely bug-free.',avatar:'AK'},
  {name:'Sarah Johnson',role:'Marketing Director, GrowthCo',rating:5,text:'SEO results were incredible — first page Google rankings in just 3 months for our main keywords. The ROI has been amazing.',avatar:'SJ'},
  {name:'Vikram Nair',role:'Founder, EduPlatform',rating:5,text:'Built our entire LMS from scratch. The React Native app has 50K+ downloads. WhizTest Pvt Ltd truly exceeded every expectation we had.',avatar:'VN'},
];

export const PRICING=[
  {name:'Starter',price:'₹999',period:'/mo',desc:'Perfect for small businesses.',features:['1 Website','Basic SEO Setup','5 Pages','Mobile Responsive','Contact Form','1 Month Support','WhatsApp Support'],highlight:false,cta:'Get Started'},
  {name:'Business',price:'₹2,499',period:'/mo',desc:'Most popular for growing companies.',features:['Custom Website','Advanced SEO','Up to 15 Pages','CMS Integration','E-Commerce (50 products)','3 Months Support','Priority Support','Monthly Report'],highlight:true,cta:'Start Free Trial'},
  {name:'Professional',price:'₹4,999',period:'/mo',desc:'For established businesses ready to scale.',features:['Full Web Application','Mobile App (React Native)','Unlimited Pages','API Integration','E-Commerce (unlimited)','6 Months Support','24/7 Priority Support','Weekly Reports','Dedicated Manager'],highlight:false,cta:'Get Started'},
  {name:'Enterprise',price:'Custom',period:'',desc:'Tailored for large organisations.',features:['Custom Architecture','Multiple Systems','Dedicated Team','SLA Guarantee','Custom Integrations','12 Months Support','On-site Training','Daily Reports','Executive Dashboard'],highlight:false,cta:'Request Quote'},
];

export const FAQS=[
  {q:'How long does it take to build a website?',a:'A standard website takes 2–4 weeks. Complex web applications with custom features typically take 8–16 weeks. We always provide a clear timeline before starting.'},
  {q:'Do you work with international clients?',a:'Yes! We work with clients globally. Communication happens via Slack, Zoom, and email. We are comfortable with different time zones.'},
  {q:'What technologies do you specialise in?',a:'We specialise in React, Next.js, Node.js, Python, React Native, Flutter, and cloud platforms like AWS and GCP. We always choose the best tech for your specific needs.'},
  {q:'Do you provide post-launch support?',a:'Absolutely. Every project comes with at least 1 month of free support. We also offer ongoing maintenance plans starting at ₹999/month.'},
  {q:'How do you handle revisions and changes?',a:'We include unlimited revisions during the design phase and reasonable change requests during development. Major scope changes are discussed transparently.'},
  {q:'Is the source code owned by me?',a:'Yes, 100%. Once the project is paid in full, you own all code, designs, and assets. No strings attached.'},
  {q:'Can you redesign my existing website?',a:'Absolutely! We love redesign projects. We will audit your current site, identify improvements, and build something better — while preserving your SEO rankings.'},
  {q:"What's your payment structure?",a:'Typically 50% upfront and 50% on delivery for smaller projects. For larger projects, milestone-based payments. Flexible options are available.'},
  {q:'Do you sign NDAs?',a:'Yes, we are happy to sign NDAs. Your business ideas and confidential information are safe with us.'},
  {q:'How do I get started?',a:'Fill out our contact form or WhatsApp us. We will schedule a free discovery call and provide a detailed proposal within 24 hours.'},
];

export const NAV=[
  {label:'Services',href:'/services'},
  {label:'Portfolio',href:'/portfolio'},
  {label:'Testimonials',href:'/testimonials'},
  {label:'Pricing',href:'/pricing'},
  {label:'Careers',href:'/careers'},
];
export const NAV_ICONS={Services:'🛠️',Portfolio:'💼',Testimonials:'💬',Pricing:'💳',Careers:'📋'};

export const CAREERS=[
  {
    id:'flutter-dev-jr',
    title:'Flutter Developer',
    level:'Junior',
    type:'Full-Time',
    mode:'Hybrid',
    date:'2025-12-20T00:00:00',
    status:'closed',
    summary:"We're looking for an experienced Flutter Developer (Junior level) with a deep understanding of Bloc/GetX state management, who can write clean, maintainable code and is well-versed in GIT, RESTful APIs, and Firebase integration.",
    responsibilities:[
      'Build and maintain cross-platform mobile apps using Flutter',
      'Implement state management using Bloc or GetX',
      'Integrate REST APIs and Firebase services',
      'Write clean, maintainable, well-documented code',
      'Collaborate with designers and the backend team',
      'Debug and fix issues across iOS and Android',
    ],
    requirements:[
      '6 months–1.5 years of Flutter development experience',
      'Solid understanding of Dart and the Flutter widget lifecycle',
      'Experience with Bloc or GetX state management',
      'Familiarity with Git version control',
      'Basic understanding of RESTful APIs',
      "Bachelor's degree in CS or related field (or equivalent experience)",
    ],
  },
  {
    id:'nestjs-backend-dev-jr',
    title:'Junior Backend Developer (NestJS & GraphQL)',
    level:'Junior',
    type:'Full-Time',
    mode:'Hybrid',
    date:'2025-11-15T00:00:00',
    status:'closed',
    summary:'We are actively seeking a NestJS Developer (Junior level) with basic knowledge of building dynamic web applications. The ideal candidates must have 1.5 years+ of professional experience in backend development.',
    responsibilities:[
      'Design and build GraphQL APIs using NestJS',
      'Work with relational databases (PostgreSQL/MySQL)',
      'Write unit and integration tests',
      'Collaborate with the frontend team to define API contracts',
      'Optimise backend performance and troubleshoot issues',
    ],
    requirements:[
      '1.5+ years of professional backend development experience',
      'Hands-on experience with NestJS and/or GraphQL',
      'Knowledge of TypeScript and Node.js',
      'Familiarity with relational databases and ORMs (TypeORM/Prisma)',
      'Understanding of RESTful API design principles',
    ],
  },
];

// Issued internship/completion certificates — looked up by ID on /verify-certificate,
// the same way Coursera/LinkedIn Learning let anyone confirm a certificate is genuine.
export const CERTIFICATES=[
  {
    id:'WT-2026-2421',
    name:'Dinesh Gupta',
    role:'Full Stack Developer',
    type:'Internship',
    project:'EntranceLab.in.net',
    projectDesc:'an educational web platform developed under WhizTest Pvt Ltd',
    startDate:'2026-06-01',
    endDate:'2026-07-08',
    issuedBy:'Managing Director, WhizTest Pvt Ltd',
    // Real signed/stamped certificate image — falls back to the generated
    // design (see CertificateView) if this file isn't present.
    image:'/wt-2026-2421.png',
  },
];
