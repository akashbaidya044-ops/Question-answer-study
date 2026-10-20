import React, { useState } from 'react';
import { getFormulaCheatSheet } from '../data/formulaSheet';
import { AppLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { BookOpen, Search, Copy, Check, X, Sparkles } from 'lucide-react';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskFormula: (formulaPrompt: string) => void;
  currentLanguage: AppLanguage;
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({
  isOpen,
  onClose,
  onAskFormula,
  currentLanguage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage];
  const formulaCategories = getFormulaCheatSheet(currentLanguage);

  const handleCopy = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 1500);
  };

  const filteredCategories = formulaCategories
    .map((cat) => {
      const matchingItems = cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.explanation.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...cat,
        items: matchingItems,
      };
    })
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-700 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{t.formulaModalTitle}</h2>
              <p className="text-xs text-teal-100">{t.formulaModalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.formulaSearchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* List of Formulas */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              {t.formulaNoMatch}
            </div>
          ) : (
            filteredCategories.map((cat, cIdx) => (
              <div key={cIdx} className="space-y-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-base pb-1 border-b border-slate-100">
                  <span>{cat.icon}</span>
                  <span>{cat.category}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cat.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-white hover:shadow-xs transition-all space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-slate-800 text-sm">{item.name}</h4>
                          <button
                            onClick={() => handleCopy(item.formula)}
                            className="p-1 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title={t.copy}
                          >
                            {copiedFormula === item.formula ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <div className="mt-1 p-2 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-xs font-bold text-emerald-800">
                          {item.formula}
                        </div>
                        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => {
                            onClose();
                            const askText =
                              currentLanguage === 'en'
                                ? `Please explain the formula "${item.name}" (${item.formula}) in detail with real-life application and an example problem.`
                                : currentLanguage === 'hi'
                                ? `कृपया सूत्र "${item.name}" (${item.formula}) को वास्तविक जीवन के अनुप्रयोग और उदाहरण सहित विस्तार से समझाएं।`
                                : `আমাকে "${item.name}" (সূত্র: ${item.formula}) এর বাস্তব প্রয়োগ এবং একটি উদাহরণসহ বুঝিয়ে বলো।`;
                            onAskFormula(askText);
                          }}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                        >
                          <Sparkles className="w-3 h-3 text-emerald-600" /> {t.formulaExplainBtn}
                        </button>
                        {item.example && (
                          <span className="text-[11px] text-slate-400 font-mono truncate max-w-[120px]">
                            {item.example}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
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
