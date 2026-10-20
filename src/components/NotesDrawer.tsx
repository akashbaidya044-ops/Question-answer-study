import React, { useState } from 'react';
import { SavedNote, AppLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Bookmark, Search, Trash2, Copy, Check, Printer, X, FileText } from 'lucide-react';

interface NotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: SavedNote[];
  onDeleteNote: (id: string) => void;
  onSelectNote: (note: SavedNote) => void;
  currentLanguage: AppLanguage;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({
  isOpen,
  onClose,
  notes,
  onDeleteNote,
  onSelectNote,
  currentLanguage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.solution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-slate-200 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 bg-amber-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 fill-white text-white" />
            <div>
              <h2 className="font-bold text-base">{t.notesTitle} ({notes.length})</h2>
              <p className="text-xs text-amber-100">{t.notesSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {notes.length > 0 && (
              <button
                onClick={handlePrint}
                className="p-1.5 rounded-lg hover:bg-amber-600 text-white transition-colors"
                title="Print Notes"
              >
                <Printer className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-amber-600 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.notesSearchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notes.length === 0 ? (
            <div className="text-center py-16 text-slate-400 space-y-2">
              <FileText className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-medium">{t.notesEmptyTitle}</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {t.notesEmptyDesc}
              </p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              {t.notesNoMatch}
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-300 bg-white hover:shadow-xs transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded-full">
                      {note.subject}
                    </span>
                    <span className="ml-1.5 text-[10px] text-slate-400">{note.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(note.id, note.solution)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                      title={t.copy}
                    >
                      {copiedId === note.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-semibold text-slate-800 text-sm line-clamp-2">
                  {note.title}
                </h4>

                <div className="text-xs text-slate-600 line-clamp-3 bg-slate-50 p-2 rounded-lg font-mono">
                  {note.solution.slice(0, 150)}...
                </div>

                <button
                  onClick={() => {
                    onSelectNote(note);
                    onClose();
                  }}
                  className="w-full text-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline pt-1"
                >
                  {t.notesViewInChat}
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
