import type { ResumeData } from '../types/resume';

export const emptyPreset: ResumeData = {
    personalInfo: {
        name: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        github: '',
        linkedin: '',
        summary: '',
    },
    experiences: [],
    educations: [],
    projects: [],
    skills: [],
    certifications: [],
};

export const softwareEngineerPreset: ResumeData = {
    personalInfo: {
        name: 'Alex Rivera',
        title: 'Senior Full Stack Engineer',
        email: 'alex.rivera@dev.io',
        phone: '+1 (555) 382-9102',
        location: 'Austin, TX',
        website: 'alexrivera.dev',
        github: 'github.com/arivera-code',
        linkedin: 'linkedin.com/in/alex-rivera-dev',
        summary: 'Senior Software Engineer with 6+ years of experience specializing in building responsive React client interfaces and high-performance Node.js microservices. Deeply passionate about type safety, cloud scalability, and mentoring cross-functional product development teams.',
    },
    experiences: [
        {
            id: 'sw-exp-1',
            company: 'TechFlow Solutions',
            position: 'Lead Frontend Developer',
            startDate: 'Jan 2023',
            endDate: 'Present',
            current: true,
            description: 'Heading client-side platform engineering for a cloud-scale analytics dashboard serving 150k monthly active users.',
            bulletPoints: [
                'Rebuilt core rendering engine with React 18 concurrent features, reducing initial page response latency by 35%.',
                'Led transition from Javascript to TypeScript, decreasing runtime production crashes by 42% over 6 months.',
                'Supervised a team of 5 engineers, establishing CI/CD testing criteria that cut pull-request reviews from 4 days to 1.5 days.'
            ]
        },
        {
            id: 'sw-exp-2',
            company: 'StripeLine Corp',
            position: 'Software Engineer II',
            startDate: 'Mar 2020',
            endDate: 'Dec 2022',
            current: false,
            description: 'Owned billing and checkout product modules within the business ledger flow.',
            bulletPoints: [
                'Designed modular checkout widget using Web Components integrated by 50+ affiliate sites.',
                'Refactored legacy database access layers using Redis caches, improving read request times by 120ms.',
                'Collaborated in a Scrum unit to address high-tier security fixes, boosting unit test coverage to 92%.'
            ]
        }
    ],
    educations: [
        {
            id: 'sw-edu-1',
            school: 'University of Texas at Austin',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            startDate: 'Sep 2016',
            endDate: 'May 2020',
            score: '3.82 / 4.0'
        }
    ],
    projects: [
        {
            id: 'sw-proj-1',
            name: 'Serverless Realtime Chat',
            role: 'Creator & Lead Maintainer',
            description: 'A serverless chat engine with instantaneous message relays and active presence detection.',
            technologies: ['React', 'TypeScript', 'AWS Lambda', 'WebSockets', 'DynamoDB'],
            url: 'github.com/arivera/realtime-chat'
        },
        {
            id: 'sw-proj-2',
            name: 'Visual CSS Engine',
            role: 'Co-Author',
            description: 'Open-source browser extension to inspect, modify, and export visual CSS grids dynamically.',
            technologies: ['Javascript', 'Chrome APIs', 'Sass'],
            url: 'visualcss-engine.org'
        }
    ],
    skills: [
        { id: 'sw-sk-1', name: 'React.js', category: 'Frontend' },
        { id: 'sw-sk-2', name: 'TypeScript', category: 'Languages' },
        { id: 'sw-sk-3', name: 'Node.js', category: 'Backend' },
        { id: 'sw-sk-4', name: 'GraphQL', category: 'Backend' },
        { id: 'sw-sk-5', name: 'TailwindCSS', category: 'Frontend' },
        { id: 'sw-sk-6', name: 'PostgreSQL', category: 'Backend' },
        { id: 'sw-sk-7', name: 'Docker', category: 'DevOps & Tools' },
        { id: 'sw-sk-8', name: 'AWS Cloud', category: 'DevOps & Tools' },
        { id: 'sw-sk-9', name: 'GitHub Actions', category: 'DevOps & Tools' },
    ],
    certifications: [
        'AWS Certified Solutions Architect Associate (2024)',
        'Certified ScrumMaster (CSM) (2025)'
    ],
};

export const productManagerPreset: ResumeData = {
    personalInfo: {
        name: 'Sarah Chen',
        title: 'Senior Product Manager - Growth',
        email: 'sarah.chen@growthops.com',
        phone: '+1 (415) 837-2938',
        location: 'San Francisco, CA',
        website: 'sarahchenpm.com',
        github: '',
        linkedin: 'linkedin.com/in/sarah-chen-pm',
        summary: 'Growth-oriented Product Manager with 5+ years of experience directing software lifecycles in FinTech and E-commerce. Specialized in conversion optimizations, user research, data analytics, and leading agile teams to build customer-centric products.',
    },
    experiences: [
        {
            id: 'pm-exp-1',
            company: 'PaySmart',
            position: 'Senior Product Manager',
            startDate: 'Aug 2023',
            endDate: 'Present',
            current: true,
            description: 'Defining strategy and roadmap for payments onboarding experiences.',
            bulletPoints: [
                'Organized cohort analysis and user tests to redesign onboarding flow, boosting registration conversion by 28%.',
                'Collaborated with engineering to integrate instant banking APIs, decreasing average completion time by 4 minutes.',
                'Championed product requirement files (PRDs) for a new subscription service, yielding $1.4M ARR in its first 4 months.'
            ]
        },
        {
            id: 'pm-exp-2',
            company: 'CartBoost',
            position: 'Growth Product Manager',
            startDate: 'Jul 2021',
            endDate: 'Jul 2023',
            current: false,
            description: 'Owned the shopping checkout and recommendation algorithm funnels.',
            bulletPoints: [
                'Spearheaded A/B testing strategy on recommended product items, boosting average order value (AOV) by 14.5%.',
                'Synthesized feedback from 200+ merchants to deliver inventory syncing web portals.',
                'Established quantitative KPIs utilizing Amplitude dashboards, aligning stakeholders on growth strategies.'
            ]
        }
    ],
    educations: [
        {
            id: 'pm-edu-1',
            school: 'Stanford University',
            degree: 'Master of Science',
            fieldOfStudy: 'Management Science & Engineering',
            startDate: 'Sep 2019',
            endDate: 'Jun 2021',
            score: '3.91 / 4.0'
        }
    ],
    projects: [
        {
            id: 'pm-proj-1',
            name: 'EcoCart Chrome Extension',
            role: 'Product Lead / Initiator',
            description: 'A browser plugin calculating shipping carbon counts and suggesting local green alternatives.',
            technologies: ['Product Strategy', 'Figma Wireframing', 'Market Research'],
            url: 'ecocart-extension.com'
        }
    ],
    skills: [
        { id: 'pm-sk-1', name: 'Product Strategy', category: 'Skills' },
        { id: 'pm-sk-2', name: 'A/B Testing & Cohorts', category: 'Skills' },
        { id: 'pm-sk-3', name: 'Figma Prototyping', category: 'Skills' },
        { id: 'pm-sk-4', name: 'SQL Querying', category: 'Backend' },
        { id: 'pm-sk-5', name: 'Amplitude Analytics', category: 'DevOps & Tools' },
        { id: 'pm-sk-6', name: 'Jira & Agile Sprinting', category: 'DevOps & Tools' }
    ],
    certifications: [
        'Reforge Growth Series Certification (2023)',
        'AIPMM Certified Product Manager (2022)'
    ],
};

export const designerPreset: ResumeData = {
    personalInfo: {
        name: 'Clara Oswald',
        title: 'Lead UI/UX & Product Designer',
        email: 'clara@oswald.design',
        phone: '+44 (0) 7911 123456',
        location: 'London, UK',
        website: 'oswald.design',
        github: '',
        linkedin: 'linkedin.com/in/clara-oswald-design',
        summary: 'Lead Product Designer with 5+ years of experience creating visual brand languages and designing fluid, accessible digital interfaces across mobile, web, and desktop architectures. Focused on human-centered design principles and building comprehensive design systems.',
    },
    experiences: [
        {
            id: 'ds-exp-1',
            company: 'PixelPerfect Ltd',
            position: 'Lead UI/UX Designer',
            startDate: 'May 2022',
            endDate: 'Present',
            current: true,
            description: 'Supervising design systems and visual architectures for internal SaaS platforms.',
            bulletPoints: [
                'Architected core design token framework in Figma, decreasing design to developer delivery friction by 30%.',
                'Conducted usability sessions with 40+ corporate clients, redesigning enterprise task dashboards to improve accessibility scores (to WCAG AAA).',
                'Facilitated weekly design critique reviews, mentoring 3 junior designers on layout and responsive formatting.'
            ]
        }
    ],
    educations: [
        {
            id: 'ds-edu-1',
            school: 'Royal College of Art',
            degree: 'Master of Arts',
            fieldOfStudy: 'Information Experience Design',
            startDate: 'Sep 2020',
            endDate: 'Jun 2022',
            score: 'Distinction'
        }
    ],
    projects: [
        {
            id: 'ds-proj-1',
            name: 'Design System Token Generator',
            role: 'UI Designer & Prototyper',
            description: 'A smart web portal mapping TailwindCSS tokens onto Figma styles automatically.',
            technologies: ['Figma API', 'JSON Schemes', 'TailwindCSS'],
            url: 'figmatokens-generator.io'
        }
    ],
    skills: [
        { id: 'ds-sk-1', name: 'Figma Design', category: 'Frontend' },
        { id: 'ds-sk-2', name: 'Design Systems', category: 'Frontend' },
        { id: 'ds-sk-3', name: 'User Research', category: 'Skills' },
        { id: 'ds-sk-4', name: 'Wireframing', category: 'Skills' },
        { id: 'ds-sk-5', name: 'HTML5 & CSS Grid', category: 'Frontend' },
        { id: 'ds-sk-6', name: 'TailwindCSS', category: 'Frontend' }
    ],
    certifications: [
        'NN/g UX Master Certification #93021 (2023)',
        'Interaction Design Foundation - Accessibility Specialist (2022)'
    ],
};
