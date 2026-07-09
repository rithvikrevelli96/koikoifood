import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, UtensilsCrossed, Package, Wallet, User, Bell,
  ChevronRight, ArrowLeft, Sun, Moon, Star, Pause, Play,
  SkipForward, Gift, Tag, CreditCard, Check, Eye, EyeOff,
  Phone, Mail, ShieldCheck, RefreshCw, Truck, MapPin,
  Plus, LogOut, Info, HelpCircle, Shield, Award, Heart,
  MessageCircle, PhoneCall, FileText, Edit, Copy,
  CheckCircle2, RotateCcw, Monitor, Globe, Calendar,
  Zap, Banknote, AlertCircle, Share2, ChevronDown,
  Building2, Bike, Sparkles, TrendingUp, Settings,
  Navigation, Leaf, Coffee, Flame, Wind, Droplets,
  ChefHat, Camera, Video, Clock,
  Thermometer, BadgeCheck, Users,
} from "lucide-react";

// ─── Design Tokens ─────────────────────────────────────────────────────────

interface T {
  bg: string; surface: string; card: string;
  text: string; sub: string; muted: string;
  border: string; nav: string; input: string;
}
const LIGHT: T = {
  bg:"#FAFAF8", surface:"#F2EDE6", card:"#FFFFFF",
  text:"#1A1A1A", sub:"#4A4A4A", muted:"#999999",
  border:"rgba(0,0,0,0.07)", nav:"rgba(250,250,248,0.92)", input:"#F5F0EA",
};
const DARK: T = {
  bg:"#0E0E0E", surface:"#1C1C1C", card:"#1C1C1C",
  text:"#F5F5F5", sub:"#C0C0C0", muted:"#666666",
  border:"rgba(255,255,255,0.08)", nav:"rgba(14,14,14,0.92)", input:"#252525",
};
type AppTheme = "light"|"dark"|"system";
type Screen =
  | "splash"|"ob1"|"ob2"|"ob3"|"auth"
  | "setup1"|"setup2"|"setup3"
  | "home"|"meals"|"kitchen"|"wallet"|"profile"
  | "meal_detail"|"subscribe_flow"
  | "notifications"|"tracking"|"offers"|"rewards"
  | "appearance"|"support"|"addresses"|"payments"
  | "personal"|"refer"|"plans";

const B = {
  orange:"#E67E22", orangeL:"#FEF6EC", orangeM:"#FDEBD0",
  green:"#22C55E", greenL:"#DCFCE7",
  cream:"#FAFAF8",
};

// ─── Food Images ─────────────────────────────────────────────────────────────

const IMG = {
  dal:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&h=500&fit=crop&auto=format",
  paneer:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=500&fit=crop&auto=format",
  curry:"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=500&fit=crop&auto=format",
  thali:"https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?w=800&h=500&fit=crop&auto=format",
  soup:"https://images.unsplash.com/photo-1559561723-c3f4195835db?w=800&h=500&fit=crop&auto=format",
  rice:"https://images.unsplash.com/photo-1743674453123-93356ade2891?w=800&h=500&fit=crop&auto=format",
};

const MEALS = [
  { id:1, name:"Dal Tadka + Steamed Rice", when:"lunch", img:IMG.dal, cal:380, protein:14, carbs:58, fat:9, veg:true, time:"12:30 PM", day:"Today" },
  { id:2, name:"Paneer Butter Masala + Roti", when:"dinner", img:IMG.paneer, cal:420, protein:18, carbs:45, fat:16, veg:true, time:"7:30 PM", day:"Today" },
  { id:3, name:"Aloo Gobi + Jeera Rice", when:"lunch", img:IMG.curry, cal:340, protein:10, carbs:62, fat:7, veg:true, time:"12:30 PM", day:"Tomorrow" },
  { id:4, name:"Rajma Rice + Salad", when:"dinner", img:IMG.thali, cal:395, protein:16, carbs:68, fat:6, veg:true, time:"7:30 PM", day:"Tomorrow" },
  { id:5, name:"Mixed Veg Curry + Chapati", when:"lunch", img:IMG.soup, cal:360, protein:12, carbs:55, fat:10, veg:true, time:"12:30 PM", day:"Wed" },
  { id:6, name:"Dal Makhani + Jeera Rice", when:"dinner", img:IMG.rice, cal:440, protein:20, carbs:60, fat:14, veg:true, time:"7:30 PM", day:"Wed" },
];

const PLANS = [
  { id:"daily", name:"Daily", badge:"", price:"₹180", unit:"/day", sub:"Pay as you go · No commitment", color:"#4A4A4A", perks:["1 meal slot","Any cuisine","Cancel anytime"] },
  { id:"weekly", name:"Weekly", badge:"POPULAR", price:"₹1,099", unit:"/week", sub:"₹157/day · Save 13%", color:B.orange, perks:["Lunch + Dinner","14 meals","1 skip per week"] },
  { id:"monthly", name:"Monthly", badge:"BEST VALUE", price:"₹3,999", unit:"/month", sub:"₹133/day · Save 26%", color:"#6366F1", perks:["Lunch + Dinner","60 meals","Pause anytime","Priority support"] },
  { id:"family", name:"Family", badge:"", price:"₹6,999", unit:"/month", sub:"For 2 people · ₹3,500/person", color:"#EC4899", perks:["2 dabba sets","All meals included","Custom preferences"] },
  { id:"student", name:"Student", badge:"", price:"₹2,499", unit:"/month", sub:"Valid student ID required", color:"#0EA5E9", perks:["Lunch only","25 meals","Student pricing"] },
  { id:"corporate", name:"Corporate", badge:"", price:"₹8,999", unit:"/month", sub:"For 5+ employees", color:"#8B5CF6", perks:["Bulk pricing","Office delivery","Invoice & GST"] },
];

// ─── Animation Primitives ────────────────────────────────────────────────────

function FadeUp({ children, delay=0, className="" }: { children:React.ReactNode; delay?:number; className?:string }) {
  return (
    <motion.div className={className}
      initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.42, delay, ease:[0.25,0.1,0.25,1] }}>
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay=0 }: { children:React.ReactNode; delay?:number }) {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.35, delay }}>
      {children}
    </motion.div>
  );
}

function FloatIll({ children }: { children:React.ReactNode }) {
  return (
    <motion.div animate={{ y:[-7,7,-7] }} transition={{ duration:3.8, repeat:Infinity, ease:"easeInOut" }}>
      {children}
    </motion.div>
  );
}

function OrgBlob({ x, y, size, color, opacity=0.07, blur=28 }: { x:number|string; y:number|string; size:number; color:string; opacity?:number; blur?:number }) {
  return (
    <div style={{
      position:"absolute", width:size, height:size*0.85,
      left:x, top:y, background:color,
      borderRadius:"63% 37% 54% 46% / 55% 48% 52% 45%",
      opacity, filter:`blur(${blur}px)`, pointerEvents:"none", zIndex:0,
    }} />
  );
}

function ProgressRing({ pct, size=72, strokeW=5, color=B.orange, label, sub }: {
  pct:number; size?:number; strokeW?:number; color?:string; label:string; sub?:string;
}) {
  const r = (size - strokeW * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct,100)/100);
  return (
    <div style={{ position:"relative", width:size, height:size, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <svg width={size} height={size} style={{ position:"absolute", transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color+"22"} strokeWidth={strokeW} />
        <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeW}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset:circ }}
          animate={{ strokeDashoffset:offset }}
          transition={{ duration:1.5, ease:[0.34,1.56,0.64,1], delay:0.3 }} />
      </svg>
      <div style={{ textAlign:"center", zIndex:1 }}>
        <p style={{ fontSize:size*0.22, fontWeight:900, color, lineHeight:1.1, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{label}</p>
        {sub && <p style={{ fontSize:size*0.12, color:"#999", marginTop:1 }}>{sub}</p>}
      </div>
    </div>
  );
}

function Shimmer({ w="100%", h=20, br=10, dark=false }: { w?:string|number; h?:number; br?:number; dark?:boolean }) {
  return (
    <div style={{ width:w, height:h, borderRadius:br, overflow:"hidden", background:dark?"#202020":"#EDE8DF", position:"relative" }}>
      <motion.div
        animate={{ x:["-100%","200%"] }}
        transition={{ duration:1.6, repeat:Infinity, ease:"linear", repeatDelay:0.3 }}
        style={{ position:"absolute", top:0, bottom:0, width:"50%", background:`linear-gradient(90deg,transparent,${dark?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.6)"},transparent)` }} />
    </div>
  );
}

function SuccessCheck({ size=80, color=B.green }: { size?:number; color?:string }) {
  const r = size * 0.42; const circ = 2 * Math.PI * r;
  return (
    <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
      transition={{ type:"spring", stiffness:220, damping:18, delay:0.1 }}
      style={{ width:size, height:size, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width={size} height={size} style={{ position:"absolute", transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill={color+"15"} />
        <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={size*0.065}
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset:circ }} animate={{ strokeDashoffset:0 }}
          transition={{ duration:0.75, ease:"easeOut", delay:0.25 }} />
      </svg>
      <motion.svg width={size*0.46} height={size*0.34} style={{ position:"absolute" }}
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}>
        <motion.path d={`M4 ${size*0.16} L${size*0.17} ${size*0.28} L${size*0.42} ${size*0.04}`}
          fill="none" stroke={color} strokeWidth={size*0.068} strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }}
          transition={{ duration:0.45, ease:"easeOut", delay:0.72 }} />
      </motion.svg>
    </motion.div>
  );
}

function PulsingDot({ color=B.orange, size=10 }: { color?:string; size?:number }) {
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <motion.div style={{ position:"absolute", inset:-4, borderRadius:"50%", background:color, opacity:0.25 }}
        animate={{ scale:[1,1.8,1] }} transition={{ duration:1.8, repeat:Infinity, ease:"easeInOut" }} />
      <div style={{ width:size, height:size, borderRadius:"50%", background:color }} />
    </div>
  );
}

function SkeletonCard({ t }: { t:T }) {
  return (
    <div className="rounded-[24px] overflow-hidden" style={{ background:t.card }}>
      <Shimmer h={180} br={0} dark={t.card === "#1C1C1C"} />
      <div className="p-4 flex flex-col gap-2.5">
        <Shimmer h={16} br={8} dark={t.card === "#1C1C1C"} />
        <Shimmer h={12} w="70%" br={6} dark={t.card === "#1C1C1C"} />
        <div className="flex gap-3 mt-1">
          <Shimmer h={10} w={70} br={5} dark={t.card === "#1C1C1C"} />
          <Shimmer h={10} w={80} br={5} dark={t.card === "#1C1C1C"} />
          <Shimmer h={10} w={60} br={5} dark={t.card === "#1C1C1C"} />
        </div>
      </div>
    </div>
  );
}

// ─── Seasonal Banner ──────────────────────────────────────────────────────────

function SeasonalBanner({ go, t }: { go:(s:Screen)=>void; t:T }) {
  return (
    <motion.div whileTap={{ scale:0.98 }} onClick={()=>go("offers")}
      className="mx-5 rounded-[24px] overflow-hidden relative cursor-pointer"
      style={{ background:"linear-gradient(135deg,#1A0A00 0%,#5C2200 60%,#8B3A0A 100%)" }}>
      {/* Organic shapes */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", width:140, height:120, background:B.orange, borderRadius:"60% 40% 70% 30%/50% 60% 40% 50%", opacity:0.18, top:-30, right:-20, filter:"blur(20px)" }} />
        <div style={{ position:"absolute", width:80, height:70, background:"#FFD700", borderRadius:"50%", opacity:0.1, bottom:-10, left:100, filter:"blur(15px)" }} />
      </div>
      <div className="relative flex items-center justify-between p-4 gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Flame size={13} color="#FCD34D" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white opacity-60">Limited Time</span>
          </div>
          <p className="text-[18px] font-black text-white leading-tight mb-0.5">Monsoon Special 🌧️</p>
          <p className="text-[11px] text-white opacity-65">Hot Khichdi added this week</p>
        </div>
        <div>
          <button className="px-4 py-2.5 rounded-[14px] text-[12px] font-black text-white whitespace-nowrap" style={{ background:B.orange }}>View</button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Shared Atoms ─────────────────────────────────────────────────────────────

const cardTap = { whileTap:{ scale:0.97 }, transition:{ type:"spring", stiffness:400, damping:30 } };
const pageIn = { initial:{ opacity:0, y:16 }, animate:{ opacity:1, y:0 }, exit:{ opacity:0, y:-8 }, transition:{ duration:0.22, ease:[0.25,0.1,0.25,1] } };

function OrangeBtn({ label, onClick, sm, icon, bg }: { label:string; onClick?:()=>void; sm?:boolean; icon?:React.ReactNode; bg?:string }) {
  return (
    <motion.button whileTap={{ scale:0.96 }} onClick={onClick}
      className={`w-full ${sm?"py-3.5 text-sm":"py-[16px] text-[15px]"} rounded-[20px] text-white font-bold flex items-center justify-center gap-2`}
      style={{ background:bg||B.orange, boxShadow:`0 6px 24px ${B.orange}35` }}>
      {icon}{label}
    </motion.button>
  );
}

function GBtn({ label, onClick }: { label:string; onClick?:()=>void }) {
  return (
    <motion.button whileTap={{ scale:0.97 }} onClick={onClick}
      className="w-full py-[15px] rounded-[20px] text-[15px] font-bold border-2"
      style={{ color:B.orange, borderColor:B.orange, background:"transparent" }}>
      {label}
    </motion.button>
  );
}

function Card({ children, t, p="p-4", className="", onClick }: { children:React.ReactNode; t:T; p?:string; className?:string; onClick?:()=>void }) {
  return (
    <motion.div {...(onClick ? cardTap : {})} onClick={onClick}
      className={`rounded-[24px] ${p} ${className} ${onClick?"cursor-pointer":""}`}
      style={{ background:t.card, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
      {children}
    </motion.div>
  );
}

function BackBar({ title, onBack, t, right }: { title:string; onBack:()=>void; t:T; right?:React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 pt-6 pb-4"
      style={{ flexShrink:0, position:"sticky", top:0, zIndex:10, background:t.bg }}>
      <motion.button whileTap={{ scale:0.9 }} onClick={onBack}
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background:t.surface }}>
        <ArrowLeft size={18} color={t.text} />
      </motion.button>
      <h2 className="text-[17px] font-bold absolute left-1/2 -translate-x-1/2"
        style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>{title}</h2>
      <div>{right||<div className="w-11" />}</div>
    </div>
  );
}

function VegPill({ veg }: { veg:boolean }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-lg border" style={{ borderColor:veg?B.green:"#EF4444", background:"rgba(255,255,255,0.92)" }}>
      <div className="w-2 h-2 rounded-full" style={{ background:veg?B.green:"#EF4444" }} />
      <span className="text-[9px] font-black" style={{ color:veg?B.green:"#EF4444" }}>{veg?"VEG":"NON-VEG"}</span>
    </div>
  );
}

function Stars({ val, onChange }: { val:number; onChange?:(v:number)=>void }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i=>(
        <motion.button key={i} whileTap={{ scale:1.35 }} onClick={()=>onChange?.(i)}>
          <Star size={14} fill={i<=val?B.orange:"none"} color={i<=val?B.orange:"#D1D5DB"} />
        </motion.button>
      ))}
    </div>
  );
}

function MacroChip({ val, label, color }: { val:string; label:string; color:string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[13px] font-black leading-none" style={{ color }}>{val}</p>
      <p className="text-[9px] font-semibold" style={{ color:"#999" }}>{label}</p>
    </div>
  );
}

// ─── Floating Bottom Nav ─────────────────────────────────────────────────────

function FloatNav({ active, go, t }: { active:string; go:(s:Screen)=>void; t:T }) {
  const tabs = [
    { id:"home", s:"home" as Screen, I:Home, label:"Home" },
    { id:"meals", s:"meals" as Screen, I:UtensilsCrossed, label:"Meals" },
    { id:"kitchen", s:"kitchen" as Screen, I:ChefHat, label:"Kitchen" },
    { id:"wallet", s:"wallet" as Screen, I:Wallet, label:"Wallet" },
    { id:"profile", s:"profile" as Screen, I:User, label:"Profile" },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 pointer-events-none">
      <motion.div className="rounded-[28px] px-1.5 py-1.5 flex items-center pointer-events-auto"
        initial={{ y:30, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ type:"spring", stiffness:200, damping:22, delay:0.4 }}
        style={{ background:t.nav, backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)", boxShadow:"0 8px 40px rgba(0,0,0,0.14)" }}>
        {tabs.map(tab => {
          const on = active === tab.id;
          return (
            <motion.button key={tab.id} onClick={()=>go(tab.s)}
              className="flex-1 flex flex-col items-center gap-1 py-2 rounded-[20px]"
              animate={{ background: on ? B.orangeL : "rgba(0,0,0,0)" }}
              transition={{ duration:0.18 }}>
              <motion.div animate={{ scale: on ? 1.08 : 1 }} transition={{ type:"spring", stiffness:400, damping:28 }}>
                <tab.I size={20} color={on?B.orange:t.muted} />
              </motion.div>
              <span className="text-[9px] font-bold" style={{ color:on?B.orange:t.muted }}>{tab.label}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

function WithNav({ tab, children, go, t }: { tab:string; children:React.ReactNode; go:(s:Screen)=>void; t:T }) {
  return (
    <div style={{ flex:1, minHeight:0, position:"relative", display:"flex", flexDirection:"column", background:t.bg }}>
      <div style={{ flex:1, minHeight:0, overflowY:"auto", paddingBottom:108, scrollbarWidth:"none", WebkitOverflowScrolling:"touch" } as any}>
        {children}
      </div>
      <FloatNav active={tab} go={go} t={t} />
    </div>
  );
}

// ─── Rich Illustrations ───────────────────────────────────────────────────────

function IllDelivery() {
  return (
    <svg viewBox="0 0 280 240" fill="none" className="w-full h-full">
      <circle cx="140" cy="120" r="110" fill={B.orangeL} />
      <circle cx="140" cy="120" r="85" fill={B.orangeM} opacity="0.5" />
      {/* Subtle decorative rings */}
      <circle cx="140" cy="120" r="105" stroke={B.orange} strokeWidth="0.5" opacity="0.15" />
      <circle cx="140" cy="120" r="65" stroke={B.orange} strokeWidth="0.5" opacity="0.1" />
      <circle cx="140" cy="76" r="26" fill="#F0C27A" />
      <path d="M115 71 Q120 54 140 50 Q160 54 165 71" fill="#3D1F00" />
      <circle cx="132" cy="73" r="3" fill="#3D1F00" /><circle cx="148" cy="73" r="3" fill="#3D1F00" />
      <path d="M133 83 Q140 89 147 83" stroke="#3D1F00" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="118" y="102" width="44" height="52" rx="14" fill={B.orange} />
      <rect x="122" y="108" width="36" height="8" rx="4" fill="#F5921A" opacity="0.5" />
      <rect x="90" y="104" width="29" height="11" rx="5.5" fill="#F0C27A" />
      <rect x="162" y="104" width="29" height="11" rx="5.5" fill="#F0C27A" />
      <rect x="60" y="108" width="32" height="28" rx="6" fill="#C8C8C8" />
      <rect x="63" y="112" width="26" height="4" rx="2" fill="#DCDCDC" />
      <rect x="63" y="119" width="26" height="4" rx="2" fill="#DCDCDC" />
      <rect x="63" y="126" width="26" height="4" rx="2" fill="#DCDCDC" />
      <rect x="66" y="103" width="18" height="7" rx="3.5" fill="#B0B0B0" />
      <rect x="163" y="104" width="24" height="32" rx="7" fill="#CC6000" />
      <rect x="166" y="108" width="18" height="3" rx="1.5" fill={B.orange} opacity="0.6" />
      <rect x="124" y="154" width="15" height="32" rx="7.5" fill="#374151" />
      <rect x="141" y="154" width="15" height="32" rx="7.5" fill="#374151" />
      <ellipse cx="131" cy="186" rx="13" ry="6" fill="#1F2937" />
      <ellipse cx="148" cy="186" rx="13" ry="6" fill="#1F2937" />
      {/* Steam wisps */}
      <path d="M72 88 Q68 80 72 72" stroke={B.orange} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M80 98 Q76 90 80 82" stroke={B.orange} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />
      <ellipse cx="140" cy="202" rx="60" ry="9" fill={B.orange} opacity="0.1" />
    </svg>
  );
}

function IllDabba() {
  return (
    <svg viewBox="0 0 280 240" fill="none" className="w-full h-full">
      <circle cx="140" cy="120" r="110" fill={B.orangeL} />
      <circle cx="140" cy="120" r="85" fill={B.orangeM} opacity="0.45" />
      <rect x="60" y="158" width="160" height="38" rx="9" fill="#AAAAAA" />
      <rect x="65" y="162" width="150" height="5" rx="2.5" fill="#C0C0C0" />
      <rect x="82" y="150" width="116" height="11" rx="5.5" fill="#B8B8B8" />
      <rect x="68" y="120" width="144" height="38" rx="9" fill="#C0C0C0" />
      <rect x="73" y="124" width="134" height="5" rx="2.5" fill="#D0D0D0" />
      <rect x="90" y="112" width="100" height="11" rx="5.5" fill="#C8C8C8" />
      <rect x="76" y="80" width="128" height="40" rx="9" fill="#DCDCDC" />
      <ellipse cx="140" cy="95" rx="50" ry="18" fill="#F5E6C8" />
      <circle cx="124" cy="94" r="10" fill="#F4A261" opacity="0.9" />
      <circle cx="140" cy="92" r="12" fill="#E9C46A" opacity="0.9" />
      <circle cx="156" cy="95" r="9" fill="#F4A261" opacity="0.9" />
      <circle cx="148" cy="89" r="4" fill={B.green} opacity="0.85" />
      <rect x="76" y="62" width="128" height="16" rx="6" fill="#E8E8E8" transform="rotate(-5 140 70)" />
      <path d="M116 74 Q113 64 116 55" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M140 72 Q137 62 140 53" stroke={B.orange} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />
      <path d="M164 74 Q161 64 164 55" stroke={B.orange} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
      <ellipse cx="140" cy="208" rx="75" ry="9" fill={B.orange} opacity="0.08" />
    </svg>
  );
}

function IllFamily() {
  return (
    <svg viewBox="0 0 280 240" fill="none" className="w-full h-full">
      <circle cx="140" cy="120" r="110" fill={B.orangeL} />
      <circle cx="140" cy="120" r="85" fill={B.orangeM} opacity="0.4" />
      <rect x="44" y="150" width="192" height="13" rx="6.5" fill="#DEB887" />
      <rect x="62" y="163" width="11" height="34" rx="5.5" fill="#C4A265" />
      <rect x="207" y="163" width="11" height="34" rx="5.5" fill="#C4A265" />
      <circle cx="140" cy="146" r="26" fill="#F5E6C8" />
      <circle cx="140" cy="146" r="21" fill="#F4A261" opacity="0.7" />
      <circle cx="130" cy="143" r="5" fill={B.orange} opacity="0.6" />
      <circle cx="145" cy="145" r="6" fill={B.orange} opacity="0.6" />
      <circle cx="76" cy="96" r="21" fill="#F0C27A" />
      <path d="M56 91 Q61 75 76 72 Q91 75 96 91" fill="#1F2937" />
      <circle cx="69" cy="93" r="2.5" fill="#3D1F00" /><circle cx="83" cy="93" r="2.5" fill="#3D1F00" />
      <path d="M70 102 Q76 108 82 102" stroke="#3D1F00" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <rect x="57" y="117" width="37" height="33" rx="11" fill="#1D4ED8" />
      <circle cx="204" cy="96" r="21" fill="#F0C27A" />
      <path d="M184 93 Q189 75 204 72 Q219 75 224 93" fill="#7C3D00" />
      <path d="M184 93 Q181 115 186 130" stroke="#7C3D00" strokeWidth="7.5" strokeLinecap="round" fill="none" />
      <path d="M224 93 Q227 115 222 130" stroke="#7C3D00" strokeWidth="7.5" strokeLinecap="round" fill="none" />
      <circle cx="197" cy="93" r="2.5" fill="#3D1F00" /><circle cx="211" cy="93" r="2.5" fill="#3D1F00" />
      <path d="M198 102 Q204 108 210 102" stroke="#3D1F00" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <rect x="185" y="117" width="37" height="33" rx="11" fill="#EC4899" />
      <circle cx="140" cy="118" r="17" fill="#FBBF24" />
      <path d="M124 113 Q128 100 140 98 Q152 100 156 113" fill="#92400E" />
      <circle cx="134" cy="116" r="2.2" fill="#3D1F00" /><circle cx="146" cy="116" r="2.2" fill="#3D1F00" />
      <path d="M135 124 Q140 128 145 124" stroke="#3D1F00" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <rect x="128" y="135" width="24" height="20" rx="8" fill={B.green} />
      <ellipse cx="140" cy="208" rx="84" ry="9" fill={B.orange} opacity="0.08" />
    </svg>
  );
}

function IllRewards() {
  return (
    <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
      <circle cx="100" cy="90" r="80" fill="#FEF3C7" />
      <circle cx="100" cy="90" r="58" fill="#FDE68A" opacity="0.5" />
      {/* Trophy */}
      <rect x="78" y="108" width="44" height="10" rx="5" fill="#F59E0B" />
      <rect x="86" y="118" width="28" height="6" rx="3" fill="#D97706" />
      <rect x="82" y="124" width="36" height="8" rx="4" fill="#F59E0B" />
      <path d="M80 60 Q80 108 100 108 Q120 108 120 60 Z" fill="#FCD34D" />
      <path d="M80 60 Q70 60 66 72 Q62 84 76 92 Q80 94 80 84" fill="#FCD34D" />
      <path d="M120 60 Q130 60 134 72 Q138 84 124 92 Q120 94 120 84" fill="#FCD34D" />
      <circle cx="100" cy="82" r="14" fill="#F59E0B" opacity="0.6" />
      <path d="M100 72 L102.5 79 L110 79 L104 83.5 L106.5 91 L100 87 L93.5 91 L96 83.5 L90 79 L97.5 79 Z" fill="#FFFBEB" />
      {/* Stars */}
      <circle cx="48" cy="48" r="6" fill="#FCD34D" opacity="0.8" />
      <circle cx="152" cy="48" r="4" fill="#F59E0B" opacity="0.8" />
      <circle cx="44" cy="140" r="4" fill="#FBBF24" opacity="0.7" />
      <circle cx="156" cy="138" r="5" fill="#FCD34D" opacity="0.7" />
      <ellipse cx="100" cy="175" rx="50" ry="6" fill="#F59E0B" opacity="0.08" />
    </svg>
  );
}

function IllSupport() {
  return (
    <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
      <circle cx="100" cy="90" r="80" fill="#EFF6FF" />
      <circle cx="100" cy="90" r="58" fill="#DBEAFE" opacity="0.5" />
      {/* Headphones */}
      <path d="M62 90 Q62 55 100 55 Q138 55 138 90" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="54" y="88" width="16" height="28" rx="8" fill="#3B82F6" />
      <rect x="130" y="88" width="16" height="28" rx="8" fill="#3B82F6" />
      <rect x="57" y="91" width="10" height="22" rx="5" fill="#60A5FA" />
      <rect x="133" y="91" width="10" height="22" rx="5" fill="#60A5FA" />
      {/* Chat bubble */}
      <rect x="78" y="108" width="44" height="30" rx="10" fill="#3B82F6" />
      <path d="M88 138 L84 148 L96 138" fill="#3B82F6" />
      <div/>
      <circle cx="90" cy="123" r="3" fill="white" /><circle cx="100" cy="123" r="3" fill="white" /><circle cx="110" cy="123" r="3" fill="white" />
      {/* Decorative */}
      <circle cx="50" cy="52" r="5" fill="#BFDBFE" opacity="0.8" />
      <circle cx="152" cy="140" r="6" fill="#93C5FD" opacity="0.7" />
      <ellipse cx="100" cy="175" rx="50" ry="6" fill="#3B82F6" opacity="0.07" />
    </svg>
  );
}

function IllEmpty() {
  return (
    <svg viewBox="0 0 200 180" fill="none" className="w-full h-full">
      <circle cx="100" cy="90" r="75" fill="#F5F0E8" />
      <ellipse cx="100" cy="120" rx="40" ry="30" fill="#EDE8DF" />
      <path d="M72 100 Q72 82 100 82 Q128 82 128 100 L124 120 Q100 130 76 120 Z" fill="#E5E0D8" />
      <ellipse cx="100" cy="100" rx="28" ry="18" fill="#F0EDE8" />
      <path d="M88 90 Q100 85 112 90" stroke="#CCC5BB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M86 96 Q100 91 114 96" stroke="#CCC5BB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="60" r="12" fill="#E5E0D8" />
      <path d="M94 60 Q100 54 106 60 Q100 66 94 60Z" fill="#CCC5BB" opacity="0.7" />
      <circle cx="56" cy="68" r="5" fill="#EDE8DF" />
      <circle cx="148" cy="72" r="4" fill="#EDE8DF" />
      <ellipse cx="100" cy="168" rx="45" ry="6" fill="#D9D3C8" opacity="0.4" />
    </svg>
  );
}

// ─── Auth Inputs ──────────────────────────────────────────────────────────────

function AuthInput({ label, placeholder, type="text", t }: { label:string; placeholder:string; type?:string; t:T }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const isP = type==="password";
  return (
    <div>
      <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5" style={{ color:focused?B.orange:t.muted }}>{label}</label>
      <motion.div animate={{ borderColor:focused?B.orange:t.border }} className="relative rounded-[18px] border-2" style={{ borderColor:t.border }}>
        <input type={isP&&!show?"password":"text"} placeholder={placeholder}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          className="w-full py-4 px-5 rounded-[16px] text-[15px] outline-none bg-transparent"
          style={{ color:t.text, fontFamily:"'Inter',sans-serif", background:t.input }} />
        {isP && (
          <button type="button" onClick={()=>setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color:t.muted }}>
            {show?<EyeOff size={17} />:<Eye size={17} />}
          </button>
        )}
      </motion.div>
    </div>
  );
}

// ─── SPLASH ───────────────────────────────────────────────────────────────────

function Splash({ go }: { go:(s:Screen)=>void }) {
  useEffect(()=>{ const id=setTimeout(()=>go("ob1"),2800); return()=>clearTimeout(id); },[]);
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", paddingTop:72, paddingBottom:72, background:B.cream, position:"relative", overflow:"hidden" }}>
      {/* Background organic shapes */}
      <OrgBlob x={-40} y={-30} size={200} color={B.orange} opacity={0.06} blur={40} />
      <OrgBlob x="60%" y="50%" size={180} color={B.green} opacity={0.04} blur={50} />
      <OrgBlob x={20} y="70%" size={150} color={B.orange} opacity={0.05} blur={35} />
      <div />
      <motion.div initial={{ opacity:0, scale:0.8, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
        transition={{ type:"spring", stiffness:140, damping:20 }}
        className="flex flex-col items-center gap-5" style={{ zIndex:1 }}>
        <motion.div
          animate={{ boxShadow:[`0 20px 60px ${B.orange}40`,`0 28px 80px ${B.orange}70`,`0 20px 60px ${B.orange}40`] }}
          transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}
          className="w-[88px] h-[88px] rounded-[28px] flex items-center justify-center"
          style={{ background:B.orange }}>
          <Package size={44} color="white" />
        </motion.div>
        <FadeIn delay={0.4}>
          <div className="text-center">
            <p className="text-[11px] font-black tracking-[0.38em] uppercase mb-1" style={{ color:B.orange }}>KOI KOI</p>
            <h1 className="text-[40px] font-black leading-none" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#1A1A1A" }}>DABBA</h1>
            <p className="text-[14px] font-medium mt-2" style={{ color:"#999" }}>Home-Style Meals. Delivered Daily.</p>
          </div>
        </FadeIn>
      </motion.div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }} className="flex gap-1.5" style={{ zIndex:1 }}>
        {[0,1,2].map(i=>(
          <motion.div key={i} animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:1.6, delay:i*0.25, repeat:Infinity }}
            className="w-1.5 h-1.5 rounded-full" style={{ background:B.orange }} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

function OB({ go, step, Ill, head, body, cta }: {
  go:(s:Screen)=>void; step:0|1|2; Ill:React.FC; head:string; body:string; cta:string;
}) {
  const next:Screen[] = ["ob2","ob3","auth"];
  return (
    <motion.div {...pageIn} style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:B.cream, position:"relative", overflow:"hidden" }}>
      {/* Organic background */}
      <OrgBlob x={-50} y={-20} size={220} color={B.orange} opacity={0.06} blur={45} />
      <OrgBlob x="55%" y="40%" size={160} color="#6366F1" opacity={0.04} blur={40} />
      <div className="flex justify-end px-6 pt-6" style={{ zIndex:1 }}>
        <button onClick={()=>go("auth")} className="text-[13px] font-semibold px-4 py-2 rounded-full"
          style={{ color:B.orange, background:B.orangeL }}>Skip</button>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center px-10" style={{ zIndex:1 }}>
        <div className="w-full max-w-[226px] aspect-square">
          <FloatIll><Ill /></FloatIll>
        </div>
      </div>
      <div className="px-7 pb-10" style={{ zIndex:1 }}>
        <FadeIn delay={0.05}>
          <div className="flex gap-2 mb-6">
            {[0,1,2].map(i=>(
              <motion.div key={i} animate={{ width:i===step?28:8, opacity:i===step?1:0.22 }}
                transition={{ type:"spring", stiffness:300, damping:28 }}
                className="h-2 rounded-full" style={{ background:B.orange }} />
            ))}
          </div>
        </FadeIn>
        <FadeUp delay={0.1}>
          <h1 className="text-[28px] font-black leading-tight mb-3"
            style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#1A1A1A" }}>{head}</h1>
          <p className="text-[15px] leading-relaxed mb-8" style={{ color:"#777", fontFamily:"'Inter',sans-serif" }}>{body}</p>
          <OrangeBtn label={cta} onClick={()=>go(next[step])} />
        </FadeUp>
      </div>
    </motion.div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

function Auth({ go, t }: { go:(s:Screen)=>void; t:T }) {
  const [tab, setTab] = useState<"in"|"up">("in");
  const [otp, setOtp] = useState(false);
  const [cd, setCd] = useState(28);
  useEffect(()=>{ if(!otp||cd<=0) return; const id=setTimeout(()=>setCd(c=>c-1),1000); return()=>clearTimeout(id); },[otp,cd]);

  return (
    <motion.div {...pageIn} style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", overflowY:"auto", background:t.bg, position:"relative" }}>
      <OrgBlob x={-60} y={-40} size={220} color={B.orange} opacity={0.06} blur={40} />
      {/* Brand */}
      <div className="flex flex-col items-center pt-12 pb-7 px-6 relative z-10"
        style={{ background:`linear-gradient(180deg,${B.orangeL} 0%,${t.bg} 100%)` }}>
        <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }}
          transition={{ type:"spring", stiffness:180, damping:18 }}
          className="w-16 h-16 rounded-[22px] flex items-center justify-center mb-4"
          style={{ background:B.orange, boxShadow:`0 12px 40px ${B.orange}45` }}>
          <Package size={32} color="white" />
        </motion.div>
        <FadeIn delay={0.2}>
          <div className="text-center">
            <p className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ color:B.orange }}>KOI KOI</p>
            <p className="text-[22px] font-black" style={{ color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>DABBA</p>
          </div>
        </FadeIn>
      </div>

      {!otp ? (
        <FadeUp delay={0.1} className="px-6 flex-1">
          <div className="flex p-1 rounded-2xl mb-6" style={{ background:t.surface }}>
            {(["in","up"] as const).map(v=>(
              <motion.button key={v} onClick={()=>setTab(v)} className="flex-1 py-3 rounded-xl text-[15px] font-bold"
                style={{ background:tab===v?B.orange:"rgba(0,0,0,0)", color:tab===v?"#fff":t.muted }}>
                {v==="in"?"Log In":"Sign Up"}
              </motion.button>
            ))}
          </div>
          <div className="flex flex-col gap-3 mb-5">
            {[
              {label:"Continue with Phone",I:Phone,col:B.orange,fn:()=>{setOtp(true);setCd(28);}},
              {label:"Continue with Google",I:Globe,col:"#4285F4",fn:()=>go("setup1")},
              {label:"Continue with Apple",I:Monitor,col:t.text,fn:()=>go("setup1")},
            ].map(({label,I,col,fn})=>(
              <motion.button key={label} whileTap={{ scale:0.97 }} onClick={fn}
                className="w-full flex items-center gap-4 py-4 px-5 rounded-[20px] text-[14px] font-semibold border"
                style={{ background:t.card, borderColor:t.border, color:t.text, boxShadow:"0 1px 12px rgba(0,0,0,0.05)" }}>
                <I size={19} color={col} /><span className="flex-1 text-center">{label}</span>
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background:t.border }} />
            <span className="text-[12px] font-semibold" style={{ color:t.muted }}>OR</span>
            <div className="flex-1 h-px" style={{ background:t.border }} />
          </div>
          <div className="flex flex-col gap-4">
            {tab==="up" && <AuthInput label="Full Name" placeholder="Riya Sharma" t={t} />}
            <AuthInput label="Email" placeholder="riya@email.com" type="email" t={t} />
            <AuthInput label="Password" placeholder="••••••••" type="password" t={t} />
            {tab==="up" && <AuthInput label="Confirm Password" placeholder="Repeat password" type="password" t={t} />}
          </div>
          {tab==="in" && <button className="float-right mt-2 text-[13px] font-semibold" style={{ color:B.orange }}>Forgot?</button>}
          <div className="mt-6 mb-4 clear-both"><OrangeBtn label={tab==="in"?"Log In":"Create Account"} onClick={()=>go("setup1")} /></div>
          <p className="text-center text-[13px] pb-6" style={{ color:t.muted }}>
            {tab==="in"?"New here? ":"Have an account? "}
            <button className="font-bold" style={{ color:B.orange }} onClick={()=>setTab(tab==="in"?"up":"in")}>
              {tab==="in"?"Sign Up":"Log In"}
            </button>
          </p>
        </FadeUp>
      ) : (
        <FadeUp delay={0.1} className="px-6 flex-1">
          <SuccessCheck size={64} color={B.orange} />
          <div className="mt-4 mb-6">
            <h2 className="text-[26px] font-black mb-2" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>Verify Phone</h2>
            <p className="text-[14px]" style={{ color:t.muted }}>
              Code sent to <span className="font-bold" style={{ color:t.text }}>+91 98765 43210</span>
            </p>
          </div>
          <div className="flex gap-3 mb-6">
            {[true,true,true,false,false,false].map((f,i)=>(
              <motion.div key={i} initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:i*0.06 }}
                className="flex-1 h-14 flex items-center justify-center rounded-2xl border-2 text-2xl font-black"
                style={{ borderColor:f?B.orange:t.border, background:f?B.orangeL:t.input, color:t.text }}>{f?"•":""}</motion.div>
            ))}
          </div>
          <div className="flex justify-between mb-8">
            {cd>0
              ? <p className="text-[13px]" style={{ color:t.muted }}>Resend in <span className="font-bold" style={{ color:B.orange }}>{cd}s</span></p>
              : <button className="text-[13px] font-bold flex items-center gap-1.5" style={{ color:B.orange }} onClick={()=>setCd(28)}><RefreshCw size={13} />Resend</button>}
          </div>
          <OrangeBtn label="Verify & Continue" onClick={()=>go("setup1")} />
          <button onClick={()=>setOtp(false)} className="w-full text-center text-[13px] font-semibold mt-4 py-2" style={{ color:t.muted }}>← Back</button>
        </FadeUp>
      )}
    </motion.div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function HomeScreen({ go, t, paused, setPaused }: { go:(s:Screen)=>void; t:T; paused:boolean; setPaused:(v:boolean)=>void }) {
  const meal = MEALS[0];

  const qActions = [
    { I:Bike, label:"Track", col:"#0EA5E9", bg:"#E0F2FE", fn:()=>go("tracking") },
    { I:paused?Play:Pause, label:paused?"Resume":"Pause", col:"#F59E0B", bg:"#FEF3C7", fn:()=>setPaused(!paused) },
    { I:ChefHat, label:"Kitchen", col:B.orange, bg:B.orangeL, fn:()=>go("kitchen") },
    { I:Gift, label:"Refer", col:"#8B5CF6", bg:"#F5F3FF", fn:()=>go("refer") },
  ];

  return (
    <WithNav tab="home" go={go} t={t}>
      {/* Header with organic blobs */}
      <div className="px-5 pt-6 pb-4 relative overflow-hidden" style={{ zIndex:1 }}>
        <OrgBlob x={-30} y={-20} size={180} color={B.orange} opacity={0.07} blur={40} />
        <OrgBlob x="60%" y={10} size={140} color={B.green} opacity={0.05} blur={35} />
        <div className="flex items-center justify-between relative z-10">
          <FadeUp delay={0}>
            <div>
              <p className="text-[12px] font-semibold" style={{ color:t.muted }}>Good morning ☀️</p>
              <h1 className="text-[26px] font-black leading-tight" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>Riya Sharma</h1>
            </div>
          </FadeUp>
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-2.5">
              <motion.button whileTap={{ scale:0.9 }} onClick={()=>go("notifications")}
                className="w-11 h-11 rounded-full flex items-center justify-center relative" style={{ background:t.surface }}>
                <Bell size={19} color={t.text} />
                <motion.span animate={{ scale:[1,1.3,1] }} transition={{ duration:2, repeat:Infinity }}
                  className="absolute top-2 right-2 w-2 h-2 rounded-full border-2" style={{ background:"#EF4444", borderColor:t.bg }} />
              </motion.button>
              <motion.button whileTap={{ scale:0.9 }} onClick={()=>go("profile")}
                className="w-11 h-11 rounded-full font-black text-[15px] text-white flex items-center justify-center"
                style={{ background:B.orange, boxShadow:`0 4px 16px ${B.orange}50` }}>R</motion.button>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-4 pb-2">
        {/* HERO — Today's Meal */}
        <FadeUp delay={0.08}>
          <motion.div whileTap={{ scale:0.99 }} onClick={()=>go("tracking")}
            className="rounded-[28px] overflow-hidden cursor-pointer"
            style={{ boxShadow:`0 10px 48px rgba(0,0,0,0.14)` }}>
            <div className="relative" style={{ height:260 }}>
              <img src={meal.img} alt={meal.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.78) 100%)" }} />
              {/* Top badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ background:"rgba(255,255,255,0.95)" }}>
                  <PulsingDot color={B.green} size={7} />
                  <span className="text-[10px] font-black" style={{ color:B.green }}>ON TIME</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <VegPill veg={true} />
              </div>
              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white opacity-65 mb-1">
                  {meal.when === "lunch" ? "☀️ Lunch" : "🌙 Dinner"} · {meal.time}
                </p>
                <h2 className="text-[21px] font-black text-white leading-tight mb-3" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{meal.name}</h2>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-[16px]" style={{ background:"rgba(255,255,255,0.18)", backdropFilter:"blur(10px)" }}>
                  <Bike size={15} color="white" />
                  <span className="text-[12px] font-bold text-white">Track Live · Arjun is 2.4 km away</span>
                  <ChevronRight size={13} color="white" className="ml-auto" />
                </div>
              </div>
            </div>
            {/* Delivery steps */}
            <div className="px-5 py-4" style={{ background:t.card }}>
              <div className="flex items-start">
                {[{l:"Prepared",d:true},{l:"On the Way",a:true},{l:"Delivered",d:false}].map((s,i,arr)=>(
                  <div key={s.l} className="flex-1 flex flex-col items-center relative">
                    {i<arr.length-1 && (
                      <div className="absolute top-3.5 left-1/2 w-full h-0.5 z-0"
                        style={{ background:s.d?B.green:t.border }} />
                    )}
                    <div className="w-7 h-7 rounded-full z-10 flex items-center justify-center mb-2"
                      style={{ background:s.d?B.green:(s as any).a?B.orange:t.surface }}>
                      {s.d ? <Check size={13} color="white" strokeWidth={3} /> : (s as any).a ? <PulsingDot color="white" size={9} /> : null}
                    </div>
                    <p className="text-[9px] font-bold text-center leading-tight" style={{ color:s.d?B.green:(s as any).a?B.orange:t.muted }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeUp>

        {/* Quick actions */}
        <FadeUp delay={0.12}>
          <div className="grid grid-cols-4 gap-2.5">
            {qActions.map((a,i)=>(
              <motion.button key={a.label} whileTap={{ scale:0.93 }} onClick={a.fn}
                className="flex flex-col items-center gap-2 py-4 rounded-[22px]"
                style={{ background:t.card, boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}
                initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.14+i*0.04 }}>
                <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:a.bg }}>
                  <a.I size={18} color={a.col} />
                </div>
                <span className="text-[10px] font-bold" style={{ color:t.sub }}>{a.label}</span>
              </motion.button>
            ))}
          </div>
        </FadeUp>

        {/* Subscription progress card */}
        <FadeUp delay={0.16}>
          <motion.div whileTap={{ scale:0.99 }} onClick={()=>go("plans")}
            className="rounded-[28px] overflow-hidden cursor-pointer"
            style={{ background:`linear-gradient(135deg,${B.orange} 0%,#C25E00 100%)`, boxShadow:`0 8px 36px ${B.orange}45` }}>
            <div className="p-5">
              <div className="flex items-center gap-4">
                <ProgressRing pct={10} size={68} color="rgba(255,255,255,0.9)" label="10%" sub="Day 3" strokeW={5} />
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white opacity-65 mb-1">Current Plan</p>
                  <p className="text-[19px] font-black text-white leading-tight" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Monthly · Veg</p>
                  <p className="text-[12px] text-white opacity-70 mt-0.5">₹3,999/mo · Day 3 of 30</p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-[10px] font-black" style={{ background:"rgba(255,255,255,0.2)", color:"white" }}>
                  {paused?"PAUSED":"ACTIVE"}
                </span>
              </div>
            </div>
          </motion.div>
        </FadeUp>

        {/* Seasonal banner */}
        <FadeUp delay={0.2}>
          <SeasonalBanner go={go} t={t} />
        </FadeUp>

        {/* Kitchen shortcut */}
        <FadeUp delay={0.21}>
          <motion.div whileTap={{ scale:0.98 }} onClick={()=>go("kitchen")}
            className="mx-0 rounded-[24px] overflow-hidden relative cursor-pointer"
            style={{ background:"linear-gradient(135deg,#0F2027 0%,#203A43 60%,#2C5364 100%)" }}>
            <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
              <div style={{ position:"absolute", width:120, height:100, background:"#60A5FA", borderRadius:"60% 40% 70% 30%/50% 60% 40% 50%", opacity:0.1, top:-20, right:-10, filter:"blur(18px)" }} />
            </div>
            <div className="relative flex items-center justify-between p-4 gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background:"rgba(255,255,255,0.12)" }}>
                  <Camera size={18} color="white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <PulsingDot color="#EF4444" size={7} />
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white opacity-60">Live Now</span>
                  </div>
                  <p className="text-[15px] font-black text-white leading-tight">Watch Your Food Being Made</p>
                </div>
              </div>
              <button className="px-3 py-2 rounded-[12px] text-[11px] font-black text-white whitespace-nowrap flex-shrink-0" style={{ background:"rgba(255,255,255,0.15)" }}>Watch →</button>
            </div>
          </motion.div>
        </FadeUp>

        {/* Up next */}
        <FadeUp delay={0.22}>
          <Card t={t} onClick={()=>go("meals")}>
            <div className="flex items-center gap-4 p-4">
              <div className="rounded-[18px] overflow-hidden flex-shrink-0" style={{ width:64, height:64, background:t.surface }}>
                <img src={MEALS[2].img} alt="next" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] mb-1" style={{ color:t.muted }}>Up Next · Tomorrow Lunch</p>
                <p className="text-[14px] font-bold leading-snug truncate" style={{ color:t.text }}>{MEALS[2].name}</p>
                <p className="text-[11px] mt-0.5" style={{ color:t.muted }}>12:30 PM · 340 kcal</p>
              </div>
              <ChevronRight size={16} color={t.muted} />
            </div>
          </Card>
        </FadeUp>

        {/* Wallet + Rewards */}
        <FadeUp delay={0.24}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label:"Wallet", I:Wallet, val:"₹450", sub:"Available balance", col:B.orange, s:"wallet" as Screen },
              { label:"Rewards", I:Award, val:"1,250 pts", sub:"Gold Member", col:"#F59E0B", s:"rewards" as Screen },
            ].map(c=>(
              <motion.div key={c.label} whileTap={{ scale:0.97 }} onClick={()=>go(c.s)}>
                <Card t={t} p="p-4" className="cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <c.I size={14} color={c.col} />
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:t.muted }}>{c.label}</p>
                  </div>
                  <p className="text-[18px] font-black" style={{ color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{c.val}</p>
                  <p className="text-[10px] mt-0.5" style={{ color:t.muted }}>{c.sub}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Offers */}
        <FadeUp delay={0.26}>
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-[15px] font-black" style={{ color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Active Offers</p>
              <button className="text-[12px] font-semibold" style={{ color:B.orange }} onClick={()=>go("offers")}>View all →</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth:"none" }}>
              {[
                {code:"WELCOME50",desc:"₹50 off next payment",col:B.orange,bg:B.orangeL},
                {code:"SAVE20",desc:"20% off this month",col:"#6366F1",bg:"#EDE9FE"},
                {code:"REFER100",desc:"₹100 per referral",col:B.green,bg:B.greenL},
              ].map(o=>(
                <motion.div key={o.code} whileTap={{ scale:0.97 }} className="flex-shrink-0 w-44 p-4 rounded-[22px] cursor-pointer" style={{ background:o.bg }}>
                  <Tag size={13} color={o.col} className="mb-2" />
                  <p className="text-[13px] font-black mb-1" style={{ color:o.col }}>{o.code}</p>
                  <p className="text-[10px] leading-snug" style={{ color:o.col+"BB" }}>{o.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Recommended */}
        <FadeUp delay={0.28}>
          <div>
            <p className="text-[15px] font-black mb-3 px-1" style={{ color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Recommended</p>
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth:"none" }}>
              {MEALS.slice(2,5).map((m,i)=>(
                <motion.div key={m.id} whileTap={{ scale:0.97 }}
                  className="flex-shrink-0 w-44 rounded-[22px] overflow-hidden cursor-pointer"
                  style={{ background:t.card, boxShadow:"0 3px 18px rgba(0,0,0,0.08)" }}
                  initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.3+i*0.06 }}>
                  <div className="relative" style={{ height:112 }}>
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2"><VegPill veg={m.veg} /></div>
                  </div>
                  <div className="p-3">
                    <p className="text-[12px] font-bold leading-snug" style={{ color:t.text }}>{m.name}</p>
                    <p className="text-[10px] mt-1" style={{ color:t.muted }}>{m.cal} kcal · {m.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Refer & Earn */}
        <FadeUp delay={0.3}>
          <motion.div whileTap={{ scale:0.98 }} onClick={()=>go("refer")}
            className="flex items-center gap-4 p-5 rounded-[24px] cursor-pointer"
            style={{ background:"linear-gradient(135deg,#FFF7ED 0%,#FEF3C7 100%)", border:`1.5px solid ${B.orangeM}` }}>
            <div className="w-12 h-12 rounded-[18px] flex items-center justify-center flex-shrink-0" style={{ background:B.orange }}>
              <Gift size={24} color="white" />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-black" style={{ color:"#111827" }}>Refer & Earn ₹100</p>
              <p className="text-[11px] mt-0.5" style={{ color:"#6B7280" }}>Invite friends, get ₹100 per successful referral</p>
            </div>
            <ChevronRight size={18} color={B.orange} />
          </motion.div>
        </FadeUp>

        {/* Support shortcut */}
        <FadeUp delay={0.32}>
          <motion.div whileTap={{ scale:0.98 }} onClick={()=>go("support")}
            className="flex items-center gap-3 p-4 rounded-[24px] cursor-pointer mb-2"
            style={{ background:t.card, border:`1px solid ${t.border}` }}>
            <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:"#EFF6FF" }}>
              <MessageCircle size={19} color="#3B82F6" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold" style={{ color:t.text }}>Need Help?</p>
              <p className="text-[11px]" style={{ color:t.muted }}>Chat, call or raise a support ticket anytime</p>
            </div>
            <ChevronRight size={16} color={t.muted} />
          </motion.div>
        </FadeUp>
      </div>
    </WithNav>
  );
}

// ─── MEALS ────────────────────────────────────────────────────────────────────

function Meals({ go, t }: { go:(s:Screen)=>void; t:T }) {
  const [day, setDay] = useState("Today");
  const [filter, setFilter] = useState("All");
  const [ratings, setRatings] = useState<Record<number,number>>({2:4});
  const [loading, setLoading] = useState(false);
  const visible = MEALS.filter(m=>day==="Week"||m.day===day);

  useEffect(()=>{
    setLoading(true);
    const id = setTimeout(()=>setLoading(false),700);
    return()=>clearTimeout(id);
  },[day]);

  return (
    <WithNav tab="meals" go={go} t={t}>
      <div className="px-6 pt-6 pb-3">
        <FadeUp delay={0}>
          <h1 className="text-[28px] font-black mb-4" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>Meals</h1>
          <div className="flex gap-2 mb-4">
            {["Today","Tomorrow","Week"].map(d=>(
              <motion.button key={d} onClick={()=>setDay(d)}
                className="flex-1 py-2.5 rounded-[14px] text-[13px] font-bold"
                animate={{ background:day===d?B.orange:t.surface, color:day===d?"#fff":t.muted }}>
                {d}
              </motion.button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:"none" }}>
            {["All","Lunch","Dinner","Chef Special","Seasonal","High Protein","Healthy","Veg","Non-Veg"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)}
                className="px-4 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap flex-shrink-0"
                style={{ background:filter===f?B.greenL:"none", color:filter===f?"#15803D":t.muted, border:`1.5px solid ${filter===f?B.green:t.border}` }}>
                {f}
              </button>
            ))}
          </div>
        </FadeUp>
      </div>
      <div className="px-5 flex flex-col gap-4 pb-2">
        {loading ? (
          <>
            <SkeletonCard t={t} />
            <SkeletonCard t={t} />
          </>
        ) : (
          visible.map((m,i)=>(
            <motion.div key={m.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:i*0.07 }}
              className="rounded-[24px] overflow-hidden" style={{ background:t.card, boxShadow:"0 3px 24px rgba(0,0,0,0.08)" }}>
              <div className="relative" style={{ height:220 }}>
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background:"linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.72) 100%)" }} />
                <div className="absolute top-3.5 left-3.5"><VegPill veg={m.veg} /></div>
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full" style={{ background:"rgba(0,0,0,0.55)" }}>
                  {m.when==="lunch"?<Sun size={11} color="#FCD34D"/>:<Moon size={11} color="#A78BFA"/>}
                  <span className="text-[10px] font-bold text-white">{m.time}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white opacity-65 mb-1">{m.day}</p>
                  <p className="text-[20px] font-black text-white leading-tight" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{m.name}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-5 mb-4">
                  <MacroChip val={`${m.cal}`} label="kcal" color={B.orange} />
                  <MacroChip val={`${m.protein}g`} label="protein" color="#6366F1" />
                  <MacroChip val={`${m.carbs}g`} label="carbs" color={B.green} />
                  <MacroChip val={`${m.fat}g`} label="fat" color="#F59E0B" />
                </div>
                <div className="flex items-center justify-between pt-3.5" style={{ borderTop:`1px solid ${t.border}` }}>
                  <div>
                    <p className="text-[10px] font-bold mb-1.5" style={{ color:t.muted }}>Rate this meal</p>
                    <Stars val={ratings[m.id]||0} onChange={v=>setRatings(r=>({...r,[m.id]:v}))} />
                  </div>
                  <div className="flex gap-2">
                    <motion.button whileTap={{ scale:0.94 }} onClick={()=>go("meal_detail")}
                      className="text-[12px] font-bold px-3 py-2 rounded-[14px]" style={{ background:t.surface, color:t.sub }}>
                      Details
                    </motion.button>
                    <motion.button whileTap={{ scale:0.94 }} onClick={()=>go("subscribe_flow")}
                      className="text-[12px] font-bold px-3 py-2 rounded-[14px]" style={{ background:B.orange, color:"white" }}>
                      Subscribe
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
        {!loading && visible.length===0 && (
          <div className="flex flex-col items-center py-12">
            <FloatIll><div className="w-40 h-36"><IllEmpty /></div></FloatIll>
            <p className="mt-4 text-[15px] font-bold" style={{ color:t.muted }}>Menu coming soon</p>
            <p className="text-[12px] mt-1" style={{ color:t.muted }}>Check back later this week</p>
          </div>
        )}
      </div>
    </WithNav>
  );
}

// ─── PLANS ────────────────────────────────────────────────────────────────────

function Plans({ go, t }: { go:(s:Screen)=>void; t:T }) {
  const [selected, setSelected] = useState("monthly");
  const plan = PLANS.find(p=>p.id===selected)!;
  return (
    <WithNav tab="plans" go={go} t={t}>
      <div className="px-6 pt-6 pb-4 relative overflow-hidden">
        <OrgBlob x={-40} y={-20} size={200} color={B.orange} opacity={0.06} blur={40} />
        <FadeUp delay={0}>
          <p className="text-[12px] font-black uppercase tracking-[0.16em] mb-1 relative z-10" style={{ color:B.orange }}>KOI KOI DABBA</p>
          <h1 className="text-[28px] font-black leading-tight mb-1 relative z-10" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>Choose Your Plan</h1>
          <p className="text-[14px] relative z-10" style={{ color:t.muted }}>Pause, skip or cancel anytime.</p>
        </FadeUp>
      </div>
      <div className="px-5 flex flex-col gap-3 mb-4">
        {PLANS.map((p,i)=>{
          const isSel = selected===p.id;
          return (
            <motion.button key={p.id} onClick={()=>setSelected(p.id)}
              className="w-full text-left rounded-[24px] border-2 overflow-hidden"
              style={{ borderColor:isSel?p.color:t.border, background:isSel?p.color+"10":t.card, boxShadow:isSel?`0 4px 28px ${p.color}28`:"0 1px 12px rgba(0,0,0,0.05)" }}
              whileTap={{ scale:0.98 }}
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:i*0.055 }}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[14px] flex items-center justify-center"
                      style={{ background:isSel?p.color+"20":t.surface }}>
                      <Package size={18} color={isSel?p.color:t.muted} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[16px] font-black" style={{ color:t.text }}>{p.name}</p>
                        {p.badge && (
                          <motion.span animate={{ scale:isSel?[1,1.05,1]:1 }} transition={{ duration:1.5, repeat:Infinity }}
                            className="text-[9px] font-black px-2 py-0.5 rounded-full text-white" style={{ background:p.color }}>
                            {p.badge}
                          </motion.span>
                        )}
                      </div>
                      <p className="text-[11px]" style={{ color:t.muted }}>{p.sub}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[22px] font-black leading-none" style={{ color:isSel?p.color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{p.price}</p>
                    <p className="text-[11px]" style={{ color:t.muted }}>{p.unit}</p>
                  </div>
                </div>
                <AnimatePresence>
                  {isSel && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.24, ease:"easeInOut" }} className="overflow-hidden">
                      <div className="pt-3" style={{ borderTop:`1px solid ${t.border}` }}>
                        <div className="flex flex-wrap gap-2">
                          {p.perks.map((perk,pi)=>(
                            <motion.div key={perk} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
                              transition={{ delay:pi*0.05 }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                              style={{ background:p.color+"18" }}>
                              <Check size={11} color={p.color} strokeWidth={3} />
                              <span className="text-[11px] font-semibold" style={{ color:p.color }}>{perk}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>
      <div className="px-5 pb-2">
        <OrangeBtn label={`Subscribe to ${plan.name} Plan`} icon={<Sparkles size={16} />} onClick={()=>{}} />
        <p className="text-center text-[12px] mt-2 mb-1" style={{ color:t.muted }}>No lock-in · Cancel any time</p>
      </div>
    </WithNav>
  );
}

// ─── WALLET ───────────────────────────────────────────────────────────────────

function WalletScreen({ go, t }: { go:(s:Screen)=>void; t:T }) {
  return (
    <WithNav tab="wallet" go={go} t={t}>
      <div className="px-6 pt-6 pb-3">
        <FadeUp><h1 className="text-[28px] font-black" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>Wallet</h1></FadeUp>
      </div>
      <div className="px-5 flex flex-col gap-4 pb-2">
        <FadeUp delay={0.06}>
          <div className="p-6 rounded-[28px] relative overflow-hidden"
            style={{ background:"linear-gradient(135deg,#1A1A2E 0%,#0D0D1A 100%)", boxShadow:"0 10px 48px rgba(0,0,0,0.3)" }}>
            <OrgBlob x={-20} y={-20} size={160} color="#6366F1" opacity={0.15} blur={40} />
            <OrgBlob x="60%" y="50%" size={120} color={B.orange} opacity={0.1} blur={30} />
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white opacity-50 mb-2 relative z-10">Total Balance</p>
            <motion.p className="text-[48px] font-black text-white leading-none mb-1 relative z-10"
              style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}>₹575</motion.p>
            <p className="text-[13px] text-white opacity-40 mb-6 relative z-10">₹450 cash · ₹125 rewards</p>
            <div className="flex gap-2.5 relative z-10">
              {[{l:"Add Money",I:Plus},{l:"Withdraw",I:Banknote},{l:"Pay Bill",I:CreditCard}].map(a=>(
                <motion.button key={a.l} whileTap={{ scale:0.94 }}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-[18px]"
                  style={{ background:"rgba(255,255,255,0.1)" }}>
                  <a.I size={18} color="white" />
                  <span className="text-[9px] font-bold text-white opacity-70">{a.l}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Breakdown</p>
            {[
              {label:"Cash Balance",val:"₹450",I:Wallet,col:B.orange},
              {label:"Rewards Cashback",val:"₹125",I:Award,col:"#F59E0B"},
              {label:"Dabba Deposit (refundable)",val:"₹299",I:Package,col:B.green},
            ].map((r,i,a)=>(
              <div key={r.label} className="flex items-center gap-3.5 py-3.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:r.col+"18" }}>
                  <r.I size={17} color={r.col} />
                </div>
                <p className="flex-1 text-[14px] font-semibold" style={{ color:t.text }}>{r.label}</p>
                <p className="text-[16px] font-black" style={{ color:t.text }}>{r.val}</p>
              </div>
            ))}
          </Card>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-[15px] font-black" style={{ color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Coupons</p>
              <button className="text-[12px] font-semibold" style={{ color:B.orange }} onClick={()=>go("offers")}>All →</button>
            </div>
            {[
              {code:"WELCOME50",desc:"₹50 off · Expires 31 Jul",col:B.orange,bg:B.orangeL},
              {code:"REFER100",desc:"₹100 referral bonus",col:"#6366F1",bg:"#EDE9FE"},
            ].map(c=>(
              <motion.div key={c.code} whileTap={{ scale:0.98 }}
                className="flex items-center gap-4 p-4 rounded-[22px] mb-3 border cursor-pointer"
                style={{ background:c.bg, borderColor:c.col+"28" }}>
                <Tag size={20} color={c.col} />
                <div className="flex-1">
                  <p className="text-[14px] font-black" style={{ color:c.col }}>{c.code}</p>
                  <p className="text-[11px]" style={{ color:c.col+"99" }}>{c.desc}</p>
                </div>
                <button className="px-4 py-1.5 rounded-[12px] text-[12px] font-black text-white" style={{ background:c.col }}>Apply</button>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.18}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Transactions</p>
            {[
              {label:"Monthly Plan",amt:"−₹4,298",date:"7 Jul",I:Package,col:"#EF4444"},
              {label:"Referral Bonus",amt:"+₹100",date:"5 Jul",I:Gift,col:B.green},
              {label:"Wallet Top-up",amt:"+₹500",date:"1 Jul",I:Banknote,col:B.green},
              {label:"Refund — Missed Delivery",amt:"+₹133",date:"28 Jun",I:RotateCcw,col:"#6366F1"},
            ].map((tx,i,a)=>(
              <motion.div key={i} className="flex items-center gap-3.5 py-3.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}
                initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2+i*0.06 }}>
                <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:t.surface }}>
                  <tx.I size={16} color={tx.col} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold" style={{ color:t.text }}>{tx.label}</p>
                  <p className="text-[11px]" style={{ color:t.muted }}>{tx.date}</p>
                </div>
                <p className="text-[15px] font-black" style={{ color:tx.col }}>{tx.amt}</p>
              </motion.div>
            ))}
          </Card>
        </FadeUp>

        <FadeUp delay={0.22}>
          <motion.div whileTap={{ scale:0.98 }} onClick={()=>go("refer")}
            className="flex items-center gap-4 p-5 rounded-[24px] cursor-pointer mb-2"
            style={{ background:"linear-gradient(135deg,#FFF7ED 0%,#FEF3C7 100%)", border:`1.5px solid ${B.orangeM}` }}>
            <div className="w-12 h-12 rounded-[18px] flex items-center justify-center flex-shrink-0" style={{ background:B.orange }}>
              <Gift size={24} color="white" />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-black" style={{ color:"#111827" }}>Referral Earnings</p>
              <p className="text-[12px]" style={{ color:"#6B7280" }}>₹100 earned · Invite more friends</p>
            </div>
            <ChevronRight size={18} color={B.orange} />
          </motion.div>
        </FadeUp>
      </div>
    </WithNav>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────

function ProfileScreen({ go, t }: { go:(s:Screen)=>void; t:T }) {
  function Row({ I, label, sub, col=t.muted, fn }: any) {
    return (
      <motion.button whileTap={{ scale:0.98 }} onClick={fn} className="w-full flex items-center gap-4 px-5 py-4 text-left">
        <div className="w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background:col+"18" }}>
          <I size={17} color={col} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold" style={{ color:t.text }}>{label}</p>
          {sub && <p className="text-[11px]" style={{ color:t.muted }}>{sub}</p>}
        </div>
        <ChevronRight size={15} color={t.muted} />
      </motion.button>
    );
  }
  function Group({ title, children }: { title:string; children:React.ReactNode }) {
    return (
      <div className="mb-2">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] px-6 mb-1.5" style={{ color:t.muted }}>{title}</p>
        <div className="rounded-[24px] overflow-hidden mx-4" style={{ background:t.card, boxShadow:"0 1px 12px rgba(0,0,0,0.05)" }}>
          <div className="divide-y" style={{ borderColor:t.border }}>{children}</div>
        </div>
      </div>
    );
  }
  return (
    <WithNav tab="profile" go={go} t={t}>
      {/* User hero */}
      <div className="px-6 pt-6 pb-5 relative overflow-hidden">
        <OrgBlob x={-30} y={-20} size={180} color={B.orange} opacity={0.06} blur={40} />
        <FadeUp delay={0}>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <motion.div className="rounded-[24px] font-black text-white text-2xl flex items-center justify-center relative"
              style={{ width:72, height:72, background:B.orange, boxShadow:`0 8px 32px ${B.orange}50` }}
              whileTap={{ scale:0.94 }} onClick={()=>go("personal")}>
              R
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2" style={{ background:B.green, borderColor:t.bg }}>
                <Check size={11} color="white" strokeWidth={3} />
              </div>
            </motion.div>
            <div>
              <h1 className="text-[20px] font-black leading-tight" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>Riya Sharma</h1>
              <p className="text-[12px]" style={{ color:t.muted }}>+91 98765 43210</p>
              <p className="text-[11px]" style={{ color:t.muted }}>riya@email.com</p>
            </div>
            <motion.button whileTap={{ scale:0.9 }} onClick={()=>go("personal")}
              className="w-10 h-10 rounded-full flex items-center justify-center ml-auto" style={{ background:t.surface }}>
              <Edit size={15} color={t.muted} />
            </motion.button>
          </div>
          <div className="flex gap-2 relative z-10">
            <span className="text-[11px] font-black px-3 py-1.5 rounded-full" style={{ background:B.orangeL, color:B.orange }}>Monthly · Active</span>
            <span className="text-[11px] font-black px-3 py-1.5 rounded-full" style={{ background:B.greenL, color:"#15803D" }}>1,250 pts · Gold</span>
          </div>
        </FadeUp>
      </div>

      <Group title="Account">
        <Row I={User} label="Personal Information" sub="Name, email, date of birth" col={"#6366F1"} fn={()=>go("personal")} />
        <Row I={MapPin} label="Saved Addresses" sub="Home · Work" col={B.orange} fn={()=>go("addresses")} />
        <Row I={CreditCard} label="Payment Methods" sub="GPay, HDFC Card" col={B.green} fn={()=>go("payments")} />
      </Group>

      <Group title="Subscription & Finances">
        <Row I={Package} label="Manage Subscription" sub="Monthly · Veg · Lunch+Dinner" col={B.orange} fn={()=>go("plans")} />
        <Row I={Wallet} label="Wallet & Balance" sub="₹450 available" col={"#0EA5E9"} fn={()=>go("wallet")} />
        <Row I={Award} label="Rewards & Points" sub="1,250 pts · Gold Tier" col={"#F59E0B"} fn={()=>go("rewards")} />
        <Row I={Tag} label="Offers & Coupons" col={"#EC4899"} fn={()=>go("offers")} />
        <Row I={Gift} label="Referral Program" sub="Earn ₹100 per referral" col={"#8B5CF6"} fn={()=>go("refer")} />
      </Group>

      <Group title="Preferences">
        <Row I={Leaf} label="Meal Preferences" sub="Vegetarian" col={B.green} fn={()=>{}} />
        <Row I={Heart} label="Nutrition Goals" col={"#EC4899"} fn={()=>{}} />
        <Row I={Bell} label="Notification Settings" col={"#6366F1"} fn={()=>go("notifications")} />
      </Group>

      <Group title="App Settings">
        <Row I={Monitor} label="Appearance" sub="Light · Dark · System" col={"#7C3AED"} fn={()=>go("appearance")} />
        <Row I={Globe} label="Language" sub={"English"} col={t.muted} fn={()=>{}} />
        <Row I={Shield} label="Privacy" col={t.muted} fn={()=>{}} />
      </Group>

      <Group title="Help & Legal">
        <Row I={MessageCircle} label="Support" sub="Chat, call or raise a ticket" col={"#3B82F6"} fn={()=>go("support")} />
        <Row I={HelpCircle} label="FAQ" col={t.muted} fn={()=>{}} />
        <Row I={FileText} label="Privacy Policy" col={t.muted} fn={()=>{}} />
        <Row I={Info} label="About KOI KOI DABBA" sub={"v2.0.0"} col={B.orange} fn={()=>{}} />
      </Group>

      <div className="px-5 mt-2 mb-2">
        <motion.button whileTap={{ scale:0.97 }} onClick={()=>go("auth")}
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-[22px] border-2"
          style={{ borderColor:"#EF4444", color:"#EF4444" }}>
          <LogOut size={17} /><span className="font-black text-[15px]">Logout</span>
        </motion.button>
      </div>
    </WithNav>
  );
}

// ─── SUB-SCREENS ─────────────────────────────────────────────────────────────

function Notifications({ back, t }: { back:()=>void; t:T }) {
  const items = [
    {I:Bike,col:B.green,bg:B.greenL,title:"Lunch is out for delivery!",sub:"Arjun is 2.4 km away · ETA 2 min",time:"12:10 PM"},
    {I:CreditCard,col:"#6366F1",bg:"#EDE9FE",title:"Payment successful",sub:"₹4,298 debited for July plan",time:"7 Jul"},
    {I:Tag,col:B.orange,bg:B.orangeL,title:"New offer: WELCOME50",sub:"₹50 off your next payment",time:"5 Jul"},
    {I:Package,col:"#F59E0B",bg:"#FEF3C7",title:"Subscription renews in 7 days",sub:"Monthly plan · 8 Aug 2026 · ₹3,999",time:"4 Jul"},
    {I:Star,col:"#EC4899",bg:"#FCE7F3",title:"Rate yesterday's meal",sub:"How was Dal Tadka + Rice?",time:"3 Jul"},
    {I:Gift,col:"#8B5CF6",bg:"#F5F3FF",title:"Referral bonus credited!",sub:"₹100 added · Priya subscribed",time:"1 Jul"},
    {I:AlertCircle,col:"#F59E0B",bg:"#FEF3C7",title:"Delivery delayed slightly",sub:"Dinner is 15 min late. We apologise!",time:"30 Jun"},
  ];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Notifications" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {items.map((n,i)=>(
          <motion.div key={i} whileTap={{ scale:0.99 }}
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
            className="flex items-start gap-3 p-4 rounded-[22px]"
            style={{ background:t.card, boxShadow:"0 1px 12px rgba(0,0,0,0.05)" }}>
            <div className="w-11 h-11 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{ background:n.bg }}>
              <n.I size={19} color={n.col} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold mb-0.5" style={{ color:t.text }}>{n.title}</p>
              <p className="text-[12px] leading-snug" style={{ color:t.muted }}>{n.sub}</p>
            </div>
            <p className="text-[10px] flex-shrink-0 font-semibold mt-0.5" style={{ color:t.muted }}>{n.time}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Tracking({ back, t }: { back:()=>void; t:T }) {
  const steps = [{l:"Prepared",sub:"12:00 PM",d:true},{l:"Picked Up",sub:"12:15 PM",d:true},{l:"On the Way",sub:"12:20 PM",a:true},{l:"Arriving",sub:"ETA 12:28",d:false},{l:"Delivered",sub:"~12:30 PM",d:false}];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Live Tracking" onBack={back} t={t} />
      {/* Map */}
      <div className="mx-5 rounded-[24px] overflow-hidden mb-4 relative" style={{ height:190, background:t.surface, flexShrink:0 }}>
        <svg className="absolute inset-0 w-full h-full opacity-15">
          {[[0,95,300,95],[0,145,300,145],[0,52,300,52],[63,0,63,190],[150,0,150,190],[237,0,237,190]].map(([x1,y1,x2,y2],i)=>(
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={t.muted} strokeWidth="1" />
          ))}
        </svg>
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path d="M130 92 Q180 70 255 120" stroke={B.orange} strokeWidth="2" strokeDasharray="5 4" fill="none" opacity="0.6"
            initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ duration:1.5, delay:0.5, ease:"easeOut" }} />
        </svg>
        {/* Delivery partner */}
        <motion.div style={{ position:"absolute", width:44, height:44, background:B.orange, borderRadius:14, boxShadow:`0 6px 24px ${B.orange}60`, left:120, top:68, display:"flex", alignItems:"center", justifyContent:"center", zIndex:5 }}
          animate={{ y:[-2,2,-2] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }}>
          <Bike size={20} color="white" />
        </motion.div>
        {/* Home */}
        <div style={{ position:"absolute", width:38, height:38, background:B.green, borderRadius:12, boxShadow:`0 4px 20px ${B.green}50`, right:36, bottom:28, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Home size={16} color="white" />
        </div>
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background:t.bg, boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}>
          <PulsingDot color="#EF4444" size={8} />
          <span className="text-[11px] font-bold" style={{ color:t.text }}>LIVE</span>
        </div>
      </div>
      <div className="px-5 flex flex-col gap-4 flex-1 overflow-y-auto pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        <Card t={t} p="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[15px] font-black" style={{ color:t.text }}>Arjun Kumar</p>
            <div className="flex gap-2">
              <motion.button whileTap={{ scale:0.9 }} className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:B.greenL }}><PhoneCall size={16} color={B.green} /></motion.button>
              <motion.button whileTap={{ scale:0.9 }} className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:B.orangeL }}><MessageCircle size={16} color={B.orange} /></motion.button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[16px] font-black text-white text-xl flex items-center justify-center" style={{ background:"#374151" }}>A</div>
            <div>
              <Stars val={4} />
              <p className="text-[11px] mt-1" style={{ color:t.muted }}>4.8 ★ · 340+ deliveries</p>
              <p className="text-[11px] font-bold" style={{ color:B.orange }}>2.4 km away · ETA ~2 min</p>
            </div>
          </div>
        </Card>
        <Card t={t} p="p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-5" style={{ color:t.muted }}>Order Status</p>
          {steps.map((s,i)=>(
            <motion.div key={s.l} className="flex items-start gap-4 mb-3"
              initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}>
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background:s.d?B.green:(s as any).a?B.orange:t.surface }}>
                  {s.d?<Check size={13} color="white" strokeWidth={3}/>:(s as any).a?<PulsingDot color="white" size={9}/>:null}
                </div>
                {i<steps.length-1&&<div className="w-0.5 h-5 mt-1" style={{ background:s.d?B.green:t.border }} />}
              </div>
              <div className="pt-0.5">
                <p className="text-[13px] font-bold" style={{ color:s.d?B.green:(s as any).a?B.orange:t.muted }}>{s.l}</p>
                <p className="text-[11px]" style={{ color:t.muted }}>{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function Offers({ back, t }: { back:()=>void; t:T }) {
  const list = [
    {code:"WELCOME50",title:"Welcome Offer",val:"₹50 OFF",desc:"₹50 off your next payment",col:B.orange,bg:B.orangeL,exp:"31 Jul 2026"},
    {code:"SAVE20",title:"Monthly Saver",val:"20% OFF",desc:"20% off this month",col:"#6366F1",bg:"#EDE9FE",exp:"31 Jul 2026"},
    {code:"REFER100",title:"Referral Bonus",val:"₹100",desc:"₹100 per friend who subscribes",col:B.green,bg:B.greenL,exp:"No expiry"},
    {code:"FIRST100",title:"First Week",val:"₹100 OFF",desc:"₹100 off your first week",col:"#EC4899",bg:"#FCE7F3",exp:"14 Jul 2026"},
    {code:"GREENDAY",title:"Eco Discount",val:"₹50 OFF",desc:"Plant a tree, save ₹50",col:"#14B8A6",bg:"#CCFBF1",exp:"20 Jul 2026"},
  ];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Offers & Coupons" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {list.map((o,i)=>(
          <motion.div key={o.code} className="p-5 rounded-[24px] border" style={{ background:o.bg, borderColor:o.col+"28" }}
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] opacity-60 mb-0.5" style={{ color:o.col }}>{o.title}</p>
                <p className="text-[26px] font-black leading-none" style={{ color:o.col, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{o.val}</p>
              </div>
              <div className="px-3 py-2 rounded-[14px] border-2 border-dashed" style={{ borderColor:o.col }}>
                <p className="text-[12px] font-black" style={{ color:o.col }}>{o.code}</p>
              </div>
            </div>
            <p className="text-[13px] mb-3" style={{ color:o.col+"BB" }}>{o.desc}</p>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold" style={{ color:o.col+"80" }}>Expires: {o.exp}</p>
              <motion.button whileTap={{ scale:0.95 }} className="px-5 py-2 rounded-[14px] text-[12px] font-black text-white" style={{ background:o.col }}>Apply</motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Rewards({ back, t }: { back:()=>void; t:T }) {
  const pts = 1250;
  const tiers = [{n:"Bronze",max:500,col:"#CD7F32"},{n:"Silver",max:1000,col:"#9CA3AF"},{n:"Gold",max:2000,col:"#F59E0B"},{n:"Platinum",max:5000,col:"#6366F1"}];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Rewards" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {/* Points hero */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }}
          className="p-6 rounded-[28px] text-center relative overflow-hidden"
          style={{ background:"linear-gradient(135deg,#F59E0B 0%,#D97706 100%)", boxShadow:"0 10px 48px rgba(245,158,11,0.35)" }}>
          <OrgBlob x={-20} y={-20} size={160} color="#FCD34D" opacity={0.25} blur={30} />
          <OrgBlob x="60%" y="40%" size={120} color="#92400E" opacity={0.2} blur={25} />
          <div className="flex justify-center mb-3">
            <FloatIll><div className="w-28 h-24"><IllRewards /></div></FloatIll>
          </div>
          <motion.p className="text-[52px] font-black text-white leading-none mb-1" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>
            {pts.toLocaleString()}
          </motion.p>
          <p className="text-[14px] text-white opacity-75 mb-4">Gold Member · 750 pts to Platinum</p>
          <div className="flex gap-1 mb-1.5">
            {tiers.map(ti=>(
              <div key={ti.n} className="flex-1 h-2 rounded-full" style={{ background:pts>=ti.max?"rgba(255,255,255,0.4)":"white", opacity:pts>=ti.max?0.4:0.9 }} />
            ))}
          </div>
        </motion.div>

        <FadeUp delay={0.1}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>How to Earn</p>
            {[{label:"Daily meal delivered",pts:"+5 pts",I:UtensilsCrossed,col:B.orange},{label:"Refer a friend",pts:"+100 pts",I:Gift,col:"#8B5CF6"},{label:"Rate a meal",pts:"+2 pts",I:Star,col:"#F59E0B"},{label:"Monthly subscription",pts:"+50 pts",I:Package,col:B.green}].map((r,i,a)=>(
              <div key={r.label} className="flex items-center gap-3.5 py-3.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:t.surface }}><r.I size={16} color={r.col} /></div>
                <p className="flex-1 text-[13px] font-semibold" style={{ color:t.text }}>{r.label}</p>
                <span className="text-[12px] font-black px-2.5 py-1 rounded-full" style={{ background:B.greenL, color:"#15803D" }}>{r.pts}</span>
              </div>
            ))}
          </Card>
        </FadeUp>

        <FadeUp delay={0.15}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Points History</p>
            {[{label:"Meal delivered",pts:"+5",date:"Today"},{label:"Meal delivered",pts:"+5",date:"Yesterday"},{label:"Referral — Priya J.",pts:"+100",date:"5 Jul"},{label:"Meal rated",pts:"+2",date:"4 Jul"},{label:"Monthly subscription",pts:"+50",date:"7 Jun"}].map((h,i,a)=>(
              <div key={i} className="flex justify-between py-2.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color:t.text }}>{h.label}</p>
                  <p className="text-[11px]" style={{ color:t.muted }}>{h.date}</p>
                </div>
                <span className="text-[14px] font-black" style={{ color:B.green }}>{h.pts}</span>
              </div>
            ))}
          </Card>
        </FadeUp>
      </div>
    </div>
  );
}

function Appearance({ back, t, theme, setTheme }: { back:()=>void; t:T; theme:AppTheme; setTheme:(v:AppTheme)=>void }) {
  const [nf, setNf] = useState<Record<string,boolean>>({delivery:true,payment:true,offers:false,sub:true});
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Appearance" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        <FadeUp delay={0.05}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Theme</p>
            {([["light","Light Mode",Sun,"#F59E0B"],["dark","Dark Mode",Moon,"#6366F1"],["system","System Default",Monitor,"#6B7280"]] as const).map(([val,label,Icon,col])=>(
              <motion.button key={val} whileTap={{ scale:0.98 }} onClick={()=>setTheme(val)}
                className="w-full flex items-center gap-4 p-4 rounded-[20px] mb-2.5 border-2"
                style={{ borderColor:theme===val?B.orange:t.border, background:theme===val?B.orangeL:t.surface }}>
                <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background:col+"22" }}>
                  <Icon size={19} color={col} />
                </div>
                <p className="flex-1 text-[15px] font-bold text-left" style={{ color:t.text }}>{label}</p>
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor:theme===val?B.orange:t.border }}>
                  {theme===val&&<motion.div initial={{ scale:0 }} animate={{ scale:1 }} className="w-2.5 h-2.5 rounded-full" style={{ background:B.orange }} />}
                </div>
              </motion.button>
            ))}
          </Card>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-3" style={{ color:t.muted }}>Notifications</p>
            {[["delivery","Delivery Updates"],["payment","Payment Alerts"],["offers","Offers & Promotions"],["sub","Subscription Alerts"]].map(([k,l])=>(
              <div key={k} className="flex items-center justify-between py-3.5" style={{ borderBottom:`1px solid ${t.border}` }}>
                <p className="text-[14px] font-semibold" style={{ color:t.text }}>{l}</p>
                <button onClick={()=>setNf(n=>({...n,[k]:!n[k]}))}>
                  <div className="w-11 h-6 rounded-full flex items-center px-0.5" style={{ background:nf[k]?B.orange:t.border }}>
                    <motion.div animate={{ x:nf[k]?20:0 }} transition={{ type:"spring", stiffness:500, damping:35 }}
                      className="w-5 h-5 rounded-full bg-white shadow" />
                  </div>
                </button>
              </div>
            ))}
          </Card>
        </FadeUp>
        <FadeUp delay={0.14}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-3" style={{ color:t.muted }}>Language</p>
            <div className="flex items-center justify-between py-3 px-4 rounded-[16px]" style={{ background:t.surface }}>
              <div className="flex items-center gap-3"><Globe size={16} color={t.muted} /><p className="text-[14px] font-semibold" style={{ color:t.text }}>English</p></div>
              <ChevronDown size={16} color={t.muted} />
            </div>
          </Card>
        </FadeUp>
      </div>
    </div>
  );
}

function Support({ back, t }: { back:()=>void; t:T }) {
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Support" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        <FadeUp delay={0.05}>
          <div className="flex justify-center py-4">
            <FloatIll><div className="w-44 h-36"><IllSupport /></div></FloatIll>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 gap-3">
            {[{I:MessageCircle,label:"Chat",sub:"Avg. 2 min reply",col:B.green,bg:B.greenL},{I:PhoneCall,label:"Call",sub:"Mon–Sat 9–6 PM",col:"#3B82F6",bg:"#EFF6FF"},{I:FileText,label:"Raise Ticket",sub:"Track issues",col:B.orange,bg:B.orangeL},{I:HelpCircle,label:"FAQs",sub:"Quick answers",col:"#8B5CF6",bg:"#F5F3FF"}].map(s=>(
              <motion.button key={s.label} whileTap={{ scale:0.95 }} className="flex flex-col items-start p-5 rounded-[24px]" style={{ background:s.bg }}>
                <div className="w-12 h-12 rounded-[18px] flex items-center justify-center mb-3" style={{ background:s.col+"22" }}>
                  <s.I size={22} color={s.col} />
                </div>
                <p className="text-[14px] font-black mb-0.5" style={{ color:s.col }}>{s.label}</p>
                <p className="text-[11px]" style={{ color:s.col+"99" }}>{s.sub}</p>
              </motion.button>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.14}>
          <Card t={t} p="p-5">
            <div className="flex flex-col items-center py-4 mb-2">
              <CheckCircle2 size={36} color={B.green} />
              <p className="text-[14px] font-bold mt-2" style={{ color:t.text }}>No open tickets</p>
              <p className="text-[12px]" style={{ color:t.muted }}>All issues resolved ✓</p>
            </div>
          </Card>
        </FadeUp>
        <FadeUp delay={0.18}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Top FAQs</p>
            {["How do I pause my subscription?","Can I change my delivery address?","How is the dabba deposit refunded?","What if I miss a delivery?","Can I switch from veg to non-veg?"].map((q,i,a)=>(
              <div key={i} className="flex items-center gap-3 py-3.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <p className="flex-1 text-[13px] font-semibold" style={{ color:t.sub }}>{q}</p>
                <ChevronRight size={15} color={t.muted} />
              </div>
            ))}
          </Card>
        </FadeUp>
      </div>
    </div>
  );
}

function Addresses({ back, t }: { back:()=>void; t:T }) {
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Saved Addresses" onBack={back} t={t}
        right={<motion.button whileTap={{ scale:0.9 }} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background:B.orangeL }}><Plus size={17} color={B.orange} /></motion.button>} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {[{type:"Home",I:Home,addr:"B-204, Sunrise Apartments",area:"MG Road, Indiranagar, Bengaluru 560038",def:true},{type:"Work",I:Building2,addr:"3rd Floor, TechPark Tower",area:"ORR, Marathahalli, Bengaluru 560037",def:false}].map((a,i)=>(
          <motion.div key={a.type} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}>
            <Card t={t} p="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[12px] flex items-center justify-center" style={{ background:B.orangeL }}>
                    <a.I size={16} color={B.orange} />
                  </div>
                  <p className="text-[15px] font-black" style={{ color:t.text }}>{a.type}</p>
                  {a.def&&<span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background:B.greenL, color:"#15803D" }}>DEFAULT</span>}
                </div>
                <motion.button whileTap={{ scale:0.9 }} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:t.surface }}>
                  <Edit size={14} color={t.muted} />
                </motion.button>
              </div>
              <p className="text-[14px] font-semibold" style={{ color:t.text }}>{a.addr}</p>
              <p className="text-[12px] mt-0.5" style={{ color:t.muted }}>{a.area}</p>
            </Card>
          </motion.div>
        ))}
        <OrangeBtn label="Add New Address" icon={<Plus size={15} />} />
      </div>
    </div>
  );
}

function Payments({ back, t }: { back:()=>void; t:T }) {
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Payment Methods" onBack={back} t={t}
        right={<motion.button whileTap={{ scale:0.9 }} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background:B.orangeL }}><Plus size={17} color={B.orange} /></motion.button>} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        {[{type:"UPI",label:"GPay — riya@okaxis",I:Zap,col:"#4285F4",def:true},{type:"Card",label:"HDFC Regalia •••• 4521",I:CreditCard,col:"#6366F1",def:false},{type:"Wallet",label:"Paytm Wallet",I:Wallet,col:"#00BAF2",def:false}].map((p,i)=>(
          <motion.div key={p.type} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}>
            <Card t={t} p="p-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[16px] flex items-center justify-center" style={{ background:p.col+"18" }}>
                  <p.I size={20} color={p.col} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-bold" style={{ color:t.text }}>{p.label}</p>
                    {p.def&&<span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background:B.greenL, color:"#15803D" }}>DEFAULT</span>}
                  </div>
                  <p className="text-[11px]" style={{ color:t.muted }}>{p.type}</p>
                </div>
                <motion.button whileTap={{ scale:0.9 }} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:t.surface }}>
                  <Edit size={14} color={t.muted} />
                </motion.button>
              </div>
            </Card>
          </motion.div>
        ))}
        <OrangeBtn label="Add Payment Method" icon={<Plus size={15} />} />
      </div>
    </div>
  );
}

function Personal({ back, t }: { back:()=>void; t:T }) {
  const [focused, setFocused] = useState("");
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Personal Information" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        <FadeUp delay={0.05}>
          <div className="flex flex-col items-center py-5">
            <motion.div whileTap={{ scale:0.94 }}
              className="rounded-[28px] font-black text-white text-3xl flex items-center justify-center mb-3 relative cursor-pointer"
              style={{ width:88, height:88, background:B.orange, boxShadow:`0 12px 40px ${B.orange}45` }}>
              R
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2" style={{ background:t.card, borderColor:t.bg }}>
                <Edit size={13} color={B.orange} />
              </div>
            </motion.div>
            <button className="text-[13px] font-bold" style={{ color:B.orange }}>Change Photo</button>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          {[{l:"Full Name",p:"Riya Sharma"},{l:"Phone",p:"+91 98765 43210"},{l:"Email",p:"riya@email.com"}].map(f=>(
            <div key={f.l} className="mb-4">
              <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5"
                style={{ color:focused===f.l?B.orange:t.muted }}>{f.l}</label>
              <input defaultValue={f.p} onFocus={()=>setFocused(f.l)} onBlur={()=>setFocused("")}
                className="w-full py-4 px-5 rounded-[18px] text-[15px] outline-none"
                style={{ background:t.input, color:t.text, fontFamily:"'Inter',sans-serif", border:`2px solid ${focused===f.l?B.orange:"transparent"}` }} />
            </div>
          ))}
          <div className="mb-4">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5" style={{ color:t.muted }}>Gender</label>
            <div className="py-4 px-5 rounded-[18px] flex items-center justify-between" style={{ background:t.input }}>
              <span className="text-[15px]" style={{ color:t.text }}>Female</span>
              <ChevronDown size={17} color={t.muted} />
            </div>
          </div>
          <OrangeBtn label="Save Changes" onClick={back} />
        </FadeUp>
      </div>
    </div>
  );
}

function Refer({ back, t }: { back:()=>void; t:T }) {
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Refer & Earn" onBack={back} t={t} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-6 min-h-0" style={{ scrollbarWidth:"none" }}>
        <FadeUp delay={0.05}>
          <div className="p-6 rounded-[28px] text-center relative overflow-hidden"
            style={{ background:"linear-gradient(135deg,#FFF7ED 0%,#FEF3C7 100%)", border:`1.5px solid ${B.orangeM}` }}>
            <OrgBlob x={-30} y={-20} size={160} color={B.orange} opacity={0.1} blur={30} />
            <div className="flex justify-center mb-4">
              <FloatIll>
                <div className="w-16 h-16 rounded-[22px] flex items-center justify-center" style={{ background:B.orange, boxShadow:`0 8px 28px ${B.orange}45` }}>
                  <Gift size={30} color="white" />
                </div>
              </FloatIll>
            </div>
            <h2 className="text-[22px] font-black mb-2 relative z-10" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#111827" }}>Invite & Earn ₹100</h2>
            <p className="text-[14px] mb-5 relative z-10" style={{ color:"#6B7280" }}>For every friend who subscribes, you both get ₹100 instantly.</p>
            <div className="flex items-center gap-3 p-4 rounded-[18px] bg-white relative z-10">
              <p className="flex-1 text-[17px] font-black" style={{ color:"#111827" }}>RIYA2026</p>
              <motion.button whileTap={{ scale:0.94 }} className="flex items-center gap-2 px-4 py-2 rounded-[14px] text-[13px] font-black text-white" style={{ background:B.orange }}>
                <Copy size={14} />Copy
              </motion.button>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Card t={t} p="p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] mb-4" style={{ color:t.muted }}>Your Referrals</p>
            {[{name:"Priya Joshi",date:"5 Jul",status:"Subscribed",earned:"+₹100"},{name:"Amit Sharma",date:"Invited",status:"Pending",earned:"—"}].map((r,i,a)=>(
              <div key={r.name} className="flex items-center gap-4 py-3.5" style={{ borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <div className="w-10 h-10 rounded-[14px] font-black text-white flex items-center justify-center" style={{ background:B.orange }}>{r.name[0]}</div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold" style={{ color:t.text }}>{r.name}</p>
                  <p className="text-[11px]" style={{ color:t.muted }}>{r.date} · {r.status}</p>
                </div>
                <span className="text-[14px] font-black" style={{ color:r.earned==="—"?t.muted:B.green }}>{r.earned}</span>
              </div>
            ))}
          </Card>
        </FadeUp>
        <FadeUp delay={0.14}>
          <div className="flex gap-3">
            <OrangeBtn label="Share via WhatsApp" />
            <motion.button whileTap={{ scale:0.95 }} className="h-[54px] px-4 rounded-[20px] border-2 flex items-center" style={{ borderColor:t.border }}>
              <Share2 size={18} color={t.muted} />
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

// ─── Setup Onboarding (post-auth, 5 steps) ───────────────────────────────────

function SetupProgressBar({ step, total=5, t }: { step:number; total?:number; t:T }) {
  return (
    <div className="px-6 pt-5 pb-2" style={{ flexShrink:0 }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color:B.orange }}>Step {step} of {total}</span>
        <span className="text-[11px] font-semibold" style={{ color:t.muted }}>{Math.round((step/total)*100)}% complete</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background:t.surface }}>
        <motion.div className="h-full rounded-full" style={{ background:B.orange }}
          initial={{ width:0 }}
          animate={{ width:`${(step/total)*100}%` }}
          transition={{ duration:0.5, ease:[0.25,0.1,0.25,1] }} />
      </div>
    </div>
  );
}

function SetupShell({ step, title, subtitle, go, back, onContinue, ctaLabel="Continue", children, t }: {
  step:number; title:string; subtitle:string;
  go:(s:Screen)=>void; back:()=>void;
  onContinue:()=>void; ctaLabel?:string;
  children:React.ReactNode; t:T;
}) {
  return (
    <motion.div {...pageIn} style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg, position:"relative" }}>
      <OrgBlob x={-40} y={-20} size={180} color={B.orange} opacity={0.05} blur={40} />
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5" style={{ flexShrink:0, zIndex:1 }}>
        <motion.button whileTap={{ scale:0.9 }} onClick={back}
          className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background:t.surface }}>
          <ArrowLeft size={18} color={t.text} />
        </motion.button>
        <button onClick={()=>go("home")} className="text-[13px] font-semibold px-4 py-2 rounded-full" style={{ color:t.muted, background:t.surface }}>Skip All</button>
      </div>
      <SetupProgressBar step={step} t={t} />
      {/* Title */}
      <div className="px-6 pt-3 pb-4" style={{ flexShrink:0, zIndex:1 }}>
        <FadeUp delay={0.05}>
          <h1 className="text-[26px] font-black leading-tight" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:t.text }}>{title}</h1>
          <p className="text-[14px] mt-1" style={{ color:t.muted, fontFamily:"'Inter',sans-serif" }}>{subtitle}</p>
        </FadeUp>
      </div>
      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-4" style={{ scrollbarWidth:"none", zIndex:1 }}>
        <FadeUp delay={0.1}>{children}</FadeUp>
      </div>
      {/* CTA */}
      <div className="px-6 pb-8 pt-3" style={{ flexShrink:0, zIndex:1 }}>
        <OrangeBtn label={ctaLabel} onClick={onContinue} />
      </div>
    </motion.div>
  );
}

function SetupField({ label, placeholder, type="text", t, value, onChange }: {
  label:string; placeholder:string; type?:string; t:T; value?:string; onChange?:(v:string)=>void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-4">
      <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5" style={{ color:focused?B.orange:t.muted }}>{label}</label>
      <div className="relative rounded-[18px] border-2 transition-colors" style={{ borderColor:focused?B.orange:t.border }}>
        <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange?.(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          className="w-full py-4 px-5 rounded-[16px] text-[15px] outline-none bg-transparent"
          style={{ color:t.text, fontFamily:"'Inter',sans-serif", background:t.input }} />
      </div>
    </div>
  );
}

function SetupChip({ label, selected, onToggle, color=B.orange }: { label:string; selected:boolean; onToggle:()=>void; color?:string }) {
  return (
    <motion.button whileTap={{ scale:0.95 }} onClick={onToggle}
      className="px-4 py-3 rounded-[16px] text-[13px] font-bold border-2 transition-all"
      style={{
        borderColor: selected ? color : "transparent",
        background: selected ? color+"15" : "#F5F0EA",
        color: selected ? color : "#666",
      }}>
      {label}
    </motion.button>
  );
}

// Step 1 — Profile Information
function Setup1({ go, back, t }: { go:(s:Screen)=>void; back:()=>void; t:T }) {
  return (
    <SetupShell step={1} title="Tell us about you" subtitle="Your profile helps us personalise every meal." go={go} back={back} onContinue={()=>go("setup2")} t={t}>
      {/* Avatar picker */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <motion.div whileTap={{ scale:0.95 }}
            className="w-24 h-24 rounded-full flex items-center justify-center border-4 cursor-pointer"
            style={{ background:B.orangeL, borderColor:B.orange }}>
            <User size={40} color={B.orange} />
          </motion.div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background:B.orange }}>
            <Edit size={13} color="white" />
          </div>
        </div>
      </div>
      <SetupField label="Full Name" placeholder="Riya Sharma" t={t} />
      <SetupField label="Email Address" placeholder="riya@example.com" type="email" t={t} />
      <SetupField label="Mobile Number" placeholder="+91 98765 43210" type="tel" t={t} />
      <SetupField label="Date of Birth" placeholder="DD / MM / YYYY" t={t} />
      <div className="mb-4">
        <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5" style={{ color:t.muted }}>Gender</label>
        <div className="flex gap-2.5 flex-wrap">
          {["Male","Female","Non-binary","Prefer not to say"].map((g,i)=>(
            <SetupChip key={g} label={g} selected={i===1} onToggle={()=>{}} />
          ))}
        </div>
      </div>
    </SetupShell>
  );
}

// Step 2 — Delivery Location
function Setup2({ go, back, t }: { go:(s:Screen)=>void; back:()=>void; t:T }) {
  const [mode, setMode] = useState<"detect"|"manual"|null>(null);
  return (
    <SetupShell step={2} title="Where do we deliver?" subtitle="Add your primary delivery address." go={go} back={back} onContinue={()=>go("setup3")} t={t}>
      {/* Options */}
      <div className="flex flex-col gap-3 mb-6">
        {[
          { id:"detect" as const, icon:<Navigation size={22} color={B.orange} />, title:"Detect My Location", sub:"Auto-fill using GPS" },
          { id:"manual" as const, icon:<MapPin size={22} color="#6366F1" />, title:"Enter Manually", sub:"Type your full address" },
        ].map(opt=>(
          <motion.button key={opt.id} whileTap={{ scale:0.98 }} onClick={()=>setMode(opt.id)}
            className="flex items-center gap-4 p-5 rounded-[22px] border-2 text-left"
            style={{ borderColor:mode===opt.id?B.orange:t.border, background:mode===opt.id?B.orangeL:t.card, boxShadow:"0 2px 16px rgba(0,0,0,0.04)" }}>
            <div className="w-12 h-12 rounded-[16px] flex items-center justify-center" style={{ background:mode===opt.id?B.orange+"20":t.surface }}>
              {opt.icon}
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-bold" style={{ color:t.text }}>{opt.title}</p>
              <p className="text-[12px]" style={{ color:t.muted }}>{opt.sub}</p>
            </div>
            {mode===opt.id && <Check size={18} color={B.orange} />}
          </motion.button>
        ))}
      </div>
      {/* Map mock */}
      {mode==="detect" && (
        <FadeIn delay={0.05}>
          <div className="rounded-[22px] overflow-hidden mb-4" style={{ height:140, background:`linear-gradient(135deg,#E8F5E9 0%,#C8E6C9 100%)`, position:"relative" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,rgba(0,0,0,0.04) 0,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(0,0,0,0.04) 0,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 40px)" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <PulsingDot color={B.orange} size={14} />
            </div>
          </div>
          <SetupField label="Confirm Address" placeholder="Block 5, Sector 14, Gurugram" t={t} />
        </FadeIn>
      )}
      {mode==="manual" && (
        <FadeIn delay={0.05}>
          <SetupField label="House / Flat No." placeholder="Flat 4B" t={t} />
          <SetupField label="Apartment / Society" placeholder="Sunrise Apartments" t={t} />
          <SetupField label="Street" placeholder="MG Road" t={t} />
          <SetupField label="Landmark" placeholder="Near City Mall" t={t} />
          <SetupField label="Area / Locality" placeholder="Koramangala" t={t} />
          <div className="flex gap-3">
            <div className="flex-1"><SetupField label="City" placeholder="Bengaluru" t={t} /></div>
            <div className="flex-1"><SetupField label="Pincode" placeholder="560034" t={t} /></div>
          </div>
          <div className="mb-2">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-2" style={{ color:t.muted }}>Address Type</label>
            <div className="flex gap-2.5">
              {["🏠 Home","💼 Work","📍 Other"].map((tp,i)=>(
                <SetupChip key={tp} label={tp} selected={i===0} onToggle={()=>{}} />
              ))}
            </div>
          </div>
          <div className="mt-3">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] block mb-1.5" style={{ color:t.muted }}>Delivery Instructions</label>
            <textarea placeholder="Leave at door, ring bell twice..." rows={3}
              className="w-full px-5 py-4 rounded-[18px] text-[15px] outline-none resize-none"
              style={{ background:t.input, color:t.text, border:`2px solid ${t.border}`, fontFamily:"'Inter',sans-serif" }} />
          </div>
        </FadeIn>
      )}
    </SetupShell>
  );
}

// Step 3 — Fitness & Health Profile
function Setup3({ go, back, t }: { go:(s:Screen)=>void; back:()=>void; t:T }) {
  const [activity, setActivity] = useState(2);
  const [goal, setGoal] = useState(4);
  const [food, setFood] = useState(0);
  const [cuisine, setCuisine] = useState<number[]>([1]);
  const [spice, setSpice] = useState(1);
  const activityLevels = ["Sedentary","Lightly Active","Moderately Active","Very Active","Athlete"];
  const goals = ["Weight Loss","Weight Gain","Muscle Gain","Maintain Weight","Healthy Lifestyle"];
  const foodPrefs = ["🌿 Veg","🍗 Non-Veg","🥚 Eggetarian"];
  const cuisines = ["South Indian","North Indian","Andhra","Telangana","Jain"];
  const spiceLevels = ["🌶 Mild","🌶🌶 Medium","🌶🌶🌶 Spicy","🔥 Extra Hot"];
  const bmi = 22.4;
  return (
    <SetupShell step={3} title="Health & Nutrition" subtitle="We'll personalise your meals to your goals." go={go} back={back} onContinue={()=>go("home")} ctaLabel="Complete Setup →" t={t}>
      {/* BMI */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1"><SetupField label="Height (cm)" placeholder="168" t={t} /></div>
        <div className="flex-1"><SetupField label="Weight (kg)" placeholder="62" t={t} /></div>
      </div>
      <div className="p-4 rounded-[20px] flex items-center gap-4 mb-5" style={{ background:B.green+"15", border:`1.5px solid ${B.green}30` }}>
        <ProgressRing pct={Math.min(100,(bmi/40)*100)} size={60} color={B.green} label={bmi.toString()} sub="BMI" strokeW={5} />
        <div>
          <p className="text-[15px] font-black" style={{ color:t.text }}>Normal Weight</p>
          <p className="text-[12px]" style={{ color:t.muted }}>Auto-calculated from height & weight</p>
        </div>
      </div>
      {/* Activity level */}
      <p className="text-[13px] font-black uppercase tracking-[0.1em] mb-3" style={{ color:t.muted }}>Activity Level</p>
      <div className="flex gap-2 flex-wrap mb-5">
        {activityLevels.map((a,i)=>(
          <SetupChip key={a} label={a} selected={activity===i} onToggle={()=>setActivity(i)} />
        ))}
      </div>
      {/* Goals */}
      <p className="text-[13px] font-black uppercase tracking-[0.1em] mb-3" style={{ color:t.muted }}>Goal</p>
      <div className="flex gap-2 flex-wrap mb-5">
        {goals.map((g,i)=>(
          <SetupChip key={g} label={g} selected={goal===i} onToggle={()=>setGoal(i)} />
        ))}
      </div>
      {/* Food preference */}
      <p className="text-[13px] font-black uppercase tracking-[0.1em] mb-3" style={{ color:t.muted }}>Food Preference</p>
      <div className="flex gap-2 flex-wrap mb-5">
        {foodPrefs.map((f,i)=>(
          <SetupChip key={f} label={f} selected={food===i} onToggle={()=>setFood(i)} />
        ))}
      </div>
      {/* Cuisine */}
      <p className="text-[13px] font-black uppercase tracking-[0.1em] mb-3" style={{ color:t.muted }}>Cuisine Preference</p>
      <div className="flex gap-2 flex-wrap mb-5">
        {cuisines.map((c,i)=>(
          <SetupChip key={c} label={c} selected={cuisine.includes(i)}
            onToggle={()=>setCuisine(prev=>prev.includes(i)?prev.filter(x=>x!==i):[...prev,i])} />
        ))}
      </div>
      {/* Allergies */}
      <SetupField label="Allergies (optional)" placeholder="e.g. Peanuts, Dairy, Gluten" t={t} />
      {/* Spice */}
      <div className="mb-2">
        <p className="text-[13px] font-black uppercase tracking-[0.1em] mb-3" style={{ color:t.muted }}>Spice Level</p>
        <div className="flex gap-2 flex-wrap">
          {spiceLevels.map((s,i)=>(
            <SetupChip key={s} label={s} selected={spice===i} onToggle={()=>setSpice(i)} color="#EF4444" />
          ))}
        </div>
      </div>
    </SetupShell>
  );
}

// ─── MEAL DETAIL ─────────────────────────────────────────────────────────────

function MealDetailScreen({ go, back, t }: { go:(s:Screen)=>void; back:()=>void; t:T }) {
  const meal = MEALS[0];
  const [rating, setRating] = useState(4);
  const ingredientSections = [
    { title:"Oils Used", items:["Groundnut Oil","Sunflower Oil","Cold Pressed Oil"], color:"#F59E0B" },
    { title:"Rice Variety", items:["Sona Masoori (single-polished)","Short grain aromatic"], color:B.orange },
    { title:"Vegetables", items:["Onion","Tomato","Green Chilli","Ginger","Garlic","Coriander"], color:B.green },
    { title:"Spices", items:["Cumin","Mustard Seeds","Turmeric","Coriander Powder","Garam Masala"], color:"#EC4899" },
    { title:"Dal Used", items:["Toor Dal (split pigeon peas)","No additives, no preservatives"], color:"#6366F1" },
  ];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      {/* Hero */}
      <div style={{ position:"relative", height:240, flexShrink:0 }}>
        <img src={meal.img} alt={meal.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.7) 100%)" }} />
        <motion.button whileTap={{ scale:0.9 }} onClick={back}
          style={{ position:"absolute", top:16, left:16, width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.92)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <ArrowLeft size={17} color="#111" />
        </motion.button>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"16px 20px" }}>
          <VegPill veg={meal.veg} />
          <h1 style={{ fontSize:22, fontWeight:900, color:"white", fontFamily:"'Plus Jakarta Sans',sans-serif", marginTop:8, lineHeight:1.2 }}>{meal.name}</h1>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
            <Clock size={12} color="rgba(255,255,255,0.8)" />
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.8)" }}>Prep 25 min · ☀️ Lunch · {meal.time}</span>
          </div>
        </div>
      </div>
      {/* Scroll content */}
      <div style={{ flex:1, minHeight:0, overflowY:"auto", scrollbarWidth:"none" } as any}>
        <div style={{ padding:"20px 20px 100px" }}>
          {/* Nutrition */}
          <FadeUp delay={0.04}>
            <div style={{ background:t.card, borderRadius:24, padding:20, marginBottom:16, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:11, fontWeight:900, color:t.muted, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:16 }}>Nutritional Info per serving</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:12 }}>
                {[{v:`${meal.cal}`,l:"Calories",c:B.orange},{v:`${meal.protein}g`,l:"Protein",c:"#6366F1"},{v:`${meal.carbs}g`,l:"Carbs",c:B.green}].map(n=>(
                  <div key={n.l} style={{ textAlign:"center", padding:"12px 0", borderRadius:16, background:n.c+"10" }}>
                    <p style={{ fontSize:20, fontWeight:900, color:n.c }}>{n.v}</p>
                    <p style={{ fontSize:10, color:t.muted, marginTop:2 }}>{n.l}</p>
                  </div>
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                {[{v:`${meal.fat}g`,l:"Fat"},{v:"6g",l:"Fiber"},{v:"380g",l:"Serving"}].map(n=>(
                  <div key={n.l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 12px", borderRadius:12, background:t.surface }}>
                    <span style={{ fontSize:11, color:t.muted }}>{n.l}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:t.text }}>{n.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          {/* Chef note */}
          <FadeUp delay={0.07}>
            <div style={{ background:`linear-gradient(135deg,${B.orangeL},${B.orangeM})`, borderRadius:24, padding:20, marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:14, background:B.orange, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <ChefHat size={20} color="white" />
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:900, color:"#1A1A1A" }}>Chef Amrita's Note</p>
                  <p style={{ fontSize:11, color:"#666" }}>Today's special tip</p>
                </div>
              </div>
              <p style={{ fontSize:13, color:"#4A4A4A", lineHeight:1.6, fontFamily:"'Inter',sans-serif" }}>
                "Our Dal Tadka is slow-cooked for 45 minutes to bring out natural flavours. We use only farm-fresh tomatoes and never add MSG or artificial colours. Best enjoyed within 30 minutes of delivery."
              </p>
            </div>
          </FadeUp>
          {/* Ingredients transparency */}
          <FadeUp delay={0.1}>
            <div style={{ background:t.card, borderRadius:24, padding:20, marginBottom:16, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:11, fontWeight:900, color:t.muted, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:16 }}>Complete Ingredient Transparency</p>
              {ingredientSections.map((sec,si)=>(
                <div key={sec.title} style={{ marginBottom:si<ingredientSections.length-1?16:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:sec.color }} />
                    <p style={{ fontSize:13, fontWeight:700, color:t.text }}>{sec.title}</p>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {sec.items.map(item=>(
                      <span key={item} style={{ fontSize:11, padding:"4px 10px", borderRadius:8, background:sec.color+"12", color:sec.color, fontWeight:600 }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          {/* Allergen + FSSAI */}
          <FadeUp delay={0.13}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
              <div style={{ background:t.card, borderRadius:20, padding:16, boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
                <AlertCircle size={18} color="#F59E0B" style={{ marginBottom:8 }} />
                <p style={{ fontSize:12, fontWeight:700, color:t.text, marginBottom:4 }}>Allergens</p>
                <p style={{ fontSize:11, color:t.muted, lineHeight:1.5 }}>Contains: Gluten, Dairy (ghee). Free from: nuts, soy.</p>
              </div>
              <div style={{ background:t.card, borderRadius:20, padding:16, boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
                <BadgeCheck size={18} color={B.green} style={{ marginBottom:8 }} />
                <p style={{ fontSize:12, fontWeight:700, color:t.text, marginBottom:4 }}>FSSAI</p>
                <p style={{ fontSize:11, color:t.muted, lineHeight:1.5 }}>Lic. 10024010004561 Valid thru Dec 2026</p>
              </div>
            </div>
          </FadeUp>
          {/* Hygiene badge */}
          <FadeUp delay={0.15}>
            <div style={{ background:`linear-gradient(135deg,${B.green}15,${B.green}06)`, borderRadius:20, padding:16, marginBottom:16, border:`1.5px solid ${B.green}30`, display:"flex", alignItems:"center", gap:12 }}>
              <ShieldCheck size={28} color={B.green} />
              <div>
                <p style={{ fontSize:13, fontWeight:900, color:t.text }}>Kitchen Hygiene: A+</p>
                <p style={{ fontSize:11, color:t.muted }}>Cleaned & sanitised daily. Last inspection: 8 Jul 2026.</p>
              </div>
            </div>
          </FadeUp>
          {/* Reviews */}
          <FadeUp delay={0.17}>
            <div style={{ background:t.card, borderRadius:24, padding:20, marginBottom:16, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <p style={{ fontSize:11, fontWeight:900, color:t.muted, textTransform:"uppercase", letterSpacing:"0.12em" }}>Reviews</p>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <Star size={13} fill={B.orange} color={B.orange} />
                  <span style={{ fontSize:13, fontWeight:700, color:t.text }}>4.8</span>
                  <span style={{ fontSize:11, color:t.muted }}>(124)</span>
                </div>
              </div>
              <div style={{ marginBottom:12 }}>
                <p style={{ fontSize:11, color:t.muted, marginBottom:6 }}>Your rating</p>
                <Stars val={rating} onChange={setRating} />
              </div>
              {[{n:"Priya K.",r:5,c:"Exactly like home! The dal was perfectly spiced.",d:"2 days ago"},{n:"Rohit M.",r:4,c:"Fresh and healthy. Delivery was on time.",d:"4 days ago"}].map((rv,i,a)=>(
                <div key={rv.n} style={{ paddingTop:12, borderTop:`1px solid ${t.border}`, marginTop:i===0?8:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <div style={{ width:30, height:30, borderRadius:10, background:B.orange, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color:"white" }}>{rv.n[0]}</div>
                    <div>
                      <p style={{ fontSize:13, fontWeight:700, color:t.text }}>{rv.n}</p>
                      <Stars val={rv.r} />
                    </div>
                    <span style={{ marginLeft:"auto", fontSize:10, color:t.muted }}>{rv.d}</span>
                  </div>
                  <p style={{ fontSize:12, color:t.sub, lineHeight:1.5 }}>{rv.c}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
      {/* Subscribe CTA */}
      <div style={{ padding:"12px 20px 24px", flexShrink:0, background:t.bg, borderTop:`1px solid ${t.border}` }}>
        <OrangeBtn label="Subscribe to this Meal" onClick={()=>go("subscribe_flow")} icon={<Package size={17} />} />
      </div>
    </div>
  );
}

// ─── SUBSCRIBE FLOW ───────────────────────────────────────────────────────────

function SubscribeFlow({ go, back, t }: { go:(s:Screen)=>void; back:()=>void; t:T }) {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState(1);
  const [mealType, setMealType] = useState(2);
  const [days, setDays] = useState([0,1,2,3,4]);
  const [time, setTime] = useState("12:30 PM");
  const planOpts = [
    { label:"Daily", price:"₹180/day", sub:"Pay per day", color:"#4A4A4A" },
    { label:"Weekly", price:"₹1,099/wk", sub:"Save 13%", color:B.orange, badge:"POPULAR" },
    { label:"Monthly", price:"₹3,999/mo", sub:"Save 26%", color:"#6366F1", badge:"BEST VALUE" },
    { label:"Custom", price:"Choose days", sub:"Your schedule", color:"#EC4899" },
  ];
  const mealOpts = ["☀️ Lunch Only","🌙 Dinner Only","☀️🌙 Lunch + Dinner"];
  const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const times = ["12:00 PM","12:30 PM","1:00 PM","7:00 PM","7:30 PM","8:00 PM"];

  const steps = ["Plan","Days","Time","Confirm","Payment","Done"];
  return (
    <div style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column", background:t.bg }}>
      <BackBar title="Subscribe" onBack={step===0?back:()=>setStep(s=>s-1)} t={t} />
      {/* Mini progress */}
      <div style={{ padding:"0 20px 12px", flexShrink:0 }}>
        <div style={{ display:"flex", gap:4 }}>
          {steps.map((_,i)=>(
            <div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<=step?B.orange:t.surface }} />
          ))}
        </div>
        <p style={{ fontSize:11, color:t.muted, marginTop:6 }}>Step {step+1} of {steps.length}</p>
      </div>
      <div style={{ flex:1, minHeight:0, overflowY:"auto", padding:"0 20px 20px", scrollbarWidth:"none" } as any}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }} transition={{ duration:0.22 }}>
            {step===0 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Choose Meal Type</h2>
                <p style={{ fontSize:13, color:t.muted, marginBottom:20 }}>What would you like delivered?</p>
                {mealOpts.map((m,i)=>(
                  <motion.button key={m} whileTap={{ scale:0.98 }} onClick={()=>setMealType(i)}
                    style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 20px", borderRadius:20, marginBottom:10, border:`2px solid ${mealType===i?B.orange:t.border}`, background:mealType===i?B.orangeL:t.card, cursor:"pointer", textAlign:"left" }}>
                    <span style={{ fontSize:16, fontWeight:700, color:t.text }}>{m}</span>
                    {mealType===i && <Check size={18} color={B.orange} />}
                  </motion.button>
                ))}
                <h2 style={{ fontSize:18, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", margin:"20px 0 12px" }}>Choose Plan</h2>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {planOpts.map((p,i)=>(
                    <motion.button key={p.label} whileTap={{ scale:0.97 }} onClick={()=>setPlan(i)}
                      style={{ padding:16, borderRadius:20, border:`2px solid ${plan===i?p.color:t.border}`, background:plan===i?p.color+"12":t.card, textAlign:"left", cursor:"pointer", position:"relative" }}>
                      {p.badge && <span style={{ fontSize:8, fontWeight:900, background:p.color, color:"white", padding:"2px 6px", borderRadius:6, position:"absolute", top:-8, left:10 }}>{p.badge}</span>}
                      <p style={{ fontSize:15, fontWeight:900, color:plan===i?p.color:t.text, marginTop:4 }}>{p.label}</p>
                      <p style={{ fontSize:13, fontWeight:700, color:p.color, marginTop:2 }}>{p.price}</p>
                      <p style={{ fontSize:10, color:t.muted }}>{p.sub}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            {step===1 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Delivery Days</h2>
                <p style={{ fontSize:13, color:t.muted, marginBottom:20 }}>Select which days you want delivery</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20 }}>
                  {dayNames.map((d,i)=>(
                    <motion.button key={d} whileTap={{ scale:0.93 }} onClick={()=>setDays(prev=>prev.includes(i)?prev.filter(x=>x!==i):[...prev,i].sort())}
                      style={{ width:60, height:60, borderRadius:18, border:`2px solid ${days.includes(i)?B.orange:t.border}`, background:days.includes(i)?B.orangeL:t.card, fontWeight:700, fontSize:13, color:days.includes(i)?B.orange:t.muted, cursor:"pointer" }}>
                      {d}
                    </motion.button>
                  ))}
                </div>
                <p style={{ fontSize:12, color:t.muted }}>{days.length} day{days.length!==1?"s":""} selected per week</p>
              </div>
            )}
            {step===2 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Delivery Time</h2>
                <p style={{ fontSize:13, color:t.muted, marginBottom:20 }}>When should we deliver?</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                  {times.map(tm=>(
                    <motion.button key={tm} whileTap={{ scale:0.95 }} onClick={()=>setTime(tm)}
                      style={{ padding:"12px 20px", borderRadius:16, border:`2px solid ${time===tm?B.orange:t.border}`, background:time===tm?B.orangeL:t.card, fontWeight:700, fontSize:14, color:time===tm?B.orange:t.text, cursor:"pointer" }}>
                      {tm}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            {step===3 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16 }}>Summary</h2>
                {[["Meal Type",mealOpts[mealType]],["Plan",planOpts[plan].label],["Price",planOpts[plan].price],["Days",`${days.length} days/week`],["Time",time],["Delivery","Koramangala, Bengaluru"]].map(([k,v])=>(
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"14px 0", borderBottom:`1px solid ${t.border}` }}>
                    <span style={{ fontSize:13, color:t.muted }}>{k}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:t.text }}>{v}</span>
                  </div>
                ))}
                <div style={{ background:`linear-gradient(135deg,${B.orange},#C25E00)`, borderRadius:20, padding:20, marginTop:20, textAlign:"center" }}>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.7)", fontWeight:600 }}>{planOpts[plan].label} Plan Total</p>
                  <p style={{ fontSize:32, fontWeight:900, color:"white", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{planOpts[plan].price}</p>
                </div>
              </div>
            )}
            {step===4 && (
              <div>
                <h2 style={{ fontSize:22, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Payment</h2>
                <p style={{ fontSize:13, color:t.muted, marginBottom:20 }}>Choose your payment method</p>
                {[{label:"UPI / GPay / PhonePe",icon:<Zap size={18} color="#6366F1"/>},{label:"Credit / Debit Card",icon:<CreditCard size={18} color={B.orange}/>},{label:"Net Banking",icon:<Building2 size={18} color="#0EA5E9"/>},{label:"KOI KOI Wallet",icon:<Wallet size={18} color={B.green}/>}].map((pm,i)=>(
                  <motion.button key={pm.label} whileTap={{ scale:0.98 }} onClick={()=>setStep(5)}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:14, padding:"16px 18px", borderRadius:18, border:`1.5px solid ${t.border}`, background:t.card, marginBottom:10, cursor:"pointer" }}>
                    <div style={{ width:40, height:40, borderRadius:14, background:t.surface, display:"flex", alignItems:"center", justifyContent:"center" }}>{pm.icon}</div>
                    <span style={{ fontSize:14, fontWeight:600, color:t.text, flex:1, textAlign:"left" }}>{pm.label}</span>
                    <ChevronRight size={15} color={t.muted} />
                  </motion.button>
                ))}
              </div>
            )}
            {step===5 && (
              <div style={{ textAlign:"center", paddingTop:20 }}>
                <div style={{ display:"flex", justifyContent:"center", marginBottom:20 }}>
                  <SuccessCheck size={80} color={B.green} />
                </div>
                <h2 style={{ fontSize:26, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Subscribed! 🎉</h2>
                <p style={{ fontSize:14, color:t.muted, marginBottom:24, lineHeight:1.6 }}>Your {planOpts[plan].label} plan is active. First delivery tomorrow at {time}.</p>
                <OrangeBtn label="Go to Dashboard" onClick={()=>go("home")} />
                <button onClick={()=>go("meals")} style={{ display:"block", width:"100%", marginTop:12, padding:"14px 0", fontSize:13, fontWeight:600, color:t.muted, background:"none", border:"none", cursor:"pointer" }}>Browse Meals</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {step < 5 && (
        <div style={{ padding:"12px 20px 24px", flexShrink:0, background:t.bg, borderTop:`1px solid ${t.border}` }}>
          <OrangeBtn label={step===4?"Pay Now":step===3?"Proceed to Pay":"Continue"} onClick={()=>setStep(s=>s+1)} />
        </div>
      )}
    </div>
  );
}

// ─── KITCHEN ──────────────────────────────────────────────────────────────────

function KitchenScreen({ go, t }: { go:(s:Screen)=>void; t:T }) {
  const [liveOn, setLiveOn] = useState(true);
  const [bookOpen, setBookOpen] = useState(false);
  const [bookDate, setBookDate] = useState("");
  const [bookSent, setBookSent] = useState(false);

  const certs = [
    { label:"FSSAI Licensed", num:"10024010004561", icon:<BadgeCheck size={16} color={B.green}/> },
    { label:"A+ Hygiene Rating", num:"Last audit: Jul 2026", icon:<ShieldCheck size={16} color="#3B82F6"/> },
    { label:"ISO 22000", num:"Food Safety Certified", icon:<Award size={16} color="#8B5CF6"/> },
  ];
  const process = [
    { label:"Ingredients sourced", time:"5 AM", icon:<Leaf size={15} color={B.green}/>, done:true },
    { label:"Kitchen prep begins", time:"6 AM", icon:<Thermometer size={15} color={B.orange}/>, done:true },
    { label:"Cooking in progress", time:"9 AM", icon:<Flame size={15} color="#EF4444"/>, active:true },
    { label:"Quality check", time:"11 AM", icon:<BadgeCheck size={15} color="#6366F1"/>, done:false },
    { label:"Packaging", time:"11:30 AM", icon:<Package size={15} color="#0EA5E9"/>, done:false },
    { label:"Delivery begins", time:"12 PM", icon:<Bike size={15} color="#F59E0B"/>, done:false },
  ];

  return (
    <WithNav tab="kitchen" go={go} t={t}>
      <OrgBlob x={-40} y={-20} size={200} color={B.orange} opacity={0.05} blur={40} />
      {/* Header */}
      <div style={{ padding:"24px 20px 8px", position:"relative", zIndex:1 }}>
        <FadeUp delay={0}>
          <p style={{ fontSize:11, fontWeight:900, color:B.orange, textTransform:"uppercase", letterSpacing:"0.15em" }}>Our Kitchen</p>
          <h1 style={{ fontSize:28, fontWeight:900, color:t.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>The Heart of KOI KOI</h1>
          <p style={{ fontSize:13, color:t.muted, marginTop:4 }}>Watch your food being prepared live, meet the chef, and book a visit.</p>
        </FadeUp>
      </div>

      {/* Live Camera */}
      <div style={{ padding:"12px 20px" }}>
        <FadeUp delay={0.06}>
          <div style={{ borderRadius:24, overflow:"hidden", position:"relative", marginBottom:4 }}>
            {/* Mock camera feed */}
            <div style={{ height:200, background:"linear-gradient(135deg,#1A0A00 0%,#2D1500 50%,#1A0A00 100%)", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(45deg,rgba(255,165,0,0.03) 0,rgba(255,165,0,0.03) 1px,transparent 1px,transparent 20px)" }} />
              {liveOn ? (
                <div style={{ textAlign:"center" }}>
                  <motion.div animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity }}>
                    <Flame size={40} color={B.orange} />
                  </motion.div>
                  <p style={{ color:"rgba(255,255,255,0.6)", fontSize:12, marginTop:8 }}>Live from the kitchen</p>
                </div>
              ) : (
                <div style={{ textAlign:"center" }}>
                  <Camera size={32} color="rgba(255,255,255,0.3)" />
                  <p style={{ color:"rgba(255,255,255,0.3)", fontSize:12, marginTop:8 }}>Camera off</p>
                </div>
              )}
              {/* Badges */}
              <div style={{ position:"absolute", top:12, left:12, display:"flex", gap:8 }}>
                {liveOn && (
                  <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(239,68,68,0.9)", borderRadius:8, padding:"4px 10px" }}>
                    <PulsingDot color="white" size={7} />
                    <span style={{ fontSize:10, fontWeight:900, color:"white" }}>LIVE</span>
                  </div>
                )}
                <div style={{ background:"rgba(0,0,0,0.6)", borderRadius:8, padding:"4px 10px" }}>
                  <span style={{ fontSize:9, color:"rgba(255,255,255,0.8)" }}>Kitchen Cam 1</span>
                </div>
              </div>
              <motion.button whileTap={{ scale:0.9 }} onClick={()=>setLiveOn(!liveOn)}
                style={{ position:"absolute", top:12, right:12, width:36, height:36, borderRadius:10, background:liveOn?"rgba(239,68,68,0.9)":"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", border:"none", cursor:"pointer" }}>
                {liveOn?<Video size={15} color="white"/>:<Camera size={15} color="white"/>}
              </motion.button>
            </div>
            {/* Camera info strip */}
            <div style={{ background:t.card, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:t.text }}>Live Kitchen Feed</p>
                <p style={{ fontSize:11, color:t.muted }}>Working hours: 5 AM – 2 PM</p>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {["Cam 1","Cam 2","Cam 3"].map((c,i)=>(
                  <button key={c} style={{ fontSize:9, fontWeight:700, padding:"4px 8px", borderRadius:8, background:i===0?B.orange:t.surface, color:i===0?"white":t.muted, border:"none", cursor:"pointer" }}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Cooking Process Timeline */}
      <div style={{ padding:"0 20px 4px" }}>
        <FadeUp delay={0.09}>
          <div style={{ background:t.card, borderRadius:24, padding:20, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize:11, fontWeight:900, color:t.muted, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:16 }}>Today's Cooking Schedule</p>
            {process.map((p,i)=>(
              <div key={p.label} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:i<process.length-1?14:0 }}>
                <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:32, height:32, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", background:p.done?B.green+"20":p.active?B.orange+"20":t.surface }}>
                    {p.icon}
                  </div>
                  {i<process.length-1 && <div style={{ width:2, height:14, background:p.done?B.green:t.border, marginTop:4 }} />}
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:p.active?B.orange:p.done?t.sub:t.muted }}>{p.label}</p>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  {p.active && <PulsingDot color={B.orange} size={7} />}
                  <span style={{ fontSize:11, fontWeight:600, color:p.active?B.orange:t.muted }}>{p.time}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Meet the Chef */}
      <div style={{ padding:"12px 20px 4px" }}>
        <FadeUp delay={0.12}>
          <div style={{ background:`linear-gradient(135deg,${B.orangeL},${B.orangeM})`, borderRadius:24, padding:20, position:"relative", overflow:"hidden" }}>
            <OrgBlob x="65%" y={-20} size={120} color={B.orange} opacity={0.12} blur={20} />
            <div style={{ display:"flex", gap:14, alignItems:"center", position:"relative", zIndex:1 }}>
              <div style={{ width:64, height:64, borderRadius:20, background:B.orange, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:`0 8px 24px ${B.orange}45` }}>
                <ChefHat size={32} color="white" />
              </div>
              <div>
                <p style={{ fontSize:10, fontWeight:900, color:B.orange, textTransform:"uppercase", letterSpacing:"0.1em" }}>Head Chef</p>
                <p style={{ fontSize:18, fontWeight:900, color:"#1A1A1A", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Amrita Reddy</p>
                <p style={{ fontSize:12, color:"#666" }}>12 years · Hyderabad & Bengaluru</p>
                <div style={{ display:"flex", gap:12, marginTop:6 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:B.orange }}>★ 4.9</span>
                  <span style={{ fontSize:11, color:"#666" }}>South Indian Specialist</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize:12, color:"#4A4A4A", marginTop:14, lineHeight:1.6, fontFamily:"'Inter',sans-serif", position:"relative", zIndex:1 }}>
              "I cook every meal like it's for my own family. No shortcuts, no MSG — only honest, home-style cooking with the best local ingredients."
            </p>
          </div>
        </FadeUp>
      </div>

      {/* Certifications */}
      <div style={{ padding:"12px 20px 4px" }}>
        <FadeUp delay={0.14}>
          <div style={{ background:t.card, borderRadius:24, padding:20, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize:11, fontWeight:900, color:t.muted, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:14 }}>Certifications & Hygiene</p>
            {certs.map((c,i,a)=>(
              <div key={c.label} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:i<a.length-1?`1px solid ${t.border}`:"none" }}>
                <div style={{ width:36, height:36, borderRadius:12, background:t.surface, display:"flex", alignItems:"center", justifyContent:"center" }}>{c.icon}</div>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:t.text }}>{c.label}</p>
                  <p style={{ fontSize:11, color:t.muted }}>{c.num}</p>
                </div>
                <Check size={14} color={B.green} style={{ marginLeft:"auto" }} />
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Daily Cleaning Status */}
      <div style={{ padding:"12px 20px 4px" }}>
        <FadeUp delay={0.16}>
          <div style={{ background:B.green+"12", borderRadius:24, padding:20, border:`1.5px solid ${B.green}30` }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <ShieldCheck size={22} color={B.green} />
              <p style={{ fontSize:14, fontWeight:900, color:t.text }}>Daily Cleaning Log</p>
              <span style={{ marginLeft:"auto", fontSize:10, fontWeight:900, background:B.green, color:"white", padding:"2px 8px", borderRadius:6 }}>TODAY ✓</span>
            </div>
            {["Floor & surfaces sanitised","Equipment deep-cleaned","Pest control inspection","Cold storage checked","Team health screening"].map((item,i)=>(
              <div key={item} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:i<4?8:0 }}>
                <Check size={12} color={B.green} />
                <span style={{ fontSize:12, color:t.sub }}>{item}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Book a Kitchen Visit */}
      <div style={{ padding:"12px 20px 8px" }}>
        <FadeUp delay={0.18}>
          {!bookOpen && !bookSent ? (
            <motion.button whileTap={{ scale:0.98 }} onClick={()=>setBookOpen(true)}
              style={{ width:"100%", borderRadius:24, padding:20, background:`linear-gradient(135deg,#0F2027,#203A43,#2C5364)`, border:"none", cursor:"pointer", textAlign:"left", position:"relative", overflow:"hidden" }}>
              <OrgBlob x="65%" y={-20} size={120} color="#60A5FA" opacity={0.12} blur={20} />
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, position:"relative", zIndex:1 }}>
                <div style={{ width:44, height:44, borderRadius:14, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Users size={22} color="white" />
                </div>
                <div>
                  <p style={{ fontSize:11, fontWeight:900, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Open Invitation</p>
                  <p style={{ fontSize:18, fontWeight:900, color:"white", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Visit Our Kitchen</p>
                </div>
              </div>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.65)", lineHeight:1.6, position:"relative", zIndex:1 }}>See exactly how your food is made. Book a free kitchen tour and meet the chef in person.</p>
              <div style={{ display:"flex", gap:8, marginTop:14, position:"relative", zIndex:1 }}>
                <span style={{ fontSize:11, fontWeight:700, background:"rgba(255,255,255,0.15)", color:"white", padding:"6px 14px", borderRadius:10 }}>Book a Tour →</span>
              </div>
            </motion.button>
          ) : bookSent ? (
            <div style={{ background:t.card, borderRadius:24, padding:24, textAlign:"center", boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
              <SuccessCheck size={60} color={B.green} />
              <p style={{ fontSize:18, fontWeight:900, color:t.text, marginTop:12 }}>Visit Booked!</p>
              <p style={{ fontSize:13, color:t.muted, marginTop:4 }}>We'll confirm via WhatsApp within 24 hours.</p>
            </div>
          ) : (
            <div style={{ background:t.card, borderRadius:24, padding:20, boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:16, fontWeight:900, color:t.text, marginBottom:16 }}>Book a Kitchen Visit</p>
              {[{l:"Preferred Date",p:"e.g. 15 Aug 2026"},{l:"Preferred Time",p:"e.g. 10:00 AM"},{l:"Number of Visitors",p:"e.g. 2"},{l:"Your Name",p:"Full name"},{l:"Contact Number",p:"+91 ..."},{l:"Purpose",p:"e.g. Curiosity / Inspection / Media"}].map(f=>(
                <div key={f.l} style={{ marginBottom:12 }}>
                  <p style={{ fontSize:11, fontWeight:900, color:t.muted, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{f.l}</p>
                  <input placeholder={f.p} style={{ width:"100%", padding:"12px 16px", borderRadius:14, border:`1.5px solid ${t.border}`, background:t.input, color:t.text, fontSize:14, outline:"none", boxSizing:"border-box" }} />
                </div>
              ))}
              <div style={{ display:"flex", gap:10, marginTop:16 }}>
                <button onClick={()=>setBookOpen(false)} style={{ flex:1, padding:"14px 0", borderRadius:16, border:`1.5px solid ${t.border}`, background:"none", color:t.muted, fontWeight:700, cursor:"pointer" }}>Cancel</button>
                <motion.button whileTap={{ scale:0.97 }} onClick={()=>setBookSent(true)} style={{ flex:2, padding:"14px 0", borderRadius:16, border:"none", background:B.orange, color:"white", fontWeight:900, cursor:"pointer", boxShadow:`0 6px 20px ${B.orange}40` }}>Confirm Booking</motion.button>
              </div>
            </div>
          )}
        </FadeUp>
      </div>
    </WithNav>
  );
}

// ─── OLD SETUP 4 placeholder kept for router (removes from type) ───────────────

// Step 4 — Subscription Preference (REMOVED — kept as dead code boundary)

// ─── Screen Router ────────────────────────────────────────────────────────────

function ScreenContent({ screen, go, back, t, theme, setTheme, paused, setPaused }: {
  screen:Screen; go:(s:Screen)=>void; back:()=>void;
  t:T; theme:AppTheme; setTheme:(v:AppTheme)=>void;
  paused:boolean; setPaused:(v:boolean)=>void;
}) {
  const map: Record<Screen,React.ReactNode> = {
    splash:<Splash go={go} />,
    ob1:<OB go={go} step={0} Ill={IllDelivery} head="Healthy Home-Style Meals" body="Freshly prepared lunch and dinner cooked every day — delivered warm to your doorstep." cta="Get Started" />,
    ob2:<OB go={go} step={1} Ill={IllDabba} head="Fresh Food. Steel Dabbas." body="Hygienic meals in reusable steel containers. Zero plastic, maximum freshness, right on time every day." cta="Continue" />,
    ob3:<OB go={go} step={2} Ill={IllFamily} head="Subscribe Once. Eat Every Day." body="Choose your plan and relax. Pause, skip or resume anytime — complete flexibility, zero stress." cta="Let's Begin" />,
    auth:<Auth go={go} t={t} />,
    setup1:<Setup1 go={go} back={back} t={t} />,
    setup2:<Setup2 go={go} back={back} t={t} />,
    setup3:<Setup3 go={go} back={back} t={t} />,
    home:<HomeScreen go={go} t={t} paused={paused} setPaused={setPaused} />,
    meals:<Meals go={go} t={t} />,
    kitchen:<KitchenScreen go={go} t={t} />,
    wallet:<WalletScreen go={go} t={t} />,
    profile:<ProfileScreen go={go} t={t} />,
    meal_detail:<MealDetailScreen go={go} back={back} t={t} />,
    subscribe_flow:<SubscribeFlow go={go} back={back} t={t} />,
    notifications:<Notifications back={back} t={t} />,
    tracking:<Tracking back={back} t={t} />,
    offers:<Offers back={back} t={t} />,
    rewards:<Rewards back={back} t={t} />,
    appearance:<Appearance back={back} t={t} theme={theme} setTheme={setTheme} />,
    support:<Support back={back} t={t} />,
    addresses:<Addresses back={back} t={t} />,
    payments:<Payments back={back} t={t} />,
    personal:<Personal back={back} t={t} />,
    refer:<Refer back={back} t={t} />,
    plans:<Plans go={go} t={t} />,
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div key={screen} style={{ flex:1, minHeight:0, display:"flex", flexDirection:"column" }}
        initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
        transition={{ duration:0.2, ease:[0.25,0.1,0.25,1] }}>
        {map[screen]}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Phone Frame ─────────────────────────────────────────────────────────────

function PhoneFrame({ ios, screen, go, back, t, theme, setTheme, paused, setPaused }: any) {
  const cfg = ios
    ? { w:314, h:664, br:52, inner:49, sbH:44, sbBg:"#1C1C1E", shell:"0 32px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)" }
    : { w:314, h:664, br:44, inner:41, sbH:40, sbBg:"#0F0F0F", shell:"0 32px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" };
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background:ios?"#888":"#444" }} />
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:"#6B7280" }}>
          {ios?"iOS · iPhone 16 Pro":"Android · Pixel 9 Pro"}
        </p>
      </div>
      <div style={{ width:cfg.w, height:cfg.h, background:cfg.sbBg, borderRadius:cfg.br, padding:3, boxShadow:cfg.shell }}>
        <div style={{ height:"100%", borderRadius:cfg.inner, background:t.bg, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          {/* Status bar */}
          <div style={{ height:cfg.sbH, background:"transparent", display:"flex", alignItems:"center", justifyContent:"space-between", padding:ios?"8px 20px 0":"6px 16px 0", flexShrink:0, position:"relative", zIndex:20 }}>
            <span style={{ fontSize:11, fontWeight:700, color:t.text, fontFamily:ios?"'Plus Jakarta Sans',sans-serif":"'Roboto',sans-serif" }}>9:41</span>
            {ios
              ? <div style={{ position:"absolute", left:"50%", transform:"translateX(-50%)", top:8, width:100, height:30, borderRadius:15, background:"#000" }} />
              : <div style={{ position:"absolute", left:"50%", transform:"translateX(-50%)", top:8, width:14, height:14, borderRadius:"50%", background:"#000" }} />}
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              {ios
                ? <div style={{ width:22,height:11,borderRadius:3,border:`1.5px solid ${t.muted}`,padding:1,opacity:0.75 }}>
                    <div style={{ height:"100%",borderRadius:2,width:"75%",background:B.green }} />
                  </div>
                : <span style={{ fontSize:9,color:t.muted,opacity:0.8 }}>●●▲</span>}
            </div>
          </div>
          {/* Content */}
          <div style={{ flex:1, minHeight:0, overflow:"hidden", display:"flex", flexDirection:"column", fontFamily:ios?"'Inter','SF Pro Display',sans-serif":"'Roboto',sans-serif", position:"relative" }}>
            <ScreenContent screen={screen} go={go} back={back} t={t} theme={theme} setTheme={setTheme} paused={paused} setPaused={setPaused} />
          </div>
          {/* Bottom chrome */}
          {ios
            ? <div style={{ display:"flex",justifyContent:"center",padding:"5px 0 8px",background:t.nav,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",flexShrink:0 }}>
                <div style={{ width:120,height:4,borderRadius:2,background:t.muted,opacity:0.25 }} />
              </div>
            : <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:28,padding:"7px 0",background:t.nav,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",flexShrink:0 }}>
                {["◀","⬤","■"].map(s=><span key={s} style={{ fontSize:11,opacity:0.22,color:t.text }}>{s}</span>)}
              </div>}
        </div>
      </div>
    </div>
  );
}

// ─── Nav Groups ───────────────────────────────────────────────────────────────

const GROUPS = [
  { label:"Flow", screens:["splash","ob1","ob2","ob3","auth"] as Screen[] },
  { label:"Setup", screens:["setup1","setup2","setup3"] as Screen[] },
  { label:"Main", screens:["home","meals","kitchen","wallet","profile"] as Screen[] },
  { label:"Meals", screens:["meal_detail","subscribe_flow"] as Screen[] },
  { label:"Sections", screens:["notifications","tracking","offers","rewards"] as Screen[] },
  { label:"Profile", screens:["appearance","support","addresses","payments","personal","refer"] as Screen[] },
];
const LABELS: Partial<Record<Screen,string>> = {
  splash:"Splash",ob1:"OB 1",ob2:"OB 2",ob3:"OB 3",auth:"Login",
  setup1:"Profile",setup2:"Location",setup3:"Health",
  home:"Home",meals:"Meals",kitchen:"Kitchen",wallet:"Wallet",profile:"Profile",
  meal_detail:"Meal",subscribe_flow:"Subscribe",
  notifications:"Notifs",tracking:"Track",offers:"Offers",rewards:"Rewards",
  appearance:"Theme",support:"Support",addresses:"Address",payments:"Payments",personal:"Info",refer:"Refer",
  plans:"Plans",
};
const ALL = GROUPS.flatMap(g=>g.screens);

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [history, setHistory] = useState<Screen[]>(["splash"]);
  const [appTheme, setAppTheme] = useState<AppTheme>("light");
  const [platform, setPlatform] = useState<"both"|"ios"|"android">("both");
  const [paused, setPaused] = useState(false);

  const screen = history[history.length-1];
  const go = (s:Screen)=>setHistory(h=>[...h,s]);
  const back = ()=>setHistory(h=>h.length>1?h.slice(0,-1):h);
  const jump = (s:Screen)=>setHistory([s]);

  const isDark = appTheme==="dark";
  const t = isDark ? DARK : LIGHT;

  return (
    <div className="min-h-screen" style={{ background:isDark?"#050505":"#EDE8DF", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      {/* Showcase Header */}
      <div className="sticky top-0 z-30 border-b"
        style={{ background:isDark?"rgba(5,5,5,0.96)":"rgba(237,232,223,0.96)", backdropFilter:"blur(20px)", borderColor:isDark?"#1C1C1C":"#D9D0C2" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[14px] flex items-center justify-center" style={{ background:B.orange }}>
              <Package size={18} color="white" />
            </div>
            <div>
              <p className="text-[8px] font-black tracking-[0.35em] uppercase" style={{ color:B.orange }}>KOI KOI</p>
              <p className="text-[14px] font-black leading-none" style={{ color:isDark?"#F5F5F5":"#1A1A1A" }}>DABBA</p>
            </div>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-[16px]" style={{ background:isDark?"#1C1C1C":"rgba(255,255,255,0.6)" }}>
            {(["both","ios","android"] as const).map(p=>(
              <motion.button key={p} onClick={()=>setPlatform(p)} whileTap={{ scale:0.94 }}
                className="px-3 py-1.5 rounded-[12px] text-[11px] font-bold transition-all"
                style={{ background:platform===p?B.orange:"transparent", color:platform===p?"white":isDark?"#555":"#888" }}>
                {p==="both"?"Both":p==="ios"?"iOS":"Android"}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale:0.9 }} onClick={()=>setAppTheme(isDark?"light":"dark")}
              className="w-9 h-9 rounded-[12px] flex items-center justify-center"
              style={{ background:isDark?"#1C1C1C":"rgba(255,255,255,0.7)" }}>
              {isDark?<Sun size={16} color="#F59E0B"/>:<Moon size={16} color="#6366F1"/>}
            </motion.button>
            <p className="text-[10px] font-semibold hidden sm:block" style={{ color:isDark?"#444":"#999" }}>
              v4.0 · {ALL.length} screens
            </p>
          </div>
        </div>
      </div>

      {/* Screen Nav */}
      <div className="overflow-x-auto border-b" style={{ background:isDark?"rgba(5,5,5,0.7)":"rgba(237,232,223,0.7)", borderColor:isDark?"#1C1C1C":"#D9D0C2" }}>
        <div className="flex items-center px-4 py-2 min-w-max gap-0">
          {GROUPS.map((grp,gi)=>(
            <div key={grp.label} className="flex items-center">
              {gi>0&&<div className="w-px h-4 mx-3" style={{ background:isDark?"#1C1C1C":"#D9D0C2" }} />}
              <div className="flex items-center gap-0.5">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] mr-1.5 pl-1" style={{ color:isDark?"#2A2A2A":"#AAA099" }}>{grp.label}</span>
                {grp.screens.map(s=>(
                  <button key={s} onClick={()=>jump(s)}
                    className="px-2.5 py-1.5 rounded-[10px] text-[10px] font-bold whitespace-nowrap"
                    style={{ background:screen===s?B.orange:"transparent", color:screen===s?"white":isDark?"#555":"#888" }}>
                    {LABELS[s]||s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phones */}
      <div className="py-12 px-4">
        <div className="flex justify-center gap-8 flex-wrap">
          {(platform==="both"||platform==="ios") && (
            <PhoneFrame ios screen={screen} go={go} back={back} t={t} theme={appTheme} setTheme={(v:AppTheme)=>setAppTheme(v)} paused={paused} setPaused={setPaused} />
          )}
          {(platform==="both"||platform==="android") && (
            <PhoneFrame ios={false} screen={screen} go={go} back={back} t={t} theme={appTheme} setTheme={(v:AppTheme)=>setAppTheme(v)} paused={paused} setPaused={setPaused} />
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <motion.button whileTap={{ scale:0.92 }} onClick={back}
            className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm"
            style={{ borderColor:history.length<=1?(isDark?"#1C1C1C":"#D9D0C2"):B.orange, color:history.length<=1?(isDark?"#333":"#CCC"):B.orange, opacity:history.length<=1?0.4:1 }}>←</motion.button>
          <div className="flex gap-1.5 flex-wrap justify-center max-w-sm">
            {ALL.map(s=>(
              <motion.button key={s} onClick={()=>jump(s)}
                animate={{ width:screen===s?18:5, opacity:screen===s?1:0.2 }}
                transition={{ type:"spring", stiffness:400, damping:30 }}
                className="h-1.5 rounded-full" style={{ background:B.orange }} />
            ))}
          </div>
          <motion.button whileTap={{ scale:0.92 }}
            onClick={()=>{ const i=ALL.indexOf(screen); if(i<ALL.length-1) go(ALL[i+1]); }}
            className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm"
            style={{ borderColor:ALL.indexOf(screen)>=ALL.length-1?(isDark?"#1C1C1C":"#D9D0C2"):B.orange, color:ALL.indexOf(screen)>=ALL.length-1?(isDark?"#333":"#CCC"):B.orange, opacity:ALL.indexOf(screen)>=ALL.length-1?0.4:1 }}>→</motion.button>
        </div>
        <p className="text-center text-[11px] mt-3" style={{ color:isDark?"#2A2A2A":"#AAA099" }}>
          {ALL.length} screens · Click inside phones to navigate · Toggle {isDark?"☀️":"🌙"} to switch theme
        </p>
      </div>

      {/* Design tokens */}
      <div className="border-t py-16 px-8 max-w-5xl mx-auto" style={{ borderColor:isDark?"#1C1C1C":"#D9D0C2" }}>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-1" style={{ color:B.orange }}>Design System</p>
        <h2 className="text-[30px] font-black mb-8" style={{ color:isDark?"#F5F5F5":"#1A1A1A", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>KOI KOI DABBA · v4.0</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
          {[{n:"Orange",h:"#E67E22",bg:"#E67E22"},{n:"Cream",h:"#FAFAF8",bg:"#FAFAF8"},{n:"Green",h:"#22C55E",bg:"#22C55E"},{n:"Dark",h:"#1A1A1A",bg:"#1A1A1A"},{n:"Muted",h:"#999999",bg:"#999999"},{n:"Deep Dark",h:"#0E0E0E",bg:"#0E0E0E"}].map(c=>(
            <div key={c.n}>
              <div className="h-14 rounded-[18px] mb-2" style={{ background:c.bg, border:c.h==="#FAFAF8"?"1.5px solid #E5E0D8":undefined }} />
              <p className="text-[11px] font-bold" style={{ color:isDark?"#F5F5F5":"#1A1A1A" }}>{c.n}</p>
              <p className="text-[10px] font-mono" style={{ color:isDark?"#444":"#999" }}>{c.h}</p>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-[24px]" style={{ background:isDark?"#1C1C1C":"#FFFFFF" }}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-5" style={{ color:isDark?"#333":"#CCC" }}>Animation Tokens</p>
          <div className="grid grid-cols-2 gap-4 text-[12px]" style={{ color:isDark?"#888":"#888" }}>
            {[["Page transition","opacity + y:8, 200ms"],["Card tap","scale 0.97, spring"],["Float","y:±7px, 3.8s loop"],["Shimmer","100% → 200%, 1.6s"],["Progress ring","1.5s spring, delay 0.3s"],["Success check","pathLength, 0.45s"]].map(([l,v])=>(
              <div key={l}>
                <p className="font-bold" style={{ color:isDark?"#F5F5F5":"#1A1A1A" }}>{l}</p>
                <p className="font-mono text-[10px] mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
