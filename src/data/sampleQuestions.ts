import { Subject, StudentGrade, AppLanguage } from '../types';

export interface SampleQuestion {
  id: string;
  title: string;
  subject: Subject;
  grade: StudentGrade;
  prompt: string;
  description: string;
  icon: string;
  hasSampleImage?: boolean;
  sampleImageSvg?: string;
}

// Generate nice educational SVG diagrams for sample image solving
const geometrySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" style="background:#ffffff; font-family:sans-serif;">
  <rect width="100%" height="100%" fill="#fafafa"/>
  <text x="20" y="35" font-size="16" font-weight="bold" fill="#1e293b">Question / प्रश्न: Find angle ∠A in triangle ABC</text>
  <path d="M 60 230 L 340 230 L 220 70 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="3" stroke-linejoin="round"/>
  <!-- Angles -->
  <path d="M 90 230 A 30 30 0 0 0 75 210" fill="none" stroke="#e11d48" stroke-width="2"/>
  <text x="95" y="220" font-size="14" font-weight="bold" fill="#e11d48">∠B = 65°</text>
  
  <path d="M 310 230 A 30 30 0 0 1 325 210" fill="none" stroke="#e11d48" stroke-width="2"/>
  <text x="270" y="220" font-size="14" font-weight="bold" fill="#e11d48">∠C = 45°</text>
  
  <!-- Vertex Labels -->
  <text x="215" y="55" font-size="16" font-weight="bold" fill="#0369a1">A (?)</text>
  <text x="40" y="245" font-size="16" font-weight="bold" fill="#0369a1">B</text>
  <text x="350" y="245" font-size="16" font-weight="bold" fill="#0369a1">C</text>
  
  <text x="20" y="280" font-size="13" fill="#64748b">Sum of angles in a triangle = 180°</text>
</svg>`;

const physicsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" width="400" height="280" style="background:#ffffff; font-family:sans-serif;">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="20" y="30" font-size="16" font-weight="bold" fill="#0f172a">Physics: Motion and Acceleration</text>
  <line x1="40" y1="200" x2="360" y2="200" stroke="#94a3b8" stroke-width="3"/>
  <!-- Car -->
  <rect x="50" y="160" width="70" height="30" rx="6" fill="#3b82f6"/>
  <circle cx="65" cy="195" r="8" fill="#1e293b"/>
  <circle cx="105" cy="195" r="8" fill="#1e293b"/>
  <!-- Arrow -->
  <line x1="130" y1="175" x2="260" y2="175" stroke="#10b981" stroke-width="3"/>
  <text x="140" y="165" font-size="13" font-weight="bold" fill="#059669">Initial Velocity u = 0 ms⁻¹</text>
  <text x="140" y="145" font-size="13" font-weight="bold" fill="#059669">Acceleration a = 2 ms⁻²</text>
  <text x="20" y="245" font-size="14" font-weight="bold" fill="#1e293b">Question: Find final velocity (v) & distance (s) after 5 seconds</text>
</svg>`;

export function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
}

export function getSampleQuestions(lang: AppLanguage): SampleQuestion[] {
  if (lang === 'en') {
    return [
      {
        id: 'sample-math-1',
        title: 'Triangle Geometry Problem (Photo Solver)',
        subject: 'গণিত (Math)',
        grade: '৮ম শ্রেণী',
        prompt: 'Look at the diagram in the image. Calculate the unknown angle ∠A in triangle ABC step-by-step and explain the concept.',
        description: 'Solve angle using the theorem: sum of triangle angles = 180°',
        icon: '📐',
        hasSampleImage: true,
        sampleImageSvg: geometrySvg,
      },
      {
        id: 'sample-physics-1',
        title: 'Kinematics & Acceleration (Photo Solver)',
        subject: 'পদার্থবিজ্ঞান (Physics)',
        grade: '৯ম-১০ম (এসএসসি)',
        prompt: 'Based on the image details, calculate the final velocity (v) and distance (s) of the car after 5 seconds. Show formulas clearly.',
        description: 'Motion problem starting from rest with constant acceleration',
        icon: '🚗',
        hasSampleImage: true,
        sampleImageSvg: physicsSvg,
      },
      {
        id: 'sample-math-2',
        title: 'Algebra: Factorization & Middle Term',
        subject: 'গণিত (Math)',
        grade: '৯ম-১০ম (এসএসসি)',
        prompt: 'Factorize x² - 5x + 6 step-by-step with clear explanation so I can solve similar quadratic problems myself.',
        description: 'Master the middle-term split method easily',
        icon: '🔢',
      },
      {
        id: 'sample-science-1',
        title: "Newton's 3rd Law & Real-life Analogies",
        subject: 'পদার্থবিজ্ঞান (Physics)',
        grade: '৯ম-১০ম (এসএসসি)',
        prompt: "What is Newton's 3rd Law of Motion? Explain 'for every action there is an equal and opposite reaction' with 3 fun real-life everyday examples.",
        description: 'Action-reaction forces explained with everyday analogies',
        icon: '⚡',
      },
      {
        id: 'sample-chem-1',
        title: 'Atomic Structure & Electron Configuration',
        subject: 'রসায়ন (Chemistry)',
        grade: '৯ম-১০ম (এসএসসি)',
        prompt: 'How is the electron configuration of Sodium (Na, atomic number 11) determined as 2, 8, 1? Explain shell rules simply.',
        description: 'Bohr model and 2n² electron distribution',
        icon: '🧪',
      },
      {
        id: 'sample-bio-1',
        title: 'Photosynthesis Process',
        subject: 'জীববিজ্ঞান (Biology)',
        grade: '৮ম শ্রেণী',
        prompt: 'How do plants make their own food? Explain photosynthesis with clear bullet points, chemical equation, and role of sunlight.',
        description: 'Role of chlorophyll, water, carbon dioxide, and light',
        icon: '🌿',
      },
    ];
  }

  if (lang === 'hi') {
    return [
      {
        id: 'sample-math-1',
        title: 'त्रिभुज ज्यामिति प्रश्न (फ़ोटो से हल)',
        subject: 'গণিত (Math)',
        grade: '৮ম শ্রেণী',
        prompt: 'फ़ोटो में दिए गए चित्र को देखकर त्रिभुज ABC के अज्ञात कोण ∠A का मान चरणबद्ध निकालें और नियम समझाएं।',
        description: 'त्रिभुज के तीनों कोणों का योग १८०° प्रमेय पर आधारित',
        icon: '📐',
        hasSampleImage: true,
        sampleImageSvg: geometrySvg,
      },
      {
        id: 'sample-physics-1',
        title: 'गति व त्वरण समस्या (फ़ोटो से हल)',
        subject: 'পদার্থবিজ্ঞান (Physics)',
        grade: '৯ম-১০ম (এসএসসি)',
        prompt: 'चित्र में दी गई जानकारी के आधार पर ५ सेकंड बाद कार का अंतिम वेग (v) और दूरी (s) ज्ञात करें। सूत्र स्पष्ट दिखाएं।',
        description: 'विरामावस्था से त्वरित गति का चरणबद्ध हल',
        icon: '🚗',
        hasSampleImage: true,
        sampleImageSvg: physicsSvg,
      },
      {
        id: 'sample-math-2',
        title: 'बीजगणित: गुणनखंड विधि (Middle Term)',
        subject: 'গণিত (Math)',
        grade: '৯ম-১০ম (এসএসসি)',
        prompt: 'x² - 5x + 6 का गुणनखंड (Factorization) चरण-दर-चरण आसान भाषा में समझाएं।',
        description: 'मध्य पद विभाजन (Middle Term Split) विधि',
        icon: '🔢',
      },
      {
        id: 'sample-science-1',
        title: 'न्यूटन का तृतीय गति नियम व दैनिक उदाहरण',
        subject: 'পদার্থবিজ্ঞান (Physics)',
        grade: '৯ম-১০ম (এসএসসি)',
        prompt: 'न्यूटन का गति का तीसरा नियम क्या है? "प्रत्येक क्रिया के बराबर और विपरीत प्रतिक्रिया होती है" को दैनिक जीवन के ३ उदाहरणों से समझाएं।',
        description: 'क्रिया-प्रतिक्रिया बल के रोचक वास्तविक उदाहरण',
        icon: '⚡',
      },
      {
        id: 'sample-chem-1',
        title: 'परमाणु संरचना व इलेक्ट्रॉनिक विन्यास',
        subject: 'রসায়ন (Chemistry)',
        grade: '৯ম-১০ম (এসএসসি)',
        prompt: 'सोडियम (Na, परमाणु क्रमांक ११) का इलेक्ट्रॉनिक विन्यास २, ८, १ कैसे होता है? आसान भाषा में समझाएं।',
        description: 'कक्षा और बोर मॉडल अनुसार इलेक्ट्रॉन वितरण',
        icon: '🧪',
      },
      {
        id: 'sample-bio-1',
        title: 'प्रकाश संश्लेषण (Photosynthesis)',
        subject: 'জীববিজ্ঞান (Biology)',
        grade: '৮ম শ্রেণী',
        prompt: 'पौधे अपना भोजन कैसे बनाते हैं? प्रकाश संश्लेषण की प्रक्रिया को आसान बिंदुओं और समीकरण सहित समझाएं।',
        description: 'सूर्य का प्रकाश, जल और क्लोरोफिल की भूमिका',
        icon: '🌿',
      },
    ];
  }

  // Bengali default
  return [
    {
      id: 'sample-math-1',
      title: 'জ্যামিতির ত্রিকোণ সমস্যা (ছবির সমাধান)',
      subject: 'গণিত (Math)',
      grade: '৮ম শ্রেণী',
      prompt: 'ছবিটি দেখে ত্রিভুজটির অজ্ঞাত কোণ ∠A এর মান ধাপে ধাপে নির্ণয় করে দাও এবং নিয়মটি বুঝিয়ে বলো।',
      description: 'ত্রিভুজের তিন কোণের সমষ্টি ১৮০° ভিত্তিক চিত্র সমস্যা',
      icon: '📐',
      hasSampleImage: true,
      sampleImageSvg: geometrySvg,
    },
    {
      id: 'sample-physics-1',
      title: 'গতিবিদ্যা ও ত্বরণ (ছবির সমাধান)',
      subject: 'পদার্থবিজ্ঞান (Physics)',
      grade: '৯ম-১০ম (এসএসসি)',
      prompt: 'ছবিতে দেওয়া তথ্যের ভিত্তিতে ৫ সেকেন্ড পর গাড়িটির শেষবেগ এবং দূরত্ব নির্ণয় করো। সূত্রগুলো স্পষ্টভাবে দেখাবে।',
      description: 'স্থিরাবস্থা থেকে ত্বরণশীল গাড়ির গতি সংক্রান্ত সমস্যা',
      icon: '🚗',
      hasSampleImage: true,
      sampleImageSvg: physicsSvg,
    },
    {
      id: 'sample-math-2',
      title: 'বীজগণিতের সরল ও উৎপাদক',
      subject: 'গণিত (Math)',
      grade: '৯ম-১০ম (এসএসসি)',
      prompt: 'x² - 5x + 6 কে উৎপাদকে বিশ্লেষণ করো। প্রতিটি ধাপ সহজ ভাষায় বুঝিয়ে দাও যেন আমি নিজে নিজে সমাধান করতে পারি।',
      description: 'মিডল টার্ম ব্রেকিং পদ্ধতি সহজ নিয়মে শেখা',
      icon: '🔢',
    },
    {
      id: 'sample-science-1',
      title: 'নিউটনের ৩য় সূত্র ও বাস্তব উদাহরণ',
      subject: 'পদার্থবিজ্ঞান (Physics)',
      grade: '৯ম-১০ম (এসএসসি)',
      prompt: 'নিউটনের গতির ৩য় সূত্রটি কী? "প্রত্যেক ক্রিয়ারই সমান ও বিপরীত প্রতিক্রিয়া আছে" - এটি সহজে বোঝার জন্য ৩টি বাস্তব জীবনের উদাহরণ দাও।',
      description: 'ক্রিয়া-প্রতিক্রিয়া বলের বাস্তব দৃষ্টান্ত',
      icon: '⚡',
    },
    {
      id: 'sample-chem-1',
      title: 'পরমাণুর গঠন ও ইলেকট্রন বিন্যাস',
      subject: 'রসায়ন (Chemistry)',
      grade: '৯ম-১০ম (এসএসসি)',
      prompt: 'সোডিয়াম (Na, পারমাণবিক সংখ্যা ১১) এর ইলেকট্রন বিন্যাস ২, ৮, ১ কীভাবে হলো? এটা আমাকে একদম সহজ করে বুঝিয়ে দাও।',
      description: 'কক্ষপথ ও বোর মডেল অনুযায়ী ইলেকট্রন বণ্টন',
      icon: '🧪',
    },
    {
      id: 'sample-bio-1',
      title: 'সালোকসংশ্লেষণ (Photosynthesis)',
      subject: 'জীববিজ্ঞান (Biology)',
      grade: '৮ম শ্রেণী',
      prompt: 'উদ্ভিদ কীভাবে খাদ্য তৈরি করে? সালোকসংশ্লেষণ প্রক্রিয়াটি পয়েন্ট আকারে এবং সহজ সমীকরণ সহ বুঝিয়ে দাও।',
      description: 'সূর্যালোক, পানি ও ক্লোরোফিলের ভূমিকা',
      icon: '🌿',
    },
  ];
}

export const SAMPLE_QUESTIONS = getSampleQuestions('bn');
