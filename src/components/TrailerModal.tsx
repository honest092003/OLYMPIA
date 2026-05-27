import React, { useState, useEffect, useRef } from "react";
import { X, Play, Music, Volume2, VolumeX, Flame } from "lucide-react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => { void } | any;
}

export default function TrailerModal({ isOpen, onClose }: TrailerModalProps) {
  const [isPlayingAud, setIsPlayingAud] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<any>(null);
  const visualIntervalRef = useRef<any>(null);

  const trailerStages = [
    { title: "THE PAIN", desc: "고통을 기꺼이 받아들이는 자만이 정상에 선다", action: "HEAVY PRESS SECTOR" },
    { title: "THE SWEAT", desc: "체육관 바닥에 흐른 이 땀망울은 기대를 배신하지 않는다", action: "IRON CONTRACT SECTOR" },
    { title: "THE SACRIFICE", desc: "수면, 음식, 그리고 정신... 모든 조각을 강철처럼 정렬하다", action: "DEADLIFT HORIZON" },
    { title: "THE TRIUMPH", desc: "올림피아 무대 위, 골드 헤일로의 빛깔이 너를 물들일 시간", action: "ASCEND ORBIT" },
    { title: "TITAN ELITE", desc: "전설은 지금 이곳, 지옥 같은 참호 속에서 연마된다", action: "GO TO GLORY" }
  ];

  // Web Audio dynamic music loop generator - creates a high contrast metal industrial workout tone!
  const playWorkoutAudio = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Start drum / synth trigger interval
      let step = 0;
      setIsPlayingAud(true);

      intervalRef.current = setInterval(() => {
        if (!ctx) return;
        
        const time = ctx.currentTime;
        
        // 1. Heavy bass drum thud (low pass filtered noise and sine wave swing)
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.type = "sine";
        // Sliding pitch down for kick thud
        osc.frequency.setValueAtTime(step % 4 === 0 ? 90 : 70, time);
        osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.35);

        gainNode.gain.setValueAtTime(0.4, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

        osc.start(time);
        osc.stop(time + 0.36);

        // 2. High frequency metallic iron clang (resonant bandpass on square waves)
        if (step % 2 === 1) {
          const oscIron = ctx.createOscillator();
          const pfilter = ctx.createBiquadFilter();
          const gainIron = ctx.createGain();

          oscIron.type = "triangle";
          oscIron.frequency.setValueAtTime(880, time); // high ringing metal frequency
          oscIron.frequency.setValueAtTime(1200, time + 0.05);

          pfilter.type = "bandpass";
          pfilter.Q.value = 15;
          pfilter.frequency.value = 1000;

          oscIron.connect(pfilter);
          pfilter.connect(gainIron);
          gainIron.connect(ctx.destination);

          gainIron.gain.setValueAtTime(0.08, time);
          gainIron.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

          oscIron.start(time);
          oscIron.stop(time + 0.16);
        }

        // 3. Sub synth drone on special steps
        if (step % 8 === 4) {
          const drone = ctx.createOscillator();
          const droneGain = ctx.createGain();
          drone.type = "sawtooth";
          drone.frequency.setValueAtTime(55, time); // low A
          
          drone.connect(droneGain);
          droneGain.connect(ctx.destination);
          
          droneGain.gain.setValueAtTime(0.15, time);
          droneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.82);
          
          drone.start(time);
          drone.stop(time + 0.85);
        }

        step++;
      }, 350); // fast tempo (approx 171 BPM)

    } catch (e) {
      console.error("Web Audio could not start", e);
    }
  };

  const stopWorkoutAudio = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPlayingAud(false);
  };

  useEffect(() => {
    if (isOpen) {
      // Loop the visual teaser sequences
      visualIntervalRef.current = setInterval(() => {
        setActiveFrame((prev) => (prev + 1) % trailerStages.length);
      }, 4200);

      // Trigger automatic high intensity workout trailer sounds
      playWorkoutAudio();
    } else {
      stopWorkoutAudio();
      if (visualIntervalRef.current) {
        clearInterval(visualIntervalRef.current);
      }
    }

    return () => {
      stopWorkoutAudio();
      if (visualIntervalRef.current) {
        clearInterval(visualIntervalRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 animate-fade-in font-sans">
      <div className="relative w-full max-w-5xl h-full max-h-[750px] bg-black border-2 border-primary-gold flex flex-col justify-between overflow-hidden shadow-2xl p-6 md:p-12">
        
        {/* Decorative corner lines to emphasize heavy industrial brutalist format */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-gold"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-gold"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-gold"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-gold"></div>

        {/* Header Bar */}
        <div className="flex justify-between items-center border-b border-surface-container-high pb-4 z-10 w-full">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 bg-red-600 animate-ping"></span>
            <p className="font-mono text-xs uppercase tracking-widest text-[#FF3E3E] font-bold">
              CINEMATIC SENSORY INJECTION // LIVE ADRENALINE AUDIO ACTIVE
            </p>
          </div>
          <button 
            onClick={() => {
              stopWorkoutAudio();
              onClose();
            }}
            className="text-on-surface hover:text-primary-gold cursor-pointer transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Stage / Visualizer Frame */}
        <div className="flex-grow flex flex-col items-center justify-center text-center relative max-w-3xl mx-auto my-8 w-full">
          
          {/* Aesthetic brutalist dynamic grid background */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-5 pointer-events-none">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border border-primary-gold"></div>
            ))}
          </div>

          <div className="absolute top-0 right-0 text-right opacity-30 select-none">
            <span className="font-mono text-[90px] font-extrabold text-white/5 tracking-tighter leading-none">
              0{activeFrame + 1}
            </span>
          </div>

          {/* Core concept stage container */}
          <div className="space-y-6 z-10 p-4 transition-all duration-700 block transform scale-100 animate-pulse">
            <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700] text-primary-gold px-3.5 py-1 text-xs font-mono uppercase tracking-widest">
              <Flame size={14} className="animate-spin text-primary-gold" />
              {trailerStages[activeFrame].action}
            </div>

            <h3 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-white uppercase text-gradient-gold">
              {trailerStages[activeFrame].title}
            </h3>

            <p className="font-sans text-base md:text-lg text-on-surface max-w-xl mx-auto leading-relaxed font-semibold">
              {trailerStages[activeFrame].desc}
            </p>
          </div>

          {/* Heavy visual rhythm pulse */}
          <div className="absolute bottom-4 flex gap-2">
            {trailerStepsVisualizer(activeFrame)}
          </div>
        </div>

        {/* Controller and close options footer */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-surface-container-high pt-6 z-10 w-full gap-4">
          
          {/* Audio controller section */}
          <div className="flex items-center gap-4 bg-surface-container p-3 border border-surface-container-high w-full md:w-auto justify-between">
            <div className="flex items-center gap-3">
              <Music size={18} className="text-primary-gold animate-bounce" />
              <div className="text-left">
                <p className="font-mono text-[10px] text-gray-400 leading-none">TRAILER AUDIO MODE</p>
                <p className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                  {isPlayingAud ? "INDUSTRIAL SYMPHONY (PLAYING)" : "MUTED"}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                if (isPlayingAud) {
                  stopWorkoutAudio();
                } else {
                  playWorkoutAudio();
                }
              }}
              className="bg-primary-gold hover:bg-white text-black text-xs font-mono font-bold uppercase py-2 px-4 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                {isPlayingAud ? (
                  <>
                    <VolumeX size={14} /> MUTE
                  </>
                ) : (
                  <>
                    <Volume2 size={14} /> HEAR INTENSITY
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Progress state bullet points */}
          <div className="flex gap-3">
            {trailerStages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveFrame(i)}
                className={`w-3.5 h-3.5 transition-all ${
                  activeFrame === i 
                    ? "bg-primary-gold scale-125 rotate-45 border border-white" 
                    : "bg-surface-container border border-surface-container-high hover:bg-neutral-800"
                }`}
              ></button>
            ))}
          </div>

          <button
            onClick={() => {
              stopWorkoutAudio();
              onClose();
            }}
            className="border border-[#FFD700] hover:bg-primary-gold hover:text-black text-primary-gold px-8 py-3.5 text-xs font-mono font-bold uppercase transition-all duration-200"
          >
            DISMISS INTENSITY
          </button>
        </div>

      </div>
    </div>
  );
}

function trailerStepsVisualizer(active: number) {
  const bars = Array.from({ length: 4 });
  return (
    <div className="flex items-end h-6 gap-1 border-b border-white/20 pb-1">
      {bars.map((_, i) => (
        <span 
          key={i} 
          className={`w-1 bg-[#FFD700] transition-all duration-300 ${
            active % 2 === i % 2 ? "h-4" : "h-1"
          }`}
        ></span>
      ))}
    </div>
  );
}
