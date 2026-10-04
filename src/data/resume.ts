/**
 * Content organised from Files/Ali_CV_Photo.pdf. Dates, metrics and contribution
 * wording follow the CV. Challenges and career direction are editorial summaries.
 * Early roles overlap. No school details or certification dates were supplied.
 */
import type {
  ContactLinks, CurrentFocus, FutureGoal, JourneyStage, PersonalDetails,
  Media, Project, SiteMeta, SkillGroup,
} from './types';

const img = (name: string) => `images/journey/${name}.svg`;
const brand = (name: string) => `images/brands/${name}`;
const photo = (name: string, alt: string, width: number, height: number): Media => ({
  src: `images/photos/${name}`, alt, width, height, kind: 'image',
});

// Shared local images: replace these paths to use your own project photography.
export const photographs = {
  university: photo('uob-campus.jpg', 'University of Bahrain campus with Bahraini flags', 2560, 1920),
  arden: photo('arden-hq.jpg', 'Arden University headquarters in Coventry', 1200, 800),
  zain: photo('zain-hq.png', 'Zain Bahrain headquarters', 500, 289),
  commerce: photo('commerce.jpg', 'Illustrative photograph of an analytics dashboard on a laptop', 1000, 712),
  phone: photo('phone.jpg', 'Illustrative photograph of a smartphone beside a laptop', 1000, 1000),
  team: photo('team.jpg', 'Illustrative photograph of a team collaborating around laptops', 1000, 1499),
  retail: photo('retail.jpg', 'Illustrative photograph of a customer paying at a retail counter', 1000, 667),
  logistics: photo('logistics.jpg', 'Illustrative photograph of warehouse fulfilment operations', 1000, 667),
};
export const site: SiteMeta = { siteUrl: '', highlightPlaceholders: false };

export const personalDetails: PersonalDetails = {
  fullName: 'Ali Isa Mohsen', initials: 'AM',
  currentTitle: 'Digital Sales, Logistics & Activation Team Leader', location: 'Bahrain',
  positioningStatement: 'Digital Sales, E-Commerce & Commercial Operations Leader',
  summary: 'Digital sales and commercial operations leader with 7+ years of progressive experience across telecommunications, e-commerce, omnichannel sales, retail operations, digital transformation, customer experience and project delivery. Led teams of up to 19 employees and delivered 40+ digital sales and transformation initiatives, increasing successful digital sales orders by 30%+ and reducing sales errors, including high-risk errors, by approximately 90%. Experienced in end-to-end digital sales, conversational commerce, logistics, activation, fulfilment, product launches, process automation, vendor coordination and analytics. Led high-volume flagship device launches with same-day delivery on release and zero customer complaints. Currently pursuing an MSc in Project Management.',
  cvFile: 'cv/Ali_CV_Photo.pdf',
  photo: { src: 'images/ali-isa-mohsen.png', alt: 'Ali Isa Mohsen', kind: 'image', width: 420, height: 525 },
};
export const contactLinks: ContactLinks = {
  email: 'ali3essa95@gmail.com', linkedIn: 'https://www.linkedin.com/in/aliimohsen',
  phone: '+973 6663 6766', formEndpoint: '',
};

/** Career-wide evidence; figures are not additive or separate project totals. */
export const businessImpact = [
  { value: '30%+', label: 'Increase in successful digital sales orders', detail: 'Through process optimisation, automation and customer-journey improvements.' },
  { value: 'Approx. 90%', label: 'Reduction in sales errors', detail: 'Including high-risk errors, through workflow redesign, automation, standardisation and stronger operational controls.' },
  { value: '40+', label: 'Initiatives led and delivered', detail: 'Across digital sales, e-commerce, conversational commerce, activation, fulfilment and customer journeys.' },
  { value: 'Same-day', label: 'iPhone delivery on release', detail: 'High-volume preorder launch operations delivered with zero customer complaints.' },
  { value: 'Approx. 160%', label: 'Increase in store revenue', detail: 'At Twisted Vapor, through stronger sales execution, operational management and customer engagement.' },
];

/** Oldest first. The printable view reverses this order. */
export const education: JourneyStage[] = [
  {
    id: 'university', kind: 'education',
    visual: { src: brand('uob-logo.png'), alt: 'University of Bahrain logo', kind: 'logo', backdrop: photographs.university, caption: 'University of Bahrain · Sakhir campus', extras: [img('graduation-cap'), img('books')] },
    title: 'Bachelor’s Degree in Banking & Finance', shortTitle: 'Banking & Finance',
    organization: 'University of Bahrain', location: 'Bahrain', start: '2016', end: '2021',
    description: 'Bachelor’s degree in Banking & Finance with a minor in Marketing.',
    achievements: ['Completed a bachelor’s degree in Banking & Finance.', 'Studied Marketing as a minor alongside the finance degree.'],
    skills: ['Banking & finance', 'Marketing'],
  },
  {
    id: 'masters', kind: 'education',
    visual: { src: brand('arden-logo.svg'), alt: 'Arden University logo', kind: 'logo', backdrop: photographs.arden, caption: 'Arden University · Coventry headquarters', extras: [img('book-open-text'), img('lightbulb')] },
    title: 'MSc Project Management', shortTitle: 'MSc Project Management',
    organization: 'Arden University', location: '', start: 'Oct 2026', end: 'Expected Oct 2027', ongoing: true,
    description: 'Pursuing an MSc in Project Management alongside commercial and digital operations leadership.',
    achievements: ['Studying MSc Project Management at Arden University.', 'Expected completion: October 2027.'],
    skills: ['Project management'],
  },
];

/** Ordered by start date; early roles overlap exactly as recorded in the CV. */
export const experience: JourneyStage[] = [
  {
    id: 'store-manager', kind: 'experience',
    visual: { src: photographs.retail.src, alt: photographs.retail.alt, kind: 'photo', caption: 'Retail operations · Illustrative photography', extras: [img('shopping-bag'), img('receipt')] },
    title: 'Store Manager', organization: 'Twisted Vapor', location: 'Bahrain', start: 'Jun 2018', end: 'May 2019',
    description: 'Managed end-to-end store operations, combining commercial performance with staff supervision, inventory availability and customer service.',
    achievements: ['Increased store revenue by approximately 160% through stronger sales execution, operational management and customer engagement.', 'Managed sales targets, cash controls, inventory, suppliers and merchandising.', 'Supervised staff, managed employee performance and maintained day-to-day commercial operations.'],
    skills: ['Retail operations', 'Sales performance', 'People management', 'Inventory control', 'Customer service'],
    results: [{ value: 'Approx. 160%', label: 'Increase in store revenue' }],
  },
  {
    id: 'financial-products-promoter', kind: 'experience',
    visual: { src: brand('bahrain-credit-logo.png'), alt: 'Bahrain Credit logo', kind: 'logo', backdrop: photographs.retail, caption: 'Customer engagement · Illustrative photography', extras: [img('coins'), img('handshake')] },
    title: 'Promoter', shortTitle: 'Financial Products Promoter', organization: 'Bahrain Credit', location: 'Bahrain', start: 'Sep 2018', end: 'Jan 2019',
    description: 'Promoted financial products through direct customer engagement, events and promotional booths.',
    achievements: ['Generated leads and explained financial products to prospective customers.', 'Collected prospect information and supported lead qualification and sales conversion.'],
    skills: ['Lead generation', 'Financial products', 'Customer engagement', 'Sales conversion'],
  },
  {
    id: 'financial-advisor-trainee', kind: 'experience',
    visual: { src: brand('bahrain-credit-logo.png'), alt: 'Bahrain Credit logo', kind: 'logo', backdrop: photographs.commerce, caption: 'Financial services · Illustrative photography', extras: [img('bank'), img('coins')] },
    title: 'Financial Services Advisor Trainee (Part-Time)', shortTitle: 'Financial Services Trainee', organization: 'Bahrain Credit', location: 'Bahrain', start: 'Jan 2019', end: 'May 2019',
    description: 'Provided customer financial consultations and supported loan and finance applications from initial enquiry through documentation.',
    achievements: ['Reviewed customer documents and eligibility requirements and explained appropriate financial products.', 'Supported sales conversion while maintaining customer-service and application-processing standards.'],
    skills: ['Financial consultations', 'Loan applications', 'Document review', 'Eligibility checks', 'Customer service'],
  },
  {
    id: 'retail-agent', kind: 'experience',
    visual: { src: brand('zain-logo.svg'), alt: 'Zain logo', kind: 'logo', backdrop: photographs.zain, caption: 'Zain Bahrain · Headquarters', extras: [img('device-mobile'), img('sim-card')] },
    title: 'Retail Sales Representative', shortTitle: 'Retail Sales', organization: 'Zain Bahrain', location: 'Bahrain', start: 'Feb 2019', end: 'Mar 2020',
    description: 'Delivered frontline telecommunications sales and service while maintaining monthly sales performance and daily branch operations.',
    achievements: ['Consistently achieved monthly sales targets throughout the role.', 'Managed product and service sales, customer enquiries, upselling, activations and complaint resolution.', 'Handled cash transactions, stock activities and daily retail operational requirements.'],
    skills: ['Telecom sales', 'Upselling', 'Service activation', 'Customer service', 'Cash handling'],
  },
  {
    id: 'digital-sales-agent', kind: 'experience',
    visual: { src: brand('zain-logo.svg'), alt: 'Zain logo', kind: 'logo', backdrop: photographs.phone, caption: 'Digital channels · Illustrative photography', extras: [img('cursor-click'), img('credit-card')] },
    title: 'Digital Sales Channels Agent', shortTitle: 'Digital Sales', organization: 'Zain Bahrain', location: 'Bahrain', start: 'Mar 2020', end: 'Feb 2021',
    description: 'Managed digital sales and customer interactions across eShop, WhatsApp/chat and online channels against defined sales targets.',
    achievements: ['Processed end-to-end digital orders, supporting product selection, purchasing, activation and fulfilment.', 'Resolved digital-order issues and identified upselling opportunities while maintaining customer-service standards.', 'Built hands-on expertise in e-commerce operations and digital customer journeys before progressing into leadership.'],
    skills: ['Digital sales', 'E-commerce operations', 'Order management', 'Conversational commerce', 'Customer journeys'],
  },
  {
    id: 'treasury-specialist', kind: 'experience',
    visual: { src: brand('zain-logo.svg'), alt: 'Zain logo', kind: 'logo', backdrop: photographs.commerce, caption: 'Financial operations · Illustrative photography', extras: [img('chart-line-up'), img('coins')] },
    title: 'Treasury Accountant', organization: 'Zain Bahrain', location: 'Bahrain', start: 'Feb 2021', end: 'Jan 2022',
    description: 'Supported retail financial controls through transaction reconciliation, ERP processing and cash-collection coordination.',
    achievements: ['Reconciled daily retail shop-closing transactions and maintained accurate financial records.', 'Processed transactional data through ERP systems and monitored cash inflows and outflows.', 'Coordinated with the external cash-collection partner, tracked collections and supported discrepancy resolution.'],
    skills: ['Reconciliation', 'ERP', 'Cash monitoring', 'Financial controls', 'Partner coordination'],
  },
  {
    id: 'retail-team-leader', kind: 'experience',
    visual: { src: brand('zain-logo.svg'), alt: 'Zain logo', kind: 'logo', backdrop: photographs.team, caption: 'Team leadership · Illustrative photography', extras: [img('users-three'), img('star')] },
    title: 'Retail Team Leader', organization: 'Zain Bahrain', location: 'Bahrain', start: 'Jan 2022', end: 'Feb 2022',
    description: 'Led a 7-member retail team, managing branch operations, sales targets, customer experience and daily operational performance.',
    achievements: ['Coached employees against sales and service KPIs to support performance improvement and target achievement.', 'Managed stock, visual merchandising, operational reporting and customer issue resolution.', 'Trained and onboarded new agents across products, systems, sales processes and customer-service standards.'],
    skills: ['Team leadership', 'Coaching', 'KPI management', 'Retail operations', 'Onboarding'],
    results: [{ value: '7', label: 'Retail team members' }],
  },
  {
    id: 'eshop-team-leader', kind: 'experience',
    visual: { src: brand('zain-logo.svg'), alt: 'Zain logo', kind: 'logo', backdrop: photographs.commerce, caption: 'E-commerce & analytics · Illustrative photography', extras: [img('shopping-cart'), img('globe-hemisphere-west')] },
    title: 'eShop & Digital Sales Channels Leader', shortTitle: 'eShop & Digital Sales', organization: 'Zain Bahrain', location: 'Bahrain', start: 'Feb 2022', end: 'Aug 2025',
    description: 'Led a 10-member digital sales team across eShop, WhatsApp and other digital channels, owning sales performance and customer journeys.',
    achievements: [
      'Increased successful digital sales orders by 30%+ through process optimisation, automation and journey improvements.',
      'Reduced sales errors, including high-risk errors, by approximately 90%.',
      'Helped reduce end-to-end digital order turnaround time by approximately 90%.',
      'Delivered digital journeys and automation across WhatsApp, eShop, identity verification, payments and activation.',
    ],
    details: [
      'Led a 10-member digital sales team and managed sales performance across eShop, WhatsApp and other digital customer channels.',
      'Increased successful digital sales orders by 30%+ through process optimisation, automation and customer-journey improvements.',
      'Reduced sales errors, including high-risk errors, by approximately 90% through process redesign, workflow standardisation, automation and enhanced operational controls.',
      'Managed digital sales targets, channel operations, customer journeys, order management, vendor coordination, campaign execution and performance reporting.',
      'Led development and optimisation of digital sales journeys including eShop, WhatsApp, live chat, remote eKYC, payment, eSignature, document upload and activation.',
      'Delivered transformation initiatives including WhatsApp sales-channel development and automation, chatbot implementation, activation automation, automated credit-control eligibility checks and unified pricing visibility.',
      'Helped reduce end-to-end digital order turnaround time by approximately 90%.',
      'Developed and improved Arabic eShop journeys, simplified 5-click ordering, fast-delivery processes and integrations supporting more efficient fulfilment.',
      'Built operational processes, reporting frameworks, dashboards and performance-tracking mechanisms to improve visibility and decision-making.',
      'Coordinated extensively with technology, commercial, finance, logistics, customer-experience and external vendor teams to deliver digital sales improvements.',
    ],
    skills: ['Digital sales strategy', 'E-commerce operations', 'Digital transformation', 'Process automation', 'Vendor management', 'Sales analytics'],
    results: [{ value: '30%+', label: 'Increase in successful digital sales orders' }, { value: 'Approx. 90%', label: 'Fewer sales errors' }, { value: '10', label: 'Digital sales team members' }],
  },
  {
    id: 'eshop-logistics-activation-lead', kind: 'experience',
    visual: { src: brand('zain-logo.svg'), alt: 'Zain logo', kind: 'logo', backdrop: photographs.logistics, caption: 'Fulfilment & delivery · Illustrative photography', extras: [img('truck'), img('package')] },
    title: 'Digital Sales, Logistics & Activation Team Leader', shortTitle: 'Digital Sales, Logistics & Activation', organization: 'Zain Bahrain', location: 'Bahrain', start: 'Aug 2025', end: 'Present', ongoing: true,
    description: 'Lead 19 employees across Digital Sales, Logistics and Activation, owning the customer order journey from digital sale to delivery.',
    achievements: [
      'Own eShop and WhatsApp sales, stock allocation, activation, fulfilment and delivery.',
      'Drive digitalisation, operational accuracy and customer-experience improvements.',
      'Coordinate major device launches, high-demand campaigns, vendors and delivery partners.',
      'Lead training and performance management while monitoring service levels and resolving bottlenecks.',
    ],
    details: [
      'Lead three units — Digital Sales, Logistics and Activation — with a combined team of 19, after taking on Logistics and Activation in addition to continued ownership of digital sales.',
      'Own the full digital order journey end to end — from eShop and WhatsApp sales through stock allocation, activation, fulfilment and delivery — including sales targets and channel performance.',
      'Drive process improvement and digitalisation initiatives to improve operational efficiency, order accuracy, turnaround time and customer experience.',
      'Manage stock allocation and operational readiness for major device launches and high-demand sales campaigns, coordinating internal teams, vendors and delivery partners.',
      'Monitor operational performance, service levels and reporting while resolving process bottlenecks and supporting data-driven decision-making.',
      'Lead employee onboarding, training, workload allocation and performance management while maintaining service and operational standards.',
      'Coordinate cross-functionally with Digital Sales, Retail, IT, Finance, Supply Chain and external partners to support seamless order execution and fulfilment.',
    ],
    skills: ['Commercial operations', 'Cross-functional leadership', 'Logistics & activation', 'Order fulfilment', 'Product launch management', 'Performance management'],
    results: [{ value: '19', label: 'Employees across three units' }, { value: '3', label: 'Units: Digital Sales, Logistics & Activation' }],
  },
];

/** Synthesised from the CV's professional focus; no new target role is claimed. */
export const futureGoal: FutureGoal = {
  aim: 'Combine digital sales, commercial operations and project delivery to simplify customer journeys and improve business performance.',
  longTermGoal: 'Continue developing leadership across digital transformation, e-commerce and commercial operations, supported by an MSc in Project Management.',
  impact: 'Build effective teams, improve order accuracy and turnaround time, and create reliable customer experiences from purchase through delivery and activation.',
  opportunities: ['Digital sales and e-commerce leadership', 'Commercial operations and omnichannel sales', 'Digital transformation and project delivery'],
  closingLine: 'Let’s talk about improving digital sales, delivering transformation projects and building stronger customer journeys.',
};
const aimStage: JourneyStage = {
  id: 'aim', kind: 'goal',
  visual: { src: photographs.team.src, alt: photographs.team.alt, kind: 'photo', caption: 'Building what comes next · Illustrative photography', extras: [img('compass'), img('sparkle')] },
  title: 'Aim & Future Goal', organization: 'What comes next', location: '', start: 'Next', end: '',
  description: futureGoal.aim, achievements: [futureGoal.longTermGoal, futureGoal.impact],
  skills: ['Digital transformation', 'Commercial leadership', 'Project delivery'],
};
export const journeyOrder: string[] = [
  'university', 'store-manager', 'financial-products-promoter', 'financial-advisor-trainee',
  'retail-agent', 'digital-sales-agent', 'treasury-specialist', 'retail-team-leader',
  'eshop-team-leader', 'eshop-logistics-activation-lead', 'masters', 'aim',
];
export const currentFocus: CurrentFocus = {
  heading: 'Now', stageIds: ['eshop-logistics-activation-lead', 'masters'],
  focusAreas: ['Leading 19 employees across Digital Sales, Logistics and Activation', 'Improving the full customer journey from digital order to delivery and activation', 'Pursuing an MSc in Project Management at Arden University'],
};

/** All eight CV project areas. Qualitative outcomes remain qualitative. */
export const projects: Project[] = [
  {
    id: 'digital-sales-transformation', title: 'Digital Sales Journey Transformation', role: 'Initiative lead',
    challenge: 'Simplify customer journeys across digital sales and operational channels while improving conversion and processing time.',
    actions: ['Led initiatives across eShop, app, WhatsApp, live chat, logistics and activation.', 'Connected customer-journey improvements with process optimisation and automation.'],
    tools: ['Omnichannel sales', 'Customer journey optimisation', 'Cross-functional project delivery'],
    result: 'Increased successful digital sales orders by 30%+ through the wider programme of process, automation and journey improvements.', stageId: 'eshop-team-leader', image: photographs.commerce,
  },
  {
    id: 'whatsapp-sales-automation', title: 'WhatsApp Sales & Automation', role: 'Channel development lead',
    challenge: 'Develop conversational sales and customer-support workflows through WhatsApp.',
    actions: ['Built and developed the Sales WhatsApp channel.', 'Introduced automation and chatbot capabilities.'],
    tools: ['WhatsApp Business API', 'Conversational commerce', 'Chatbots', 'Workflow automation'],
    result: 'Improved conversational sales and customer-support workflows.', stageId: 'eshop-team-leader', image: photographs.phone,
  },
  {
    id: 'project-fulfilment', title: 'End-to-End Order Journey Optimisation', role: 'Cross-functional improvement contributor',
    challenge: 'Reduce the time between a digital order and completed fulfilment.',
    actions: ['Helped redesign end-to-end order processes.', 'Combined automation with cross-functional operational improvements.'],
    tools: ['Process redesign', 'Automation', 'Order management', 'Fulfilment'],
    result: 'Helped reduce end-to-end digital order turnaround time by approximately 90%.', stageId: 'eshop-team-leader', image: photographs.logistics,
  },
  {
    id: 'digital-identity-remote-sales', title: 'Digital Identity & Remote Sales', role: 'Digital ordering contributor and journey developer',
    challenge: 'Support remote customer journeys from identity verification through activation.',
    actions: ['Supported NHIR/eKYC-enabled digital ordering.', 'Developed journeys incorporating identity verification, payments, eSignature, document upload and activation.'],
    tools: ['NHIR/eKYC', 'Digital payments', 'eSignature', 'Document upload', 'Service activation'],
    result: 'Developed remote customer journeys incorporating the required verification and sales steps.', stageId: 'eshop-team-leader', image: photographs.phone,
  },
  {
    id: 'sales-automation-controls', title: 'Sales Process Automation & Controls', role: 'Implementation lead',
    challenge: 'Reduce sales errors, including high-risk errors, and strengthen operational controls.',
    actions: ['Implemented activation automation and automated credit-control eligibility checks.', 'Introduced unified pricing visibility and stronger workflow controls.'],
    tools: ['Activation automation', 'Eligibility checks', 'Workflow standardisation', 'Operational controls'],
    result: 'Contributed to approximately 90% fewer sales errors.', stageId: 'eshop-team-leader', image: photographs.commerce,
  },
  {
    id: 'project-eshop', title: 'E-Commerce Customer Journey Improvement', role: 'Customer journey development lead',
    challenge: 'Improve eShop conversion, accessibility and customer experience.',
    actions: ['Developed simplified 5-click eShop ordering.', 'Developed Arabic eShop journeys and other digital-channel improvements.'],
    tools: ['E-commerce platforms', 'Customer journey design', 'Arabic digital journeys'],
    result: 'Simplified ordering to 5 clicks and developed Arabic customer journeys.', stageId: 'eshop-team-leader', image: photographs.retail,
  },
  {
    id: 'iphone-launch-operations', title: 'iPhone Launch Operations (2021–Present)', role: 'Operational planning and execution lead across successive roles',
    challenge: 'Deliver high-volume annual iPhone preorders and release-day fulfilment.',
    actions: ['Led preorder planning, stock allocation, staffing, event setup and customer communication.', 'Coordinated payment collection, logistics, delivery and launch reporting.'],
    tools: ['Product launch management', 'Stock allocation', 'Logistics', 'Partner coordination', 'Reporting'],
    result: 'Delivered high-volume preorder launches with fast order handling, same-day delivery on release and zero customer complaints.', stageId: 'eshop-logistics-activation-lead', image: photographs.phone,
  },
  {
    id: 'digital-sales-operating-model', title: 'Digital Sales Operating Model', role: 'Operating process development lead',
    challenge: 'Standardise the processes and workflows connecting digital sales with operational delivery.',
    actions: ['Developed and standardised digital sales processes, documentation and workflows.', 'Covered sales, fulfilment, logistics, activation, customer handling and performance management.'],
    tools: ['Process documentation', 'Workflow design', 'Performance management', 'Commercial operations'],
    result: 'Established standardised operating processes across the digital sales journey.', stageId: 'eshop-team-leader', image: photographs.team,
  },
];

export const skillGroups: SkillGroup[] = [
  { id: 'leadership', title: 'Team leadership & performance', skills: ['Team leadership', 'Coaching', 'Onboarding & training', 'Workload allocation', 'Performance management'], developedIn: ['store-manager', 'retail-team-leader', 'eshop-team-leader', 'eshop-logistics-activation-lead'] },
  { id: 'digital-sales', title: 'Digital sales & e-commerce', skills: ['Digital sales strategy', 'E-commerce operations', 'Conversational commerce', 'Omnichannel sales', 'Sales performance'], developedIn: ['digital-sales-agent', 'eshop-team-leader', 'eshop-logistics-activation-lead'] },
  { id: 'transformation', title: 'Digital transformation & project delivery', skills: ['Digital transformation', 'Project delivery', 'Process improvement & automation', 'Workflow standardisation', 'Business process re-engineering'], developedIn: ['eshop-team-leader', 'eshop-logistics-activation-lead', 'masters'] },
  { id: 'customer-experience', title: 'Customer journeys & experience', skills: ['Customer journey optimisation', 'Customer experience', 'Complaint resolution', 'Remote sales journeys', 'Arabic eShop journeys'], developedIn: ['financial-advisor-trainee', 'retail-agent', 'digital-sales-agent', 'eshop-team-leader', 'eshop-logistics-activation-lead'] },
  { id: 'logistics', title: 'Order fulfilment, logistics & activation', skills: ['Order management', 'Fulfilment', 'Logistics & activation', 'Stock allocation', 'Service-level monitoring'], developedIn: ['digital-sales-agent', 'eshop-team-leader', 'eshop-logistics-activation-lead'] },
  { id: 'commercial', title: 'Commercial & retail operations', skills: ['Commercial operations', 'Retail operations', 'Inventory management', 'Visual merchandising', 'Campaign execution', 'Product launch management'], developedIn: ['store-manager', 'retail-agent', 'retail-team-leader', 'eshop-team-leader', 'eshop-logistics-activation-lead'] },
  { id: 'analytics', title: 'Analytics & performance reporting', skills: ['KPI management', 'Performance reporting', 'Sales analytics', 'Reporting dashboards', 'Data-driven decision-making', 'CRM & ERP'], developedIn: ['treasury-specialist', 'retail-team-leader', 'eshop-team-leader', 'eshop-logistics-activation-lead'] },
  { id: 'finance', title: 'Finance & operational controls', skills: ['Financial products', 'Loan applications', 'Reconciliation', 'Cash controls', 'Eligibility checks', 'Sales error reduction'], developedIn: ['university', 'financial-products-promoter', 'financial-advisor-trainee', 'treasury-specialist', 'eshop-team-leader'] },
  { id: 'partners', title: 'Vendors & cross-functional delivery', skills: ['Vendor management', 'Cross-functional collaboration', 'Delivery partner coordination', 'Stakeholder communication'], developedIn: ['store-manager', 'treasury-specialist', 'eshop-team-leader', 'eshop-logistics-activation-lead'] },
];

/** Tool familiarity from the CV; no proficiency ratings are inferred. */
export const technology = [
  { id: 'data', title: 'Data & Analytics', skills: ['Power BI', 'Tableau', 'Microsoft Excel', 'Reporting Dashboards', 'Sales Analytics'] },
  { id: 'systems', title: 'Business Systems', skills: ['ERP', 'CRM', 'E-Commerce Platforms', 'WhatsApp Business API'] },
  { id: 'productivity', title: 'Project & Productivity', skills: ['Microsoft Project', 'Microsoft 365', 'PowerPoint', 'Google Workspace'] },
  { id: 'ai', title: 'AI & Automation', skills: ['Microsoft Copilot', 'ChatGPT', 'Claude', 'Gemini', 'AI-assisted workflow and productivity tools'] },
];
/** No dates or issuer were supplied for the Key Account Management Program. */
export const certifications = [
  { name: 'Business Process Re-engineering', issuer: 'Jafcon' },
  { name: 'Certified Inbound Marketing', issuer: 'HubSpot Academy' },
  { name: 'Huawei Certified ICT Associate – Artificial Intelligence', issuer: 'Huawei' },
  { name: 'Key Account Management Program', issuer: '' },
];
export const languages = [
  { name: 'Arabic', proficiency: 'Native' },
  { name: 'English', proficiency: 'Professional proficiency' },
];

const allStages: JourneyStage[] = [...education, ...experience, aimStage];
export const journey: JourneyStage[] = journeyOrder.map((id) => {
  const stage = allStages.find((s) => s.id === id);
  if (!stage) throw new Error(`journeyOrder contains unknown id "${id}"`);
  return stage;
});
export function stageById(id: string): JourneyStage | undefined {
  return allStages.find((s) => s.id === id);
}
