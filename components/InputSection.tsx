import React from 'react';
import { Wand2, Link, Type } from 'lucide-react';

interface InputSectionProps {
  topic: string;
  adLink: string;
  setTopic: (val: string) => void;
  setAdLink: (val: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  topic,
  adLink,
  setTopic,
  setAdLink,
  onGenerate,
  isLoading,
}) => {
  const isFormValid = topic.trim().length > 2 && adLink.trim().length > 5;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Campaign Details</h2>
          <p className="text-slate-500 mt-2">Enter your niche and affiliate link to generate a conversion machine.</p>
        </div>

        {/* Topic Input */}
        <div className="space-y-2">
          <label htmlFor="topic" className="flex items-center text-sm font-semibold text-slate-700">
            <Type className="w-4 h-4 mr-2 text-indigo-500" />
            Website Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Best AI Video Tools, Lose Weight Fast, Make Money Online"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-slate-800 placeholder:text-slate-400"
            disabled={isLoading}
          />
        </div>

        {/* Link Input */}
        <div className="space-y-2">
          <label htmlFor="adLink" className="flex items-center text-sm font-semibold text-slate-700">
            <Link className="w-4 h-4 mr-2 text-indigo-500" />
            Adsterra / Direct Link
          </label>
          <input
            id="adLink"
            type="url"
            value={adLink}
            onChange={(e) => setAdLink(e.target.value)}
            placeholder="https://direct-link.com/..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-slate-800 placeholder:text-slate-400"
            disabled={isLoading}
          />
        </div>

        {/* Action Button */}
        <button
          onClick={onGenerate}
          disabled={!isFormValid || isLoading}
          className={`
            w-full mt-6 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center transition-all transform
            ${
              !isFormValid || isLoading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]'
            }
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Assets...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Website
            </>
          )}
        </button>
      </div>
    </div>
  );
};