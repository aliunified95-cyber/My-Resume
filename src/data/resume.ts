/**
 * ============================================================================
 *  RÉSUMÉ CONTENT — the only file you need to edit to update the website.
 * ============================================================================
 *
 *  • Anything in [square brackets] is a placeholder. Replace it with your own
 *    words (and drop the brackets). While `site.highlightPlaceholders` is true,
 *    placeholders are underlined on the page so you can spot any you missed.
 *  • The journey is shown in the order of `journeyOrder` (bottom of the file).
 *  • To add a future job: add an entry to `experience`, pick a `scene`
 *    (any SceneKey — e.g. 'network' or 'team'), then add its id to
 *    `journeyOrder` before 'aim'.
 *  • Images go in /public/images and are referenced as "images/file.webp".
 *  • Your CV goes in /public/cv and is referenced in `personalDetails.cvFile`.
 *
 *  Nothing here is sent anywhere — but everything here is public once deployed,
 *  so only add contact details you are happy to publish.
 */
import type {
  ContactLinks,
  CurrentFocus,
  FutureGoal,
  JourneyStage,
  PersonalDetails,
  Project,
  SiteMeta,
  SkillGroup,
} from './types';

export const site: SiteMeta = {
  siteUrl: '',
  highlightPlaceholders: true,
};

export const personalDetails: PersonalDetails = {
  fullName: '[FULL NAME]',
  initials: '[—]',
  currentTitle: 'eShop, Logistics & Activation Team Leader',
  location: '[CITY, COUNTRY]',
  positioningStatement:
    'From frontline retail to digital commerce, treasury, logistics, and team leadership.',
  summary:
    '[PROFESSIONAL SUMMARY — two or three sentences on who you are, what you lead today, and the value you bring to a team and a business.]',
  cvFile: '',
  // photo: { src: 'images/profile.webp', alt: '[FULL NAME], portrait', kind: 'image', width: 800, height: 1000 },
};

export const contactLinks: ContactLinks = {
  email: '[EMAIL]',
  linkedIn: '[LINKEDIN URL]',
  phone: '',
  formEndpoint: '',
};

/* ---------------------------------------------------------------------------
 * Education
 * ------------------------------------------------------------------------- */
export const education: JourneyStage[] = [
  {
    id: 'school',
    kind: 'education',
    scene: 'school',
    title: 'School',
    shortTitle: 'School',
    organization: '[School name]',
    location: '[City, Country]',
    start: '[Start year]',
    end: '[End year]',
    description:
      'Where the foundations were laid: [Add a sentence on your focus subjects, leadership roles or activities].',
    achievements: [
      '[Add an achievement — e.g. final grade, award or distinction]',
      '[Add a responsibility — e.g. class representative, club or team role]',
    ],
    skills: ['Discipline', 'Communication', 'Teamwork'],
  },
  {
    id: 'university',
    kind: 'education',
    scene: 'university',
    title: '[Degree — e.g. Bachelor of …]',
    shortTitle: 'University',
    organization: '[University name]',
    location: '[City, Country]',
    start: '[Start year]',
    end: '[Graduation year]',
    description:
      '[Add your field of study and a sentence on what it gave you — e.g. analytical grounding in business, finance or management].',
    achievements: [
      '[Add graduation result or honours]',
      '[Add a thesis, project or society role]',
      '[Add a certification earned alongside your degree]',
    ],
    skills: ['Analytical thinking', 'Research', 'Business fundamentals'],
    // media: { src: 'images/certificate.webp', alt: 'University degree certificate', kind: 'certificate', width: 1200, height: 850 },
  },
  {
    id: 'masters',
    kind: 'education',
    scene: 'academic',
    title: 'Master’s Student',
    shortTitle: 'Master’s Student',
    organization: '[University name] — [Program name]',
    location: '[City, Country]',
    start: '[Start year]',
    end: 'Present',
    ongoing: true,
    description:
      'Studying alongside a full leadership role to deepen strategic, analytical and management capability. [Add program focus].',
    achievements: [
      '[Add current modules or specialisation]',
      '[Add research topic or capstone project]',
      '[Add how the program is applied to your current role]',
    ],
    skills: ['Strategic thinking', 'Research methods', 'Time management'],
  },
];

/* ---------------------------------------------------------------------------
 * Experience — in chronological order (display order is set by journeyOrder)
 * ------------------------------------------------------------------------- */
export const experience: JourneyStage[] = [
  {
    id: 'store-manager',
    kind: 'experience',
    scene: 'store',
    title: 'Store Manager',
    organization: '[Company name]',
    location: '[City, Country]',
    start: '[Start month year]',
    end: '[End month year]',
    description:
      'Responsible for day-to-day store operations, the customer experience on the shop floor and the people who delivered it. [Add store format and scope].',
    achievements: [
      '[Add team size] — [Add how you led, scheduled or developed the team]',
      '[Add sales growth or target attainment]',
      '[Add process improvement — e.g. stock accuracy, shrinkage, opening routines]',
    ],
    skills: ['Store operations', 'People management', 'Inventory control', 'Customer service'],
    results: [{ value: '[+00%]', label: '[Add a measurable result]' }],
  },
  {
    id: 'financial-advisor-trainee',
    kind: 'experience',
    scene: 'finance',
    title: 'Financial Advisor Trainee',
    shortTitle: 'Financial Advisor Trainee',
    organization: '[Bank or firm name]',
    location: '[City, Country]',
    start: '[Start month year]',
    end: '[End month year]',
    description:
      'Trained in financial products, client needs analysis and compliant advice in a regulated environment. [Add product areas].',
    achievements: [
      '[Add training program or certification completed]',
      '[Add client portfolio or advice activity]',
    ],
    skills: ['Financial products', 'Needs analysis', 'Compliance', 'Client relationships'],
  },
  {
    id: 'retail-agent',
    kind: 'experience',
    scene: 'telecom',
    title: 'Retail Agent',
    organization: '[Telecom company name]',
    location: '[City, Country]',
    start: '[Start month year]',
    end: '[End month year]',
    description:
      'Front-line sales and service in a telecom retail branch — advising customers on plans and devices and resolving service requests. [Add detail].',
    achievements: [
      '[Add sales result — e.g. monthly target attainment]',
      '[Add customer satisfaction result]',
      '[Add recognition — e.g. top performer, mentoring new agents]',
    ],
    skills: ['Consultative selling', 'Telecom products', 'Customer experience'],
  },
  {
    id: 'digital-sales-agent',
    kind: 'experience',
    scene: 'digital',
    title: 'Digital Sales Agent',
    organization: '[Company name]',
    location: '[City, Country]',
    start: '[Start month year]',
    end: '[End month year]',
    description:
      'Moved from the counter to digital channels, converting online and remote customer demand into completed sales. [Add channels — chat, web, phone].',
    achievements: [
      '[Add conversion rate or digital sales result]',
      '[Add response-time or quality result]',
      '[Add process improvement]',
    ],
    skills: ['Digital sales', 'CRM', 'Online customer journeys'],
  },
  {
    id: 'treasury-specialist',
    kind: 'experience',
    scene: 'treasury',
    title: 'Treasury Specialist',
    organization: '[Company name]',
    location: '[City, Country]',
    start: '[Start month year]',
    end: '[End month year]',
    description:
      'Handled treasury operations — [Add scope: cash management, payments, reconciliations, reporting] — with accuracy and control.',
    achievements: [
      '[Add volume managed or reconciliation accuracy]',
      '[Add reporting or control improvement]',
    ],
    skills: ['Cash management', 'Reconciliation', 'Financial reporting', 'Controls'],
  },
  {
    id: 'retail-team-leader',
    kind: 'experience',
    scene: 'team',
    title: 'Retail Team Leader',
    organization: '[Company name]',
    location: '[City, Country]',
    start: '[Start month year]',
    end: '[End month year]',
    description:
      'Led a retail team to its targets through coaching, clear routines and hands-on floor leadership. [Add detail].',
    achievements: [
      '[Add team size] — [Add coaching or development outcome]',
      '[Add sales growth or KPI result]',
      '[Add customer satisfaction result]',
    ],
    skills: ['Team leadership', 'Coaching', 'Performance management', 'KPI tracking'],
    results: [{ value: '[00]', label: '[Add team size]' }],
  },
  {
    id: 'eshop-team-leader',
    kind: 'experience',
    scene: 'eshop',
    title: 'eShop Team Leader',
    organization: '[Company name]',
    location: '[City, Country]',
    start: '[Start month year]',
    end: '[End month year]',
    description:
      'Took ownership of the online store’s daily performance and the team behind it — from order handling to customer contact. [Add detail].',
    achievements: [
      '[Add online sales growth]',
      '[Add order-processing or SLA improvement]',
      '[Add process improvement]',
    ],
    skills: ['eCommerce operations', 'Order management', 'Team leadership', 'Reporting'],
  },
  {
    id: 'eshop-logistics-activation-lead',
    kind: 'experience',
    scene: 'network',
    title: 'eShop, Logistics & Activation Team Leader',
    shortTitle: 'eShop, Logistics & Activation',
    organization: '[Company name]',
    location: '[City, Country]',
    start: '[Start month year]',
    end: 'Present',
    ongoing: true,
    description:
      'Leading the connected journey from online order to fulfilment, delivery and service activation — one team, one customer experience. [Add scope].',
    achievements: [
      '[Add team size] across eShop, logistics and activation',
      '[Add delivery or activation lead-time improvement]',
      '[Add customer satisfaction result]',
      '[Add process improvement or system rollout]',
    ],
    skills: ['Logistics', 'Order fulfilment', 'Service activation', 'Cross-functional leadership'],
    results: [
      { value: '[00]', label: '[Add team size]' },
      { value: '[−00%]', label: '[Add lead-time improvement]' },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * Aim & future goal — also used as the final stage of the journey
 * ------------------------------------------------------------------------- */
export const futureGoal: FutureGoal = {
  aim: 'My aim is to combine commercial leadership, digital commerce, financial understanding, and operational excellence to build customer experiences and teams that scale.',
  longTermGoal: '[Add your long-term goal — e.g. the leadership role, scope or kind of organisation you are working towards]',
  impact: '[Add the impact you want to create — for customers, teams or the business]',
  opportunities: [
    '[Add an opportunity type — e.g. eCommerce or omnichannel leadership]',
    '[Add an opportunity type — e.g. operations and fulfilment management]',
    '[Add an opportunity type — e.g. commercial or digital transformation roles]',
  ],
  closingLine: 'If you are building something that needs this mix of skills, I would like to hear about it.',
};

const aimStage: JourneyStage = {
  id: 'aim',
  kind: 'goal',
  scene: 'horizon',
  title: 'Aim & Future Goal',
  organization: 'What comes next',
  location: '',
  start: 'Next',
  end: '',
  description: futureGoal.aim,
  achievements: [futureGoal.longTermGoal, futureGoal.impact],
  skills: ['Commercial leadership', 'Digital commerce', 'Operational excellence'],
};

/**
 * The order of the journey. Change the order or add new ids here.
 * Every id must exist in `education`, `experience` or be 'aim'.
 */
export const journeyOrder: string[] = [
  'school',
  'university',
  'store-manager',
  'financial-advisor-trainee',
  'retail-agent',
  'digital-sales-agent',
  'treasury-specialist',
  'retail-team-leader',
  'eshop-team-leader',
  'eshop-logistics-activation-lead',
  'masters',
  'aim',
];

export const currentFocus: CurrentFocus = {
  heading: 'Now',
  stageIds: ['eshop-logistics-activation-lead', 'masters'],
  focusAreas: [
    'Connecting eShop, logistics and activation into one customer journey',
    'Building a team that scales with demand',
    'Applying Master’s-level thinking to day-to-day operations',
  ],
};

/* ---------------------------------------------------------------------------
 * Selected projects
 * ------------------------------------------------------------------------- */
export const projects: Project[] = [
  {
    id: 'project-fulfilment',
    title: '[Add project name] — Order-to-delivery flow',
    role: '[Your role — e.g. Project lead]',
    challenge: '[Describe the business challenge — e.g. orders waiting too long between purchase and dispatch]',
    actions: [
      '[Add an action you took]',
      '[Add an action you took]',
      '[Add an action you took]',
    ],
    tools: ['[Tool or system]', '[Skill]', '[Skill]'],
    result: '[Add a measurable result]',
    stageId: 'eshop-logistics-activation-lead',
    // image: { src: 'images/project-fulfilment.webp', alt: '…', kind: 'image', width: 1600, height: 1000 },
    // caseStudyUrl: 'https://…',
  },
  {
    id: 'project-eshop',
    title: '[Add project name] — eShop performance',
    role: '[Your role]',
    challenge: '[Describe the business challenge — e.g. online conversion or customer contact volume]',
    actions: ['[Add an action you took]', '[Add an action you took]'],
    tools: ['[Tool or system]', '[Skill]'],
    result: '[Add sales growth]',
    stageId: 'eshop-team-leader',
  },
  {
    id: 'project-team',
    title: '[Add project name] — Team development',
    role: '[Your role]',
    challenge: '[Describe the business challenge — e.g. onboarding time or performance consistency]',
    actions: ['[Add an action you took]', '[Add an action you took]'],
    tools: ['[Skill]', '[Skill]'],
    result: '[Add customer satisfaction result]',
    stageId: 'retail-team-leader',
  },
];

/* ---------------------------------------------------------------------------
 * Skill groups — each linked to the stages where it was developed or applied.
 * Edit `developedIn` to match your real experience.
 * ------------------------------------------------------------------------- */
export const skillGroups: SkillGroup[] = [
  {
    id: 'leadership',
    title: 'Leadership & team management',
    skills: ['Team leadership', 'Coaching', 'Scheduling', 'Performance reviews'],
    developedIn: ['store-manager', 'retail-team-leader', 'eshop-team-leader', 'eshop-logistics-activation-lead'],
  },
  {
    id: 'ecommerce',
    title: 'eCommerce & digital sales',
    skills: ['Online sales', 'Digital customer journeys', 'eShop operations'],
    developedIn: ['digital-sales-agent', 'eshop-team-leader', 'eshop-logistics-activation-lead'],
  },
  {
    id: 'retail-ops',
    title: 'Retail operations',
    skills: ['Store operations', 'Inventory control', 'Visual standards'],
    developedIn: ['store-manager', 'retail-agent', 'retail-team-leader'],
  },
  {
    id: 'logistics',
    title: 'Logistics & order fulfilment',
    skills: ['Order management', 'Fulfilment flow', 'Delivery coordination'],
    developedIn: ['eshop-team-leader', 'eshop-logistics-activation-lead'],
  },
  {
    id: 'customer-experience',
    title: 'Customer experience',
    skills: ['Service recovery', 'Needs analysis', 'Customer satisfaction'],
    developedIn: ['store-manager', 'financial-advisor-trainee', 'retail-agent', 'digital-sales-agent', 'eshop-logistics-activation-lead'],
  },
  {
    id: 'activation',
    title: 'Activation & service delivery',
    skills: ['Service activation', 'Telecom products', 'SLA follow-up'],
    developedIn: ['retail-agent', 'eshop-logistics-activation-lead'],
  },
  {
    id: 'treasury',
    title: 'Treasury & financial operations',
    skills: ['Cash management', 'Reconciliation', 'Financial controls'],
    developedIn: ['financial-advisor-trainee', 'treasury-specialist'],
  },
  {
    id: 'sales',
    title: 'Sales performance',
    skills: ['Consultative selling', 'Target management', 'Upselling'],
    developedIn: ['store-manager', 'retail-agent', 'digital-sales-agent', 'retail-team-leader'],
  },
  {
    id: 'process',
    title: 'Process improvement',
    skills: ['Workflow design', 'Standard routines', 'Root-cause analysis'],
    developedIn: ['store-manager', 'treasury-specialist', 'eshop-team-leader', 'eshop-logistics-activation-lead'],
  },
  {
    id: 'reporting',
    title: 'Reporting & data analysis',
    skills: ['KPI dashboards', 'Financial reporting', 'Spreadsheet analysis'],
    developedIn: ['treasury-specialist', 'retail-team-leader', 'eshop-team-leader', 'masters'],
  },
  {
    id: 'stakeholders',
    title: 'Stakeholder communication',
    skills: ['Cross-team coordination', 'Escalation handling', 'Presenting results'],
    developedIn: ['financial-advisor-trainee', 'treasury-specialist', 'eshop-logistics-activation-lead'],
  },
  {
    id: 'development',
    title: 'Academic & professional development',
    skills: ['Research methods', 'Strategic thinking', 'Continuous learning'],
    developedIn: ['school', 'university', 'financial-advisor-trainee', 'masters'],
  },
];

/* ---------------------------------------------------------------------------
 * Derived data — no need to edit below this line.
 * ------------------------------------------------------------------------- */
const allStages: JourneyStage[] = [...education, ...experience, aimStage];

export const journey: JourneyStage[] = journeyOrder.map((id) => {
  const stage = allStages.find((s) => s.id === id);
  if (!stage) throw new Error(`journeyOrder contains unknown id "${id}"`);
  return stage;
});

export function stageById(id: string): JourneyStage | undefined {
  return allStages.find((s) => s.id === id);
}
