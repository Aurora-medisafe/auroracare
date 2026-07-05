/// <reference types="vite/client" />

interface SpeechSynthesisUtterance {
  rate: number;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechSynthesisErrorEvent) => void) | null;
}

interface SpeechSynthesis {
  speak(utterance: SpeechSynthesisUtterance): void;
  cancel(): void;
  pause(): void;
  resume(): void;
  paused: boolean;
  speaking: boolean;
}

interface Window {
  speechSynthesis: SpeechSynthesis;
}
