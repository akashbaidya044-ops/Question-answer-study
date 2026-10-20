import { AppLanguage } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  assistantBadge: string;
  subTagline: string;
  gradeLabel: string;
  subjectLabel: string;
  formulaBtn: string;
  quizBtn: string;
  notesBtn: string;
  newChatTooltip: string;
  welcomeBadge: string;
  welcomeTitle: string;
  welcomeDesc: string;
  photoSolveBtn: string;
  formulaSheetBtn: string;
  practiceQuizBtn: string;
  trySampleTitle: string;
  instantAnswerSubtitle: string;
  seeSolution: string;
  philosophyTitle: string;
  philosophyDesc: string;
  quickHelpers: string;
  didNotUnderstand: string;
  didNotUnderstandPrompt: string;
  giveAnalogy: string;
  giveAnalogyPrompt: string;
  showFormulas: string;
  showFormulasPrompt: string;
  quizTest: string;
  twoPracticeProblems: string;
  twoPracticePrompt: string;
  explainInLang: string;
  explainInLangPrompt: string;
  photoAttached: string;
  readyForAnalysis: string;
  inputPlaceholder: string;
  listeningPlaceholder: string;
  aiThinking: string;
  errorTitle: string;
  retryBtn: string;
  voiceTooltip: string;
  photoTooltip: string;
  sendTooltip: string;
  readAloud: string;
  stopAudio: string;
  copied: string;
  copy: string;
  saved: string;
  saveNote: string;
  studentBadge: string;
  photoQuestionBadge: string;
  analyzedByAi: string;
  adSponsored: string;
  adActive: string;
  closeAd: string;
  confirmReset: string;
  
  // Quiz Modal
  quizModalTitle: string;
  quizModalPlaceholder: string;
  quizStartBtn: string;
  quizNewBtn: string;
  quizIntroTitle: string;
  quizIntroDesc: string;
  quizGenerating: string;
  quizProgress: string;
  quizScore: string;
  quizCorrect: string;
  quizIncorrect: string;
  quizFormulaLabel: string;
  closeBtn: string;
  
  // Formula Modal
  formulaModalTitle: string;
  formulaModalSubtitle: string;
  formulaSearchPlaceholder: string;
  formulaNoMatch: string;
  formulaExplainBtn: string;
  
  // Notes Modal
  notesTitle: string;
  notesSubtitle: string;
  notesSearchPlaceholder: string;
  notesEmptyTitle: string;
  notesEmptyDesc: string;
  notesNoMatch: string;
  notesViewInChat: string;
  
  // Image Capture Modal
  imageModalTitle: string;
  imageModalSubtitle: string;
  imageGalleryBtn: string;
  imageCameraBtn: string;
  imageGalleryDesc: string;
  imageCameraDesc: string;
  imageSnapBtn: string;
  imageCancelBtn: string;
  imageSpecialPromptLabel: string;
  imageSpecialPromptPlaceholder: string;
  imageDemoTitle: string;
  imageStartSolveBtn: string;
  imageStatusReady: string;
  imageStatusPick: string;
  cameraError: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  bn: {
    appName: 'পড়াশোনা সঙ্গী (Study Buddy)',
    tagline: 'সহজ ভাষায় শেখার এআই বন্ধু',
    assistantBadge: 'এআই গৃহশিক্ষক',
    subTagline: 'সহজ ব্যাখ্যা • ছবির প্রশ্ন সমাধান • গণিত ও বিজ্ঞান',
    gradeLabel: 'শ্রেণী:',
    subjectLabel: 'বিষয়:',
    formulaBtn: 'সূত্র ভাণ্ডার',
    quizBtn: 'কুইজ টেস্ট',
    notesBtn: 'পড়ার নোটবুক',
    newChatTooltip: 'নতুন প্রশ্ন শুরু করুন',
    welcomeBadge: 'বন্ধুত্বপূর্ণ এআই পড়ার সহচর',
    welcomeTitle: 'পড়ালেখা হবে সহজ, আনন্দদায়ক ও ভয়হীন! 🌟',
    welcomeDesc: 'যে কোনো অংক বুঝতে না পারলে, বইয়ের পাতার ছবি তুলে প্রশ্ন করো কিংবা জটিল তত্ত্বের সহজ ব্যাখ্যা চাও। "বুঝতে পারি নাই" বললে একদম বাস্তব জীবনের সহজ উদাহরণ দিয়ে ধাপে ধাপে বুঝিয়ে দেবো!',
    photoSolveBtn: 'ছবির প্রশ্ন সমাধান',
    formulaSheetBtn: 'সূত্র ভাণ্ডার',
    practiceQuizBtn: 'অনুশীলন কুইজ',
    trySampleTitle: 'চেষ্টা করে দেখুন (যেকোনো একটিতে ক্লিক করুন):',
    instantAnswerSubtitle: 'তাৎক্ষণিক উত্তর ও ব্যাখ্যা',
    seeSolution: 'সমাধান দেখুন',
    philosophyTitle: 'ভুল হতে পারে, কিন্তু শেখা থেমে থাকবে না!',
    philosophyDesc: 'কোনো কিছু বুঝতে সমস্যা হলে সংকোচ ছাড়াই বলুন "বুঝতে পারি নাই"। পড়াশোনা সঙ্গী বারবার বিভিন্ন বাস্তব উদাহরণ ও গল্পের ছলে আপনাকে বুঝিয়ে দেবে।',
    quickHelpers: 'দ্রুত সহায়ক:',
    didNotUnderstand: 'বুঝতে পারি নাই 🙋‍♂️',
    didNotUnderstandPrompt: 'আমি বুঝতে পারি নাই, অনুগ্রহ করে বাস্তব জীবনের সহজ উদাহরণ দিয়ে আমাকে আবার বুঝাও।',
    giveAnalogy: 'সহজ উদাহরণ দাও 💡',
    giveAnalogyPrompt: 'এই ধারণার উপর ভিত্তি করে দৈনন্দিন জীবনের আরও একটি মজার বাস্তব উদাহরণ দাও।',
    showFormulas: 'সূত্রগুলো দেখাও 📐',
    showFormulasPrompt: 'এটির সাথে জড়িত গুরুত্বপূর্ণ সূত্র ও নিয়মগুলো বুলেট পয়েন্টে স্পষ্টভাবে লিখে দাও।',
    quizTest: 'কুইজ টেস্ট 🎯',
    twoPracticeProblems: 'অনুরূপ অনুশীলন প্রশ্ন 🎯',
    twoPracticePrompt: 'আমার অনুশীলনের জন্য এই নিয়মের অনুরূপ ২টি সহজ প্রশ্ন বানিয়ে দাও যেন আমি সমাধান করতে পারি।',
    explainInLang: 'অন্য ভাষায় ব্যাখ্যা',
    explainInLangPrompt: 'অনুগ্রহ করে এই সম্পূর্ণ উত্তরটি আবার বুঝিয়ে বলো।',
    photoAttached: '📷 প্রশ্ন ছবি সংযুক্ত',
    readyForAnalysis: 'বিশ্লেষণের জন্য প্রস্তুত',
    inputPlaceholder: 'আপনার পড়ালেখা সংক্রান্ত যে কোনো প্রশ্ন বাংলায় লিখুন... (Enter চাপুন)',
    listeningPlaceholder: 'শুনছি... আপনার প্রশ্নটি মুখে বলুন...',
    aiThinking: 'এআই গৃহশিক্ষক সহজ ভাষায় সুন্দর সমাধান তৈরি করছে... ✍️',
    errorTitle: 'একটি সমস্যা দেখা দিয়েছে',
    retryBtn: 'আবার চেষ্টা করুন',
    voiceTooltip: 'মুখে বলে প্রশ্ন করুন',
    photoTooltip: 'ছবির প্রশ্ন আপলোড করুন বা ছবি তুলুন',
    sendTooltip: 'পাঠান',
    readAloud: 'শুনুন',
    stopAudio: 'থামান',
    copied: 'কপি হয়েছে',
    copy: 'কপি',
    saved: 'সংরক্ষিত',
    saveNote: 'সেভ নোট',
    studentBadge: 'ছাত্র',
    photoQuestionBadge: '📷 প্রশ্ন চিত্র',
    analyzedByAi: 'এআই দ্বারা বিশ্লেষিত',
    adSponsored: 'স্পন্সরড / বিজ্ঞাপন (AdMob)',
    adActive: 'Google AdMob সক্রিয়',
    closeAd: 'বিজ্ঞাপন বন্ধ করুন',
    confirmReset: 'আপনি কি নিশ্চিত যে নতুন সেশন শুরু করতে চান? বর্তমান আলোচনা মুছে যাবে।',
    
    quizModalTitle: 'অনুশীলন ও কুইজ টেস্ট',
    quizModalPlaceholder: 'যেকোনো টপিক লিখুন (যেমন: পিথাগোরাস, নিউটনের গতিসূত্র, সমীকরণ...)',
    quizStartBtn: 'কুইজ শুরু করুন',
    quizNewBtn: 'নতুন প্রশ্ন তৈরি করুন',
    quizIntroTitle: 'পড়া যাচাইয়ের জন্য কুইজ তৈরি করো!',
    quizIntroDesc: 'তুমি যে টপিকটি শিখছ তার ওপর এআই ৩টি সুন্দর এমসিকিউ প্রশ্ন প্রস্তুত করবে। সঠিক উত্তর ও বিস্তারিত ব্যাখ্যা দিয়ে যাচাই করে নাও।',
    quizGenerating: 'এর উপর চমৎকার অনুশীলন প্রশ্ন তৈরি হচ্ছে...',
    quizProgress: 'অগ্রগতি:',
    quizScore: 'স্কোর:',
    quizCorrect: '🌟 দারুণ! সঠিক উত্তর হয়েছে।',
    quizIncorrect: '💡 কোনো সমস্যা নেই! সঠিক উত্তর ও ব্যাখ্যা দেখো:',
    quizFormulaLabel: 'সূত্র:',
    closeBtn: 'বন্ধ করুন',
    
    formulaModalTitle: 'প্রয়োজনীয় সূত্র ভাণ্ডার (Formula Sheet)',
    formulaModalSubtitle: 'গণিত, জ্যামিতি, পদার্থবিজ্ঞান ও রসায়নের গুরুত্বপূর্ণ নিয়ম',
    formulaSearchPlaceholder: 'সূত্র বা নিয়ম খুঁজুন (যেমন: a²-b², পিথাগোরাস, v=u+at, মোল...)',
    formulaNoMatch: 'কোনো সূত্র খুঁজে পাওয়া যায়নি। ভিন্ন শব্দ দিয়ে সার্চ করুন।',
    formulaExplainBtn: 'বিস্তারিত বুঝাও',
    
    notesTitle: 'পড়ার নোটবুক',
    notesSubtitle: 'সংরক্ষিত প্রশ্ন ও সমাধান',
    notesSearchPlaceholder: 'নোট খুঁজুন...',
    notesEmptyTitle: 'কোনো নোট সেভ করা নেই।',
    notesEmptyDesc: 'পড়ার সময় কোনো উত্তর পছন্দ হলে "সেভ নোট" বাটনে ক্লিক করে এখানে জমা রাখুন।',
    notesNoMatch: 'কোনো মিল পাওয়া যায়নি।',
    notesViewInChat: 'পুরো সমাধানটি আলোচনা প্যানেলে দেখুন →',
    
    imageModalTitle: 'ছবির প্রশ্ন সমাধান (Photo Solver)',
    imageModalSubtitle: 'বই, খাতা বা স্ক্রিনশট থেকে ধাপে ধাপে সমাধান',
    imageGalleryBtn: 'গ্যালারি / ফাইল আপলোড',
    imageCameraBtn: 'সরাসরি ক্যামেরা দিয়ে ছবি তুলুন',
    imageGalleryDesc: 'JPG, PNG, WebP ইত্যাদি',
    imageCameraDesc: 'বই বা খাতার ছবির জন্য',
    imageSnapBtn: 'ছবি তুলুন',
    imageCancelBtn: 'বাতিল',
    imageSpecialPromptLabel: 'এই ছবির ব্যাপারে বিশেষ কোনো প্রশ্ন থাকলে লিখুন (ঐচ্ছিক):',
    imageSpecialPromptPlaceholder: 'যেমন: এই অংকটি সমাধান করো এবং সূত্রটি বুঝিয়ে বলো...',
    imageDemoTitle: 'বা সরাসরি নিচের ডেমো চিত্র দিয়ে পরীক্ষা করুন:',
    imageStartSolveBtn: 'প্রশ্ন সমাধান শুরু করুন',
    imageStatusReady: 'ছবি প্রস্তুত আছে',
    imageStatusPick: 'ছবি নির্বাচন করুন',
    cameraError: 'ক্যামেরা চালু করা সম্ভব হয়নি। অনুমতি দিন বা ফাইল আপলোড ব্যবহার করুন।',
  },
  
  en: {
    appName: 'Study Buddy (পড়াশোনা সঙ্গী)',
    tagline: 'Friendly AI Learning Companion',
    assistantBadge: 'AI Private Tutor',
    subTagline: 'Clear Explanations • Photo Problem Solver • Math & Science',
    gradeLabel: 'Grade:',
    subjectLabel: 'Subject:',
    formulaBtn: 'Formula Sheet',
    quizBtn: 'Quiz Test',
    notesBtn: 'Study Notes',
    newChatTooltip: 'Start new question',
    welcomeBadge: 'Your Friendly AI Study Partner',
    welcomeTitle: 'Learning Made Simple, Engaging & Fearless! 🌟',
    welcomeDesc: 'If you ever feel stuck on math or need science concepts explained simply, snap a photo or ask anything. If you say "I didn\'t understand", we break it down with relatable real-life analogies step-by-step!',
    photoSolveBtn: 'Solve from Photo',
    formulaSheetBtn: 'Formula Sheet',
    practiceQuizBtn: 'Practice Quiz',
    trySampleTitle: 'Try a sample problem (Click any):',
    instantAnswerSubtitle: 'Instant step-by-step solution',
    seeSolution: 'View Solution',
    philosophyTitle: 'Making mistakes is how learning happens!',
    philosophyDesc: 'Never hesitate to say "I didn\'t understand". Study Buddy will patiently explain multiple times with fun stories, everyday examples, and clear steps.',
    quickHelpers: 'Quick Tools:',
    didNotUnderstand: "Didn't Understand 🙋‍♂️",
    didNotUnderstandPrompt: "I didn't understand this. Please explain again step-by-step using a simple, relatable real-life analogy.",
    giveAnalogy: 'Simple Analogy 💡',
    giveAnalogyPrompt: 'Please give another fun and memorable real-world analogy to make this concept crystal clear.',
    showFormulas: 'Show Formulas 📐',
    showFormulasPrompt: 'Please list all relevant formulas, definitions, and equations clearly in bullet points.',
    quizTest: 'Quiz Test 🎯',
    twoPracticeProblems: '2 Practice Questions 🎯',
    twoPracticePrompt: 'Please give me 2 similar practice questions with answers so I can test my understanding.',
    explainInLang: 'Explain in English',
    explainInLangPrompt: 'Please explain this concept clearly in English.',
    photoAttached: '📷 Question Photo Attached',
    readyForAnalysis: 'Ready for AI analysis',
    inputPlaceholder: 'Ask any study question in English, Hindi, or Bengali... (Press Enter)',
    listeningPlaceholder: 'Listening... Please speak your question...',
    aiThinking: 'AI Tutor is preparing a clear, friendly explanation... ✍️',
    errorTitle: 'An issue occurred',
    retryBtn: 'Try Again',
    voiceTooltip: 'Speak your question',
    photoTooltip: 'Upload textbook photo or take a picture',
    sendTooltip: 'Send',
    readAloud: 'Read Aloud',
    stopAudio: 'Stop Audio',
    copied: 'Copied!',
    copy: 'Copy',
    saved: 'Saved',
    saveNote: 'Save Note',
    studentBadge: 'Student',
    photoQuestionBadge: '📷 Question Photo',
    analyzedByAi: 'Analyzed by AI',
    adSponsored: 'Sponsored / Ad (AdMob)',
    adActive: 'Google AdMob Active',
    closeAd: 'Dismiss Ad',
    confirmReset: 'Are you sure you want to start a new session? Current conversation will be cleared.',
    
    quizModalTitle: 'Practice & Quiz Test',
    quizModalPlaceholder: 'Enter any topic (e.g. Pythagoras theorem, Newton laws, Quadratic equations...)',
    quizStartBtn: 'Start Quiz',
    quizNewBtn: 'Generate New Questions',
    quizIntroTitle: 'Test your understanding with a custom quiz!',
    quizIntroDesc: 'Study Buddy AI generates 3 tailored multiple-choice questions on your chosen topic with instant feedback and step-by-step reasoning.',
    quizGenerating: 'Generating custom practice questions on',
    quizProgress: 'Progress:',
    quizScore: 'Score:',
    quizCorrect: '🌟 Outstanding! Correct answer.',
    quizIncorrect: '💡 No worries! Here is the right answer & explanation:',
    quizFormulaLabel: 'Formula:',
    closeBtn: 'Close',
    
    formulaModalTitle: 'Essential Formula Cheat Sheet',
    formulaModalSubtitle: 'Key formulas for Math, Geometry, Physics & Chemistry',
    formulaSearchPlaceholder: 'Search formulas or rules (e.g. a²-b², Pythagoras, v=u+at, mol...)',
    formulaNoMatch: 'No matching formula found. Try another keyword.',
    formulaExplainBtn: 'Explain in Detail',
    
    notesTitle: 'Study Notebook',
    notesSubtitle: 'Saved questions & solutions',
    notesSearchPlaceholder: 'Search notes...',
    notesEmptyTitle: 'No saved notes yet.',
    notesEmptyDesc: 'Whenever an explanation clicks, hit "Save Note" to bookmark it here for exam prep.',
    notesNoMatch: 'No matching notes found.',
    notesViewInChat: 'View full solution in chat →',
    
    imageModalTitle: 'Photo Problem Solver',
    imageModalSubtitle: 'Step-by-step solution from textbook, notebook, or screenshot',
    imageGalleryBtn: 'Upload from Gallery / File',
    imageCameraBtn: 'Take Photo with Camera',
    imageGalleryDesc: 'JPG, PNG, WebP supported',
    imageCameraDesc: 'For textbook or notebook snapshots',
    imageSnapBtn: 'Capture Photo',
    imageCancelBtn: 'Cancel',
    imageSpecialPromptLabel: 'Specific question or instruction for this photo (optional):',
    imageSpecialPromptPlaceholder: 'e.g. Solve this math problem step-by-step and explain the formula...',
    imageDemoTitle: 'Or test instantly with these sample diagrams:',
    imageStartSolveBtn: 'Solve Problem Now',
    imageStatusReady: 'Photo is ready',
    imageStatusPick: 'Select a photo',
    cameraError: 'Could not access camera. Please allow camera permissions or upload a file.',
  },
  
  hi: {
    appName: 'पढ़ाई साथी (Study Buddy)',
    tagline: 'सरल भाषा में सीखने वाला एआई दोस्त',
    assistantBadge: 'एआई शिक्षक',
    subTagline: 'सरल व्याख्या • फ़ोटो से प्रश्न हल • गणित व विज्ञान',
    gradeLabel: 'कक्षा:',
    subjectLabel: 'विषय:',
    formulaBtn: 'सूत्र भंडार',
    quizBtn: 'क्विज़ टेस्ट',
    notesBtn: 'स्टडी नोटबुक',
    newChatTooltip: 'नया प्रश्न शुरू करें',
    welcomeBadge: 'आपका दोस्ताना एआई पढ़ाई साथी',
    welcomeTitle: 'पढ़ाई होगी आसान, मज़ेदार और बिना किसी डर के! 🌟',
    welcomeDesc: 'अगर कोई सवाल समझ न आए, तो किताब के पन्ने की फ़ोटो खींचें या कोई भी सवाल पूछें। "समझ नहीं आया" कहने पर हम वास्तविक जीवन के आसान उदाहरणों से कदम-दर-कदम समझाएंगे!',
    photoSolveBtn: 'फ़ोटो से हल करें',
    formulaSheetBtn: 'सूत्र भंडार',
    practiceQuizBtn: 'अभ्यास क्विज़',
    trySampleTitle: 'उदाहरण सवाल आज़माएं (किसी पर भी क्लिक करें):',
    instantAnswerSubtitle: 'तुरंत चरणबद्ध हल व व्याख्या',
    seeSolution: 'हल देखें',
    philosophyTitle: 'गलतियां सीखने का पहला कदम हैं!',
    philosophyDesc: 'कभी भी "समझ नहीं आया" कहने में संकोच न करें। पढ़ाई साथी बार-बार आसान कहानियों और रोज़मर्रा के उदाहरणों से धैर्यपूर्वक समझाएगा।',
    quickHelpers: 'त्वरित साधन:',
    didNotUnderstand: 'समझ नहीं आया 🙋‍♂️',
    didNotUnderstandPrompt: 'मुझे यह समझ नहीं आया, कृपया वास्तविक जीवन के आसान उदाहरण देकर चरणबद्ध तरीके से फिर से समझाएं।',
    giveAnalogy: 'सरल उदाहरण दें 💡',
    giveAnalogyPrompt: 'इस अवधारणा को अच्छी तरह स्पष्ट करने के लिए दैनिक जीवन का एक और मज़ेदार उदाहरण दें।',
    showFormulas: 'सूत्र दिखाएं 📐',
    showFormulasPrompt: 'इससे संबंधित सभी महत्वपूर्ण सूत्रों और नियमों को बुलेट पॉइंट्स में स्पष्ट लिखें।',
    quizTest: 'क्विज़ टेस्ट 🎯',
    twoPracticeProblems: '2 अभ्यास प्रश्न 🎯',
    twoPracticePrompt: 'मेरे अभ्यास के लिए इस नियम पर आधारित 2 आसान प्रश्न और उत्तर तैयार करें।',
    explainInLang: 'हिंदी में समझाइए',
    explainInLangPrompt: 'कृपया इसे सरल और शुद्ध हिंदी में अच्छी तरह समझाएं।',
    photoAttached: '📷 प्रश्न की फ़ोटो संलग्न',
    readyForAnalysis: 'विश्लेषण के लिए तैयार',
    inputPlaceholder: 'अपनी पढ़ाई से संबंधित कोई भी सवाल हिंदी, अंग्रेजी या बंगाली में लिखें... (Enter दबाएं)',
    listeningPlaceholder: 'सुन रहे हैं... कृपया अपना सवाल बोलें...',
    aiThinking: 'एआई शिक्षक सरल भाषा में सुंदर हल तैयार कर रहा है... ✍️',
    errorTitle: 'एक त्रुटि उत्पन्न हुई',
    retryBtn: 'पुनः प्रयास करें',
    voiceTooltip: 'बोलकर सवाल पूछें',
    photoTooltip: 'किताब की फ़ोटो अपलोड करें या कैमरा से खींचे',
    sendTooltip: 'भेजें',
    readAloud: 'सुनें',
    stopAudio: 'रोकें',
    copied: 'कॉपी हो गया!',
    copy: 'कॉपी',
    saved: 'सहेजा गया',
    saveNote: 'नोट सहेजें',
    studentBadge: 'विद्यार्थी',
    photoQuestionBadge: '📷 प्रश्न फ़ोटो',
    analyzedByAi: 'एआई द्वारा विश्लेषित',
    adSponsored: 'प्रायोजित / विज्ञापन (AdMob)',
    adActive: 'Google AdMob सक्रिय',
    closeAd: 'विज्ञापन बंद करें',
    confirmReset: 'क्या आप वाकई नया सत्र शुरू करना चाहते हैं? वर्तमान बातचीत साफ़ हो जाएगी।',
    
    quizModalTitle: 'अभ्यास व क्विज़ टेस्ट',
    quizModalPlaceholder: 'कोई भी विषय लिखें (जैसे: पाइथागोरस प्रमेय, न्यूटन के नियम, द्विघात समीकरण...)',
    quizStartBtn: 'क्विज़ शुरू करें',
    quizNewBtn: 'नए प्रश्न बनाएं',
    quizIntroTitle: 'अपनी समझ की जांच के लिए क्विज़ तैयार करें!',
    quizIntroDesc: 'पढ़ाई साथी एआई आपके चुने हुए विषय पर 3 बहुविकल्पीय प्रश्न (MCQ) और तुरंत व्याख्या प्रस्तुत करेगा।',
    quizGenerating: 'पर अभ्यास प्रश्न तैयार हो रहे हैं...',
    quizProgress: 'प्रगति:',
    quizScore: 'स्कोर:',
    quizCorrect: '🌟 शानदार! बिल्कुल सही उत्तर।',
    quizIncorrect: '💡 कोई बात नहीं! सही उत्तर और व्याख्या देखें:',
    quizFormulaLabel: 'सूत्र:',
    closeBtn: 'बंद करें',
    
    formulaModalTitle: 'आवश्यक सूत्र भंडार (Formula Sheet)',
    formulaModalSubtitle: 'गणित, ज्यामिति, भौतिक विज्ञान और रसायन विज्ञान के महत्वपूर्ण सूत्र',
    formulaSearchPlaceholder: 'सूत्र या नियम खोजें (जैसे: a²-b², पाइथागोरस, v=u+at, मोल...)',
    formulaNoMatch: 'कोई सूत्र नहीं मिला। कृपया अन्य शब्द से खोजें।',
    formulaExplainBtn: 'विस्तार से समझाएं',
    
    notesTitle: 'स्टडी नोटबुक',
    notesSubtitle: 'सहेजे गए प्रश्न और हल',
    notesSearchPlaceholder: 'नोट खोजें...',
    notesEmptyTitle: 'अभी तक कोई नोट सहेजा नहीं गया।',
    notesEmptyDesc: 'पढ़ते समय जब कोई हल पसंद आए तो परीक्षा की तैयारी के लिए "नोट सहेजें" बटन दबाएं।',
    notesNoMatch: 'कोई मिलान नहीं मिला।',
    notesViewInChat: 'पूरा हल चैट में देखें →',
    
    imageModalTitle: 'फ़ोटो से प्रश्न हल (Photo Solver)',
    imageModalSubtitle: 'किताब, कॉपी या स्क्रीनशॉट से चरणबद्ध हल',
    imageGalleryBtn: 'गैलरी / फ़ाइल अपलोड',
    imageCameraBtn: 'सीधे कैमरे से फ़ोटो लें',
    imageGalleryDesc: 'JPG, PNG, WebP आदि समर्थित',
    imageCameraDesc: 'किताब या कॉपी के पन्नों के लिए',
    imageSnapBtn: 'फ़ोटो लें',
    imageCancelBtn: 'रद्द करें',
    imageSpecialPromptLabel: 'इस फ़ोटो के संबंध में विशेष प्रश्न लिखें (वैकल्पिक):',
    imageSpecialPromptPlaceholder: 'जैसे: इस सवाल को चरणबद्ध हल करें और सूत्र समझाएं...',
    imageDemoTitle: 'या नीचे दिए गए नमूना आरेखों से तुरंत परीक्षण करें:',
    imageStartSolveBtn: 'प्रश्न हल करना शुरू करें',
    imageStatusReady: 'फ़ोटो तैयार है',
    imageStatusPick: 'फ़ोटो चुनें',
    cameraError: 'कैमरा चालू नहीं हो सका। कृपया अनुमति दें या फ़ाइल अपलोड करें।',
  },
};
