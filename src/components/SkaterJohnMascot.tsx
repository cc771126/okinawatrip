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
          {/* Background Highlight circle (Hand-drawn look with layered minimalist shapes) */}
          <circle cx="60" cy="60" r="46" fill="#F4EDE2" stroke="#1E1E1E" strokeWidth="3" />
          <circle cx="60" cy="60" r="38" fill="#F3D1BD" opacity="0.6" />
          
          {/* Skateboard (Nimura style thick outlines, terracotta wood tones) */}
          <g transform="translate(18, 92)">
            <path d="M 2 4 C 15 -1, 70 -1, 82 4 C 85 5, 85 8, 81 9 C 70 11, 15 11, 3 9 C -1 8, -1 5, 2 4 Z" fill="#E67D65" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
            {/* Wheels */}
            <circle cx="20" cy="12" r="5" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" />
            <circle cx="20" cy="12" r="1.5" fill="#1E1E1E" />
            <circle cx="64" cy="12" r="5" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" />
            <circle cx="64" cy="12" r="1.5" fill="#1E1E1E" />
          </g>

          {/* Dog Body (Relaxed slouching skater hoodie in warm green) */}
          <path d="M 32 85 C 32 75, 42 66, 60 66 C 78 66, 88 75, 88 85" fill="#5F7D75" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 46 66 C 46 72, 74 72, 74 66" fill="none" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" />
          
          {/* Dog Head (Nimura Daisuke style: clean outline, relaxed features) */}
          <g transform="translate(0, -2)">
            {/* Floppy ears with muted caramel-beige accent */}
            <path d="M 34 35 C 22 35, 24 58, 34 58 C 38 58, 39 48, 39 40" fill="#E1C699" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
            <path d="M 86 35 C 98 35, 96 58, 86 58 C 82 58, 81 48, 81 40" fill="#E1C699" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />

            {/* Face Base */}
            <path d="M 36 38 C 36 24, 84 24, 84 38 C 84 54, 76 64, 60 64 C 44 64, 36 54, 36 38 Z" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />

            {/* Eyes: Minimalist solid dot eyes, far apart */}
            <circle cx="47" cy="42" r="2.5" fill="#1E1E1E" />
            <circle cx="73" cy="42" r="2.5" fill="#1E1E1E" />

            {/* Soft subtle peach blush */}
            <circle cx="44" cy="48" r="3" fill="#F0A395" opacity="0.8" />
            <circle cx="76" cy="48" r="3" fill="#F0A395" opacity="0.8" />

            {/* Muzzle / Nose / Mouth - relaxed expression */}
            <ellipse cx="60" cy="45" rx="3.5" ry="2.2" fill="#1E1E1E" />
            <path d="M 57 49 Q 60 51 63 49" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" />

            {/* Backwards Cap */}
            <g transform="translate(40, 11)">
              <path d="M 4 15 C 4 3, 36 3, 36 15 Z" fill="#D2A24C" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
              <path d="M 32 12 L 48 9 C 50 11, 48 15, 32 16 Z" fill="#B3812F" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="20" cy="3" r="2.5" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="2" />
            </g>
          </g>

          {/* Sparkles decorations in background (classic Japanese pop illustration) */}
          <path d="M 22 24 L 24 28 L 28 29 L 24 30 L 22 34 L 20 30 L 16 29 L 20 28 Z" fill="#E67D65" stroke="#1E1E1E" strokeWidth="1.5" />
          <path d="M 102 46 L 103 49 L 106 50 L 103 51 L 102 54 L 101 51 L 98 50 L 101 49 Z" fill="#D2A24C" stroke="#1E1E1E" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
};
