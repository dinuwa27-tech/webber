import React, { useState } from 'react';
import { Copy, Check, Eye, Code, Image as ImageIcon, ExternalLink, RefreshCw } from 'lucide-react';
import { GeneratedContent } from '../types';

interface ResultViewerProps {
  content: GeneratedContent;
  onReset: () => void;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ content, onReset }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(content.landingPageHTML);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(content.thumbnailPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      
      {/* Navigation & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'preview' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-4 h-4" /> Preview Site
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'code' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Code className="w-4 h-4" /> Get HTML Code
          </button>
        </div>

        <button
            onClick={onReset}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2"
        >
            <RefreshCw className="w-4 h-4" /> Start New Campaign
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {activeTab === 'preview' ? (
          <div className="relative w-full h-[600px] bg-slate-50">
             <div className="absolute top-0 left-0 right-0 bg-slate-800 text-white text-xs py-1 px-4 text-center opacity-80 z-10">
                Interactive Preview (Links are active)
            </div>
            <iframe
              title="Generated Landing Page"
              srcDoc={content.landingPageHTML}
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-popups allow-same-origin"
            />
          </div>
        ) : (
          <div className="relative">
             <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleCopyCode}
                className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all
                    ${copiedCode ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
                `}
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? 'Copied!' : 'Copy HTML'}
              </button>
            </div>
            <pre className="w-full h-[600px] overflow-auto p-6 bg-slate-900 text-slate-300 text-sm font-mono leading-relaxed">
              <code>{content.landingPageHTML}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Nano Banana Image Prompt Section */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 shadow-md">
        <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-lg font-bold text-yellow-800">
                    <ImageIcon className="w-5 h-5" />
                    Nano Banana Thumbnail Prompt
                </h3>
                <p className="text-yellow-700/80 text-sm">
                    Copy this prompt into your image generator (e.g., Midjourney, Gemini, Leonardo) to create a high-CTR thumbnail.
                </p>
            </div>
            <button
                onClick={handleCopyPrompt}
                className={`
                    shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all border
                    ${copiedPrompt 
                        ? 'bg-green-100 text-green-700 border-green-200' 
                        : 'bg-white text-yellow-800 border-yellow-200 hover:bg-yellow-100'
                    }
                `}
            >
                {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedPrompt ? 'Copied' : 'Copy Prompt'}
            </button>
        </div>
        
        <div className="mt-4 p-4 bg-white/60 rounded-xl border border-yellow-100 font-mono text-sm text-slate-800 break-words whitespace-pre-wrap">
            {content.thumbnailPrompt}
        </div>
      </div>
    </div>
  );
};