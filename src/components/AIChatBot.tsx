import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import type { ResumeData, Experience, Skill } from '../types/resume';

interface Message {
    id: string;
    sender: 'bot' | 'user';
    text: string;
    timestamp: Date;
    actions?: {
        label: string;
        onClick: () => void;
    }[];
}

interface AIChatBotProps {
    data: ResumeData;
    onChange: (updater: (prev: ResumeData) => ResumeData) => void;
    activeImproveTarget: {
        section: string;
        index: number;
        field: string;
        currentValue: string;
    } | null;
    onClearImproveTarget: () => void;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({
    data,
    onChange,
    activeImproveTarget,
    onClearImproveTarget
}) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            sender: 'bot',
            text: "Hi there! I am your AI Resume Assistant. 🤖\n\nI can critique your resume, write professional summaries, suggest skills, and even add entries for you!\n\nWhat would you like to do? Try typing command: \"suggest skills for frontend developer\" or click one of the quick options below.",
            timestamp: new Date(),
            actions: [
                { label: 'Critique my resume 📊', onClick: () => handlePresetAction('critique') },
                { label: 'Improve my summary ✍️', onClick: () => handlePresetAction('improve_summary') },
                { label: 'Suggest React developer skills 💡', onClick: () => handlePresetAction('suggest_frontend') }
            ]
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Handle active improve target from Editor click
    useEffect(() => {
        if (!activeImproveTarget) return;

        const { section, index, field, currentValue } = activeImproveTarget;

        // Add user message
        const searchMsg = `Please help me improve this ${section} text: "${currentValue.substring(0, 50)}${currentValue.length > 50 ? '...' : ''}"`;
        const userMsgId = Math.random().toString(36).substr(2, 9);

        setMessages(prev => [
            ...prev,
            {
                id: userMsgId,
                sender: 'user',
                text: searchMsg,
                timestamp: new Date()
            }
        ]);

        // Build suggestions
        setTimeout(() => {
            let suggestions: string[] = [];
            let botText = '';

            if (section === 'personal' && field === 'summary') {
                botText = `Here are 2 professional rewrites for your summary:`;
                suggestions = [
                    `Results-driven ${data.personalInfo.title || 'Professional'} with experience building robust systems. Specialized in executing scalable architectures, optimizing workflow efficiencies, and driving cross-functional collaboration.`,
                    `Creative and analytical professional equipped with a strong technical background in ${data.skills.slice(0, 3).map(s => s.name).join(', ') || 'modern methodologies'}. Dynamic problem solver focused on building high-impact products and designs.`
                ];
            } else if (section === 'experience' && field === 'description') {
                const company = data.experiences[index]?.company || 'the firm';
                botText = `Here's a leadership-oriented outline for your experience at ${company}:`;
                suggestions = [
                    `Led development of key features in agile sprints, collaborating with cross-functional teams to deploy optimized APIs. Achieved system performance improvements through rigorous code audits and modular development.`,
                    `Spearheaded client-facing initiatives, managing lifecycle releases and scaling resources. Directed testing parameters to eliminate performance bottlenecks and decrease production errors.`
                ];
            } else if (section === 'experience_bullet') {
                // field format "bulletIdx:bulletContent"
                botText = `I have optimized the current accomplishment bullet point with active action verbs and quantified impact:`;
                suggestions = [
                    `Delivered key project elements ahead of schedule, resulting in a 25% boost in client engagement metrics.`,
                    `Architectured core front-end module, minimizing rendering latency by 40% and enhancing UX responsiveness.`
                ];
            } else if (section === 'project' && field === 'description') {
                const projName = data.projects[index]?.name || 'the project';
                botText = `Here's a technical description optimized for your project ${projName}:`;
                suggestions = [
                    `Designed and implemented a scalable web application leveraging modern frontend methodologies. Automated serverless functions resulting in 30% lower operation costs and optimized payload delivery.`,
                    `Architected an open-source tool with seamless integrations. Improved data layer response times by 50% using client cache schemas and optimized component state trees.`
                ];
            } else {
                botText = `I can rewrite this text for you. Click below to apply.`;
                suggestions = [
                    `Highly skilled ${data.personalInfo.title || 'specialist'} focused on engineering excellent user outcomes.`,
                    `Detailed expert with deep industry competence, delivering scalable, high-availability customer applications.`
                ];
            }

            const botActions = suggestions.map((s, idx) => ({
                label: `Apply Option ${idx + 1} ✔️`,
                onClick: () => {
                    applySuggestion(section, index, field, s);
                    // reply that it was applied
                    addBotMessage(`Applied Option ${idx + 1} into your editor form! check the live preview.`);
                    onClearImproveTarget();
                }
            }));

            // Append bot suggestions
            setMessages(prev => [
                ...prev,
                {
                    id: Math.random().toString(36).substr(2, 9),
                    sender: 'bot',
                    text: `${botText}\n\n* **Option 1**: "${suggestions[0]}"\n\n* **Option 2**: "${suggestions[1]}"`,
                    timestamp: new Date(),
                    actions: botActions
                }
            ]);
        }, 800);

    }, [activeImproveTarget]);

    // Scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const addBotMessage = (text: string, actions?: Message['actions']) => {
        setMessages(prev => [
            ...prev,
            {
                id: Math.random().toString(36).substr(2, 9),
                sender: 'bot',
                text,
                timestamp: new Date(),
                actions
            }
        ]);
    };

    const applySuggestion = (section: string, index: number, field: string, value: string) => {
        onChange(prev => {
            const updated = { ...prev };
            if (section === 'personal' && field === 'summary') {
                updated.personalInfo.summary = value;
            } else if (section === 'experience' && field === 'description') {
                const exp = [...updated.experiences];
                exp[index] = { ...exp[index], description: value };
                updated.experiences = exp;
            } else if (section === 'experience_bullet') {
                const bulletIdx = parseInt(field.split(':')[0], 10);
                const exp = [...updated.experiences];
                const bullets = [...exp[index].bulletPoints];
                bullets[bulletIdx] = value;
                exp[index] = { ...exp[index], bulletPoints: bullets };
                updated.experiences = exp;
            } else if (section === 'project' && field === 'description') {
                const proj = [...updated.projects];
                proj[index] = { ...proj[index], description: value };
                updated.projects = proj;
            }
            return updated;
        });
    };

    const handlePresetAction = (action: string) => {
        let responseText = '';
        let actions: Message['actions'] = [];

        if (action === 'critique') {
            const { score, critiques } = analyzeResumeQuality(data);
            responseText = `### Resume Score: **${score}/100** 📊\n\nHere is a breakdown of your resume quality analysis:\n\n${critiques.map((c, i) => `${i + 1}. ${c}`).join('\n')}`;
        } else if (action === 'improve_summary') {
            const currentSummary = data.personalInfo.summary;
            if (!currentSummary) {
                responseText = "Your bio summary is currently empty. I need some text first! Type your bio or let me generate one. Try asking \"write summary for Senior Mobile dev\"";
            } else {
                // trigger the active Target simulate
                onChange(prev => prev); // dummy trigger
                const botText = `Let's optimize your summary. Choose one of the selections below:`;
                const choices = [
                    `Passionate ${data.personalInfo.title || 'Professional'} focused on building scalable cloud services, microservices, and client-centric frontends. Active contributor to open-source systems.`,
                    `Strategic expert with deep capabilities in designing user journeys, refining design variables, and deploying enterprise applications.`
                ];
                responseText = `${botText}\n\n* **Option 1**: "${choices[0]}"\n\n* **Option 2**: "${choices[1]}"`;
                actions = choices.map((s, idx) => ({
                    label: `Apply Option ${idx + 1}`,
                    onClick: () => {
                        handlePersonalInfoChange('summary', s);
                        addBotMessage(`Swapped resume summary with Option ${idx + 1}!`);
                    }
                }));
            }
        } else if (action === 'suggest_frontend') {
            responseText = `I suggest checking out these key technical skills for a **Frontend Developer** (React focused):\n\n* **Core**: React, TypeScript, Redux Toolkit, HTML5/CSS3\n* **Styling**: TailwindCSS, Styled-Components, CSS Modules\n* **Build Tools**: Vite, Webpack, ESLint, Vitest\n* **Testing**: Jest, Testing Library`;

            const skillsToAdd = ['React', 'TypeScript', 'Redux Toolkit', 'TailwindCSS', 'Vite', 'Testing Library'];
            actions = [
                {
                    label: 'Add all these skills ➕',
                    onClick: () => {
                        onChange(prev => {
                            const currentSkillNames = prev.skills.map(s => s.name.toLowerCase());
                            const newSkills = skillsToAdd
                                .filter(name => !currentSkillNames.includes(name.toLowerCase()))
                                .map(name => ({
                                    id: Math.random().toString(36).substr(2, 9),
                                    name,
                                    category: ['React', 'TypeScript', 'Redux Toolkit'].includes(name) ? 'Frontend' : 'DevOps & Tools'
                                }));
                            return {
                                ...prev,
                                skills: [...prev.skills, ...newSkills]
                            };
                        });
                        addBotMessage("Added frontend skills to your profile!");
                    }
                }
            ];
        }

        // append user then append bot
        setMessages(prev => [
            ...prev,
            {
                id: Math.random().toString(36).substr(2, 9),
                sender: 'user',
                text: `Preset: ${action.replace('_', ' ')}`,
                timestamp: new Date()
            },
            {
                id: Math.random().toString(36).substr(2, 9),
                sender: 'bot',
                text: responseText,
                timestamp: new Date(),
                actions
            }
        ]);
    };

    const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
        onChange(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [field]: value
            }
        }));
    };

    // The main Natural Language Parser logic
    const parseAndExecuteCommand = (text: string) => {
        const query = text.toLowerCase().trim();

        // 1. SUGGEST SKILLS FOR [ROLE]
        // regex matches "suggest skills for xyz" or "suggest skills xyz"
        const skillRegex = /suggest\s+skills\s+(?:for\s+)?([A-Za-z0-9\s._\-#+]{2,})/i;
        const skillMatch = query.match(skillRegex);

        if (skillMatch) {
            const role = skillMatch[1].trim();
            const suggestedMap: Record<string, string[]> = {
                'frontend': ['React', 'TypeScript', 'TailwindCSS', 'CSS Grid', 'Vite', 'Redux Toolkit'],
                'backend': ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'REST API', 'Redis'],
                'fullstack': ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Git', 'AWS'],
                'ui': ['Figma', 'UI Design', 'Design Systems', 'Responsive Web', 'Typography', 'Framer Motion'],
                'ux': ['Wireframing', 'User Research', 'Figma', 'Prototyping', 'Usability Testing'],
                'product manager': ['Product Strategy', 'Agile/Scrum', 'Jira', 'Data Analytics', 'Roadmapping'],
                'data scientist': ['Python', 'Pandas', 'SQL', 'Scikit-Learn', 'Machine Learning', 'Tableau'],
                'devops': ['Docker', 'Kubernetes', 'AWS', 'CI/CD Pipelines', 'GitHub Actions', 'Terraform']
            };

            // Find closest key matching role
            let matchKey = Object.keys(suggestedMap).find(k => role.includes(k) || k.includes(role)) || 'frontend';
            const list = suggestedMap[matchKey];

            const suggestionsText = `Based on your request for **${role}**, here are some highly recommended skills you can include:\n\n${list.map(s => `- ${s}`).join('\n')}`;

            const clickActions = [
                {
                    label: `Insert these ${list.length} skills`,
                    onClick: () => {
                        onChange(prev => {
                            const currentSkillNames = prev.skills.map(s => s.name.toLowerCase());
                            const newSkills = list
                                .filter(name => !currentSkillNames.includes(name.toLowerCase()))
                                .map(name => ({
                                    id: Math.random().toString(36).substr(2, 9),
                                    name,
                                    category: 'Skills'
                                }));
                            return {
                                ...prev,
                                skills: [...prev.skills, ...newSkills]
                            };
                        });
                        addBotMessage(`Successfully imported ${role} skills to the skills category! Check them out in the editor.`);
                    }
                }
            ];

            addBotMessage(suggestionsText, clickActions);
            return;
        }

        // 2. ADD JOB [COMPANY] AS [ROLE] FROM [START] TO [END]
        // Regex: "add job (company) as (role) from (start) to (end)"
        const jobRegex = /add\s+job\s+([A-Za-z0-9\s._\-&]+)\s+as\s+([A-Za-z0-9\s._\-&]+)\s+from\s+([A-Za-z0-9\s,]+)\s+to\s+([A-Za-z0-9\s,]+)/i;
        const jobMatch = query.match(jobRegex);

        if (jobMatch) {
            const company = jobMatch[1].trim();
            const role = jobMatch[2].trim();
            const start = jobMatch[3].trim();
            const end = jobMatch[4].trim();

            const newExp: Experience = {
                id: Math.random().toString(36).substr(2, 9),
                company: company.charAt(0).toUpperCase() + company.slice(1),
                position: role.charAt(0).toUpperCase() + role.slice(1),
                startDate: start.charAt(0).toUpperCase() + start.slice(1),
                endDate: end.charAt(0).toUpperCase() + end.slice(1),
                current: end.toLowerCase() === 'present' || end.toLowerCase() === 'now',
                description: `Delivered high-value services as part of the ${role} team at ${company}.`,
                bulletPoints: ['Collaborated in team sprints to design optimized features.', 'Resolved bottlenecks resulting in improved user satisfaction metrics.']
            };

            onChange(prev => ({
                ...prev,
                experiences: [...prev.experiences, newExp]
            }));

            addBotMessage(`I've added your role as **${newExp.position}** at **${newExp.company}** (${newExp.startDate} - ${newExp.current ? 'Present' : newExp.endDate}) under your Work Experience section. Check the form!`);
            return;
        }

        // 3. ADD SKILL [NAME] TO [CATEGORY]
        // Regex: "add skill (name) to (category)" or "add skill (name)"
        const skillAddRegex = /add\s+skill\s+([A-Za-z0-9\s._\-&#+]+)(?:\s+to\s+([A-Za-z0-9\s._\-&]+))?/i;
        const skillAddMatch = query.match(skillAddRegex);

        if (skillAddMatch) {
            const skillName = skillAddMatch[1].trim();
            let category = (skillAddMatch[2] || 'Skills').trim();

            // Capitalize first letters
            const formattedName = skillName.charAt(0).toUpperCase() + skillName.slice(1);
            const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

            const newSkill: Skill = {
                id: Math.random().toString(36).substr(2, 9),
                name: formattedName,
                category: ['Languages', 'Frontend', 'Backend', 'DevOps & Tools'].includes(formattedCategory) ? formattedCategory : 'Skills'
            };

            onChange(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill]
            }));

            addBotMessage(`Added skill **${newSkill.name}** under the **${newSkill.category}** category.`);
            return;
        }

        // 4. CRITIQUE OR FEEDBACK REGEX
        if (query.includes('critique') || query.includes('analyze') || query.includes('score') || query.includes('feedback')) {
            const { score, critiques } = analyzeResumeQuality(data);
            addBotMessage(`### Resume Score: **${score}/100** 📊\n\nHere is a breakdown of your resume quality analysis:\n\n${critiques.map((c, i) => `${i + 1}. ${c}`).join('\n')}`);
            return;
        }

        // 5. SUGGEST BIO/SUMMARY FOR [ROLE]
        const bioRegex = /suggest\s+bio\s+(?:for\s+)?([A-Za-z0-9\s._\-&]{2,})/i;
        const bioMatch = query.match(bioRegex);
        if (bioMatch) {
            const role = bioMatch[1].trim();
            const roleCapitalized = role.charAt(0).toUpperCase() + role.slice(1);
            const sampleBio = `Results-oriented ${roleCapitalized} with a strong work ethic and focus on developing impactful software solutions. Experienced in full software lifecycle development and working closely with design groups to construct clean interfaces.`;

            addBotMessage(`Here is a suggested bio summary for **${roleCapitalized}**:\n\n*"${sampleBio}"*`, [
                {
                    label: 'Apply this summary ✍️',
                    onClick: () => {
                        handlePersonalInfoChange('summary', sampleBio);
                        addBotMessage('Applied the bio summary inside the editor!');
                    }
                }
            ]);
            return;
        }

        // 6. DEFAULT RESPONSES / DIALOGUE
        const greetings = ['hi', 'hello', 'hey', 'yo', 'greetings', 'help'];
        if (greetings.some(g => query.includes(g))) {
            addBotMessage("How can I assist you with your resume today? You can ask me to:\n1. \"Critique my resume\"\n2. \"Suggest skills for UI Designer\"\n3. \"Add job Netflix as Architect from 2020 to 2024\"\n4. \"Suggest bio for Product Manager\"");
            return;
        }

        // fallback
        addBotMessage(`I've received: "${text}". I didn't see an explicit command pattern in your message. 

You can try using:
- **"Critique my resume"**
- **"Suggest skills for Backend Engineer"**
- **"Add job [Company] as [Role] from [Start] to [End]"**
- **"Suggest bio for [Role]"**`);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue('');

        // Append user message
        setMessages(prev => [
            ...prev,
            {
                id: Math.random().toString(36).substr(2, 9),
                sender: 'user',
                text: userText,
                timestamp: new Date()
            }
        ]);

        // Parse and respond after simulation delays
        setTimeout(() => {
            parseAndExecuteCommand(userText);
        }, 450);
    };

    // Critique analysis algorithm
    const analyzeResumeQuality = (rData: ResumeData) => {
        let score = 30; // base score
        let critiques: string[] = [];

        // Personal Details
        if (rData.personalInfo.name) score += 5;
        else critiques.push("Add your full name so employers know who you are.");

        if (rData.personalInfo.email && rData.personalInfo.phone) score += 10;
        else critiques.push("Include complete contact details (email and phone number) so recruiting teams can reach out.");

        if (rData.personalInfo.summary) {
            score += 10;
            if (rData.personalInfo.summary.length < 50) {
                critiques.push("Your professional summary is a bit details-light. Expand it to at least 2 sentences.");
            }
        } else {
            critiques.push("Introduce yourself with an impactful Professional Summary.");
        }

        // Experiences
        if (rData.experiences.length > 0) {
            score += 20;
            // check details
            const hasShortDescription = rData.experiences.some(e => e.bulletPoints.length === 0 || e.bulletPoints.every(b => !b));
            if (hasShortDescription) {
                critiques.push("Some job experiences lack accomplishment bullet points. List at least 2 metrics-based actions per role.");
            }

            // Check for active action verbs or metrics
            const mentionsMetrics = rData.experiences.some(e =>
                e.bulletPoints.some(b => b.includes('%') || b.includes('$') || /\b(increased|reduced|saved|grew|led)\b/i.test(b))
            );
            if (mentionsMetrics) {
                score += 10;
            } else {
                critiques.push("Add quantified outcomes (e.g. percentages, margins, or hours saved) in your experience bullets to increase credibility.");
            }
        } else {
            critiques.push("Add at least one professional work experience item.");
        }

        // Projects
        if (rData.projects.length > 0) {
            score += 15;
        } else {
            critiques.push("Include a Personal Project section showing off what you have built independently.");
        }

        // Skills
        if (rData.skills.length > 3) {
            score += 10;
        } else {
            critiques.push("Declare at least 4 key technical skills matching your career target.");
        }

        // Certifications
        if (rData.certifications.length > 0 && rData.certifications.some(Boolean)) {
            score += 10;
        }

        if (critiques.length === 0) {
            critiques.push("Awesome! Your resume meets all checked quality markers. You are ready to export.");
        }

        return { score: Math.min(score, 100), critiques };
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'var(--bg-card)' }}>
            {/* Bot Chat Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: 'var(--bg-sidebar)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ padding: '6px', backgroundColor: 'var(--accent-muted)', borderRadius: '50%', display: 'flex' }}>
                        <Bot size={18} color="var(--accent)" />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>AI Resume Copilot</h4>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Interactive local assistant bot</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Connected</span>
                </div>
            </div>

            {/* Messages Window */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        style={{
                            display: 'flex',
                            gap: '10px',
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '85%'
                        }}
                    >
                        {msg.sender === 'bot' && (
                            <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
                                <Bot size={14} color="var(--accent)" />
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div
                                style={{
                                    padding: '12px 14px',
                                    borderRadius: '12px',
                                    borderTopRightRadius: msg.sender === 'user' ? '2px' : '12px',
                                    borderTopLeftRadius: msg.sender === 'bot' ? '2.5px' : '12px',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.45',
                                    backgroundColor: msg.sender === 'user' ? 'var(--accent)' : 'var(--bg-sidebar)',
                                    color: msg.sender === 'user' ? 'var(--text-inverse)' : 'var(--text-main)',
                                    border: msg.sender === 'bot' ? '1px solid var(--border)' : 'none',
                                    whiteSpace: 'pre-wrap',
                                    textAlign: 'left'
                                }}
                            >
                                {msg.text}
                            </div>

                            {/* Action Suggestion Buttons inside template */}
                            {msg.actions && msg.actions.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
                                    {msg.actions.map((act, actIdx) => (
                                        <button
                                            key={actIdx}
                                            type="button"
                                            className="btn btn-secondary"
                                            style={{
                                                padding: '6px 12px',
                                                fontSize: '0.78rem',
                                                borderRadius: 'var(--radius-sm)',
                                                borderColor: 'var(--accent)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                fontWeight: 650
                                            }}
                                            onClick={act.onClick}
                                        >
                                            <Sparkles size={11} color="var(--accent)" />
                                            {act.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {msg.sender === 'user' && (
                            <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
                                <User size={14} color="var(--text-muted)" />
                            </div>
                        )}
                    </div>
                ))}

                {/* Helper Improve active banner if activeImproveTarget is loaded */}
                {activeImproveTarget && (
                    <div style={{ display: 'flex', gap: '8px', padding: '10px', backgroundColor: 'var(--accent-muted)', borderRadius: '8px', border: '1px dashed var(--accent)', fontSize: '0.78rem', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Sparkles size={14} color="var(--accent)" />
                            <span>Improving: <strong>{activeImproveTarget.section}</strong> &mdash; <em>{activeImproveTarget.field}</em></span>
                        </div>
                        <button
                            type="button"
                            style={{ background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={onClearImproveTarget}
                        >
                            Cancel
                        </button>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Chat Entry Frame */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', padding: '12px 14px', borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-sidebar)' }}>
                <input
                    type="text"
                    className="input-field"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Ask me to critique or suggest skills..."
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '8px 12px' }}
                >
                    <Send size={14} />
                </button>
            </form>
        </div>
    );
};
