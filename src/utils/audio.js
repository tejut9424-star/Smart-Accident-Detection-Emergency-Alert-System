// Web Audio API Sound Synthesizer & Speech Synthesis

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playBeep(freq = 800, duration = 0.1, type = 'sine') {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  }

  playCrashAlert() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      
      // Multi-tone siren
      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(880, now);
      osc1.frequency.linearRampToValueAtTime(440, now + 0.3);
      osc1.frequency.linearRampToValueAtTime(880, now + 0.6);
      
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.linearRampToValueAtTime(0.01, now + 1.2);
      
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      
      osc1.start(now);
      osc1.stop(now + 1.2);
    } catch (e) {
      console.warn('Crash alert failed', e);
    }
  }

  playSuccess() {
    if (this.isMuted) return;
    this.playBeep(523.25, 0.08);
    setTimeout(() => this.playBeep(659.25, 0.08), 80);
    setTimeout(() => this.playBeep(783.99, 0.15), 160);
  }

  speak(text) {
    if (this.isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  }
}

export const soundFx = new SoundController();
