// Text-to-Speech and Speech-to-Text helpers with multi-language support (bn, en, hi)
import { AppLanguage } from '../types';

export function speakText(
  text: string,
  lang: AppLanguage = 'bn',
  onEnd?: () => void,
  onError?: () => void
) {
  if (!('speechSynthesis' in window)) {
    if (onError) onError();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip markdown formatting for cleaner speech
  const cleanText = text
    .replace(/[#*`_~>[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // If text is very long, limit speech to first 400 characters for snappy playback
  const utteranceText = cleanText.length > 500 ? cleanText.slice(0, 500) + '...' : cleanText;

  const utterance = new SpeechSynthesisUtterance(utteranceText);

  // Target speech codes
  const targetPrefix = lang === 'hi' ? 'hi' : lang === 'en' ? 'en' : 'bn';
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix));

  if (matchedVoice) {
    utterance.voice = matchedVoice;
    utterance.lang = matchedVoice.lang;
  } else {
    utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'en' ? 'en-US' : 'bn-BD';
  }

  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onError) onError();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeaking(): boolean {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}
