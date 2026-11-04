/**
 * Web Speech API wrapper to speak text aloud in English
 */
export const speakWord = (text, lang = 'en-US') => {
  if (!('speechSynthesis' in window)) {
    alert('Tarayıcınız ses sentezini (Web Speech API) desteklemiyor.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // Slightly slower for clear pronunciation learning
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};
