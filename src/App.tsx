/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Subject, StudentGrade, ChatMessage as ChatMessageType, ImageAttachment, SavedNote, AppLanguage } from './types';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { QuizModal } from './components/QuizModal';
import { FormulaSheetModal } from './components/FormulaSheetModal';
import { NotesDrawer } from './components/NotesDrawer';
import { ImageCaptureModal } from './components/ImageCaptureModal';
import { AdBanner } from './components/AdBanner';
import { getSampleQuestions, svgToDataUrl, SampleQuestion } from './data/sampleQuestions';
import { TRANSLATIONS } from './i18n/translations';
import {
  Send,
  Camera,
  Mic,
  MicOff,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Calculator,
  BookOpen,
  BrainCircuit,
  X,
  ChevronRight,
  Smile,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [currentLanguage, setLanguage] = useState<AppLanguage>('bn');
  const [currentGrade, setGrade] = useState<StudentGrade>('৯ম-১০ম (এসএসসি)');
  const [currentSubject, setSubject] = useState<Subject>('গণিত (Math)');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<ImageAttachment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizTopic, setQuizTopic] = useState('মৌলিক ধারণা');
  const [isFormulasOpen, setIsFormulasOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>(() => {
    try {
      const stored = localStorage.getItem('shongi_saved_notes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Voice recording state
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const t = TRANSLATIONS[currentLanguage];
  const sampleQuestions = getSampleQuestions(currentLanguage);

  useEffect(() => {
    localStorage.setItem('shongi_saved_notes', JSON.stringify(savedNotes));
  }, [savedNotes]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Voice recognition setup matching active language
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        currentLanguage === 'en'
          ? 'Voice recognition is not supported in this browser. Please use Chrome.'
          : currentLanguage === 'hi'
          ? 'आपके ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है। कृपया क्रोम का उपयोग करें।'
          : 'আপনার ব্রাউজারে ভয়েস রিকগনিশন সুবিধা নেই। অনুগ্রহ করে Chrome ব্রাউজার ব্যবহার করুন।'
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang =
        currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'en' ? 'en-US' : 'bn-BD';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Send message
  const handleSendMessage = async (customPrompt?: string, imageToUse?: ImageAttachment) => {
    const promptToSend = (customPrompt || inputText).trim();
    const imagePayload = imageToUse !== undefined ? imageToUse : attachedImage;

    if (!promptToSend && !imagePayload) return;

    setErrorMessage(null);

    const defaultImgText =
      currentLanguage === 'en'
        ? 'Please solve the question in this photo with step-by-step explanation.'
        : currentLanguage === 'hi'
        ? 'कृपया इस फ़ोटो के सवाल को चरणबद्ध हल करें और विस्तार से समझाएं।'
        : 'অনুগ্রহ করে এই ছবির প্রশ্নটি সমাধান করে বিস্তারিত ব্যাখ্যা দাও।';

    const userMessage: ChatMessageType = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: promptToSend || (imagePayload ? defaultImgText : ''),
      timestamp: Date.now(),
      image: imagePayload || undefined,
      subject: currentSubject,
      grade: currentGrade,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setAttachedImage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          currentInput: promptToSend,
          image: imagePayload
            ? {
                mimeType: imagePayload.mimeType,
                data: imagePayload.data,
              }
            : undefined,
          studentContext: {
            grade: currentGrade,
            subject: currentSubject,
          },
          language: currentLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get answer. Please try again.');
      }

      const modelMessage: ChatMessageType = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text,
        timestamp: Date.now(),
        subject: currentSubject,
        grade: currentGrade,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSampleClick = (sample: SampleQuestion) => {
    if (sample.hasSampleImage && sample.sampleImageSvg) {
      const dataUrl = svgToDataUrl(sample.sampleImageSvg);
      const base64Data = dataUrl.split(',')[1];
      const attachment: ImageAttachment = {
        data: base64Data,
        mimeType: 'image/svg+xml',
        previewUrl: dataUrl,
      };
      setGrade(sample.grade);
      setSubject(sample.subject);
      handleSendMessage(sample.prompt, attachment);
    } else {
      setGrade(sample.grade);
      setSubject(sample.subject);
      handleSendMessage(sample.prompt);
    }
  };

  const handleSaveNote = (title: string, question: string, solution: string) => {
    const newNote: SavedNote = {
      id: `note-${Date.now()}`,
      title,
      subject: currentSubject,
      grade: currentGrade,
      question,
      solution,
      date: new Date().toLocaleDateString(
        currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'en' ? 'en-US' : 'bn-BD',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
      ),
    };
    setSavedNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (id: string) => {
    setSavedNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleResetChat = () => {
    if (messages.length > 0) {
      if (confirm(t.confirmReset)) {
        setMessages([]);
        setErrorMessage(null);
        setAttachedImage(null);
      }
    } else {
      setMessages([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Top Header */}
      <Header
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        currentGrade={currentGrade}
        setGrade={setGrade}
        currentSubject={currentSubject}
        setSubject={setSubject}
        onOpenFormulas={() => setIsFormulasOpen(true)}
        onOpenQuiz={() => {
          setQuizTopic(currentSubject);
          setIsQuizOpen(true);
        }}
        onOpenNotes={() => setIsNotesOpen(true)}
        onResetChat={handleResetChat}
        savedNotesCount={savedNotes.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col justify-between">
        
        {/* Messages / Welcome Area */}
        <div className="flex-1">
          {messages.length === 0 ? (
            /* Welcome Hero & Guidance */
            <div className="py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
              
              {/* Mascot Hero Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 p-6 sm:p-10 text-white shadow-xl shadow-emerald-700/10">
                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-semibold backdrop-blur-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t.welcomeBadge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                    {t.welcomeTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-normal">
                    {t.welcomeDesc}
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      onClick={() => setIsImageModalOpen(true)}
                      className="px-4 py-2.5 rounded-2xl bg-white text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-emerald-600" />
                      {t.photoSolveBtn}
                    </button>
                    <button
                      onClick={() => setIsFormulasOpen(true)}
                      className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      {t.formulaSheetBtn}
                    </button>
                    <button
                      onClick={() => {
                        setQuizTopic(currentSubject);
                        setIsQuizOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <BrainCircuit className="w-4 h-4 text-amber-300" />
                      {t.practiceQuizBtn}
                    </button>
                  </div>
                </div>

                {/* Decorative background glow circles */}
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute right-20 top-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Sample Topics / Questions to Try */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>{t.trySampleTitle}</span>
                  </h3>
                  <span className="text-xs text-slate-400">{t.instantAnswerSubtitle}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {sampleQuestions.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSampleClick(sample)}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 group cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-2xl">{sample.icon}</span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {sample.subject.split(' ')[0]}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                          {sample.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {sample.description}
                        </p>
                      </div>

                      <div className="flex items-center text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                        <span>{t.seeSolution}</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Learning Philosophy banner */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3">
                <Smile className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm space-y-1">
                  <p className="font-bold">{t.philosophyTitle}</p>
                  <p className="text-amber-800 leading-relaxed">
                    {t.philosophyDesc}
                  </p>
                </div>
              </div>

              {/* Google AdMob / AdSense banner slot */}
              <AdBanner placement="bottom-banner" currentLanguage={currentLanguage} />

            </div>
          ) : (
            /* Active Chat Thread */
            <div className="space-y-4 py-2">
              {messages.map((msg, idx) => (
                <React.Fragment key={msg.id}>
                  <ChatMessage
                    message={msg}
                    onQuickAction={(actionPrompt) => handleSendMessage(actionPrompt)}
                    onSaveNote={handleSaveNote}
                    isSaved={savedNotes.some((n) => n.solution === msg.content)}
                    currentLanguage={currentLanguage}
                  />
                  {idx === 2 && <AdBanner placement="in-feed" currentLanguage={currentLanguage} />}
                </React.Fragment>
              ))}

              {isLoading && (
                <div className="flex items-start gap-3 my-4">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-emerald-100 text-slate-700 text-sm shadow-xs flex items-center gap-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
                    </div>
                    <span className="font-medium text-emerald-800">
                      {t.aiThinking}
                    </span>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">{t.errorTitle}</p>
                    <p className="text-xs mt-0.5">{errorMessage}</p>
                    <button
                      onClick={() => handleSendMessage()}
                      className="mt-2 px-3 py-1 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700"
                    >
                      {t.retryBtn}
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Dock Area */}
        <div className="sticky bottom-3 mt-4 bg-white/95 backdrop-blur-md rounded-3xl p-3 shadow-xl border border-slate-200/90">
          
          {/* Quick Helpful Prompt Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 px-1 text-xs text-slate-600 no-scrollbar">
            <span className="text-[11px] text-slate-400 font-medium shrink-0">{t.quickHelpers}</span>
            <button
              onClick={() => handleSendMessage(t.didNotUnderstandPrompt)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-800 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <HelpCircle className="w-3 h-3 text-amber-600" /> {t.didNotUnderstand}
            </button>
            <button
              onClick={() => handleSendMessage(t.showFormulasPrompt)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-100 hover:text-teal-800 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <Calculator className="w-3 h-3 text-teal-600" /> {t.showFormulas}
            </button>
            <button
              onClick={() => handleSendMessage(t.giveAnalogyPrompt)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <Lightbulb className="w-3 h-3 text-emerald-600" /> {t.giveAnalogy}
            </button>
            <button
              onClick={() => {
                setQuizTopic(currentSubject);
                setIsQuizOpen(true);
              }}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-cyan-100 hover:text-cyan-800 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <BrainCircuit className="w-3 h-3 text-cyan-600" /> {t.quizTest}
            </button>
          </div>

          {/* Attached Image Preview Pill */}
          {attachedImage && (
            <div className="mb-2 p-2 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between max-w-sm">
              <div className="flex items-center gap-2">
                <img
                  src={attachedImage.previewUrl}
                  alt="Attached preview"
                  className="w-10 h-10 object-cover rounded-xl bg-white border border-emerald-300"
                />
                <div>
                  <p className="text-xs font-bold text-emerald-900">{t.photoAttached}</p>
                  <p className="text-[10px] text-emerald-700">{t.readyForAnalysis}</p>
                </div>
              </div>
              <button
                onClick={() => setAttachedImage(null)}
                className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Main Input Controls */}
          <div className="flex items-end gap-2">
            
            {/* Camera / Photo Button */}
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-all shrink-0 cursor-pointer"
              title={t.photoTooltip}
            >
              <Camera className="w-5 h-5" />
            </button>

            {/* Voice Dictation Button */}
            <button
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-2xl transition-all shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
              title={t.voiceTooltip}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Textarea */}
            <div className="flex-1 min-w-0">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? t.listeningPlaceholder : t.inputPlaceholder}
                rows={1}
                className="w-full px-3.5 py-2.5 text-sm sm:text-base bg-transparent border-none outline-none resize-none max-h-32 placeholder:text-slate-400 text-slate-800"
                style={{ minHeight: '44px' }}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || (!inputText.trim() && !attachedImage)}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 text-white transition-all shadow-md shadow-emerald-600/20 shrink-0 cursor-pointer"
              title={t.sendTooltip}
            >
              <Send className="w-5 h-5" />
            </button>

          </div>

        </div>

      </main>

      {/* Interactive Modals */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        currentSubject={currentSubject}
        currentGrade={currentGrade}
        initialTopic={quizTopic}
        currentLanguage={currentLanguage}
      />

      <FormulaSheetModal
        isOpen={isFormulasOpen}
        onClose={() => setIsFormulasOpen(false)}
        onAskFormula={(formulaPrompt) => handleSendMessage(formulaPrompt)}
        currentLanguage={currentLanguage}
      />

      <NotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        notes={savedNotes}
        onDeleteNote={handleDeleteNote}
        onSelectNote={(note) => {
          setGrade(note.grade);
          setSubject(note.subject);
          handleSendMessage(
            currentLanguage === 'en'
              ? `Please review and explain the solution for "${note.title}" in detail.`
              : currentLanguage === 'hi'
              ? `कृपया "${note.title}" के हल को विस्तार से दोहराएं और समझाएं।`
              : `অনুগ্রহ করে "${note.title}" সম্পর্কে বিস্তারিত পুনরাবৃত্তি করো।`
          );
        }}
        currentLanguage={currentLanguage}
      />

      <ImageCaptureModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onConfirmImage={(attachment, promptText) => {
          setAttachedImage(attachment);
          if (promptText) {
            handleSendMessage(promptText, attachment);
          }
        }}
        currentLanguage={currentLanguage}
      />

    </div>
  );
}
