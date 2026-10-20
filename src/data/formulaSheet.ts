import { AppLanguage } from '../types';

export interface FormulaCategory {
  category: string;
  icon: string;
  items: {
    name: string;
    formula: string;
    explanation: string;
    example?: string;
  }[];
}

const FORMULAS_BN: FormulaCategory[] = [
  {
    category: 'বীজগণিত (Algebra)',
    icon: '📐',
    items: [
      {
        name: 'বর্গের প্রথম সূত্র',
        formula: '(a + b)² = a² + 2ab + b²',
        explanation: 'দুটি পদের যোগফলের বর্গ = প্রথম পদের বর্গ + ২ × গুণফল + দ্বিতীয় পদের বর্গ।',
        example: '(x + 3)² = x² + 6x + 9',
      },
      {
        name: 'বর্গের দ্বিতীয় সূত্র',
        formula: '(a - b)² = a² - 2ab + b²',
        explanation: 'দুটি পদের বিয়োগফলের বর্গ।',
        example: '(x - 2)² = x² - 4x + 4',
      },
      {
        name: 'বর্গের অন্তর সূত্র',
        formula: 'a² - b² = (a + b)(a - b)',
        explanation: 'উৎপাদকে বিশ্লেষণের অন্যতম মূল সূত্র।',
        example: 'x² - 16 = (x + 4)(x - 4)',
      },
      {
        name: 'ঘনের সূত্র',
        formula: '(a + b)³ = a³ + 3a²b + 3ab² + b³ = a³ + b³ + 3ab(a + b)',
        explanation: 'ঘন বা কিউব নির্ণয়ের মূল নিয়ম।',
      },
      {
        name: 'দ্বিঘাত সমীকরণের মূল নির্ণয়',
        formula: 'x = [-b ± √(b² - 4ac)] / (2a)',
        explanation: 'ax² + bx + c = 0 সমীকরণের সমাধান করার সর্বজনীন নিয়ম।',
      },
    ],
  },
  {
    category: 'জ্যামিতি ও ক্ষেত্রফল (Geometry)',
    icon: '📏',
    items: [
      {
        name: 'পিথাগোরাসের উপপাদ্য',
        formula: 'অতিভুজ² = লম্ব² + ভূমি²  (c² = a² + b²)',
        explanation: 'সমকোণী ত্রিভুজের বৃহত্তম বাহুর বর্গের মান অপর দুই বাহুর বর্গের সমষ্টির সমান।',
      },
      {
        name: 'ত্রিভুজের ক্ষেত্রফল',
        formula: 'ক্ষেত্রফল = ½ × ভূমি × উচ্চতা',
        explanation: 'যেকোনো সাধারণ ত্রিভুজের ক্ষেত্রফল পরিমাপ।',
      },
      {
        name: 'বৃত্তের ক্ষেত্রফল ও পরিধি',
        formula: 'ক্ষেত্রফল = πr²,  পরিধি = 2πr',
        explanation: 'r হলো বৃত্তের ব্যাসার্ধ, π ≈ 3.1416',
      },
      {
        name: 'আয়তক্ষেত্রের ক্ষেত্রফল ও পরিসীমা',
        formula: 'ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ,  পরিসীমা = ২(দৈর্ঘ্য + প্রস্থ)',
        explanation: 'আয়তক্ষেত্রের চারপাশের সীমানা ও ক্ষেত্র পরিমাপ।',
      },
    ],
  },
  {
    category: 'পদার্থবিজ্ঞান গতি ও বল (Physics)',
    icon: '⚡',
    items: [
      {
        name: 'গতির ১ম সমীকরণ',
        formula: 'v = u + at',
        explanation: 'u = আদিবেগ, v = শেষবেগ, a = ত্বরণ, t = সময়',
      },
      {
        name: 'গতির ২য় সমীকরণ (দূরত্ব)',
        formula: 's = ut + ½at²',
        explanation: 'সুষম ত্বরণে অতিক্রান্ত দূরত্ব নির্ণয়।',
      },
      {
        name: 'গতির ৩য় সমীকরণ',
        formula: 'v² = u² + 2as',
        explanation: 'সময় (t) জানা না থাকলে শেষবেগ বা দূরত্বের সম্পর্ক।',
      },
      {
        name: 'নিউটনের ২য় সূত্র (বল)',
        formula: 'F = ma',
        explanation: 'বল (Force) = ভর (Mass) × ত্বরণ (Acceleration)',
      },
      {
        name: 'কাজ ও গতিশক্তি',
        formula: 'W = F × s,  Eₖ = ½mv²',
        explanation: 'কাজের একক জুল (Joule), শক্তির স্থানান্তর প্রকাশ করে।',
      },
    ],
  },
  {
    category: 'রসায়ন ও গণনা (Chemistry)',
    icon: '🧪',
    items: [
      {
        name: 'মোল সংখ্যা (Mol Calculation)',
        formula: 'n = w / M = V / 22.4 = N / 6.023×10²³',
        explanation: 'w = ভর (গ্রাম), M = আণবিক ভর, V = STP তে আয়তন (লিটার)',
      },
      {
        name: 'দ্রবণের মোলারিটি',
        formula: 'S = (1000 × w) / (M × V_ml)',
        explanation: 'নির্দিষ্ট আয়তনের দ্রবণে মোলার ঘনমাত্রা নির্ণয়।',
      },
      {
        name: 'আদর্শ গ্যাস সমীকরণ',
        formula: 'PV = nRT',
        explanation: 'P = চাপ, V = আয়তন, n = মোল, R = গ্যাস ধ্রুবক, T = তাপমাত্রা',
      },
    ],
  },
];

const FORMULAS_EN: FormulaCategory[] = [
  {
    category: 'Algebra',
    icon: '📐',
    items: [
      {
        name: 'Square of Sum',
        formula: '(a + b)² = a² + 2ab + b²',
        explanation: 'Square of the sum of two terms.',
        example: '(x + 3)² = x² + 6x + 9',
      },
      {
        name: 'Square of Difference',
        formula: '(a - b)² = a² - 2ab + b²',
        explanation: 'Square of the difference of two terms.',
        example: '(x - 2)² = x² - 4x + 4',
      },
      {
        name: 'Difference of Two Squares',
        formula: 'a² - b² = (a + b)(a - b)',
        explanation: 'Fundamental formula for algebraic factoring.',
        example: 'x² - 16 = (x + 4)(x - 4)',
      },
      {
        name: 'Cube of Sum',
        formula: '(a + b)³ = a³ + 3a²b + 3ab² + b³ = a³ + b³ + 3ab(a + b)',
        explanation: 'Formula for cubic expansions.',
      },
      {
        name: 'Quadratic Formula',
        formula: 'x = [-b ± √(b² - 4ac)] / (2a)',
        explanation: 'Universal root formula for ax² + bx + c = 0.',
      },
    ],
  },
  {
    category: 'Geometry & Mensuration',
    icon: '📏',
    items: [
      {
        name: 'Pythagorean Theorem',
        formula: 'Hypotenuse² = Base² + Perpendicular² (c² = a² + b²)',
        explanation: 'In a right-angled triangle, square of hypotenuse equals sum of squares of other two sides.',
      },
      {
        name: 'Area of Triangle',
        formula: 'Area = ½ × base × height',
        explanation: 'Standard formula for finding triangular surface area.',
      },
      {
        name: 'Circle Area & Circumference',
        formula: 'Area = πr²,  Circumference = 2πr',
        explanation: 'r = radius of circle, π ≈ 3.14159',
      },
      {
        name: 'Rectangle Area & Perimeter',
        formula: 'Area = length × width,  Perimeter = 2(length + width)',
        explanation: 'Perimeter and surface measurement of a rectangle.',
      },
    ],
  },
  {
    category: 'Physics: Motion & Force',
    icon: '⚡',
    items: [
      {
        name: '1st Kinematic Equation',
        formula: 'v = u + at',
        explanation: 'u = initial velocity, v = final velocity, a = acceleration, t = time',
      },
      {
        name: '2nd Kinematic Equation (Distance)',
        formula: 's = ut + ½at²',
        explanation: 'Displacement covered under uniform acceleration.',
      },
      {
        name: '3rd Kinematic Equation',
        formula: 'v² = u² + 2as',
        explanation: 'Relates velocities and displacement without time variable.',
      },
      {
        name: "Newton's 2nd Law",
        formula: 'F = ma',
        explanation: 'Force (F) = mass (m) × acceleration (a)',
      },
      {
        name: 'Work and Kinetic Energy',
        formula: 'W = F × s,  Eₖ = ½mv²',
        explanation: 'Work unit is Joules (J); measure of energy transfer.',
      },
    ],
  },
  {
    category: 'Chemistry Calculations',
    icon: '🧪',
    items: [
      {
        name: 'Mole Concept',
        formula: 'n = w / M = V / 22.4 = N / 6.023×10²³',
        explanation: 'w = mass in grams, M = molar mass, V = volume at STP (L)',
      },
      {
        name: 'Molarity of Solution',
        formula: 'S = (1000 × w) / (M × V_ml)',
        explanation: 'Concentration of solution in moles per liter.',
      },
      {
        name: 'Ideal Gas Law',
        formula: 'PV = nRT',
        explanation: 'P = pressure, V = volume, n = moles, R = gas constant, T = Kelvin temp',
      },
    ],
  },
];

const FORMULAS_HI: FormulaCategory[] = [
  {
    category: 'बीजगणित (Algebra)',
    icon: '📐',
    items: [
      {
        name: 'योग का वर्ग सूत्र',
        formula: '(a + b)² = a² + 2ab + b²',
        explanation: 'दो पदों के योग का वर्ग = पहले पद का वर्ग + २ × गुणनफल + दूसरे पद का वर्ग।',
        example: '(x + 3)² = x² + 6x + 9',
      },
      {
        name: 'अंतर का वर्ग सूत्र',
        formula: '(a - b)² = a² - 2ab + b²',
        explanation: 'दो पदों के अंतर का वर्ग।',
        example: '(x - 2)² = x² - 4x + 4',
      },
      {
        name: 'वर्गों का अंतर सूत्र',
        formula: 'a² - b² = (a + b)(a - b)',
        explanation: 'गुणनखंड करने का सबसे प्रमुख सूत्र।',
        example: 'x² - 16 = (x + 4)(x - 4)',
      },
      {
        name: 'घन का सूत्र',
        formula: '(a + b)³ = a³ + 3a²b + 3ab² + b³ = a³ + b³ + 3ab(a + b)',
        explanation: 'त्रिविमीय विस्तार या क्यूब ज्ञात करने का नियम।',
      },
      {
        name: 'द्विघात समीकरण का मूल (श्रीधराचार्य सूत्र)',
        formula: 'x = [-b ± √(b² - 4ac)] / (2a)',
        explanation: 'ax² + bx + c = 0 के मूल ज्ञात करने का सार्वभौमिक सूत्र।',
      },
    ],
  },
  {
    category: 'ज्यामिति व क्षेत्रमिति (Geometry)',
    icon: '📏',
    items: [
      {
        name: 'पाइथागोरस प्रमेय',
        formula: 'कर्ण² = लम्ब² + आधार²  (c² = a² + b²)',
        explanation: 'समकोण त्रिभुज में सबसे लंबी भुजा का वर्ग अन्य दो भुजाओं के वर्गों के योग के बराबर होता है।',
      },
      {
        name: 'त्रिभुज का क्षेत्रफल',
        formula: 'क्षेत्रफल = ½ × आधार × ऊंचाई',
        explanation: 'किसी भी सामान्य त्रिभुज का क्षेत्रफल ज्ञात करना।',
      },
      {
        name: 'वृत्त का क्षेत्रफल व परिधि',
        formula: 'क्षेत्रफल = πr²,  परिधि = 2πr',
        explanation: 'r = त्रिज्या, π ≈ 3.1416',
      },
      {
        name: 'आयत का क्षेत्रफल व परिमाप',
        formula: 'क्षेत्रफल = लंबाई × चौड़ाई,  परिमाप = २(लंबाई + चौड़ाई)',
        explanation: 'आयत के क्षेत्रफल और चारों ओर की सीमा की माप।',
      },
    ],
  },
  {
    category: 'भौतिक विज्ञान: गति व बल (Physics)',
    icon: '⚡',
    items: [
      {
        name: 'गति का पहला समीकरण',
        formula: 'v = u + at',
        explanation: 'u = प्रारंभिक वेग, v = अंतिम वेग, a = त्वरण, t = समय',
      },
      {
        name: 'गति का दूसरा समीकरण (दूरी)',
        formula: 's = ut + ½at²',
        explanation: 'एकसमान त्वरण में तय की गई दूरी।',
      },
      {
        name: 'गति का तीसरा समीकरण',
        formula: 'v² = u² + 2as',
        explanation: 'समय (t) ज्ञात न होने पर वेग और दूरी का संबंध।',
      },
      {
        name: 'न्यूटन का द्वितीय नियम (बल)',
        formula: 'F = ma',
        explanation: 'बल (Force) = द्रव्यमान (Mass) × त्वरण (Acceleration)',
      },
      {
        name: 'कार्य व गतिज ऊर्जा',
        formula: 'W = F × s,  Eₖ = ½mv²',
        explanation: 'कार्य का मात्रक जूल (Joule) है।',
      },
    ],
  },
  {
    category: 'रसायन विज्ञान गणना (Chemistry)',
    icon: '🧪',
    items: [
      {
        name: 'मोल संकल्पना (Mole Concept)',
        formula: 'n = w / M = V / 22.4 = N / 6.023×10²³',
        explanation: 'w = द्रव्यमान (ग्राम), M = मोलर द्रव्यमान, V = STP पर आयतन (लीटर)',
      },
      {
        name: 'विलयन की मोलरता (Molarity)',
        formula: 'S = (1000 × w) / (M × V_ml)',
        explanation: 'प्रति लीटर विलयन में घुले विलेय के मोलों की संख्या।',
      },
      {
        name: 'आदर्श गैस समीकरण',
        formula: 'PV = nRT',
        explanation: 'P = दाब, V = आयतन, n = मोल, R = गैस स्थिरांक, T = तापमान (केल्विन)',
      },
    ],
  },
];

export function getFormulaCheatSheet(lang: AppLanguage): FormulaCategory[] {
  if (lang === 'en') return FORMULAS_EN;
  if (lang === 'hi') return FORMULAS_HI;
  return FORMULAS_BN;
}

export const FORMULA_CHEAT_SHEET = FORMULAS_BN;
