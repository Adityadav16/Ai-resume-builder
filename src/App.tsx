import { useState, useEffect } from 'react';
import { FileText, Download, PenLine, Bot, Moon, Sun } from 'lucide-react';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { AIChatBot } from './components/AIChatBot';
import type { ResumeData, ResumeStyleConfig, TemplateType } from './types/resume';
import { softwareEngineerPreset, productManagerPreset, designerPreset, emptyPreset } from './utils/presets';
import html2pdf from 'html2pdf.js';

function App() {
  // Application State
  const [resumeData, setResumeData] = useState<ResumeData>(softwareEngineerPreset);
  const [styleConfig, setStyleConfig] = useState<ResumeStyleConfig>({
    template: 'modern-tech',
    primaryColor: '262', // Violet
    fontSize: 'md',
    fontFamily: 'sans',
    spacing: 'normal'
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'bot'>('editor');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // AI Active target states (from Editor clicks to bot)
  const [activeImproveTarget, setActiveImproveTarget] = useState<{
    section: string;
    index: number;
    field: string;
    currentValue: string;
  } | null>(null);

  // Apply dark mode styling class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load preset handler
  const loadPreset = (presetName: string) => {
    switch (presetName) {
      case 'swe':
        setResumeData(softwareEngineerPreset);
        setStyleConfig(prev => ({ ...prev, template: 'modern-tech', primaryColor: '262' }));
        break;
      case 'pm':
        setResumeData(productManagerPreset);
        setStyleConfig(prev => ({ ...prev, template: 'executive-corporate', primaryColor: '200' }));
        break;
      case 'designer':
        setResumeData(designerPreset);
        setStyleConfig(prev => ({ ...prev, template: 'creative-glass', primaryColor: '346' }));
        break;
      case 'empty':
        setResumeData(emptyPreset);
        break;
      default:
        break;
    }
  };

  // PDF Export flow using html2pdf
  const handleDownloadPdf = () => {
    const element = document.getElementById('resume-a4-target');
    if (!element) return;

    setIsDownloading(true);

    // Config file for html2pdf page conversion
    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.name || 'Resume'}_AI_Builder.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    // Trigger visual confetti celebration
    import('canvas-confetti').then((conf) => {
      conf.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    });

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsDownloading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsDownloading(false);
      });
  };

  // Listener to select text improvement from ResumeEditor
  const handleSelectAiImproveText = (section: string, index: number, field: string, currentValue: string) => {
    setActiveImproveTarget({ section, index, field, currentValue });
    setActiveTab('bot'); // Switch view tab to AI Chatbot
  };

  const handleClearImproveTarget = () => {
    setActiveImproveTarget(null);
  };

  // Preset accent hues
  const colorAccents = [
    { name: 'Violet', value: '262' },
    { name: 'Blue', value: '200' },
    { name: 'Green', value: '142' },
    { name: 'Rust', value: '15' },
    { name: 'Rose', value: '346' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>

      {/* 1. Header Toolbar */}
      <header className="glassmorphism" style={{
        padding: '14px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--accent-gradient)', padding: '8px', borderRadius: '10px', display: 'inline-flex', boxShadow: '0 4px 12px var(--accent-muted)' }}>
            <FileText size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ResumeAI <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '2px 6px', borderRadius: '999px', backgroundColor: 'var(--accent-muted)', color: 'var(--accent)' }}>v1.0 Pro</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI-driven building assistant</p>
          </div>
        </div>

        {/* Load Preset presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 650, color: 'var(--text-muted)' }}>LOAD PRESET:</span>
          <button onClick={() => loadPreset('swe')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px' }}>Software Engineer</button>
          <button onClick={() => loadPreset('pm')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px' }}>Product Manager</button>
          <button onClick={() => loadPreset('designer')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px' }}>Designer</button>
          <button onClick={() => loadPreset('empty')} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem', borderRadius: '6px', color: 'var(--error)' }}>Clear</button>
        </div>

        {/* Action Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="btn btn-secondary"
            style={{ padding: '8px', borderRadius: '50%' }}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={handleDownloadPdf}
            className="btn btn-primary pulse-glow"
            disabled={isDownloading}
            style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)' }}
          >
            <Download size={16} />
            {isDownloading ? 'Structuring PDF...' : 'Download PDF'}
          </button>
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'minmax(420px, 480px) 1fr',
        overflow: 'hidden'
      }}>

        {/* Left Column: Editor Accordion & Chat Assistant */}
        <section style={{
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-sidebar)',
          height: 'calc(100vh - 74px)',
          position: 'sticky',
          top: '74px'
        }}>
          {/* Tabs header selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
            <button
              onClick={() => setActiveTab('editor')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'editor' ? '3px solid var(--accent)' : 'none',
                color: activeTab === 'editor' ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: activeTab === 'editor' ? 700 : 500,
                fontSize: '0.9rem',
                padding: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <PenLine size={16} /> Resume Forms
            </button>
            <button
              onClick={() => setActiveTab('bot')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'bot' ? '3px solid var(--accent)' : 'none',
                color: activeTab === 'bot' ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: activeTab === 'bot' ? 700 : 500,
                fontSize: '0.9rem',
                padding: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              <Bot size={16} /> AI Chatbot
              {activeImproveTarget && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  height: '8px',
                  width: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--error)'
                }}></span>
              )}
            </button>
          </div>

          {/* Panel views */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {activeTab === 'editor' ? (
              <ResumeEditor
                data={resumeData}
                onChange={setResumeData}
                onSelectAiImproveText={handleSelectAiImproveText}
              />
            ) : (
              <AIChatBot
                data={resumeData}
                onChange={setResumeData}
                activeImproveTarget={activeImproveTarget}
                onClearImproveTarget={handleClearImproveTarget}
              />
            )}
          </div>
        </section>

        {/* Right Column: Customization Controls & Live Preview Sheet */}
        <section style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          height: 'calc(100vh - 74px)'
        }}>

          {/* Customization Options Bar */}
          <div className="glassmorphism" style={{
            width: '100%',
            maxWidth: '210mm',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Style template selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Template Style</span>
              <select
                value={styleConfig.template}
                onChange={e => setStyleConfig(prev => ({ ...prev, template: e.target.value as TemplateType }))}
                className="input-field"
                style={{ padding: '6px 12px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                <option value="modern-tech">Modern Tech</option>
                <option value="executive-corporate">Executive Corporate</option>
                <option value="minimalist">Minimalist</option>
                <option value="creative-glass">Creative Glass</option>
              </select>
            </div>

            {/* Accent Color picker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Accent Highlight</span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {colorAccents.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setStyleConfig(prev => ({ ...prev, primaryColor: color.value }))}
                    style={{
                      height: '22px',
                      width: '22px',
                      borderRadius: '50%',
                      backgroundColor: `hsl(${color.value}, 75%, 55%)`,
                      border: styleConfig.primaryColor === color.value ? '2.5px solid var(--text-main)' : '1px solid var(--border)',
                      cursor: 'pointer',
                      boxShadow: styleConfig.primaryColor === color.value ? 'var(--shadow-sm)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Typography selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Font Family</span>
              <select
                value={styleConfig.fontFamily}
                onChange={e => setStyleConfig(prev => ({ ...prev, fontFamily: e.target.value as ResumeStyleConfig['fontFamily'] }))}
                className="input-field"
                style={{ padding: '6px 12px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                <option value="sans">Sans-Serif (Modern)</option>
                <option value="serif">Serif (Elegant)</option>
                <option value="mono">Monospace (Technical)</option>
              </select>
            </div>

            {/* Font Sizing selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scale Size</span>
              <select
                value={styleConfig.fontSize}
                onChange={e => setStyleConfig(prev => ({ ...prev, fontSize: e.target.value as ResumeStyleConfig['fontSize'] }))}
                className="input-field"
                style={{ padding: '6px 12px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                <option value="sm">Small</option>
                <option value="md">Regular</option>
                <option value="lg">Large</option>
              </select>
            </div>

            {/* Spacing density selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Density Spacing</span>
              <select
                value={styleConfig.spacing}
                onChange={e => setStyleConfig(prev => ({ ...prev, spacing: e.target.value as ResumeStyleConfig['spacing'] }))}
                className="input-field"
                style={{ padding: '6px 12px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                <option value="compact">Compact</option>
                <option value="normal">Normal</option>
                <option value="loose">Loose</option>
              </select>
            </div>

          </div>

          {/* Actual template rendering area */}
          <div style={{ width: '100%', maxWidth: '210mm', display: 'flex', justifyContent: 'center' }}>
            <ResumePreview
              data={resumeData}
              config={styleConfig}
            />
          </div>

        </section>

      </main>
    </div>
  );
}

export default App;
