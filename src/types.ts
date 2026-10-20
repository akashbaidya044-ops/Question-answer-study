export type AppLanguage = 'bn' | 'en' | 'hi';

export type StudentGrade =
  | '৬ষ্ঠ শ্রেণী'
  | '৭ম শ্রেণী'
  | '৮ম শ্রেণী'
  | '৯ম-১০ম (এসএসসি)'
  | '১১শ-১২শ (এইচএসসি)'
  | 'বিশ্ববিদ্যালয় / ভর্তি পরীক্ষা';

export type Subject =
  | 'গণিত (Math)'
  | 'পদার্থবিজ্ঞান (Physics)'
  | 'রসায়ন (Chemistry)'
  | 'জীববিজ্ঞান (Biology)'
  | 'সাধারণ বিজ্ঞান (General Science)'
  | 'ইংরেজি (English)'
  | 'বাংলা (Bangla)'
  | 'আইসিটি (ICT)'
  | 'সাধারণ জ্ঞান (GK)';

export interface ImageAttachment {
  data: string; // base64 without prefix or with prefix
  mimeType: string;
  previewUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  image?: ImageAttachment;
  subject?: Subject;
  grade?: StudentGrade;
  isSimplification?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  formula?: string;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
  encouragement?: string;
}

export interface SavedNote {
  id: string;
  title: string;
  subject: Subject;
  grade: StudentGrade;
  question: string;
  solution: string;
  date: string;
  hasImage?: boolean;
}
