import React, { useState } from "react";
import { Ticket, Calendar, MapPin, QrCode, ClipboardCheck, Sparkles, Star, Award, Download, ArrowRight, Printer } from "lucide-react";
import { CHAMPIONSHIPS_DATA, Championship } from "../data";

export default function TicketRegistration() {
  const [selectedEvent, setSelectedEvent] = useState<Championship>(CHAMPIONSHIPS_DATA[0]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [ticketTier, setTicketTier] = useState("TITAN_VIP");
  const [registered, setRegistered] = useState(false);
  const [ticketCode] = useState(() => `TTN-${Math.floor(100000 + Math.random() * 90000)}`);
  const [seatingCode] = useState(() => `ROW-A${Math.floor(1 + Math.random() * 12)}-${Math.floor(10 + Math.random() * 50)}`);

  const tiers = [
    { value: "GENERAL", label: "GENERAL ADMISSION (일반 자유 관람권)", price: "₩ 45,000", desc: "챔피언십 본선 일반석 입장 기능" },
    { value: "TITAN_VIP", label: "TITAN LEVEL VIP ROW (타이탄 전용 구역석)", price: "₩ 120,000", desc: "무대 인접 구역배정 및 타이탄 머슬 티셔츠 증정" },
    { value: "BACKSTAGE_GOLD", label: "BACKSTAGE GOLD & GET-TOGETHER (백스테이지 한정권)", price: "₩ 350,000", desc: "백스테이지 무제한 액세스, 선수 밀착형 팬 서비스 참여권 및 저녁 공식 연회 참석권 부여" }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      alert("이름과 이메일을 정확히 기재해 주세요!");
      return;
    }
    setRegistered(true);
  };

  const handlePrintTicket = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>TITAN ELITE TICKET - ${selectedEvent.title}</title>
          <style>
            body { background: #000; color: #fff; font-family: 'Helvetica Neue', Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .ticket { border: 4px solid #ffd700; padding: 40px; background: #0a0a0a; text-align: center; max-width: 600px; width: 100%; border-radius: 0; }
            h1 { color: #ffd700; margin: 0 0 20px 0; letter-spacing: 2px; }
            .event-name { font-size: 28px; font-weight: bold; margin: 10px 0; }
            .info { margin: 20px 0; color: #ccc; font-size: 14px; text-transform: uppercase; }
            .meta { display: flex; justify-content: space-around; border-top: 1px solid #333; border-bottom: 1px solid #333; padding: 15px 0; margin: 20px 0; }
            .highlight { color: #ffd700; font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <h1>TITAN ELITE CHAMPIONSHIP</h1>
            <div class="info">OFFICIAL GOLDEN ENTRANCE TICKET</div>
            <div class="event-name">${selectedEvent.title}</div>
            <div class="info">${selectedEvent.sub}</div>
            <div class="meta">
              <div>
                <strong>DATE</strong><br>
                <span class="highlight">${selectedEvent.month} ${selectedEvent.day}</span>
              </div>
              <div>
                <strong>SEAT</strong><br>
                <span class="highlight">${seatingCode}</span>
              </div>
              <div>
                <strong>CODE</strong><br>
                <span class="highlight">${ticketCode}</span>
              </div>
            </div>
            <div class="info">PASSENGER: ${userName} (${userEmail})</div>
            <div class="info" style="color: #ffd700; font-weight: bold;">TIER: ${ticketTier} // SECURE CONFIRMED</div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const getActiveTierDetail = () => {
    return tiers.find(t => t.value === ticketTier) || tiers[1];
  };

  return (
    <div id="tickets-registry-section" className="bg-[#050505] border border-surface-container-high p-6 md:p-10 relative">
      
      {/* Decal background layout */}
      <div className="absolute top-4 right-4 text-right opacity-10 font-mono text-xs select-none">
        TITAN_PASS_GENERATION_UNIT_09
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Registration form info on the left */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-red-600/10 border border-red-600 text-[#FF4545] px-2.5 py-0.5 text-xs font-mono font-bold uppercase mb-4 animate-pulse">
              <Star size={12} filling="true" />
              EXCLUSIVE DECK
            </div>

            <h3 className="font-display font-black text-3xl md:text-4xl text-white uppercase tracking-tight mb-2">
              챔피언십 통합 등록 및 티켓 부스
            </h3>
            <p className="font-sans text-sm text-gray-400 mb-8 font-medium">
              국내외 정상급 IFBB 타이탄들이 격돌하는 격전지로 향해보세요. 등급별 좌석 지정과 백스테이지 특별 참관 자격을 조율하여 영광의 자리를 예매하실 수 있습니다.
            </p>

            {!registered ? (
              <form onSubmit={handleRegister} className="space-y-5">
                
                {/* Event Select */}
                <div>
                  <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    참석 대상 챔피언십 지정
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {CHAMPIONSHIPS_DATA.map((ch) => (
                      <button
                        type="button"
                        key={ch.id}
                        onClick={() => setSelectedEvent(ch)}
                        className={`p-3 border text-left flex flex-col justify-between transition-all ${
                          selectedEvent.id === ch.id
                            ? "border-primary-gold bg-primary-gold/5"
                            : "border-surface-container-high hover:border-gray-500"
                        }`}
                      >
                        <p className="font-mono text-[10px] text-primary-gold font-bold leading-none">{ch.month} {ch.day}</p>
                        <p className="font-display font-black text-xs text-white uppercase tracking-tight mt-2">{ch.title}</p>
                        <p className="font-sans text-[8px] text-gray-400 mt-1 uppercase font-bold truncate">{ch.location}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Details */}
                <div className="space-y-3">
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      예약자 성함 (FULL NAME)
                    </label>
                    <input
                      type="text"
                      className="w-full bg-surface-container border border-surface-container-high text-sm p-3.5 focus:outline-none focus:border-primary-gold text-white font-bold"
                      placeholder="예: 홍길동 (영문 권장)"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      알림 및 디지털 티켓 수령용 이메일
                    </label>
                    <input
                      type="email"
                      className="w-full bg-surface-container border border-surface-container-high text-sm p-3.5 focus:outline-none focus:border-primary-gold text-white font-medium"
                      placeholder="example@gmail.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Tiers choosing list */}
                <div>
                  <label className="block font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    티켓 등급 지정 (CHOOSE SEAT LEVEL)
                  </label>
                  <div className="space-y-2">
                    {tiers.map((t) => (
                      <label
                        key={t.value}
                        className={`flex items-start gap-3 p-3 border transition-all cursor-pointer ${
                          ticketTier === t.value
                            ? "border-primary-gold bg-primary-gold/5"
                            : "border-surface-container-high hover:bg-neutral-900/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="ticket_tier"
                          value={t.value}
                          checked={ticketTier === t.value}
                          onChange={() => setTicketTier(t.value)}
                          className="mt-1 accent-primary-gold"
                        />
                        <div className="flex-grow flex justify-between items-center">
                          <div className="text-left">
                            <h5 className="font-sans text-xs font-extrabold text-white">{t.label}</h5>
                            <p className="font-sans text-[10px] text-gray-400 mt-0.5 font-semibold">{t.desc}</p>
                          </div>
                          <span className="font-mono text-xs font-black text-primary-gold pl-2 whitespace-nowrap">{t.price}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FFD700] hover:bg-white text-black font-mono font-bold uppercase py-4.5 text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <Ticket size={16} />
                  디지털 골든 티켓 발행신청 (GENERATE GOLDEN PASS)
                </button>
              </form>
            ) : (
              <div className="h-full flex flex-col justify-between">
                <div className="bg-primary-gold/5 border border-primary-gold p-6 text-center space-y-4">
                  <ClipboardCheck size={40} className="text-primary-gold mx-auto animate-bounce animate-pulse" />
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-xl text-primary-gold">티켓 등록 신청 승인!</h4>
                    <p className="font-sans text-xs text-on-surface leading-snug font-semibold px-2">
                      {userName}님, {selectedEvent.title} 챔피언십 참관이 정상 예약 되었습니다. 우측에 생성된 <strong>대회 공식 디지털 골든 티켓</strong>을 지참하여 입장해 주세요.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setRegistered(false);
                      setUserName("");
                      setUserEmail("");
                    }}
                    className="flex-1 border border-surface-container-high hover:border-white text-gray-300 font-mono text-xs uppercase py-3.5 font-bold transition-all text-center"
                  >
                    새로 예약하기
                  </button>
                  <button
                    onClick={handlePrintTicket}
                    className="flex-1 bg-primary-gold hover:bg-white text-black font-mono text-xs uppercase py-3.5 font-black transition-all flex items-center justify-center gap-1.5"
                  >
                    <Printer size={14} />
                    티켓 출력 (PRINT)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic customized ticket board on the right */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="border border-surface-container-high px-4 py-8 md:p-8 bg-black/95 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
            
            {/* Decal gold border layout */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary-gold"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary-gold"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary-gold"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary-gold"></div>

            {/* Left Portion of Golden Pass */}
            <div className="flex-grow space-y-6 text-left border-b md:border-b-0 md:border-r border-dashed border-primary-gold/40 pb-6 md:pb-0 md:pr-6">
              
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-0.5">
                  <p className="font-mono text-[9px] text-[#FF4545] font-black uppercase tracking-widest leading-none">
                    TITAN ELITE // EXCLUSIVE GATE
                  </p>
                  <h4 className="font-display font-black text-2xl text-gradient-gold uppercase leading-normal tracking-tight">
                    GOLDEN ACCESS PASS
                  </h4>
                </div>
                <div className="bg-primary-gold/10 border border-primary-gold/30 text-primary-gold p-1.5">
                  <Award size={18} />
                </div>
              </div>

              {/* Event credentials and stats */}
              <div className="space-y-1.5">
                <p className="font-mono text-[8px] text-gray-500 font-bold uppercase leading-none">TARGET PERFORMANCE EVENT</p>
                <h5 className="font-display font-black text-xl text-white uppercase tracking-tight leading-none">
                  {selectedEvent.title}
                </h5>
                <p className="font-sans text-xs text-primary-gold font-bold uppercase tracking-wider">
                  {selectedEvent.sub}
                </p>
              </div>

              {/* Grid details (Schedule, Seating, Ticket Code) */}
              <div className="grid grid-cols-3 gap-2 border-t border-b border-surface-container-high py-3">
                <div>
                  <p className="font-mono text-[7px] text-gray-500 font-bold uppercase">DATE</p>
                  <p className="font-mono text-xs text-white font-black uppercase mt-0.5">
                    {selectedEvent.month} {selectedEvent.day}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[7px] text-gray-500 font-bold uppercase">SEATING</p>
                  <p className="font-mono text-xs text-primary-gold font-black uppercase mt-0.5">
                    {registered ? seatingCode : "AWAITING..."}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[7px] text-gray-500 font-bold uppercase">TIER ACCESS</p>
                  <p className="font-mono text-[9px] text-white font-black uppercase mt-0.5 truncate max-w-[80px]">
                    {ticketTier}
                  </p>
                </div>
              </div>

              {/* Passenger name display */}
              <div className="space-y-1">
                <p className="font-mono text-[8px] text-gray-500 font-bold uppercase leading-none">PASSENGER NAME</p>
                <p className="font-sans text-sm text-white font-extrabold uppercase">
                  {registered ? userName : "YOUR NAME HERE"}
                </p>
                <p className="font-sans text-[10px] text-gray-400 font-bold uppercase leading-none truncate">
                  {registered ? userEmail : "YOUR_EMAIL_HERE@PROVIDE.COM"}
                </p>
              </div>

            </div>

            {/* Right Portion / Ticket Stub containing QR graphical mockup */}
            <div className="w-full md:w-36 flex flex-col items-center justify-center p-2 text-center shrink-0">
              
              <div className="relative bg-white/95 p-3 rounded-none flex items-center justify-center border-2 border-primary-gold">
                <QrCode size={94} className="text-black" />
                {!registered && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-2">
                    <p className="font-mono text-[9px] font-extrabold text-[#FFD700] uppercase tracking-wider leading-tight">
                      GENERATE PROFILE TO UNLOCK QR
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-1">
                <p className="font-mono text-[8px] text-gray-500 font-bold uppercase leading-none">ORDER REFERENCE</p>
                <p className="font-mono text-xs text-white font-black leading-none">{registered ? ticketCode : "TTN-XXXXXX"}</p>
                
                <div className="inline-flex items-center gap-1 text-[8px] font-mono font-bold text-primary-gold mt-2 uppercase">
                  <Star size={8} filling="true" />
                  {registered ? getActiveTierDetail().price : "₩0,000"}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
