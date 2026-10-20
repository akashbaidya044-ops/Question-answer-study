import React from 'react';
import { Subject, StudentGrade, AppLanguage } from '../types';
import { BookOpen, GraduationCap, Sparkles, Bookmark, RotateCcw, BrainCircuit, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

interface HeaderProps {
  currentLanguage: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  currentGrade: StudentGrade;
  setGrade: (grade: StudentGrade) => void;
  currentSubject: Subject;
  setSubject: (subj: Subject) => void;
  onOpenFormulas: () => void;
  onOpenQuiz: () => void;
  onOpenNotes: () => void;
  onResetChat: () => void;
  savedNotesCount: number;
}

const GRADES_BY_LANG: Record<AppLanguage, { id: StudentGrade; label: string }[]> = {
  bn: [
    { id: '৬ষ্ঠ শ্রেণী', label: '৬ষ্ঠ শ্রেণী' },
    { id: '৭ম শ্রেণী', label: '৭ম শ্রেণী' },
    { id: '৮ম শ্রেণী', label: '৮ম শ্রেণী' },
    { id: '৯ম-১০ম (এসএসসি)', label: '৯ম-১০ম (এসএসসি)' },
    { id: '১১শ-১২শ (এইচএসসি)', label: '১১শ-১২শ (এইচএসসি)' },
    { id: 'বিশ্ববিদ্যালয় / ভর্তি পরীক্ষা', label: 'বিশ্ববিদ্যালয় / ভর্তি পরীক্ষা' },
  ],
  en: [
    { id: '৬ষ্ঠ শ্রেণী', label: 'Class 6' },
    { id: '৭ম শ্রেণী', label: 'Class 7' },
    { id: '৮ম শ্রেণী', label: 'Class 8' },
    { id: '৯ম-১০ম (এসএসসি)', label: 'Class 9-10 (High School)' },
    { id: '১১শ-১২শ (এইচএসসি)', label: 'Class 11-12 (College)' },
    { id: 'বিশ্ববিদ্যালয় / ভর্তি পরীক্ষা', label: 'University / Entrance' },
  ],
  hi: [
    { id: '৬ষ্ঠ শ্রেণী', label: 'कक्षा ६' },
    { id: '৭ম শ্রেণী', label: 'कक्षा ७' },
    { id: '৮ম শ্রেণী', label: 'कक्षा ८' },
    { id: '৯ম-১০ম (এসএসসি)', label: 'कक्षा ९-१० (माध्यमिक)' },
    { id: '১১শ-১২শ (এইচএসসি)', label: 'कक्षा ११-१२ (उच्च माध्यमिक)' },
    { id: 'বিশ্ববিদ্যালয় / ভর্তি পরীক্ষা', label: 'विश्वविद्यालय / प्रवेश परीक्षा' },
  ],
};

const SUBJECTS_BY_LANG: Record<AppLanguage, { id: Subject; label: string }[]> = {
  bn: [
    { id: 'গণিত (Math)', label: 'গণিত (Math)' },
    { id: 'পদার্থবিজ্ঞান (Physics)', label: 'পদার্থবিজ্ঞান (Physics)' },
    { id: 'রসায়ন (Chemistry)', label: 'রসায়ন (Chemistry)' },
    { id: 'জীববিজ্ঞান (Biology)', label: 'জীববিজ্ঞান (Biology)' },
    { id: 'সাধারণ বিজ্ঞান (General Science)', label: 'সাধারণ বিজ্ঞান (Science)' },
    { id: 'ইংরেজি (English)', label: 'ইংরেজি (English)' },
    { id: 'বাংলা (Bangla)', label: 'বাংলা (Bangla)' },
    { id: 'আইসিটি (ICT)', label: 'আইসিটি (ICT)' },
    { id: 'সাধারণ জ্ঞান (GK)', label: 'সাধারণ জ্ঞান (GK)' },
  ],
  en: [
    { id: 'গণিত (Math)', label: 'Mathematics' },
    { id: 'পদার্থবিজ্ঞান (Physics)', label: 'Physics' },
    { id: 'রসায়ন (Chemistry)', label: 'Chemistry' },
    { id: 'জীববিজ্ঞান (Biology)', label: 'Biology' },
    { id: 'সাধারণ বিজ্ঞান (General Science)', label: 'General Science' },
    { id: 'ইংরেজি (English)', label: 'English' },
    { id: 'বাংলা (Bangla)', label: 'Literature / Language' },
    { id: 'আইসিটি (ICT)', label: 'ICT / Computer' },
    { id: 'সাধারণ জ্ঞান (GK)', label: 'General Knowledge' },
  ],
  hi: [
    { id: 'গণিত (Math)', label: 'गणित (Math)' },
    { id: 'পদার্থবিজ্ঞান (Physics)', label: 'भौतिक विज्ञान (Physics)' },
    { id: 'রসায়ন (Chemistry)', label: 'रसायन विज्ञान (Chemistry)' },
    { id: 'জীববিজ্ঞান (Biology)', label: 'जीव विज्ञान (Biology)' },
    { id: 'সাধারণ বিজ্ঞান (General Science)', label: 'सामान्य विज्ञान (Science)' },
    { id: 'ইংরেজি (English)', label: 'अंग्रेजी (English)' },
    { id: 'বাংলা (Bangla)', label: 'हिंदी / साहित्य (Hindi)' },
    { id: 'আইসিটি (ICT)', label: 'कंप्यूटर / ICT' },
    { id: 'সাধারণ জ্ঞান (GK)', label: 'सामान्य ज्ञान (GK)' },
  ],
};

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  setLanguage,
  currentGrade,
  setGrade,
  currentSubject,
  setSubject,
  onOpenFormulas,
  onOpenQuiz,
  onOpenNotes,
  onResetChat,
  savedNotesCount,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const gradesList = GRADES_BY_LANG[currentLanguage];
  const subjectsList = SUBJECTS_BY_LANG[currentLanguage];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo and Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 bg-clip-text text-transparent flex items-baseline gap-1.5">
                    <span>{currentLanguage === 'en' ? 'Study Buddy' : 'পড়াশোনা সঙ্গী'}</span>
                    <span className="text-xs font-semibold text-emerald-800/80 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/60 hidden sm:inline-block">
                      {currentLanguage === 'en' ? 'পড়াশোনা সঙ্গী' : 'Study Buddy'}
                    </span>
                  </h1>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-200">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> {t.assistantBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{t.subTagline}</p>
              </div>
            </div>

            {/* Mobile actions shortcut */}
            <div className="flex md:hidden items-center gap-1.5">
              {/* Language Selector (Mobile) */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setLanguage('bn')}
                  className={`px-1.5 py-1 rounded-lg transition-colors ${
                    currentLanguage === 'bn' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  বাং
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-1 rounded-lg transition-colors ${
                    currentLanguage === 'en' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-1.5 py-1 rounded-lg transition-colors ${
                    currentLanguage === 'hi' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  हि
                </button>
              </div>

              <button
                onClick={onOpenNotes}
                title={t.notesBtn}
                className="relative p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Bookmark className="w-4 h-4" />
                {savedNotesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {savedNotesCount}
                  </span>
                )}
              </button>
              <button
                onClick={onResetChat}
                title={t.newChatTooltip}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center/Right Controls: Language pill, Grade, Subject, Actions */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Language Segmented Control (Desktop) */}
            <div className="hidden md:flex items-center gap-0.5 bg-slate-100 p-1 rounded-xl border border-slate-200/90 text-xs font-bold">
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  currentLanguage === 'bn'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  currentLanguage === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  currentLanguage === 'hi'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Grade Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200/80 transition-all">
              <span className="text-xs text-slate-500 font-medium">{t.gradeLabel}</span>
              <select
                value={currentGrade}
                onChange={(e) => setGrade(e.target.value as StudentGrade)}
                className="text-xs font-semibold text-slate-800 bg-transparent border-none outline-none cursor-pointer pr-1"
              >
                {gradesList.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200/80 transition-all">
              <span className="text-xs text-slate-500 font-medium">{t.subjectLabel}</span>
              <select
                value={currentSubject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="text-xs font-semibold text-slate-800 bg-transparent border-none outline-none cursor-pointer pr-1"
              >
                {subjectsList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Feature Utility Buttons */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                onClick={onOpenFormulas}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> {t.formulaBtn}
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-cyan-700 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <BrainCircuit className="w-3.5 h-3.5 text-cyan-600" /> {t.quizBtn}
              </button>

              <button
                onClick={onOpenNotes}
                className="relative px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-amber-700 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-600" /> {t.notesBtn}
                {savedNotesCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] bg-amber-500 text-white rounded-full font-bold">
                    {savedNotesCount}
                  </span>
                )}
              </button>

              <button
                onClick={onResetChat}
                title={t.newChatTooltip}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
