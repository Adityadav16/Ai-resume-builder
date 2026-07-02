import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import type { ResumeData, ResumeStyleConfig } from '../types/resume';

const GithubIcon = ({ size = 12, color = 'currentColor' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
);

const LinkedinIcon = ({ size = 12, color = 'currentColor' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

interface ResumePreviewProps {
    data: ResumeData;
    config: ResumeStyleConfig;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, config }) => {
    const { personalInfo, experiences, educations, projects, skills, certifications } = data;

    // Map font styles
    const fontClass = {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
        mono: 'var(--font-mono)'
    }[config.fontFamily];

    // Map spacing sizes
    const spacingStyle = {
        compact: { gap: '10px', padding: '16px', itemSpacing: '6px' },
        normal: { gap: '16px', padding: '24px', itemSpacing: '12px' },
        loose: { gap: '24px', padding: '32px', itemSpacing: '18px' }
    }[config.spacing];

    // Map font sizing classes
    const fontSizes = {
        sm: { base: '0.8rem', name: '1.6rem', sectionTitle: '0.9rem', itemTitle: '0.85rem' },
        md: { base: '0.9rem', name: '2.0rem', sectionTitle: '1.1rem', itemTitle: '1.0rem' },
        lg: { base: '1.0rem', name: '2.4rem', sectionTitle: '1.3rem', itemTitle: '1.15rem' }
    }[config.fontSize];

    // Helper dynamically inject inline style for HSL accent
    const customAccentColor = `hsl(${config.primaryColor}, 75%, 45%)`;
    const customAccentLight = `hsl(${config.primaryColor}, 75%, 95%)`;
    const customAccentDark = `hsl(${config.primaryColor}, 80%, 25%)`;

    // Render social links
    const renderContactItem = (icon: React.ReactNode, value: string, linkPrefix?: string) => {
        if (!value) return null;
        return (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85em', color: 'var(--text-muted)' }}>
                {icon}
                {linkPrefix ? (
                    <a href={`${linkPrefix}${value}`} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {value}
                    </a>
                ) : (
                    <span>{value}</span>
                )}
            </div>
        );
    };

    // Group skills by category
    const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
        if (!skill.name) return acc;
        const cat = skill.category || 'Skills';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    // Templates mapping
    const renderTemplateContent = () => {
        switch (config.template) {
            // ----------------------------------------------------
            // CASE 1: MODERN TECH TEMPLATE (Left bar/sidebar layout)
            // ----------------------------------------------------
            case 'modern-tech':
                return (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '20px', height: '100%' }}>
                        {/* Sidebar (Left Column) */}
                        <div style={{ borderRight: '1px solid var(--border)', paddingRight: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, color: customAccentColor, lineHeight: 1.1, marginBottom: '4px' }}>
                                    {personalInfo.name || 'Your Name'}
                                </h1>
                                <p style={{ fontSize: fontSizes.itemTitle, fontWeight: 600, color: 'var(--text-muted)' }}>
                                    {personalInfo.title || 'Professional Title'}
                                </p>
                            </div>

                            {/* Bio Summary */}
                            {personalInfo.summary && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <h4 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', letterSpacing: '0.5px', color: customAccentColor, borderBottom: `1px solid ${customAccentColor}`, paddingBottom: '4px' }}>
                                        Profile
                                    </h4>
                                    <p style={{ fontSize: '0.82em', lineHeight: 1.4 }}>{personalInfo.summary}</p>
                                </div>
                            )}

                            {/* Contact details */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <h4 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', letterSpacing: '0.5px', color: customAccentColor, borderBottom: `1px solid ${customAccentColor}`, paddingBottom: '2px' }}>
                                    Contact
                                </h4>
                                {renderContactItem(<Mail size={12} color={customAccentColor} />, personalInfo.email, 'mailto:')}
                                {renderContactItem(<Phone size={12} color={customAccentColor} />, personalInfo.phone)}
                                {renderContactItem(<MapPin size={12} color={customAccentColor} />, personalInfo.location)}
                                {renderContactItem(<Globe size={12} color={customAccentColor} />, personalInfo.website, 'https://')}
                                {renderContactItem(<GithubIcon size={12} color={customAccentColor} />, personalInfo.github, 'https://')}
                                {renderContactItem(<LinkedinIcon size={12} color={customAccentColor} />, personalInfo.linkedin, 'https://')}
                            </div>

                            {/* Skills Category */}
                            {Object.keys(skillsByCategory).length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h4 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', letterSpacing: '0.5px', color: customAccentColor, borderBottom: `1px solid ${customAccentColor}`, paddingBottom: '2px' }}>
                                        Skills
                                    </h4>
                                    {Object.entries(skillsByCategory).map(([cat, list]) => (
                                        <div key={cat} style={{ fontSize: '0.8em' }}>
                                            <p style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>{cat}</p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                {list.map(s => (
                                                    <span key={s.id} style={{ backgroundColor: customAccentLight, color: customAccentDark, padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>
                                                        {s.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Certifications Category */}
                            {certifications.length > 0 && certifications.some(Boolean) && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <h4 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', letterSpacing: '0.5px', color: customAccentColor, borderBottom: `1px solid ${customAccentColor}`, paddingBottom: '2px' }}>
                                        Certificates
                                    </h4>
                                    <ul style={{ paddingLeft: '14px', margin: 0, fontSize: '0.8em', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                        {certifications.filter(Boolean).map((cert, cidx) => (
                                            <li key={cidx}>{cert}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Main Content (Right Column) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.gap }}>
                            {/* Experiences */}
                            {experiences.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h3 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ height: '3px', width: '20px', backgroundColor: customAccentColor, display: 'inline-block' }}></span>
                                        Experience
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing }}>
                                        {experiences.map(exp => (
                                            <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                    <span style={{ fontWeight: 700, fontSize: fontSizes.itemTitle, color: 'var(--text-main)' }}>
                                                        {exp.position} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>at</span> {exp.company}
                                                    </span>
                                                    <span style={{ fontSize: '0.8em', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                                    </span>
                                                </div>
                                                {exp.description && <p style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>{exp.description}</p>}
                                                {exp.bulletPoints.length > 0 && exp.bulletPoints.some(Boolean) && (
                                                    <ul style={{ paddingLeft: '16px', margin: '2px 0 0 0', fontSize: '0.82em', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                        {exp.bulletPoints.filter(Boolean).map((pt, pidx) => (
                                                            <li key={pidx}>{pt}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {projects.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h3 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ height: '3px', width: '20px', backgroundColor: customAccentColor, display: 'inline-block' }}></span>
                                        Key Projects
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing }}>
                                        {projects.map(proj => (
                                            <div key={proj.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                    <span style={{ fontWeight: 700, fontSize: fontSizes.itemTitle, color: 'var(--text-main)' }}>
                                                        {proj.name} {proj.role ? <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.9em' }}>({proj.role})</span> : null}
                                                    </span>
                                                    {proj.url && <span style={{ fontSize: '0.78em', color: customAccentColor }}>{proj.url}</span>}
                                                </div>
                                                {proj.description && <p style={{ fontSize: '0.82em', color: 'var(--text-muted)' }}>{proj.description}</p>}
                                                {proj.technologies.length > 0 && (
                                                    <p style={{ fontSize: '0.75em', fontWeight: 600, color: customAccentColor }}>
                                                        Tech Stack: {proj.technologies.join(', ')}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education */}
                            {educations.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h3 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ height: '3px', width: '20px', backgroundColor: customAccentColor, display: 'inline-block' }}></span>
                                        Education
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing }}>
                                        {educations.map(edu => (
                                            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <div>
                                                    <p style={{ fontWeight: 700, fontSize: fontSizes.itemTitle, color: 'var(--text-main)' }}>{edu.degree} in {edu.fieldOfStudy}</p>
                                                    <p style={{ fontSize: '0.82em', color: 'var(--text-muted)' }}>{edu.school}</p>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <p style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>{edu.endDate}</p>
                                                    {edu.score && <p style={{ fontSize: '0.75em', fontWeight: 600 }}>GPA: {edu.score}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            // ----------------------------------------------------
            // CASE 2: EXECUTIVE CORPORATE TEMPLATE (Centred Serif formal style)
            // ----------------------------------------------------
            case 'executive-corporate':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.gap, fontFamily: 'var(--font-serif)', color: '#111' }}>
                        {/* Header info - Center aligned styling */}
                        <div style={{ textAlign: 'center', borderBottom: `2px double ${customAccentColor}`, paddingBottom: '12px' }}>
                            <h1 style={{ fontSize: fontSizes.name, fontWeight: 700, letterSpacing: '0.5px', marginBottom: '4px' }}>
                                {personalInfo.name || 'Your Name'}
                            </h1>
                            <p style={{ fontSize: fontSizes.itemTitle, fontStyle: 'italic', color: '#444', marginBottom: '8px' }}>
                                {personalInfo.title || 'Professional Title'}
                            </p>

                            {/* Inline layout contacts */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', fontSize: '0.76rem', color: '#555' }}>
                                {personalInfo.email && <span>{personalInfo.email}</span>}
                                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                                {personalInfo.location && <span>{personalInfo.location}</span>}
                                {personalInfo.website && <span>{personalInfo.website}</span>}
                                {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
                                {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
                            </div>
                        </div>

                        {/* Profile Bio */}
                        {personalInfo.summary && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <p style={{ fontSize: '0.85em', fontStyle: 'italic', textAlign: 'justify', lineHeight: 1.4 }}>{personalInfo.summary}</p>
                            </div>
                        )}

                        {/* Experiences (Serif spacing) */}
                        {experiences.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <h3 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', textAlign: 'center', borderBottom: '1px solid #777', paddingBottom: '2px', fontWeight: 700, letterSpacing: '1px' }}>
                                    Professional Experience
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing }}>
                                    {experiences.map(exp => (
                                        <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ fontWeight: 700, fontSize: fontSizes.itemTitle }}>
                                                    {exp.position} &mdash; <span style={{ fontWeight: 500 }}>{exp.company}</span>
                                                </span>
                                                <span style={{ fontSize: '0.82em', fontStyle: 'italic' }}>
                                                    {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                                                </span>
                                            </div>
                                            {exp.description && <p style={{ fontSize: '0.82em', color: '#333' }}>{exp.description}</p>}
                                            {exp.bulletPoints.length > 0 && exp.bulletPoints.some(Boolean) && (
                                                <ul style={{ paddingLeft: '22px', margin: '2px 0 0 0', fontSize: '0.8em', listStyleType: 'square' }}>
                                                    {exp.bulletPoints.filter(Boolean).map((pt, pidx) => (
                                                        <li key={pidx} style={{ marginBottom: '2px' }}>{pt}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects (Executive) */}
                        {projects.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <h3 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', textAlign: 'center', borderBottom: '1px solid #777', paddingBottom: '2px', fontWeight: 700, letterSpacing: '1px' }}>
                                    Key Development Projects
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing }}>
                                    {projects.map(proj => (
                                        <div key={proj.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ fontWeight: 700, fontSize: fontSizes.itemTitle }}>
                                                    {proj.name} {proj.role ? <span style={{ fontWeight: 400, fontStyle: 'italic' }}>({proj.role})</span> : null}
                                                </span>
                                                {proj.url && <span style={{ fontSize: '0.78em', textDecoration: 'underline' }}>{proj.url}</span>}
                                            </div>
                                            {proj.description && <p style={{ fontSize: '0.8em', color: '#333' }}>{proj.description}</p>}
                                            {proj.technologies.length > 0 && (
                                                <p style={{ fontSize: '0.75em', fontStyle: 'italic' }}>Related tech: {proj.technologies.join(', ')}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education (Executive) */}
                        {educations.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <h3 style={{ fontSize: fontSizes.sectionTitle, textTransform: 'uppercase', textAlign: 'center', borderBottom: '1px solid #777', paddingBottom: '2px', fontWeight: 700, letterSpacing: '1px' }}>
                                    Education
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing }}>
                                    {educations.map(edu => (
                                        <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                            <div>
                                                <p style={{ fontWeight: 700, fontSize: fontSizes.itemTitle }}>{edu.degree} in {edu.fieldOfStudy}</p>
                                                <p style={{ fontSize: '0.82em', fontStyle: 'italic' }}>{edu.school}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontSize: '0.8em' }}>{edu.endDate}</p>
                                                {edu.score && <p style={{ fontSize: '0.75em', fontWeight: 650 }}>GPA: {edu.score}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills & Certifications */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '4px' }}>
                            {skills.length > 0 && (
                                <div>
                                    <h4 style={{ fontSize: fontSizes.sectionTitle, borderBottom: '1px solid #777', paddingBottom: '2px', fontWeight: 700, marginBottom: '6px' }}>
                                        Skills & Areas of Expertise
                                    </h4>
                                    <div style={{ fontSize: '0.8em', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {Object.entries(skillsByCategory).map(([cat, list]) => (
                                            <p key={cat}>
                                                <strong>{cat}:</strong> {list.map(s => s.name).join(', ')}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {certifications.length > 0 && certifications.some(Boolean) && (
                                <div>
                                    <h4 style={{ fontSize: fontSizes.sectionTitle, borderBottom: '1px solid #777', paddingBottom: '2px', fontWeight: 700, marginBottom: '6px' }}>
                                        Professional Credentials
                                    </h4>
                                    <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '0.8em', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                        {certifications.filter(Boolean).map((cert, cidx) => (
                                            <li key={cidx}>{cert}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                );

            // ----------------------------------------------------
            // CASE 3: MINIMALIST TEMPLATE (Clean layouts, generous padding)
            // ----------------------------------------------------
            case 'minimalist':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.gap, color: '#333' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #eaeaea', paddingBottom: '12px' }}>
                            <div>
                                <h1 style={{ fontSize: fontSizes.name, fontWeight: 500, color: '#000', letterSpacing: '-0.5px', marginBottom: '2px' }}>
                                    {personalInfo.name || 'Your Name'}
                                </h1>
                                <p style={{ fontSize: fontSizes.itemTitle, fontWeight: 550, color: 'var(--text-muted)' }}>
                                    {personalInfo.title || 'Professional Title'}
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', fontSize: '0.78rem', color: '#666', textAlign: 'right' }}>
                                {personalInfo.email && <span>{personalInfo.email}</span>}
                                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                                {personalInfo.location && <span>{personalInfo.location}</span>}
                                <div>
                                    {personalInfo.website && <span style={{ marginRight: '6px' }}>{personalInfo.website}</span>}
                                    {personalInfo.github && <span style={{ marginRight: '6px' }}>gh: {personalInfo.github}</span>}
                                    {personalInfo.linkedin && <span>li: {personalInfo.linkedin}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Profile Bio */}
                        {personalInfo.summary && (
                            <p style={{ fontSize: '0.82em', lineHeight: 1.45, color: '#444' }}>{personalInfo.summary}</p>
                        )}

                        {/* Work Experiences */}
                        {experiences.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <h3 style={{ fontSize: fontSizes.sectionTitle, fontWeight: 650, color: '#000', letterSpacing: '0.5px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>
                                    Experience
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing }}>
                                    {experiences.map(exp => (
                                        <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ fontWeight: 600, fontSize: fontSizes.itemTitle, color: '#222' }}>
                                                    {exp.position} at {exp.company}
                                                </span>
                                                <span style={{ fontSize: '0.8em', color: '#777' }}>
                                                    {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                                                </span>
                                            </div>
                                            {exp.description && <p style={{ fontSize: '0.82em', color: '#555' }}>{exp.description}</p>}
                                            {exp.bulletPoints.length > 0 && exp.bulletPoints.some(Boolean) && (
                                                <ul style={{ paddingLeft: '15px', margin: '2px 0 0 0', fontSize: '0.8em', display: 'flex', flexDirection: 'column', gap: '2px', color: '#555' }}>
                                                    {exp.bulletPoints.filter(Boolean).map((pt, pidx) => (
                                                        <li key={pidx}>{pt}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {projects.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <h3 style={{ fontSize: fontSizes.sectionTitle, fontWeight: 650, color: '#000', letterSpacing: '0.5px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>
                                    Projects
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing }}>
                                    {projects.map(proj => (
                                        <div key={proj.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ fontWeight: 600, fontSize: fontSizes.itemTitle, color: '#222' }}>
                                                    {proj.name} {proj.role ? <span style={{ fontWeight: 400, color: '#666', fontSize: '0.9em' }}>&bull; {proj.role}</span> : null}
                                                </span>
                                                {proj.url && <span style={{ fontSize: '0.75em', color: '#888' }}>{proj.url}</span>}
                                            </div>
                                            {proj.description && <p style={{ fontSize: '0.8em', color: '#555' }}>{proj.description}</p>}
                                            {proj.technologies.length > 0 && (
                                                <p style={{ fontSize: '0.75em', color: '#777' }}>Keywords: {proj.technologies.join(', ')}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {educations.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <h3 style={{ fontSize: fontSizes.sectionTitle, fontWeight: 650, color: '#000', letterSpacing: '0.5px', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>
                                    Education
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing }}>
                                    {educations.map(edu => (
                                        <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                            <div>
                                                <p style={{ fontWeight: 600, fontSize: fontSizes.itemTitle, color: '#222' }}>{edu.degree} in {edu.fieldOfStudy}</p>
                                                <p style={{ fontSize: '0.8em', color: '#666' }}>{edu.school}</p>
                                            </div>
                                            <div style={{ textAlign: 'right', fontSize: '0.8em', color: '#666' }}>
                                                <p>{edu.endDate}</p>
                                                {edu.score && <p style={{ fontWeight: 650 }}>GPA: {edu.score}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Skills & Certs */}
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                            {skills.length > 0 && (
                                <div>
                                    <h4 style={{ fontSize: fontSizes.sectionTitle, fontWeight: 650, color: '#000', marginBottom: '4px' }}>Skills & Technical Expertise</h4>
                                    <div style={{ fontSize: '0.8em', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                        {Object.entries(skillsByCategory).map(([cat, list]) => (
                                            <p key={cat}>
                                                <strong>{cat}:</strong> {list.map(s => s.name).join(', ')}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {certifications.length > 0 && certifications.some(Boolean) && (
                                <div>
                                    <h4 style={{ fontSize: fontSizes.sectionTitle, fontWeight: 650, color: '#000', marginBottom: '4px' }}>Certifications</h4>
                                    <ul style={{ paddingLeft: '14px', margin: 0, fontSize: '0.8em', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        {certifications.filter(Boolean).map((cert, cidx) => (
                                            <li key={cidx}>{cert}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                );

            // ----------------------------------------------------
            // CASE 4: CREATIVE GLASS (Colored badges, nice accent header)
            // ----------------------------------------------------
            case 'creative-glass':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.gap }}>
                        {/* Header banner style */}
                        <div style={{
                            background: `linear-gradient(135deg, ${customAccentColor}, hsl(${(Number(config.primaryColor) + 40) % 360}, 80%, 50%))`,
                            color: 'white',
                            padding: '24px',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                        }}>
                            <h1 style={{ fontSize: fontSizes.name, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
                                {personalInfo.name || 'Your Name'}
                            </h1>
                            <p style={{ fontSize: fontSizes.itemTitle, fontWeight: 500, opacity: 0.9 }}>
                                {personalInfo.title || 'Professional Title'}
                            </p>

                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '12px',
                                fontSize: '0.78em',
                                opacity: 0.85,
                                borderTop: '1px solid rgba(255,255,255,0.2)',
                                paddingTop: '8px',
                                marginTop: '4px'
                            }}>
                                {personalInfo.email && <span>{personalInfo.email}</span>}
                                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                                {personalInfo.location && <span>{personalInfo.location}</span>}
                                {personalInfo.website && <span>{personalInfo.website}</span>}
                                {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
                                {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
                            </div>
                        </div>

                        {/* Profile Bio */}
                        {personalInfo.summary && (
                            <div style={{ borderLeft: `3px solid ${customAccentColor}`, paddingLeft: '12px' }}>
                                <p style={{ fontSize: '0.82em', lineHeight: 1.45, color: 'var(--text-main)' }}>{personalInfo.summary}</p>
                            </div>
                        )}

                        {/* Experience timeline */}
                        {experiences.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <h3 style={{ fontSize: fontSizes.sectionTitle, color: customAccentColor, fontWeight: 750, letterSpacing: '0.5px' }}>
                                    Professional Journey
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: spacingStyle.itemSpacing, borderLeft: '2px solid var(--border)', paddingLeft: '14px', marginLeft: '6px' }}>
                                    {experiences.map(exp => (
                                        <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px', position: 'relative' }}>
                                            {/* Timeline dot */}
                                            <span style={{
                                                position: 'absolute',
                                                left: '-20px',
                                                top: '4px',
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                backgroundColor: customAccentColor,
                                                border: '2px solid white'
                                            }}></span>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ fontWeight: 700, fontSize: fontSizes.itemTitle, color: 'var(--text-main)' }}>
                                                    {exp.position} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>at</span> {exp.company}
                                                </span>
                                                <span style={{ fontSize: '0.78em', backgroundColor: customAccentLight, color: customAccentDark, padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
                                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                                </span>
                                            </div>
                                            {exp.description && <p style={{ fontSize: '0.82em', color: 'var(--text-muted)' }}>{exp.description}</p>}
                                            {exp.bulletPoints.length > 0 && exp.bulletPoints.some(Boolean) && (
                                                <ul style={{ paddingLeft: '15px', margin: '2px 0 0 0', fontSize: '0.81em', display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
                                                    {exp.bulletPoints.filter(Boolean).map((pt, pidx) => (
                                                        <li key={pidx}>{pt}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects (Creative) */}
                        {projects.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <h3 style={{ fontSize: fontSizes.sectionTitle, color: customAccentColor, fontWeight: 750, letterSpacing: '0.5px' }}>
                                    Personal Projects
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    {projects.map(proj => (
                                        <div key={proj.id} style={{
                                            padding: '10px',
                                            backgroundColor: 'rgba(255,255,255,0.4)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                <span style={{ fontWeight: 700, fontSize: '0.85em', color: 'var(--text-main)' }}>{proj.name}</span>
                                                {proj.url && <span style={{ fontSize: '0.7em', color: 'var(--text-muted)' }}>{proj.url}</span>}
                                            </div>
                                            <p style={{ fontSize: '0.78em', color: 'var(--text-muted)', flexGrow: 1 }}>{proj.description}</p>
                                            {proj.technologies.length > 0 && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                                                    {proj.technologies.map((t, idx) => (
                                                        <span key={idx} style={{ fontSize: '0.67em', backgroundColor: 'var(--border)', padding: '1px 5px', borderRadius: '3px' }}>{t}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education and Skills / Certs */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px dashed var(--border)', paddingTop: '12px' }}>
                            {/* Education */}
                            {educations.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <h4 style={{ fontSize: fontSizes.sectionTitle, color: customAccentColor, fontWeight: 700 }}>Education</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {educations.map(edu => (
                                            <div key={edu.id} style={{ fontSize: '0.8em' }}>
                                                <p style={{ fontWeight: 700 }}>{edu.degree} &mdash; {edu.fieldOfStudy}</p>
                                                <p style={{ color: 'var(--text-muted)' }}>{edu.school} ({edu.endDate})</p>
                                                {edu.score && <p style={{ fontWeight: 650, color: customAccentColor }}>GPA: {edu.score}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills */}
                            {skills.length > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <h4 style={{ fontSize: fontSizes.sectionTitle, color: customAccentColor, fontWeight: 700 }}>Skills & Toolbox</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {skills.map(s => (
                                            <span key={s.id} style={{
                                                fontSize: '0.75em',
                                                backgroundColor: customAccentLight,
                                                color: customAccentDark,
                                                padding: '2px 8px',
                                                borderRadius: '999px',
                                                fontWeight: 500,
                                                border: `1px solid hsl(${config.primaryColor}, 70%, 85%)`
                                            }}>
                                                {s.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div
            id="resume-a4-target"
            className="print-container"
            style={{
                boxSizing: 'border-box',
                width: '210mm',
                minHeight: '297mm',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-xl)',
                padding: spacingStyle.padding,
                color: 'var(--text-main)',
                fontFamily: fontClass,
                fontSize: fontSizes.base,
                transition: 'all 0.3s ease',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {renderTemplateContent()}
        </div>
    );
};
