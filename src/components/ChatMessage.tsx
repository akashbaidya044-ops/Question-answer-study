import React, { useState } from 'react';
import { ChatMessage as ChatMessageType, AppLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Volume2,
  VolumeX,
  Copy,
  Check,
  Bookmark,
  Sparkles,
  Lightbulb,
  HelpCircle,
  Calculator,
  ArrowRight,
  Globe
} from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';

interface ChatMessageProps {
  message: ChatMessageType;
  onQuickAction: (actionPrompt: string) => void;
  onSaveNote: (title: string, question: string, solution: string) => void;
  isSaved?: boolean;
  currentLanguage: AppLanguage;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onQuickAction,
  onSaveNote,
  isSaved = false,
  currentLanguage,
}) => {
  const isModel = message.role === 'model';
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const t = TRANSLATIONS[currentLanguage];

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSpeech = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakText(
        message.content,
        currentLanguage,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  // Format content with special student-friendly section cards across bn, en, hi
  const renderFormattedContent = (rawText: string) => {
    const lines = rawText.split('\n');

    return (
      <div className="space-y-3 text-slate-800 leading-relaxed font-normal text-[15px]">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Section headers detection (Bengali, English, Hindi)
          if (
            trimmed.includes('চিহ্নিত প্রশ্ন') ||
            trimmed.includes('Transcribed Question') ||
            trimmed.includes('पहचाना गया प्रश्न')
          ) {
            return (
              <div
                key={idx}
                className="mt-2 mb-2 p-3 bg-amber-50/90 border border-amber-200 rounded-xl text-amber-950 flex items-start gap-2.5 shadow-2xs"
              >
                <div className="p-1 rounded-md bg-amber-200/70 text-amber-800 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="flex-1 font-medium">{formatInlineBold(trimmed)}</div>
              </div>
            );
          }

          if (
            trimmed.includes('ধাপে ধাপে সমাধান') ||
            trimmed.includes('Step-by-Step Solution') ||
            trimmed.includes('चरणबद्ध हल')
          ) {
            return (
              <div
                key={idx}
                className="mt-4 mb-2 pb-1 border-b border-emerald-200 text-emerald-800 font-bold text-base flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{formatInlineBold(trimmed)}</span>
              </div>
            );
          }

          if (
            trimmed.includes('মূল ধারণা') ||
            trimmed.includes('Core Concept') ||
            trimmed.includes('मुख्य अवधारणा')
          ) {
            return (
              <div
                key={idx}
                className="mt-3 p-3 bg-indigo-50/90 border border-indigo-200 rounded-xl text-indigo-950 flex items-start gap-2.5 shadow-2xs"
              >
                <div className="p-1 rounded-md bg-indigo-200/70 text-indigo-800 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1">{formatInlineBold(trimmed)}</div>
              </div>
            );
          }

          if (
            trimmed.includes('ব্যবহৃত সূত্র') ||
            trimmed.includes('Formulas Used') ||
            trimmed.includes('प्रयुक्त सूत्र')
          ) {
            return (
              <div
                key={idx}
                className="mt-2 p-3 bg-teal-50/90 border border-teal-200 rounded-xl text-teal-950 font-medium flex items-start gap-2.5 shadow-2xs"
              >
                <div className="p-1 rounded-md bg-teal-200/70 text-teal-800 mt-0.5">
                  <Calculator className="w-4 h-4" />
                </div>
                <div className="flex-1">{formatInlineBold(trimmed)}</div>
              </div>
            );
          }

          if (
            trimmed.includes('চূড়ান্ত উত্তর') ||
            trimmed.includes('Final Answer') ||
            trimmed.includes('अंतिम उत्तर')
          ) {
            return (
              <div
                key={idx}
                className="my-3 p-3.5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/15 border-2 border-emerald-400 rounded-xl text-emerald-950 font-semibold flex items-center gap-3 shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  ✓
                </div>
                <div className="text-base text-emerald-900">{formatInlineBold(trimmed)}</div>
              </div>
            );
          }

          // Bullet points
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className="text-emerald-500 font-bold mt-1 text-sm">•</span>
                <span className="flex-1">{formatInlineBold(trimmed.substring(2))}</span>
              </div>
            );
          }

          // Numbered lists (1. 2. etc.)
          const numberedMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
          if (numberedMatch) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2 my-1">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {numberedMatch[1]}
                </span>
                <span className="flex-1 font-normal">{formatInlineBold(numberedMatch[2])}</span>
              </div>
            );
          }

          // General headers
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-base font-bold text-slate-800 mt-3 mb-1">
                {formatInlineBold(trimmed.substring(4))}
              </h3>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={idx} className="text-lg font-bold text-slate-900 mt-4 mb-1">
                {formatInlineBold(trimmed.substring(3))}
              </h2>
            );
          }

          return <p key={idx}>{formatInlineBold(trimmed)}</p>;
        })}
      </div>
    );
  };

  const formatInlineBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded-md bg-slate-100 text-emerald-800 font-mono text-sm border border-slate-200"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex flex-col ${isModel ? 'items-start' : 'items-end'} mb-6 group`}>
      <div className={`flex items-start gap-3 max-w-[92%] sm:max-w-[85%] ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div
          className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
            isModel
              ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white'
              : 'bg-slate-700 text-white'
          }`}
        >
          {isModel ? <Sparkles className="w-5 h-5" /> : <span className="font-bold text-xs">{t.studentBadge}</span>}
        </div>

        {/* Message Bubble */}
        <div
          className={`rounded-2xl p-4 sm:p-5 shadow-xs transition-all ${
            isModel
              ? 'bg-white border border-emerald-100/90 text-slate-800'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/10'
          }`}
        >
          {/* Attached Image if any */}
          {message.image && (
            <div className="mb-3 rounded-xl overflow-hidden border border-slate-200 bg-slate-900/5 max-w-sm">
              <img
                src={message.image.previewUrl}
                alt="Question photo"
                className="w-full max-h-60 object-contain bg-white"
              />
              <div className="px-2.5 py-1 text-xs text-slate-500 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span>{t.photoQuestionBadge}</span>
                <span className="text-[11px]">{t.analyzedByAi}</span>
              </div>
            </div>
          )}

          {/* Text Content */}
          {isModel ? (
            renderFormattedContent(message.content)
          ) : (
            <div className="text-[15px] font-medium whitespace-pre-wrap">{message.content}</div>
          )}

          {/* Model Bottom Utility Actions */}
          {isModel && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleSpeech}
                  className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                    isPlayingAudio
                      ? 'bg-amber-100 text-amber-800 font-semibold animate-pulse'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                  title={isPlayingAudio ? t.stopAudio : t.readAloud}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" /> {t.stopAudio}
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> {t.readAloud}
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center gap-1.5 transition-colors"
                  title={t.copy}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> {t.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> {t.copy}
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    onSaveNote(
                      message.content.slice(0, 35) + '...',
                      t.notesSubtitle,
                      message.content
                    )
                  }
                  className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                    isSaved
                      ? 'bg-amber-50 text-amber-700 font-semibold'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                  title={t.saveNote}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                  {isSaved ? t.saved : t.saveNote}
                </button>
              </div>

              <div className="text-[11px] text-slate-400">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Student Follow-up Action Chips (Only for Model Responses) */}
      {isModel && (
        <div className="mt-2.5 ml-12 flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onQuickAction(t.didNotUnderstandPrompt)}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all flex items-center gap-1.5 shadow-2xs hover:scale-102"
          >
            <HelpCircle className="w-3 h-3 text-amber-600" /> {t.didNotUnderstand}
          </button>

          <button
            onClick={() => onQuickAction(t.giveAnalogyPrompt)}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all flex items-center gap-1.5 shadow-2xs hover:scale-102"
          >
            <Lightbulb className="w-3 h-3 text-emerald-600" /> {t.giveAnalogy}
          </button>

          <button
            onClick={() => onQuickAction(t.showFormulasPrompt)}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 transition-all flex items-center gap-1.5 shadow-2xs hover:scale-102"
          >
            <Calculator className="w-3 h-3 text-cyan-600" /> {t.showFormulas}
          </button>

          <button
            onClick={() => onQuickAction(t.twoPracticePrompt)}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-all flex items-center gap-1.5 shadow-2xs hover:scale-102"
          >
            <ArrowRight className="w-3 h-3 text-indigo-600" /> {t.twoPracticeProblems}
          </button>

          {/* Switch language quick chip */}
          {currentLanguage !== 'en' && (
            <button
              onClick={() => onQuickAction('Please explain this exact solution in English for me.')}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center gap-1 shadow-2xs"
            >
              <Globe className="w-3 h-3 text-slate-500" /> In English
            </button>
          )}

          {currentLanguage !== 'hi' && (
            <button
              onClick={() => onQuickAction('कृपया इस पूरे हल को सरल और शुद्ध हिंदी में समझाइए।')}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center gap-1 shadow-2xs"
            >
              <Globe className="w-3 h-3 text-slate-500" /> हिन्दी में
            </button>
          )}

          {currentLanguage !== 'bn' && (
            <button
              onClick={() => onQuickAction('অনুগ্রহ করে এই সম্পূর্ণ সমাধানটি বাংলায় বুঝিয়ে বলো।')}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center gap-1 shadow-2xs"
            >
              <Globe className="w-3 h-3 text-slate-500" /> বাংলায়
            </button>
          )}
        </div>
      )}
    </div>
  );
};
