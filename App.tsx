import React, { useState } from 'react';
import { InputSection } from './components/InputSection';
import { ResultViewer } from './components/ResultViewer';
import { generateCampaignAssets } from './services/geminiService';
import { GeneratedContent, GeneratorState } from './types';
import { Sparkles, Zap, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<GeneratorState>({
    topic: '',
    adLink: '',
    isLoading: false,
    error: null,
    result: null,
  });

  const handleGenerate = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await generateCampaignAssets(state.topic, state.adLink);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        result: result,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }));
    }
  };

  const handleReset = () => {
    setState({
        topic: '',
        adLink: '',
        isLoading: false,
        error: null,
        result: null,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white pt-16 pb-32 px-4 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 border border-indigo-400/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
             <Sparkles className="w-4 h-4 text-indigo-300" />
             <span className="text-sm font-medium text-indigo-100">AI-Powered CPA Generator</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">High-Converting</span><br />
            Affiliate Sites in Seconds
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Enter a topic and your direct link. Our AI will generate a psychological landing page and a click-worthy thumbnail prompt instantly.
          </p>
        </div>
      </div>

      {/* Main Content Container - Floating Up */}
      <main className="max-w-6xl mx-auto px-4 -mt-20 relative z-20">
        
        {state.error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-sm flex items-center justify-between">
                <div>
                    <strong className="font-bold">Error:</strong> {state.error}
                </div>
                <button onClick={() => setState(prev => ({...prev, error: null}))} className="text-sm underline hover:no-underline">Dismiss</button>
            </div>
        )}

        {!state.result ? (
            <InputSection
                topic={state.topic}
                adLink={state.adLink}
                setTopic={(val) => setState((prev) => ({ ...prev, topic: val }))}
                setAdLink={(val) => setState((prev) => ({ ...prev, adLink: val }))}
                onGenerate={handleGenerate}
                isLoading={state.isLoading}
            />
        ) : (
            <ResultViewer 
                content={state.result} 
                onReset={handleReset}
            />
        )}

        {/* Feature Grid (Only show on input state) */}
        {!state.result && !state.isLoading && (
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-800">Instant HTML5</h3>
                    <p className="text-slate-500">Generates pure, lightweight code ready for Netlify, Blogger, or any shared hosting.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                     <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-800">Psychological Copy</h3>
                    <p className="text-slate-500">Uses urgency, scarcity, and benefit-driven copy to maximize click-through rates.</p>
                </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                     <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                        <ImageIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-800">Thumbnail Prompts</h3>
                    <p className="text-slate-500">Get specific Nano Banana prompts to generate eye-catching visuals for your ads.</p>
                </div>
            </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-slate-400 mt-20 text-sm">
        <p>© {new Date().getFullYear()} Affiliate Landing Generator. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;