import React, { useState } from 'react';
import {
    User, Briefcase, GraduationCap, FolderGit2, Wrench, Award,
    Plus, Trash2, ChevronDown, ChevronUp, Sparkles
} from 'lucide-react';
import type { ResumeData, Experience, Education, Project, Skill } from '../types/resume';

interface ResumeEditorProps {
    data: ResumeData;
    onChange: (updater: (prev: ResumeData) => ResumeData) => void;
    onSelectAiImproveText: (section: string, index: number, field: string, currentValue: string) => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, onChange, onSelectAiImproveText }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        personal: true,
        experience: false,
        education: false,
        projects: false,
        skills: false,
        certifications: false,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
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

    // --- Handlers for Experience ---
    const addExperience = () => {
        const newExp: Experience = {
            id: Math.random().toString(36).substr(2, 9),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            bulletPoints: ['']
        };
        onChange(prev => ({
            ...prev,
            experiences: [...prev.experiences, newExp]
        }));
    };

    const updateExperience = (index: number, field: keyof Experience, value: any) => {
        onChange(prev => {
            const updated = [...prev.experiences];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, experiences: updated };
        });
    };

    const deleteExperience = (index: number) => {
        onChange(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    };

    const updateExperienceBullet = (expIndex: number, bulletIndex: number, value: string) => {
        onChange(prev => {
            const updated = [...prev.experiences];
            const bullets = [...updated[expIndex].bulletPoints];
            bullets[bulletIndex] = value;
            updated[expIndex] = { ...updated[expIndex], bulletPoints: bullets };
            return { ...prev, experiences: updated };
        });
    };

    const addExperienceBullet = (expIndex: number) => {
        onChange(prev => {
            const updated = [...prev.experiences];
            updated[expIndex] = {
                ...updated[expIndex],
                bulletPoints: [...updated[expIndex].bulletPoints, '']
            };
            return { ...prev, experiences: updated };
        });
    };

    const deleteExperienceBullet = (expIndex: number, bulletIndex: number) => {
        onChange(prev => {
            const updated = [...prev.experiences];
            updated[expIndex] = {
                ...updated[expIndex],
                bulletPoints: updated[expIndex].bulletPoints.filter((_, i) => i !== bulletIndex)
            };
            return { ...prev, experiences: updated };
        });
    };

    // --- Handlers for Education ---
    const addEducation = () => {
        const newEdu: Education = {
            id: Math.random().toString(36).substr(2, 9),
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            score: ''
        };
        onChange(prev => ({
            ...prev,
            educations: [...prev.educations, newEdu]
        }));
    };

    const updateEducation = (index: number, field: keyof Education, value: string) => {
        onChange(prev => {
            const updated = [...prev.educations];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, educations: updated };
        });
    };

    const deleteEducation = (index: number) => {
        onChange(prev => ({
            ...prev,
            educations: prev.educations.filter((_, i) => i !== index)
        }));
    };

    // --- Handlers for Projects ---
    const addProject = () => {
        const newProject: Project = {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            role: '',
            description: '',
            technologies: [],
            url: ''
        };
        onChange(prev => ({
            ...prev,
            projects: [...prev.projects, newProject]
        }));
    };

    const updateProject = (index: number, field: keyof Project, value: any) => {
        onChange(prev => {
            const updated = [...prev.projects];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, projects: updated };
        });
    };

    const deleteProject = (index: number) => {
        onChange(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }));
    };

    const handleProjectTechsChange = (index: number, csvString: string) => {
        const techs = csvString.split(',').map(t => t.trim()).filter(Boolean);
        updateProject(index, 'technologies', techs);
    };

    // --- Handlers for Skills ---
    const addSkill = () => {
        const newSkill: Skill = {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            category: 'Skills'
        };
        onChange(prev => ({
            ...prev,
            skills: [...prev.skills, newSkill]
        }));
    };

    const updateSkill = (index: number, field: keyof Skill, value: string) => {
        onChange(prev => {
            const updated = [...prev.skills];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, skills: updated };
        });
    };

    const deleteSkill = (index: number) => {
        onChange(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    // --- Handlers for Certifications ---
    const addCertification = () => {
        onChange(prev => ({
            ...prev,
            certifications: [...prev.certifications, '']
        }));
    };

    const updateCertification = (index: number, value: string) => {
        onChange(prev => {
            const updated = [...prev.certifications];
            updated[index] = value;
            return { ...prev, certifications: updated };
        });
    };

    const deleteCertification = (index: number) => {
        onChange(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="resume-editor" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 1. PERSONAL INFORMATION */}
            <div className="editor-card glassmorphism" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <div
                    onClick={() => toggleSection('personal')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <User size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 650 }}>Personal Information</h3>
                    </div>
                    {expandedSections.personal ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                {expandedSections.personal && (
                    <div className="animate-slide-up" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={data.personalInfo.name}
                                    onChange={e => handlePersonalInfoChange('name', e.target.value)}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label>Professional Title</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={data.personalInfo.title}
                                    onChange={e => handlePersonalInfoChange('title', e.target.value)}
                                    placeholder="Senior Frontend Developer"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    value={data.personalInfo.email}
                                    onChange={e => handlePersonalInfoChange('email', e.target.value)}
                                    placeholder="john.doe@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={data.personalInfo.phone}
                                    onChange={e => handlePersonalInfoChange('phone', e.target.value)}
                                    placeholder="+1 (555) 019-2834"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={data.personalInfo.location}
                                    onChange={e => handlePersonalInfoChange('location', e.target.value)}
                                    placeholder="San Francisco, CA"
                                />
                            </div>
                            <div className="form-group">
                                <label>GitHub Username</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={data.personalInfo.github}
                                    onChange={e => handlePersonalInfoChange('github', e.target.value)}
                                    placeholder="github.com/johndoe"
                                />
                            </div>
                            <div className="form-group">
                                <label>LinkedIn Username</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={data.personalInfo.linkedin}
                                    onChange={e => handlePersonalInfoChange('linkedin', e.target.value)}
                                    placeholder="linkedin.com/in/johndoe"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label>Professional Bio / Summary</label>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px' }}
                                    onClick={() => onSelectAiImproveText('personal', 0, 'summary', data.personalInfo.summary)}
                                >
                                    <Sparkles size={12} color="var(--accent)" />
                                    AI Improve Summary
                                </button>
                            </div>
                            <textarea
                                className="input-field"
                                rows={3}
                                value={data.personalInfo.summary}
                                onChange={e => handlePersonalInfoChange('summary', e.target.value)}
                                placeholder="A brief summary describing your experience, passion, and standout accomplishments..."
                                style={{ resize: 'vertical' }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* 2. WORK EXPERIENCE */}
            <div className="editor-card glassmorphism" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <div
                    onClick={() => toggleSection('experience')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Briefcase size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 650 }}>Work Experience</h3>
                    </div>
                    {expandedSections.experience ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                {expandedSections.experience && (
                    <div className="animate-slide-up" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {data.experiences.map((exp, expIdx) => (
                            <div
                                key={exp.id}
                                style={{
                                    padding: '16px',
                                    backgroundImage: 'radial-gradient(circle at 100% 0%, var(--bg-card-hover) 0%, transparent 100%)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-sm)',
                                    position: 'relative'
                                }}
                            >
                                <button
                                    type="button"
                                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                    onClick={() => deleteExperience(expIdx)}
                                >
                                    <Trash2 size={16} color="var(--error)" />
                                </button>

                                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent)' }}>Experience Item #{expIdx + 1}</h4>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={exp.company}
                                            onChange={e => updateExperience(expIdx, 'company', e.target.value)}
                                            placeholder="e.g. Google"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Job Title</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={exp.position}
                                            onChange={e => updateExperience(expIdx, 'position', e.target.value)}
                                            placeholder="e.g. Software Engineer"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={exp.startDate}
                                            onChange={e => updateExperience(expIdx, 'startDate', e.target.value)}
                                            placeholder="Jan 2021"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            disabled={exp.current}
                                            value={exp.current ? 'Present' : exp.endDate}
                                            onChange={e => updateExperience(expIdx, 'endDate', e.target.value)}
                                            placeholder="Present / Dec 2023"
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer' }}>
                                        <label style={{ fontSize: '0.75rem' }}>Current</label>
                                        <input
                                            type="checkbox"
                                            checked={exp.current}
                                            onChange={e => updateExperience(expIdx, 'current', e.target.checked)}
                                            style={{ transform: 'scale(1.2)', margin: '8px auto 0 auto', cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label>Job Description Overview</label>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px' }}
                                            onClick={() => onSelectAiImproveText('experience', expIdx, 'description', exp.description)}
                                        >
                                            <Sparkles size={12} color="var(--accent)" />
                                            AI Improve Description
                                        </button>
                                    </div>
                                    <textarea
                                        className="input-field"
                                        rows={2}
                                        value={exp.description}
                                        onChange={e => updateExperience(expIdx, 'description', e.target.value)}
                                        placeholder="Short description of the team, products, or core mandate..."
                                    />
                                </div>

                                {/* Bullet points mapping */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Key Accomplishments (Bulleted)</label>
                                    {exp.bulletPoints.map((bullet, bulletIdx) => (
                                        <div key={bulletIdx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                className="input-field"
                                                value={bullet}
                                                onChange={e => updateExperienceBullet(expIdx, bulletIdx, e.target.value)}
                                                placeholder="Quantified outcome (e.g. Increased system throughput by 30% by refactoring APIs)"
                                                style={{ flex: 1 }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                style={{ padding: '6px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                onClick={() => onSelectAiImproveText('experience_bullet', expIdx, `${bulletIdx}:${bullet}`, bullet)}
                                                title="AI Rewrite Bullet"
                                            >
                                                <Sparkles size={12} color="var(--accent)" />
                                            </button>
                                            <button
                                                type="button"
                                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                                                onClick={() => deleteExperienceBullet(expIdx, bulletIdx)}
                                            >
                                                <Trash2 size={14} color="var(--error)" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        style={{ fontSize: '0.8rem', padding: '6px 12px', alignSelf: 'flex-start', marginTop: '4px' }}
                                        onClick={() => addExperienceBullet(expIdx)}
                                    >
                                        <Plus size={14} /> Add Accomplishment
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '12px', fontSize: '0.9rem' }}
                            onClick={addExperience}
                        >
                            <Plus size={16} /> Add Work Experience
                        </button>
                    </div>
                )}
            </div>

            {/* 3. EDUCATION */}
            <div className="editor-card glassmorphism" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <div
                    onClick={() => toggleSection('education')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <GraduationCap size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 650 }}>Education</h3>
                    </div>
                    {expandedSections.education ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                {expandedSections.education && (
                    <div className="animate-slide-up" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {data.educations.map((edu, eduIdx) => (
                            <div
                                key={edu.id}
                                style={{
                                    padding: '16px',
                                    backgroundImage: 'radial-gradient(circle at 100% 0%, var(--bg-card-hover) 0%, transparent 100%)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-sm)',
                                    position: 'relative'
                                }}
                            >
                                <button
                                    type="button"
                                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                    onClick={() => deleteEducation(eduIdx)}
                                >
                                    <Trash2 size={16} color="var(--error)" />
                                </button>

                                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent)' }}>Education Item #{eduIdx + 1}</h4>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                    <div className="form-group">
                                        <label>Institution / School</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={edu.school}
                                            onChange={e => updateEducation(eduIdx, 'school', e.target.value)}
                                            placeholder="e.g. Stanford University"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Degree Name</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={edu.degree}
                                            onChange={e => updateEducation(eduIdx, 'degree', e.target.value)}
                                            placeholder="e.g. Bachelor of Science"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '12px', alignItems: 'center' }}>
                                    <div className="form-group">
                                        <label>Field of Study</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={edu.fieldOfStudy}
                                            onChange={e => updateEducation(eduIdx, 'fieldOfStudy', e.target.value)}
                                            placeholder="e.g. Computer Science"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Timeframe (Grad Date)</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={`${edu.startDate ? edu.startDate + ' - ' : ''}${edu.endDate}`}
                                            onChange={e => {
                                                const val = e.target.value;
                                                const split = val.split('-');
                                                if (split.length > 1) {
                                                    updateEducation(eduIdx, 'startDate', split[0].trim());
                                                    updateEducation(eduIdx, 'endDate', split[1].trim());
                                                } else {
                                                    updateEducation(eduIdx, 'endDate', val.trim());
                                                }
                                            }}
                                            placeholder="e.g. 2017 - 2021"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>GPA / Grade</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={edu.score}
                                            onChange={e => updateEducation(eduIdx, 'score', e.target.value)}
                                            placeholder="e.g. 3.9 / 4.0"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '12px', fontSize: '0.9rem' }}
                            onClick={addEducation}
                        >
                            <Plus size={16} /> Add Education Level
                        </button>
                    </div>
                )}
            </div>

            {/* 4. PROJECTS */}
            <div className="editor-card glassmorphism" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <div
                    onClick={() => toggleSection('projects')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FolderGit2 size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 650 }}>Projects</h3>
                    </div>
                    {expandedSections.projects ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                {expandedSections.projects && (
                    <div className="animate-slide-up" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {data.projects.map((proj, projIdx) => (
                            <div
                                key={proj.id}
                                style={{
                                    padding: '16px',
                                    backgroundImage: 'radial-gradient(circle at 100% 0%, var(--bg-card-hover) 0%, transparent 100%)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-sm)',
                                    position: 'relative'
                                }}
                            >
                                <button
                                    type="button"
                                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                    onClick={() => deleteProject(projIdx)}
                                >
                                    <Trash2 size={16} color="var(--error)" />
                                </button>

                                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent)' }}>Project Item #{projIdx + 1}</h4>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                    <div className="form-group">
                                        <label>Project Name</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={proj.name}
                                            onChange={e => updateProject(projIdx, 'name', e.target.value)}
                                            placeholder="e.g. E-Commerce Microservice"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Your Role</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={proj.role}
                                            onChange={e => updateProject(projIdx, 'role', e.target.value)}
                                            placeholder="e.g. Lead Developer / Creator"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                    <div className="form-group">
                                        <label>Project URL (optional)</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={proj.url || ''}
                                            onChange={e => updateProject(projIdx, 'url', e.target.value)}
                                            placeholder="e.g. github.com/my-project"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Technologies Used (comma separated)</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            value={proj.technologies.join(', ')}
                                            onChange={e => handleProjectTechsChange(projIdx, e.target.value)}
                                            placeholder="TypeScript, React, Node.js, AWS"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label>Project Details / Highlights</label>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '0.75rem', borderRadius: '4px' }}
                                            onClick={() => onSelectAiImproveText('project', projIdx, 'description', proj.description)}
                                        >
                                            <Sparkles size={12} color="var(--accent)" />
                                            AI Improve Project
                                        </button>
                                    </div>
                                    <textarea
                                        className="input-field"
                                        rows={2}
                                        value={proj.description}
                                        onChange={e => updateProject(projIdx, 'description', e.target.value)}
                                        placeholder="Describe what you built, what challenge it solved, and key technical outcomes..."
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '12px', fontSize: '0.9rem' }}
                            onClick={addProject}
                        >
                            <Plus size={16} /> Add Custom Project
                        </button>
                    </div>
                )}
            </div>

            {/* 5. SKILLS */}
            <div className="editor-card glassmorphism" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <div
                    onClick={() => toggleSection('skills')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Wrench size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 650 }}>Skills</h3>
                    </div>
                    {expandedSections.skills ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                {expandedSections.skills && (
                    <div className="animate-slide-up" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tag individual skills and classify them under categories for a structured look.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '8px', fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', paddingLeft: '4px' }}>
                            <div>Skill Name</div>
                            <div>Category</div>
                            <div style={{ width: '32px' }}></div>
                        </div>

                        {data.skills.map((skill, skillIdx) => (
                            <div key={skill.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '8px', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={skill.name}
                                    onChange={e => updateSkill(skillIdx, 'name', e.target.value)}
                                    placeholder="e.g. React.js"
                                />
                                <select
                                    className="input-field"
                                    value={skill.category}
                                    onChange={e => updateSkill(skillIdx, 'category', e.target.value)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <option value="Languages">Languages</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="DevOps & Tools">DevOps & Tools</option>
                                    <option value="Skills">General Skill</option>
                                </select>
                                <button
                                    type="button"
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px' }}
                                    onClick={() => deleteSkill(skillIdx)}
                                >
                                    <Trash2 size={16} color="var(--error)" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ alignSelf: 'flex-start', fontSize: '0.85rem', padding: '8px 14px', marginTop: '6px' }}
                            onClick={addSkill}
                        >
                            <Plus size={14} /> Add Skill Tag
                        </button>
                    </div>
                )}
            </div>

            {/* 6. CERTIFICATIONS */}
            <div className="editor-card glassmorphism" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <div
                    onClick={() => toggleSection('certifications')}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Award size={20} color="var(--accent)" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 650 }}>Certifications</h3>
                    </div>
                    {expandedSections.certifications ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>

                {expandedSections.certifications && (
                    <div className="animate-slide-up" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {data.certifications.map((cert, certIdx) => (
                            <div key={certIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={cert}
                                    onChange={e => updateCertification(certIdx, e.target.value)}
                                    placeholder="AWS Solutions Architect Associate (2025)"
                                    style={{ flex: 1 }}
                                />
                                <button
                                    type="button"
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px' }}
                                    onClick={() => deleteCertification(certIdx)}
                                >
                                    <Trash2 size={16} color="var(--error)" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ alignSelf: 'flex-start', fontSize: '0.85rem', padding: '8px 14px', marginTop: '6px' }}
                            onClick={addCertification}
                        >
                            <Plus size={14} /> Add Certificate
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
