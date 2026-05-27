import React, { useState, useEffect } from "react";
import { 
  Share, 
  Play, 
  Volume2, 
  ChevronRight, 
  Flame, 
  Sparkles, 
  Mail, 
  Instagram, 
  Youtube, 
  CheckCircle,
  Menu,
  X,
  Dumbbell,
  Compass,
  ArrowUpRight
} from "lucide-react";

import { TITANS_DATA, CHAMPIONSHIPS_DATA, MOTIVATIONS, Athlete } from "./data";
import TrailerModal from "./components/TrailerModal";
import AICoachPanel from "./components/AICoachPanel";
import TicketRegistration from "./components/TicketRegistration";
import NutritionCart from "./components/NutritionCart";

export default function App() {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("athletes");
  const [selectedProfile, setSelectedProfile] = useState<Athlete | null>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [emailInput, setEmailInput] = useState("");
  const [subStatus, setSubStatus] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  // Parallax background tracker for Hero
  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerNextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % MOTIVATIONS.length);
  };

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setSubStatus("올바른 이메일을 작성해 주세요.");
      return;
    }
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput })
      });
      const data = await res.json();
      if (res.ok) {
        setSubStatus("SUBSCRIBED");
        setEmailInput("");
      } else {
        setSubStatus(data.error || "오류가 발생했습니다.");
      }
    } catch {
      setSubStatus("서버 통신 실패");
    }
  };

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-on-surface font-sans selection:bg-primary-gold selection:text-black">
      
      {/* Dynamic Background Grid Pattern to elevate luxury dark feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      {/* FIXED GLASS NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-surface-container-high shadow-2xl transition-all duration-300">
        <div className="flex justify-between items-center h-20 px-6 md:px-16 max-w-7xl mx-auto">
          
          {/* Logo with bold gold Anybody display */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-black text-2xl text-primary-gold tracking-tighter cursor-pointer flex items-center gap-2"
          >
            <span className="text-gradient-gold">TITAN ELITE</span>
            <div className="w-1.5 h-1.5 bg-[#FF4545] rounded-full animate-pulse"></div>
          </div>

          {/* Nav list - Desktop */}
          <div className="hidden md:flex gap-10 items-center">
            <button 
              onClick={() => smoothScrollTo("athletes-guide-section")}
              className="font-mono text-xs uppercase font-bold text-on-surface hover:text-primary-gold transition-colors duration-300 cursor-pointer"
            >
              Titans
            </button>
            <button 
              onClick={() => smoothScrollTo("ai-coach-section")}
              className="font-mono text-xs uppercase font-bold text-on-surface hover:text-primary-gold transition-colors duration-300 cursor-pointer flex items-center gap-1"
            >
              AI Routine
              <span className="text-[9px] bg-[#FFD700]/10 text-primary-gold border border-primary-gold px-1 leading-none rounded-none py-0.5">PRO</span>
            </button>
            <button 
              onClick={() => smoothScrollTo("championships-section")}
              className="font-mono text-xs uppercase font-bold text-on-surface hover:text-primary-gold transition-colors duration-300 cursor-pointer"
            >
              Championships
            </button>
            <button 
              onClick={() => smoothScrollTo("products-shop-section")}
              className="font-mono text-xs uppercase font-bold text-on-surface hover:text-primary-gold transition-colors duration-300 cursor-pointer"
            >
              Elite Gear
            </button>
            <button 
              onClick={() => smoothScrollTo("archives-gallery-section")}
              className="font-mono text-xs uppercase font-bold text-on-surface hover:text-primary-gold transition-colors duration-300 cursor-pointer"
            >
              Archives
            </button>
          </div>

          {/* Access / Social */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => smoothScrollTo("tickets-registry-section")}
              className="bg-primary-gold hover:bg-white text-black font-mono text-xs font-black uppercase px-6 py-2.5 transition-all duration-200 cursor-pointer"
            >
              JOIN THE ELITE
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary-gold border border-primary-gold p-1.5 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel dropdown */}
        {mobileMenuOpen && (
          <div className="bg-black/95 border-b border-surface-container-high px-6 py-8 flex flex-col gap-5 text-left md:hidden animate-fade-in z-50 relative">
            <button 
              onClick={() => smoothScrollTo("athletes-guide-section")}
              className="font-mono text-sm uppercase font-bold text-on-surface tracking-wider block border-b border-surface-container pb-2"
            >
              TITANS
            </button>
            <button 
              onClick={() => smoothScrollTo("ai-coach-section")}
              className="font-mono text-sm uppercase font-bold text-on-surface tracking-wider block border-b border-surface-container pb-2 flex justify-between"
            >
              <span>AI ROUTINE BUILDER</span>
              <span className="text-[10px] bg-[#FFD700]/10 text-primary-gold border border-primary-gold px-2">PRO</span>
            </button>
            <button 
              onClick={() => smoothScrollTo("championships-section")}
              className="font-mono text-sm uppercase font-bold text-on-surface tracking-wider block border-b border-surface-container pb-2"
            >
              CHAMPIONSHIPS
            </button>
            <button 
              onClick={() => smoothScrollTo("products-shop-section")}
              className="font-mono text-sm uppercase font-bold text-on-surface tracking-wider block border-b border-surface-container pb-2"
            >
              ELITE GEAR
            </button>
            <button 
              onClick={() => smoothScrollTo("archives-gallery-section")}
              className="font-mono text-sm uppercase font-bold text-on-surface tracking-wider block pb-2"
            >
              ARCHIVES
            </button>

            <button
              onClick={() => smoothScrollTo("tickets-registry-section")}
              className="w-full bg-primary-gold text-black font-mono text-xs font-black uppercase py-4 text-center mt-3 cursor-pointer"
            >
              JOIN THE ELITE
            </button>
          </div>
        )}
      </nav>

      <main className="relative mt-20">
        
        {/* HERO SECTION: Immersive Cinema arena frame layout */}
        <section className="relative h-screen min-h-[750px] max-h-[900px] flex items-center justify-center overflow-hidden bg-black z-10 w-full border-b border-surface-container-high">
          
          {/* Background Stage Cover with parallax scaling */}
          <div className="absolute inset-0 z-0">
            <img 
              alt="Arena Stage" 
              className="w-full h-full object-cover opacity-35 grayscale"
              style={{ transform: `scale(${1 + parallaxY * 0.0004}) translateY(${parallaxY * 0.1}px)` }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIj-_3DftI99FR8pEsj9xWgB3KwWolh9fHXF8FwNC8sykP0Rp2k4AgkycUP-QvrUdF_cLo_OZp_CDVdu-M_A9aCDLRop8id_smhGop048h-1CaSKUVPS2q6AfCZ0ldTjc8GDW8h7rZYahEIuB6Q66dDqpFOgoxymr8Ka_6VX0kuGAMQw9-SsSEt3rvKpkp-_MbRD9CRz177ahgWuPhBMZktkvPlCKta1Wz-rKWBN8mrylHTae4Jj6uQXrs0_RnniQRc9soV00IwIm2"
            />
            {/* Dark gradient mapping overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>

          {/* Middle text layers */}
          <div className="relative z-10 text-center max-w-6xl px-6">
            <p className="font-mono text-xs text-primary-gold uppercase tracking-[0.5em] mb-4 font-bold">
              Forged in the Trenches // 참호 속 강철
            </p>
            <h1 
              className="font-display font-black text-5xl md:text-8xl lg:text-[110px] text-white uppercase mb-4 leading-none tracking-tighter opacity-15 select-none"
              style={{ transform: `translateY(${-parallaxY * 0.15}px)` }}
            >
              THE RISE OF<br/>K-BODYBUILDING
            </h1>
          </div>

          {/* Foreground athlete image overlap absolute positioning */}
          <div 
            className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center h-full w-full"
            style={{ transform: `translateY(${parallaxY * 0.08}px)` }}
          >
            <img 
              alt="IFBB Pro Jaehoon Park" 
              className="h-[85%] md:h-[95%] w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(255,215,0,0.15)] select-none pointer-events-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTGZAaLRIl3UCvrd68UpxBSGXfLYHeRNjFtoMe0x2IiFKFrjU1RihD2BFyStTjjHbapQbbcMMCPWrRiElXNsfI1ppSxSCaAhDIkEybJDijFAWSh0_JoHNh5ckBg93QIwn3EwpPryignGvUNtPKZZ_mGz60XVzLowMEq6g_c7rmu5Vi3KwlAJYGRcZtivHZ3NFvFEJF6CB_HCJsfHY5YSOxQ7vjJ-b_fFDfS9RBkxr_kyXivaowkggiKDxlGL6labH8wJ0QaZoCDwKF"
            />
          </div>

          {/* Immersive interactive callouts text floating above Athlete */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 pt-24">
            
            <h2 className="font-display font-black text-5xl md:text-[75px] text-white uppercase mb-2 leading-none pointer-events-none tracking-tighter">
              <span className="text-gradient-gold drop-shadow-3xl">OLYMPIA BOUND</span>
            </h2>
            
            <p className="font-display font-medium text-xs md:text-base text-white/95 uppercase mb-10 tracking-widest bg-black/60 backdrop-blur-sm px-6 py-2 border border-surface-container-high">
              FEATURING IFBB PRO JAEHOON PARK (박재훈)
            </p>

            {/* CTA panel buttons active link */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md pointer-events-auto">
              <button 
                onClick={() => smoothScrollTo("tickets-registry-section")}
                className="bg-primary-gold hover:bg-white text-black font-mono font-bold text-xs uppercase px-10 py-4.5 transition-all duration-200 cursor-pointer active:scale-95 flex-1 shadow-[0_4px_15px_rgba(255,215,0,0.2)]"
              >
                JOIN THE ELITE
              </button>
              <button 
                onClick={() => setIsTrailerOpen(true)}
                className="border border-[#FFD700] hover:bg-primary-gold/10 text-primary-gold bg-black/55 backdrop-blur-md font-mono font-bold text-xs uppercase px-10 py-4.5 transition-all duration-200 cursor-pointer active:scale-95 flex-1 flex items-center justify-center gap-2"
              >
                <Play size={14} className="text-[#FFD700]" />
                WATCH TRAILER
              </button>
            </div>
          </div>

          {/* Sparkles scrolling indicator marker */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce cursor-pointer" onClick={() => smoothScrollTo("athletes-guide-section")}>
            <span className="material-symbols-outlined text-primary-gold text-4xl">expand_more</span>
          </div>
        </section>

        {/* MINDSET DISCIPLINE GEN SECTION */}
        <section className="bg-black/80 py-8 border-b border-surface-container-high relative z-30">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-left">
              <Flame size={20} className="text-red-600 animate-pulse shrink-0" />
              <div>
                <p className="font-mono text-[9px] text-[#FF4545] font-black uppercase leading-none">TITAN INSULATION DISCIPLINE</p>
                <p className="font-sans text-xs text-white uppercase font-black tracking-wide truncate max-w-md md:max-w-2xl mt-1">
                  "{MOTIVATIONS[quoteIdx]}"
                </p>
              </div>
            </div>
            <button
              onClick={triggerNextQuote}
              className="border border-red-600/50 hover:border-red-600 text-[#FF4545] font-mono text-[10px] uppercase font-bold py-1.5 px-4 transition-all duration-200 shrink-0 cursor-pointer"
            >
              DRIVE NEW QUOTE
            </button>
          </div>
        </section>

        {/* KOREAN TITANS: Vertical/Horizontal flexible sliders */}
        <section id="athletes-guide-section" className="bg-black py-24 border-b border-surface-container-high relative z-30">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
              <div className="text-left">
                <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
                  KOREAN TITANS
                </h2>
                <p className="font-sans text-xs font-bold text-primary-gold uppercase tracking-widest mt-2">
                  On the World stage // 참호 속 탄생한 괴물들
                </p>
              </div>
              <p className="font-sans text-xs text-gray-500 max-w-xs text-left leading-relaxed">
                각 보디빌더 프로필 패널에 마우스를 올리거나 터치하여 정교한 피지크 스펙과 경력을 체크해 보세요. 지명 쇠질 루틴 수립이 연계되어 있습니다.
              </p>
            </div>

            {/* Interactive Grid matching vertical panels in design instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto min-h-[500px]">
              {TITANS_DATA.map((titan) => (
                <div
                  key={titan.id}
                  onClick={() => setSelectedProfile(titan)}
                  className="group relative h-96 lg:h-full min-h-[460px] border border-surface-container-high bg-neutral-900 overflow-hidden cursor-pointer flex flex-col justify-end p-8 transition-all duration-500 hover:border-primary-gold shadow-2xl"
                >
                  {/* Photo with grayscale to color transitions */}
                  <img 
                    src={titan.image} 
                    alt={titan.name} 
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-95 scale-[1.01] group-hover:scale-[1.04]"
                  />
                  {/* Bottom shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/4 w-full z-10 transition-opacity"></div>
                  
                  {/* Absolute positioning vertical lettering for collapsed identifier */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap opacity-15 select-none pointer-events-none group-hover:opacity-0 transition-all z-20">
                    <span className="font-display font-black text-3xl md:text-4xl text-gray-200 uppercase tracking-tighter">
                      {titan.name}
                    </span>
                  </div>

                  {/* Overlaid details content */}
                  <div className="relative z-20 text-left space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-1">
                      <span className="inline-block font-mono text-[9px] text-primary-gold px-2 py-0.5 border border-primary-gold bg-black/80 font-bold uppercase leading-none">
                        {titan.division}
                      </span>
                      <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight tracking-tighter drop-shadow-md">
                        {titan.name}
                      </h3>
                    </div>

                    {/* Collapsed state hint */}
                    <p className="font-mono text-[10px] text-primary-gold/80 font-bold uppercase group-hover:hidden animate-pulse">
                      TOUCH TO OPEN TARGET SPECS // 피지크 및 AI 코칭 열기
                    </p>

                    {/* Expand details on hover */}
                    <div className="hidden group-hover:block space-y-3 pt-2 text-xs text-gray-300 font-medium leading-relaxed border-t border-primary-gold/40 animate-fade-in">
                      <p><strong className="text-white">집중강점 부위:</strong> {titan.stats.focus}</p>
                      <p><strong className="text-white">체중 & 신장:</strong> {titan.stats.weight} / {titan.stats.height}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProfile(titan);
                        }}
                        className="w-full bg-primary-gold text-black font-mono font-bold uppercase py-2.5 text-[10px] tracking-wider transition-all hover:bg-white text-center flex items-center justify-center gap-1.5"
                      >
                        VIEW PROFILE & WORKOUT AI
                        <ChevronRight size={12} />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* DETAILED ATHLETE PROFILE TAB DIALOG/DRAWER (HIGH-FIDELITY DETAILED DISPLAY) */}
        {selectedProfile && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-[#080808] border-2 border-primary-gold relative overflow-hidden p-6 md:p-10 font-sans grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[90vh] overflow-y-auto">
              
              <button 
                onClick={() => setSelectedProfile(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-primary-gold cursor-pointer p-1"
              >
                <X size={24} />
              </button>

              {/* Title decal */}
              <div className="md:col-span-4 flex flex-col">
                <div className="aspect-[4/5] bg-neutral-900 border border-surface-container-high overflow-hidden">
                  <img src={selectedProfile.image} alt={selectedProfile.name} className="w-full h-full object-cover" />
                </div>
                <div className="bg-[#121212] p-4 border-l-2 border-primary-gold mt-4">
                  <p className="font-mono text-[9px] text-[#FF4545] font-extrabold uppercase leading-none">MEMENTO QUOTE</p>
                  <p className="font-sans text-xs italic text-gray-300 font-semibold leading-relaxed mt-1">
                    "{selectedProfile.motto}"
                  </p>
                </div>
              </div>

              {/* Text specifications */}
              <div className="md:col-span-8 space-y-6 text-left">
                <div>
                  <span className="inline-block font-mono text-[10px] text-primary-gold font-bold uppercase border border-primary-gold bg-primary-gold/10 px-3 py-0.5 mb-2 rounded-none">
                    {selectedProfile.division}
                  </span>
                  <h3 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tighter">
                    {selectedProfile.name}
                  </h3>
                </div>

                {/* Info grids */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-surface-container-high py-4 font-mono text-xs">
                  <div>
                    <h5 className="text-gray-500 font-bold uppercase">HEIGHT</h5>
                    <p className="text-white font-extrabold text-sm mt-0.5">{selectedProfile.stats.height}</p>
                  </div>
                  <div>
                    <h5 className="text-gray-500 font-bold uppercase">WEIGHT</h5>
                    <p className="text-primary-gold font-extrabold text-sm mt-0.5">{selectedProfile.stats.weight}</p>
                  </div>
                  <div className="col-span-2">
                    <h5 className="text-gray-500 font-bold uppercase">PHYSICAL FOCUS POINT</h5>
                    <p className="text-white font-extrabold text-xs mt-0.5 uppercase truncate">{selectedProfile.stats.focus}</p>
                  </div>
                </div>

                {/* Carrer */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
                    CAREER SUMMARY & HONORS
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedProfile.stats.career.map((honors, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-on-surface font-semibold">
                        <CheckCircle size={14} className="text-[#FFD700]" />
                        <span>{honors}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedProfile(null);
                      smoothScrollTo("ai-coach-section");
                    }}
                    className="flex-1 bg-primary-gold text-black font-mono text-xs font-black uppercase py-4.5 text-center cursor-pointer transition-all hover:bg-white inline-flex justify-center items-center gap-2"
                  >
                    <Dumbbell size={16} />
                    {selectedProfile.name.split(" ")[0]} AI 코칭 가동하기
                  </button>
                  <button
                    onClick={() => setSelectedProfile(null)}
                    className="border border-[#FFD700] hover:bg-neutral-900 text-primary-gold font-mono text-xs font-bold uppercase py-4.5 px-8 text-center cursor-pointer transition-all"
                  >
                    CLOSE SPECS
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* AI ROUTINE GENERATOR INTEGRATED SPOTLIGHT HEADER */}
        <section className="bg-black py-16 border-b border-surface-container-high relative z-30">
          <div className="max-w-7xl mx-auto px-6">
            <AICoachPanel />
          </div>
        </section>

        {/* UPCOMING CHAMPIONSHIPS: IMMERSIVE ACCENTS */}
        <section id="championships-section" className="relative py-24 bg-surface-container-lowest overflow-hidden z-30 border-b border-surface-container-high">
          <div className="absolute top-0 right-0 font-display font-black text-[220px] text-white/[0.015] leading-none select-none pointer-events-none translate-x-1/4 -translate-y-1/4">
            CHAMPIONS
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <h2 className="font-display font-black text-4xl md:text-5xl text-primary-gold mb-6 leading-none tracking-tighter uppercase">
                UPCOMING<br/>CHAMPIONSHIPS
              </h2>
              <p className="font-sans text-sm md:text-base text-gray-400 mb-10 max-w-sm leading-relaxed font-medium">
                영광으로 가는 길은 땀방울과 엄숙한 규정 포징으로 단련됩니다. 아래 대회 예약 부스를 이용해 좌석을 선점하고 하이퍼 강도의 대회 열기를 느껴 보세요.
              </p>
              <button 
                onClick={() => smoothScrollTo("tickets-registry-section")}
                className="group w-fit flex items-center gap-4 bg-primary-gold text-black font-mono font-bold text-xs uppercase px-10 py-4.5 transition-all hover:pr-14 cursor-pointer"
              >
                TICKETS & REGISTRATION
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4">
              {CHAMPIONSHIPS_DATA.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => smoothScrollTo("tickets-registry-section")}
                  className={`group relative flex items-center justify-between p-8 cursor-pointer overflow-hidden border transition-all duration-300 ${
                    ch.isMain 
                      ? "bg-primary-gold/5 border-primary-gold shadow-[0_0_25px_rgba(255,215,0,0.1)]" 
                      : "bg-[#0A0A0A] border-surface-container-high hover:border-primary-gold"
                  }`}
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary-gold transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                  
                  {ch.isMain && (
                    <div className="absolute top-0 right-0 bg-primary-gold text-black px-4 py-1 font-mono text-[9px] font-black uppercase tracking-wider">
                      MAIN OLYMPIA EVENT
                    </div>
                  )}

                  <div className="flex gap-8 items-center text-left">
                    <div className="text-center border-r border-surface-container-high pr-8 shrink-0">
                      <p className="font-mono text-[10px] text-gray-400 uppercase leading-none">{ch.month}</p>
                      <p className="font-display font-black text-3xl text-primary-gold mt-1 leading-none">{ch.day}</p>
                    </div>
                    <div>
                      <h4 className="font-display font-black text-lg text-white uppercase tracking-tight leading-snug">{ch.title}</h4>
                      <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">{ch.sub}</p>
                    </div>
                  </div>

                  <ArrowUpRight size={24} className="text-gray-500 group-hover:text-primary-gold transition-colors shrink-0" />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Dynamic Ticket Regist Portal Display */}
        <section className="bg-black py-16 border-b border-surface-container-high relative z-30">
          <div className="max-w-7xl mx-auto px-6">
            <TicketRegistration />
          </div>
        </section>

        {/* ELITE SUPPLEMENTS / GEAR SHOP PORTAL */}
        <section id="products-shop-section" className="bg-black py-24 border-b border-surface-container-high relative z-30">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
              <div className="text-left">
                <span className="font-mono text-[10px] text-primary-gold font-bold uppercase tracking-widest">
                  PRO APPAREL & NUTRITIONS
                </span>
                <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mt-1">
                  ELITE PRESTIGE GEAR
                </h2>
              </div>
              <p className="font-sans text-xs text-gray-400 max-w-sm text-left leading-relaxed">
                근비대 볼륨을 가속할 하이퍼 분리 단백질, 에너지 전구체 및 필수 영양소를 장바구니에 바로 대입해 기어로 활용해 보세요. 
                ₩50,000 이상 무료 배송.
              </p>
            </div>

            <NutritionCart />

          </div>
        </section>

        {/* ELITE ARCHIVES GALLERY FULL BLEED SECT */}
        <section id="archives-gallery-section" className="bg-black py-24 border-b border-surface-container-high relative z-30">
          <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
            <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-4 leading-none">
              ELITE ARCHIVES
            </h2>
            <div className="h-1 w-20 bg-primary-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 max-w-7xl mx-auto">
            
            <div className="relative group aspect-square overflow-hidden cursor-pointer border border-surface-container-high/40">
              <img 
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVjFadi270aSm_hu9dg0UDTZ7VT7E5jRT2hY_EMUEsZwqHeSxnz7BZg6yqYDTBLvFk9eIfBq20i1vHVfePvZO-I8RKOtr6XfCW-yLe4a-_nw38W6kOXmKuwhUiIuzhf0-k3QcllNGLRXnFYBHvK5DRKel9bBdtZm1ts65LpivF3Eb4UF2wW38BNeWWUVtHHZC-yte7HzDc0mYv2HjiGZlZTeVmtBzSsggRQXQs9nNiUJ1gFrMA9A3KsuOTql3QshwvuRM0jpUOEjhh"
              />
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Dumbbell size={36} className="text-primary-gold mb-2 animate-bounce" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Training Intel</span>
                <span className="font-sans text-[10px] text-gray-400 font-medium">실전 운동 테크닉</span>
              </div>
            </div>

            <div className="relative group aspect-square overflow-hidden cursor-pointer border border-surface-container-high/40">
              <img 
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1qEVVzkAN8Lt781s1ibDJaTA48Oo9o6tuI6_FXxBOgW5NySDX6piQWRyUysHhFs8QNxmJFzF9R2tKq7AxGUMI-Yc5TooxBk98AUGqRq8SrDGSPzLCgW2S1ho6TMO2PIDd5L52wHpcF03Tu0XHHqkT0g_NUQOqzTBAVSBHnQgmUQUEUbQK5FCn7rWfbfdL3o-x2r8RpW_lDiXs6kxRGgEN6XE7i8egFoUutZrOEeGzCZJYMwk_x3eotWpRBWM-cWaNF8WtBXiC8jHB"
              />
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Compass size={36} className="text-primary-gold mb-2" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Backstage Grit</span>
                <span className="font-sans text-[10px] text-gray-400 font-medium">대회 무대 백스테이지 컷</span>
              </div>
            </div>

            <div className="relative group aspect-square overflow-hidden cursor-pointer border border-surface-container-high/40">
              <img 
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS_O1D_QnCgS5l2HS7RPCS6YIxKXDwVG8nRAcaGjWaTBHiJi-wJZb2UPEtDjNjOphl6zLn6Jnnj-fqIq73GAIBZ4oKbHDQNke_Aff3N0Io9-_bcRxzkS37P7X0SNmz31H9dlbiJKBs1wskROLE9AAFxh_eydxHgU6X6-qcyR-yoyfu6GDFB7HK9bH-LSviK8ObcIQqD7faWBEo08ltKVUTbzM9iyqwABMy3JuAZXE50yxmXeAQ4YrdyjiI-QnXsxIFgsRplpCe0-L9"
              />
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Sparkles size={36} className="text-primary-gold mb-2" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Elite Gear</span>
                <span className="font-sans text-[10px] text-gray-400 font-medium">인증 보충재 성분 연구</span>
              </div>
            </div>

            <div className="relative group aspect-square overflow-hidden cursor-pointer border border-surface-container-high/40">
              <img 
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtprW5DZSZp0NS7sfsLl6Q-U0-F_5e_sbHmrO7FAFtjL1kJcNSlxq4ba0RMRyBzIXLoVogWHieKRjptWRs_kW0N_4JKYyr_BKM58Mw8mn1ctlTCKORHNbnPby4E9nzwXvWia1elZXJku8vN1E_xHohDDC0-4C63oWneGmXiOIxHYJU8HUhgUqH46JNiHeEm8Mgu_XvWzaPW6FWF6YL0ge6CcDqLiYLnk25oDO687foUklQO_CYwsk4IbMKjkYasjWYD6gJwrZ01Ydl"
              />
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Flame size={36} className="text-primary-gold mb-2 animate-pulse" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">Deep Focus</span>
                <span className="font-sans text-[10px] text-gray-400 font-medium">극한 마인드 컨트롤</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER AREA */}
      <footer className="w-full py-16 bg-surface-container-lowest border-t border-surface-container-high relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 px-6 md:px-16 max-w-7xl mx-auto">
          
          <div className="md:col-span-4 mb-10 md:mb-0 text-left">
            <div className="font-display font-black text-2xl text-primary-gold mb-6 tracking-tighter">TITAN ELITE</div>
            <p className="font-sans text-xs md:text-sm text-gray-400 max-w-xs mb-8 leading-relaxed font-semibold">
              최고 수준의 고강도 보디빌더 양성 아레나. 과학에 기반한 영양 섭취, 불타는 근력 트레이닝, 그리고 결코 꺾이지 않는 근성으로 무대를 압도합니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-surface-container-high flex items-center justify-center text-on-surface hover:border-primary-gold hover:text-primary-gold transition-all">
                <Share size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-surface-container-high flex items-center justify-center text-on-surface hover:border-primary-gold hover:text-primary-gold transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-surface-container-high flex items-center justify-center text-on-surface hover:border-primary-gold hover:text-primary-gold transition-all">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 text-left">
            <h5 className="font-mono text-xs font-bold text-white uppercase mb-6 tracking-widest">Navigation</h5>
            <ul className="flex flex-col gap-3 font-sans text-xs font-bold">
              <li><button onClick={() => smoothScrollTo("athletes-guide-section")} className="text-gray-400 hover:text-primary-gold transition-colors">Athletes</button></li>
              <li><button onClick={() => smoothScrollTo("ai-coach-section")} className="text-gray-400 hover:text-primary-gold transition-colors">AI Routing</button></li>
              <li><button onClick={() => smoothScrollTo("championships-section")} className="text-gray-400 hover:text-primary-gold transition-colors">Schedule</button></li>
              <li><button onClick={() => smoothScrollTo("products-shop-section")} className="text-gray-400 hover:text-primary-gold transition-colors">Supplement Shop</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 text-left">
            <h5 className="font-mono text-xs font-bold text-white uppercase mb-6 tracking-widest">Support</h5>
            <ul className="flex flex-col gap-3 font-sans text-xs font-bold">
              <li><a href="#" className="text-gray-400 hover:text-primary-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-gold transition-colors">Affiliate Program</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-gold transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 text-left">
            <h5 className="font-mono text-xs font-bold text-white uppercase mb-6 tracking-widest">Subscribe to Intel</h5>
            <p className="font-sans text-xs md:text-sm text-gray-400 mb-6 font-semibold">
              최고의 운동 인텔리전스와 한정 보충제 세일 뉴스를 가장 먼저 구독 수령하세요.
            </p>
            
            <form onSubmit={handleFooterSubscribe} className="relative border-b-2 border-surface-container-high focus-within:border-primary-gold pb-1 transition-colors">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setSubStatus(null);
                }}
                className="w-full bg-transparent border-0 ring-0 focus:ring-0 text-white font-mono text-xs uppercase placeholder:text-gray-600 focus:outline-none tracking-widest"
                required
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-primary-gold hover:opacity-80 p-1 cursor-pointer">
                <Mail size={16} />
              </button>
            </form>

            {subStatus && (
              <p className={`font-mono text-[10px] uppercase font-bold text-left mt-3 ${
                subStatus === "SUBSCRIBED" ? "text-green-500 animate-pulse" : "text-[#FF4545]"
              }`}>
                {subStatus === "SUBSCRIBED" ? "SUBSCRIBED TO INTEL NEWSLETTER!" : subStatus}
              </p>
            )}
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-surface-container-high/50 text-center">
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            © 2026 TITAN ELITE PERFORMANCE. FORGED IN THE TRENCHES. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* WATCH TRAILER AUDIO INTERACTIVE WINDOW */}
      <TrailerModal isOpen={isTrailerOpen} onClose={() => setIsTrailerOpen(false)} />

    </div>
  );
}
