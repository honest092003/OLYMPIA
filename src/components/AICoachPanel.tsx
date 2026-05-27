import React, { useState } from "react";
import { Send, Dumbbell, Sparkles, AlertCircle, Copy, Printer, Check, UserCheck, ChevronRight } from "lucide-react";
import { TITANS_DATA, Athlete } from "../data";

export default function AICoachPanel() {
  const [selectedTitan, setSelectedTitan] = useState<Athlete>(TITANS_DATA[0]);
  const [experience, setExperience] = useState("Intermediate");
  const [goal, setGoal] = useState("Hypertrophy Volume");
  const [muscle, setMuscle] = useState("Chest Depth");
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routine, setRoutine] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const experienceTiers = [
    { value: "Beginner", label: "초심자 (0-1년)" },
    { value: "Intermediate", label: "중급 빌더 (1-3년)" },
    { value: "Pro Lifter", label: "고강도 훈련자 (3-5년)" },
    { value: "Beast Mode", label: "엘리트 괴물 (5년 이상)" }
  ];

  const goalsList = [
    { value: "Bulking", label: "고부피 벌크업" },
    { value: "Sculpting Cut", label: "데피니션 & 다이어트" },
    { value: "Hypertrophy Volume", label: "볼륨 보디빌딩" },
    { value: "Strength Power", label: "고중량 파워 블렌딩" }
  ];

  const muscleFocuses = [
    { value: "Chest Depth", label: "가슴 외/내부 프레임" },
    { value: "Golden Shoulders", label: "어깨 볼륨 (전/측/후면)" },
    { value: "Massive Quadriceps", label: "하체 대퇴사두근 외측 스윕" },
    { value: "Back Thickness", label: "등 전체 두께 및 프레임" },
    { value: "Core Glute Sym", label: "둔근 및 몸통 대칭성" }
  ];

  const loadingQuotes = [
    "참호 속 철근을 예열하고 있습니다...",
    "타이탄의 트레이닝 철학을 투입하는 중...",
    "세트 수와 실패 지점을 정수 계산하는 중...",
    "초고강도 득근 정수 루틴 조립 완료 직전..."
  ];

  const handleGenerateRoutine = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRoutine(null);
    setLoadingStep(0);

    const intv = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingQuotes.length);
    }, 1200);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteName: selectedTitan.name,
          athleteDivision: selectedTitan.division,
          userExperience: experience,
          fitnessGoal: goal,
          focusMuscle: muscle,
          userPrompt: userPrompt
        })
      });

      const data = await response.json();
      clearInterval(intv);

      if (!response.ok) {
        throw new Error(data.error || "코치 정보 수집에 실패했습니다.");
      }

      setRoutine(data.text);
    } catch (err: any) {
      clearInterval(intv);
      setError(err.message || "서버와 통신하는 도중 문제가 생겼습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!routine) return;
    navigator.clipboard.writeText(routine);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedTitan.name} - ELITE TRAINING ROUTINE</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
            h1, h2, h3 { color: #cc9900; text-transform: uppercase; }
            pre { white-space: pre-wrap; word-wrap: break-word; font-family: inherit; font-size: 15px; }
            .header-info { border-bottom: 3px solid #cc9900; padding-bottom: 12px; margin-bottom: 24px; }
          </style>
        </head>
        <body>
          <div class="header-info">
            <h1>TITAN ELITE TRAINING ROUTINE</h1>
            <p><strong>TRAINER:</strong> IFBB PRO ${selectedTitan.name} (${selectedTitan.division})</p>
            <p><strong>TARGET LIFTER:</strong> ${experience} tier // Goal: ${goal} // Focus: ${muscle}</p>
          </div>
          <pre>${routine}</pre>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Safe manual markdown renderer to circumvent dependency bugs and keep styling dark & sharp
  const renderFormattedRoutine = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith("###")) {
        return (
          <h4 key={index} className="text-xl font-display font-extrabold text-primary-gold uppercase tracking-tighter mt-6 mb-3 border-b border-surface-container-high pb-1">
            {line.replaceAll("#", "").trim()}
          </h4>
        );
      }
      if (line.startsWith("##")) {
        return (
          <h3 key={index} className="text-2xl font-display font-extrabold text-white uppercase tracking-tight mt-8 mb-4">
            {line.replaceAll("#", "").trim()}
          </h3>
        );
      }
      if (line.startsWith("#")) {
        return (
          <h2 key={index} className="text-3xl font-display font-extrabold text-gradient-gold uppercase tracking-tight mt-10 mb-6">
            {line.replaceAll("#", "").trim()}
          </h2>
        );
      }

      // Horizontal rule
      if (line.trim() === "---") {
        return <hr key={index} className="border-t-2 border-surface-container-high my-6" />;
      }

      // Strong parser inline
      let content: React.ReactNode = line;
      if (line.includes("**")) {
        const parts = line.split("**");
        content = parts.map((part, pidx) => pidx % 2 === 1 ? <strong key={pidx} className="text-primary-gold font-bold">{part}</strong> : part);
      }

      // Bullet points
      if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
        return (
          <li key={index} className="ml-6 py-1 list-disc text-sm md:text-base text-on-surface leading-normal font-medium">
            {content}
          </li>
        );
      }

      // Empty space
      if (!line.trim()) {
        return <div key={index} className="h-2" />;
      }

      return (
        <p key={index} className="text-sm md:text-base text-on-surface leading-relaxed mb-1.5 font-medium">
          {content}
        </p>
      );
    });
  };

  return (
    <div id="ai-coach-section" className="bg-black border border-surface-container-high p-6 md:p-10 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/5 blur-3xl rounded-full"></div>

      {/* Direct layout structure split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Selector Input options */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFD700]/10 border border-[#FFD700]/30 text-primary-gold px-2.5 py-0.5 text-xs font-mono font-bold uppercase mb-4">
              <Sparkles size={12} />
              TITAN CO-PILOT
            </div>
            
            <h3 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight mb-2">
              TITAN AI ROUTINE BUILDER
            </h3>
            <p className="font-sans text-sm text-gray-400 mb-8 font-medium">
              원하는 월드클래스 IFBB 보디빌더를 지명하고 자신의 신체 프로필을 설정해 보세요. 전장과도 같은 참호에서 벼려낸 하이퍼 득근 루틴이 즉시 수립됩니다.
            </p>

            <form onSubmit={handleGenerateRoutine} className="space-y-6">
              
              {/* Select Champion */}
              <div>
                <label className="block font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  지명 타이탄 코치 (CHOOSE CHAMPION COACH)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {TITANS_DATA.map((titan) => (
                    <button
                      type="button"
                      key={titan.id}
                      onClick={() => setSelectedTitan(titan)}
                      className={`relative aspect-[3/4] overflow-hidden grayscale border transition-all ${
                        selectedTitan.id === titan.id
                          ? "border-primary-gold scale-[1.03] grayscale-0 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                          : "border-surface-container-high hover:border-gray-500 hover:scale-[1.01]"
                      }`}
                    >
                      <img src={titan.image} alt={titan.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-2 text-center">
                        <p className="font-display font-black text-[9px] md:text-[10px] text-white leading-tight truncate">
                          {titan.name.split(" ")[0]}
                        </p>
                        <p className="font-mono text-[7px] text-primary-gold font-bold leading-none truncate mt-0.5">
                          {titan.division.split(" ")[0]}
                        </p>
                      </div>
                      
                      {selectedTitan.id === titan.id && (
                        <div className="absolute top-1.5 right-1.5 bg-primary-gold text-black p-0.5 rounded-full">
                          <UserCheck size={10} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Experience Tier */}
                <div>
                  <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    훈련자 구력 등급
                  </label>
                  <select
                    className="w-full bg-surface-container border border-surface-container-high text-white text-xs font-mono py-3.5 px-3 focus:outline-none focus:border-primary-gold font-bold"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    {experienceTiers.map((tier) => (
                      <option key={tier.value} value={tier.value} className="bg-black">
                        {tier.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Workout goal */}
                <div>
                  <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    일차별 트레이닝 목표
                  </label>
                  <select
                    className="w-full bg-surface-container border border-surface-container-high text-white text-xs font-mono py-3.5 px-3 focus:outline-none focus:border-primary-gold font-bold"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    {goalsList.map((g) => (
                      <option key={g.value} value={g.value} className="bg-black">
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Muscle Focus */}
                <div className="md:col-span-2">
                  <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    집중 돌파 근육 부위 지정 (TARGET FOCUS)
                  </label>
                  <select
                    className="w-full bg-surface-container border border-surface-container-high text-white text-xs font-mono py-3.5 px-3 focus:outline-none focus:border-primary-gold font-bold"
                    value={muscle}
                    onChange={(e) => setMuscle(e.target.value)}
                  >
                    {muscleFocuses.map((item) => (
                      <option key={item.value} value={item.value} className="bg-black">
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional custom text */}
                <div className="md:col-span-2">
                  <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    특이사항 및 추가 지시 (부상 부위, 선호 테크닉 등)
                  </label>
                  <textarea
                    className="w-full bg-surface-container border border-surface-container-high text-white text-xs py-3.5 px-3 focus:outline-none focus:border-primary-gold font-medium h-20 resize-none font-sans"
                    placeholder="예: 어깨 회전근개가 약함, 드롭세트를 풍부하게 배정해 줘."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                </div>
              </div>

              {/* Trigger Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-gold hover:bg-white text-black font-mono font-bold uppercase py-4.5 text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <Dumbbell size={16} className="animate-spin duration-300" />
                {selectedTitan.name} 코치 지명 루틴 생성하기
              </button>
            </form>
          </div>

          <div className="border-t border-surface-container-high/60 pt-6 mt-8 hidden lg:block">
            <h5 className="font-mono text-[10px] text-gray-500 font-bold uppercase">지명 중인 타이탄 스펙 (ACTIVE COCH SPEC)</h5>
            <p className="font-sans text-xs text-white/80 mt-1 uppercase font-bold">
              {selectedTitan.name} / Division: {selectedTitan.division} / Focus: {selectedTitan.stats.focus}
            </p>
          </div>
        </div>

        {/* Output Stage Rendering Board */}
        <div className="lg:col-span-7 border border-surface-container-high bg-[#050505] p-6 flex flex-col justify-between min-h-[500px] relative">
          
          {/* Subtle industrial corner grid marks */}
          <div className="absolute top-2 left-2 max-w-sm flex gap-1 items-center opacity-30 select-none">
            <span className="font-mono text-[9px] text-gray-500 font-bold">TITAN_SYSTEM_ACTIVE</span>
          </div>

          {/* Loading stage state */}
          {loading && (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 space-y-4 animate-pulse">
              <Dumbbell size={54} className="text-primary-gold animate-bounce" />
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase text-primary-gold font-black tracking-widest animate-pulse">
                  CONSTRUCTING ELITE GUIDELINE
                </p>
                <p className="font-sans text-sm text-gray-400 font-bold">
                  {loadingQuotes[loadingStep]}
                </p>
              </div>
            </div>
          )}

          {/* Error case */}
          {error && !loading && (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 space-y-4">
              <AlertCircle size={44} className="text-[#FF3E3E] animate-shake" />
              <div>
                <p className="font-mono text-xs uppercase text-red-500 font-black tracking-widest">
                  ROUTINE COMPILATION ERROR
                </p>
                <p className="font-sans text-xs md:text-sm text-gray-300 font-bold mt-2 max-w-sm">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Prompt baseline before generated */}
          {!routine && !loading && !error && (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 space-y-4 text-gray-500">
              <Dumbbell size={40} className="opacity-30" />
              <div className="max-w-md">
                <h4 className="font-mono text-sm uppercase text-gray-400 font-black tracking-widest mb-1">
                  AWAITING TARGET PROFILE
                </h4>
                <p className="font-sans text-xs leading-relaxed font-semibold">
                  좌측에서 인적 프로필과 목표 지지점을 설정한 뒤 지명 코칭을 받아보세요. 
                  보디빌더 고유의 경험적 근간과 훈련 세트법을 정밀 주입합니다.
                </p>
              </div>
            </div>
          )}

          {/* Output board with copy options */}
          {routine && !loading && !error && (
            <div className="flex-col h-full flex justify-between">
              
              {/* Header options toolbar */}
              <div className="flex justify-between items-center bg-surface border-b border-surface-container-high p-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-gold rounded-full"></span>
                  <p className="font-mono text-[10px] text-primary-gold font-bold uppercase tracking-wider">
                    {selectedTitan.name} // DESIGNATED EXTREME ROUTINE
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1 bg-surface-container hover:bg-primary-gold hover:text-black hover:font-black text-gray-300 font-mono text-[10px] uppercase font-bold py-1.5 px-3 border border-surface-container-high transition-all"
                    title="Copy to Clipboard"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "COPIED" : "COPY"}
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-1 bg-surface-container hover:bg-primary-gold hover:text-black hover:font-black text-gray-300 font-mono text-[10px] uppercase font-bold py-1.5 px-3 border border-surface-container-high transition-all"
                    title="Print / PDF Save"
                  >
                    <Printer size={12} />
                    PRINT
                  </button>
                </div>
              </div>

              {/* Structured text box */}
              <div className="flex-grow overflow-y-auto max-h-[480px] text-left pr-2 text-gradient-container font-sans">
                {renderFormattedRoutine(routine)}
              </div>

              {/* Fine Print disclaimer */}
              <p className="font-mono text-[8px] text-gray-600 mt-6 leading-none uppercase text-center">
                WARNING // THIS HIGY-INTENSITY WORKOUT IS GENERATED BY COMPREHENSIVE EXPERT K-BODYBUILDING LOGICS. CONSULT DOCTORS BEFORE LIFTING HEAVY.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
