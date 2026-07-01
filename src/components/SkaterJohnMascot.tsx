/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface SkaterJohnMascotProps {
  context?: string;
  className?: string;
}

export const SkaterJohnMascot: React.FC<SkaterJohnMascotProps> = ({ context = 'default', className = '' }) => {
  const getSpeechBubbleText = () => {
    switch (context) {
      case 'countdown':
        return "喔耶！距離沖繩出發越來越近啦！滑板已經上油，準備衝一波！🛹";
      case 'itinerary':
        return "帶小朋友出門慢慢走最輕鬆！點擊行程看看約翰幫大家找的廁所喔！🚽";
      case 'weather':
        return "沖繩夏日陽光超熱情！防曬帽、防蚊液一定要帶齊，多喝水喔！☀️";
      case 'drive':
        return "右駕口訣：『右轉大彎，左轉小彎』，雨刷和方向燈別搞錯啦！🚗";
      case 'toilet':
        return "3歲北鼻尿急別慌！點這裡約翰馬上帶你去找最近的尿布台和廁所！👶";
      case 'shopping':
        return "西松屋超好逛！必買伴手禮紅芋塔、雪鹽餅，卡刷下去就對了！🛍️";
      case 'expense':
        return "每一筆花費都要記下來喔！別買太多滑板配件，留點錢吃和牛！🥩";
      case 'memo':
        return "把收據拍下來上傳，備忘錄不怕忘！約翰幫你保管在雲端！備忘錄也可以記下好笑的事！📝";
      case 'safety':
        return "家庭旅遊安全第一！約翰幫你整理了緊急兒科和求助電話，備而不用最安心！❤️";
      default:
        return "哈囉！我是 Skater John！歡迎來到你們一家的專屬沖繩自駕旅遊計畫書！汪！🐾";
    }
  };

  return (
    <div className={`flex flex-col md:flex-row items-center gap-4 bg-[#F9F6F0] border-4 border-[#1E1E1E] p-4 rounded-3xl shadow-[6px_6px_0px_0px_#1E1E1E] ${className}`}>
      {/* Dynamic Speech Bubble */}
      <div className="flex-1 order-2 md:order-1 relative">
        <div className="bg-[#FFFFFE] border-3 border-[#1E1E1E] p-4 rounded-2xl shadow-[3px_3px_0px_0px_#1E1E1E] text-[#1E1E1E] font-sans font-medium text-sm leading-relaxed relative">
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[12px] border-l-[#1E1E1E] hidden md:block"></div>
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-[10px] border-l-[#FFFFFE] hidden md:block"></div>
          
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-[12px] border-b-[#1E1E1E] md:hidden"></div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-[10px] border-b-[#FFFFFE] md:hidden"></div>
          
          <p className="tracking-wide">{getSpeechBubbleText()}</p>
        </div>
      </div>

      {/* Skater John Vector SVG */}
      <motion.div 
        className="w-32 h-32 flex-shrink-0 order-1 md:order-2 relative"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Background Highlight circle */}
          <circle cx="60" cy="55" r="42" fill="#FFD54F" stroke="#1E1E1E" strokeWidth="3" />

          {/* Skateboard */}
          <g transform="translate(15, 88)">
            {/* Board Deck */}
            <path d="M5,8 C15,2 75,2 85,8 L85,12 C75,15 15,15 5,12 Z" fill="#4FC3F7" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
            {/* Left Wheel */}
            <circle cx="22" cy="16" r="6" fill="#FF8A65" stroke="#1E1E1E" strokeWidth="2.5" />
            <circle cx="22" cy="16" r="2" fill="#FFFFFE" />
            {/* Right Wheel */}
            <circle cx="68" cy="16" r="6" fill="#FF8A65" stroke="#1E1E1E" strokeWidth="2.5" />
            <circle cx="68" cy="16" r="2" fill="#FFFFFE" />
          </g>

          {/* Body & Paws */}
          <path d="M40,75 C40,65 50,55 60,55 C70,55 80,65 80,75 Z" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" />
          {/* Hand holding coffee or wave paw */}
          <circle cx="45" cy="68" r="6" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" />
          <line x1="42" y1="68" x2="48" y2="68" stroke="#1E1E1E" strokeWidth="1.5" />
          <line x1="45" y1="65" x2="45" y2="71" stroke="#1E1E1E" strokeWidth="1.5" />

          {/* Dog Head */}
          <g transform="translate(25, 20)">
            {/* Ears */}
            {/* Left Ear */}
            <path d="M12,20 C5,20 2,35 6,45 C10,50 16,42 16,30 Z" fill="#E0D6C8" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
            {/* Right Ear */}
            <path d="M58,20 C65,20 68,35 64,45 C60,50 54,42 54,30 Z" fill="#E0D6C8" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />

            {/* Face Base */}
            <rect x="15" y="15" width="40" height="36" rx="18" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" />
            
            {/* Eyes */}
            <circle cx="27" cy="30" r="3.5" fill="#1E1E1E" />
            <circle cx="25.5" cy="28.5" r="1" fill="#FFFFFE" />
            <circle cx="43" cy="30" r="3.5" fill="#1E1E1E" />
            <circle cx="41.5" cy="28.5" r="1" fill="#FFFFFE" />
            
            {/* Cute Blush */}
            <ellipse cx="23" cy="36" rx="3.5" ry="2" fill="#FF8A65" opacity="0.6" />
            <ellipse cx="47" cy="36" rx="3.5" ry="2" fill="#FF8A65" opacity="0.6" />

            {/* Muzzle */}
            <ellipse cx="35" cy="39" rx="10" ry="7" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="2.5" />
            {/* Nose */}
            <path d="M31,36 C31,34 39,34 39,36 C39,39 31,39 31,36 Z" fill="#1E1E1E" />
            {/* Mouth */}
            <path d="M30,41 C32,44 38,44 40,41" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" />

            {/* Backwards Cap */}
            <g transform="translate(12, -4)">
              {/* Cap Dome */}
              <path d="M8,20 C8,8 38,8 38,20 Z" fill="#1976D2" stroke="#1E1E1E" strokeWidth="3" />
              {/* Cap Brim (Pointing backwards to the right) */}
              <path d="M35,16 L53,12 C55,14 53,19 35,21 Z" fill="#0D47A1" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
              {/* Cap Button */}
              <circle cx="23" cy="9" r="2.5" fill="#FFD54F" stroke="#1E1E1E" strokeWidth="2" />
            </g>
          </g>

          {/* Little Dog Paw Badge */}
          <g transform="translate(82, 12)">
            <circle cx="10" cy="10" r="10" fill="#E57373" stroke="#1E1E1E" strokeWidth="2" />
            {/* Paw pad */}
            <ellipse cx="10" cy="12" rx="4" ry="3" fill="#FFFFFE" />
            <circle cx="6" cy="7" r="1.5" fill="#FFFFFE" />
            <circle cx="10" cy="5.5" r="1.5" fill="#FFFFFE" />
            <circle cx="14" cy="7" r="1.5" fill="#FFFFFE" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
