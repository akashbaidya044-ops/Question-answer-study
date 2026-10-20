import React, { useState } from 'react';
import { QuizData, Subject, StudentGrade, AppLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { BrainCircuit, CheckCircle2, XCircle, RefreshCw, X, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubject: Subject;
  currentGrade: StudentGrade;
  initialTopic?: string;
  currentLanguage: AppLanguage;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  currentSubject,
  currentGrade,
  initialTopic = 'মৌলিক ধারণা',
  currentLanguage,
}) => {
  const [topicInput, setTopicInput] = useState(initialTopic);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage];

  const handleGenerateQuiz = async (customTopic?: string) => {
    const targetTopic = customTopic || topicInput.trim() || 'Core Concept';
    setLoading(true);
    setError(null);
    setUserAnswers({});

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: targetTopic,
          subject: currentSubject,
          grade: currentGrade,
          language: currentLanguage,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate quiz. Please try again.');
      }

      const data = await res.json();
      setQuizData(data);
    } catch (err: any) {
      setError(err?.message || 'Error creating quiz.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (userAnswers[questionId] !== undefined) return;

    setUserAnswers((prev) => {
      const updated = { ...prev, [questionId]: optionIdx };
      
      const currentQuestion = quizData?.questions.find((q) => q.id === questionId);
      if (currentQuestion && currentQuestion.correctIndex === optionIdx) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
      return updated;
    });
  };

  const totalQuestions = quizData?.questions?.length || 0;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = quizData?.questions?.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{t.quizModalTitle}</h2>
              <p className="text-xs text-emerald-100">{currentGrade} • {currentSubject}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Topic Input Box */}
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder={t.quizModalPlaceholder}
            className="flex-1 px-4 py-2 text-sm bg-white border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleGenerateQuiz()}
            disabled={loading}
            className="px-5 py-2 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {quizData ? t.quizNewBtn : t.quizStartBtn}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm">
              {error}
            </div>
          )}

          {!quizData && !loading && (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">
                {t.quizIntroTitle}
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                {t.quizIntroDesc}
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    const top = currentLanguage === 'en' ? 'Trigonometry & Right Triangles' : currentLanguage === 'hi' ? 'त्रिकोणमिति सूत्र व मान' : 'ত্রিকোণমিতির সূত্রাবলি ও মান';
                    setTopicInput(top);
                    handleGenerateQuiz(top);
                  }}
                  className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium"
                >
                  {currentLanguage === 'en' ? 'Trigonometry' : currentLanguage === 'hi' ? 'त्रिकोणमिति' : 'ত্রিকোণমিতি'}
                </button>
                <button
                  onClick={() => {
                    const top = currentLanguage === 'en' ? "Newton's Laws of Motion" : currentLanguage === 'hi' ? 'न्यूटन के गति नियम' : 'নিউটনের গতির সূত্রাবলি';
                    setTopicInput(top);
                    handleGenerateQuiz(top);
                  }}
                  className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium"
                >
                  {currentLanguage === 'en' ? "Newton's Laws" : currentLanguage === 'hi' ? 'न्यूटन के नियम' : 'নিউটনের গতির সূত্র'}
                </button>
                <button
                  onClick={() => {
                    const top = currentLanguage === 'en' ? 'Photosynthesis in Plants' : currentLanguage === 'hi' ? 'प्रकाश संश्लेषण प्रक्रिया' : 'সালোকসংশ্লেষণ ও শ্বসন';
                    setTopicInput(top);
                    handleGenerateQuiz(top);
                  }}
                  className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium"
                >
                  {currentLanguage === 'en' ? 'Photosynthesis' : currentLanguage === 'hi' ? 'प्रकाश संश्लेषण' : 'সালোকসংশ্লেষণ'}
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-16 space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-700">
                "{topicInput}" {t.quizGenerating}
              </p>
            </div>
          )}

          {quizData && !loading && (
            <div className="space-y-6">
              {/* Score bar */}
              {answeredCount > 0 && (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-700">
                      {t.quizProgress} {answeredCount}/{totalQuestions}
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-700">
                    {t.quizScore} {correctCount}/{answeredCount}
                  </span>
                </div>
              )}

              {quizData.questions.map((q, qIndex) => {
                const selected = userAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === q.correctIndex;

                return (
                  <div
                    key={q.id || qIndex}
                    className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                        {qIndex + 1}
                      </span>
                      <h4 className="font-semibold text-slate-800 text-[15px] leading-relaxed">
                        {q.question}
                      </h4>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pl-10">
                      {q.options.map((option, optIdx) => {
                        let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700';

                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                          } else if (optIdx === selected) {
                            btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-semibold';
                          } else {
                            btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            disabled={isAnswered}
                            className={`p-3 text-left text-sm rounded-xl border transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isAnswered && optIdx === selected && optIdx !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback & Explanation */}
                    {isAnswered && (
                      <div className="mt-3 pl-10 pt-2 border-t border-slate-100 text-sm">
                        <div className={`p-3 rounded-xl ${isCorrect ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'}`}>
                          <div className="flex items-center gap-1.5 font-bold mb-1">
                            {isCorrect ? (
                              <span className="text-emerald-700">{t.quizCorrect}</span>
                            ) : (
                              <span className="text-amber-700">{t.quizIncorrect}</span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-normal leading-relaxed">{q.explanation}</p>
                          {q.formula && (
                            <div className="mt-2 text-xs font-semibold text-emerald-800 bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                              {t.quizFormulaLabel} {q.formula}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {quizData.encouragement && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 text-center text-emerald-800 font-medium text-sm flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{quizData.encouragement}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
          >
            {t.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
