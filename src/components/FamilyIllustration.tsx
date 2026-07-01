/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export const FamilyIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`border-4 border-[#1E1E1E] bg-[#FFC107] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#1E1E1E] relative overflow-hidden flex flex-col items-center justify-center ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Tiny decorative elements */}
      <div className="absolute top-3 left-4 font-mono text-[9px] font-black text-black/40 select-none tracking-wider">
        NIMURA DAISUKE STYLE TRIBUTE
      </div>
      <div className="absolute top-3 right-4 font-mono text-[9px] font-black text-black/40 select-none">
        ★ OKINAWA 2026
      </div>

      <div className="w-full max-w-[380px] mx-auto aspect-[4/3] relative">
        <svg 
          viewBox="0 0 400 300" 
          className="w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Polka Dot Pattern Definition for Father's Pants and Mother's Sweater */}
          <defs>
            <pattern id="pink-dots" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="2" fill="#E91E63" />
            </pattern>
            <pattern id="lavender-dots" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.5" fill="#7E57C2" />
            </pattern>
          </defs>

          {/* BACKGROUND RETRO SUN */}
          <circle cx="200" cy="140" r="75" fill="#FFF59D" opacity="0.4" />

          {/* ========================================================= */}
          {/* 1. FATHER (Left) */}
          {/* ========================================================= */}
          <g id="father" transform="translate(-10, -5)">
            {/* Legs & Pants (Pink Polka Dot) */}
            {/* Left Leg */}
            <path 
              d="M100,165 C85,190 75,200 60,230 L78,236 C90,215 95,205 108,185 Z" 
              fill="url(#pink-dots)" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            {/* Right Leg */}
            <path 
              d="M115,185 C125,205 135,215 155,232 L168,222 C150,200 142,190 128,165 Z" 
              fill="url(#pink-dots)" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            {/* Hips / Crotch */}
            <path 
              d="M96,160 L132,160 L128,185 L102,185 Z" 
              fill="url(#pink-dots)" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />

            {/* Left Shoe */}
            <path 
              d="M58,230 C50,230 45,234 45,240 C45,245 55,246 65,246 C75,246 80,240 78,236 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            {/* Right Shoe */}
            <path 
              d="M155,232 C158,236 165,244 175,244 C182,244 185,238 180,232 L168,222 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />

            {/* Torso & Sweatshirt (Cream White) */}
            <path 
              d="M85,115 C75,125 78,160 82,165 C95,168 125,168 135,162 C135,150 132,125 125,115 Z" 
              fill="#F9F6F0" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />

            {/* Arms (Dancing pose) */}
            {/* Left Arm (Raised bent fist) */}
            <path 
              d="M85,118 C70,118 60,110 50,115 L52,126 C62,122 70,128 85,128 Z" 
              fill="#F9F6F0" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            <circle cx="47" cy="117" r="7" fill="#FDFBF7" stroke="#1E1E1E" strokeWidth="3" /> {/* Left Fist */}

            {/* Right Arm (Bent towards chest) */}
            <path 
              d="M125,118 C135,118 148,110 152,118 L142,128 C138,124 132,126 125,125 Z" 
              fill="#F9F6F0" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            <circle cx="155" cy="118" r="7" fill="#FDFBF7" stroke="#1E1E1E" strokeWidth="3" /> {/* Right Fist */}

            {/* Head & Neck */}
            <rect x="101" y="103" width="12" height="15" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" />
            
            {/* Face */}
            <path 
              d="M92,72 C92,60 120,60 122,72 C122,86 120,95 107,95 C95,95 92,86 92,72 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />

            {/* Hair (Wavy curly black) */}
            <path 
              d="M91,70 C88,64 92,52 105,50 C118,48 125,58 123,68 C121,62 115,55 105,56 C95,57 93,66 91,70 Z" 
              fill="#1E1E1E" 
            />
            <circle cx="97" cy="56" r="6" fill="#1E1E1E" />
            <circle cx="112" cy="54" r="7" fill="#1E1E1E" />
            <circle cx="120" cy="62" r="5" fill="#1E1E1E" />

            {/* Glasses (Bold black rectangular frames) */}
            <rect x="96" y="66" width="11" height="8" rx="2" fill="none" stroke="#1E1E1E" strokeWidth="3" />
            <rect x="111" y="66" width="11" height="8" rx="2" fill="none" stroke="#1E1E1E" strokeWidth="3" />
            <line x1="107" y1="70" x2="111" y2="70" stroke="#1E1E1E" strokeWidth="3" />

            {/* Eyes (Simple dots) */}
            <circle cx="101" cy="70" r="1.5" fill="#1E1E1E" />
            <circle cx="116" cy="70" r="1.5" fill="#1E1E1E" />

            {/* Nose & Mouth & Beard stubble */}
            <path d="M107,75 L107,78" stroke="#1E1E1E" strokeWidth="2.5" />
            <path d="M104,83 C106,85 109,85 111,83" fill="none" stroke="#1E1E1E" strokeWidth="2.5" />
            <path d="M102,88 L113,88" stroke="#1E1E1E" strokeWidth="1.5" strokeDasharray="2 1" /> {/* Stubble */}
          </g>

          {/* ========================================================= */}
          {/* 2. MOTHER (Right) */}
          {/* ========================================================= */}
          <g id="mother" transform="translate(15, 10)">
            {/* Legs & Pants (Black) */}
            {/* Left Leg */}
            <path 
              d="M260,175 L240,230 L255,234 L272,190 Z" 
              fill="#1E1E1E" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            {/* Right Leg */}
            <path 
              d="M275,190 C285,210 295,220 310,234 L322,224 C305,205 295,195 285,175 Z" 
              fill="#1E1E1E" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            {/* Hips */}
            <path 
              d="M255,160 L290,160 L285,190 L260,190 Z" 
              fill="#1E1E1E" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />

            {/* Left Shoe */}
            <path 
              d="M236,230 C230,232 232,240 242,240 L256,234 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3" 
              strokeLinejoin="round" 
            />
            {/* Right Shoe */}
            <path 
              d="M310,234 C314,238 322,242 328,238 L322,224 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3" 
              strokeLinejoin="round" 
            />

            {/* Torso & Sweater (Lavender Polka Dot) */}
            <path 
              d="M248,115 C240,125 244,152 248,162 C260,165 285,165 295,158 C295,148 290,125 285,115 Z" 
              fill="url(#lavender-dots)" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />

            {/* Arms */}
            {/* Left Arm (Active bent dance pose) */}
            <path 
              d="M248,118 C235,120 226,114 220,125 L230,132 C234,126 240,128 248,126 Z" 
              fill="url(#lavender-dots)" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            <circle cx="216" cy="125" r="6" fill="#FDFBF7" stroke="#1E1E1E" strokeWidth="3" />

            {/* Right Arm (Upward hand wave) */}
            <path 
              d="M285,118 C298,115 305,100 312,108 L302,118 C298,114 290,120 285,124 Z" 
              fill="url(#lavender-dots)" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            <circle cx="316" cy="106" r="6" fill="#FDFBF7" stroke="#1E1E1E" strokeWidth="3" />

            {/* Head, Hair & Face */}
            <rect x="261" y="105" width="10" height="12" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" />
            
            {/* Face */}
            <path 
              d="M250,75 C250,64 278,64 280,75 C280,87 278,94 265,94 C252,94 250,87 250,75 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />

            {/* Hair (Neat dark bob) */}
            <path 
              d="M247,75 C247,60 283,60 283,75 L283,86 L278,86 L278,75 C278,72 252,72 252,75 L252,86 L247,86 Z" 
              fill="#1E1E1E" 
              stroke="#1E1E1E" 
              strokeWidth="1.5" 
            />

            {/* Eyes (Cute little arcs/simple eyes) */}
            <circle cx="259" cy="74" r="1.8" fill="#1E1E1E" />
            <circle cx="271" cy="74" r="1.8" fill="#1E1E1E" />

            {/* Nose & Mouth */}
            <path d="M265,77 C265,79 266,79 266,80" fill="none" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
            <path d="M261,84 C263,86 267,86 269,84" fill="none" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* ========================================================= */}
          {/* 3. CHILD / 3yo TODDLER (Center) */}
          {/* ========================================================= */}
          <g id="child" transform="translate(10, 15)">
            {/* Legs & Black Pants */}
            <path 
              d="M175,210 L165,245 L176,248 L185,220 Z" 
              fill="#1E1E1E" 
              stroke="#1E1E1E" 
              strokeWidth="3" 
              strokeLinejoin="round" 
            />
            <path 
              d="M190,220 L198,248 L208,245 L200,210 Z" 
              fill="#1E1E1E" 
              stroke="#1E1E1E" 
              strokeWidth="3" 
              strokeLinejoin="round" 
            />
            <path 
              d="M172,205 L203,205 L198,220 L177,220 Z" 
              fill="#1E1E1E" 
              stroke="#1E1E1E" 
              strokeWidth="3" 
              strokeLinejoin="round" />

            {/* Cute tiny white shoes */}
            <path d="M160,244 C158,246 164,252 172,250 L176,248 Z" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />
            <path d="M198,248 C204,252 212,246 212,244 L208,245 Z" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" strokeLinejoin="round" />

            {/* Torso & White T-shirt with Black Cat Face */}
            <path 
              d="M168,175 C162,182 165,204 170,210 C180,212 195,212 202,208 C205,200 202,182 198,175 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />

            {/* Black Cat Design on Kid's Shirt */}
            <g transform="translate(176, 185) scale(0.7)">
              {/* Cat Ears */}
              <polygon points="4,10 10,2 14,10" fill="#1E1E1E" />
              <polygon points="20,10 24,2 30,10" fill="#1E1E1E" />
              {/* Cat Face body */}
              <rect x="4" y="9" width="26" height="15" rx="5" fill="#1E1E1E" />
              {/* Cat Eyes */}
              <circle cx="10" cy="15" r="1.5" fill="#FFFFFE" />
              <circle cx="24" cy="15" r="1.5" fill="#FFFFFE" />
              {/* Cat Whiskers */}
              <line x1="2" y1="16" x2="6" y2="17" stroke="#FFFFFE" strokeWidth="1" />
              <line x1="28" y1="16" x2="32" y2="17" stroke="#FFFFFE" strokeWidth="1" />
            </g>

            {/* Left Arm (Reaching straight up) */}
            <path 
              d="M168,176 C158,165 154,152 150,140 L160,136 C164,148 166,160 168,174 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3" 
              strokeLinejoin="round" 
            />
            <circle cx="149" cy="136" r="5" fill="#FDFBF7" stroke="#1E1E1E" strokeWidth="2.5" />

            {/* Right Arm (Posing down) */}
            <path 
              d="M198,176 C206,182 214,188 222,192 L228,183 C218,178 208,174 198,172 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3" 
              strokeLinejoin="round" 
            />
            <circle cx="231" cy="184" r="5" fill="#FDFBF7" stroke="#1E1E1E" strokeWidth="2.5" />

            {/* Head, Hair & Face */}
            <rect x="178,168" width="8" height="10" fill="#FFFFFE" stroke="#1E1E1E" strokeWidth="3" />
            <path 
              d="M170,145 C170,136 194,136 194,145 C194,154 192,160 182,160 C172,160 170,154 170,145 Z" 
              fill="#FFFFFE" 
              stroke="#1E1E1E" 
              strokeWidth="3" 
              strokeLinejoin="round" 
            />

            {/* Messy baby hair */}
            <path 
              d="M168,144 C168,132 196,132 196,144 C193,139 188,136 182,138 C176,136 171,139 168,144 Z" 
              fill="#1E1E1E" 
            />
            <circle cx="173" cy="137" r="4" fill="#1E1E1E" />
            <circle cx="182" cy="135" r="5" fill="#1E1E1E" />
            <circle cx="191" cy="137" r="4" fill="#1E1E1E" />

            {/* Eyes & Tiny cute smiling mouth */}
            <circle cx="178" cy="146" r="1.5" fill="#1E1E1E" />
            <circle cx="186" cy="146" r="1.5" fill="#1E1E1E" />
            <path d="M180,151 C181,153 183,153 184,151" fill="none" stroke="#1E1E1E" strokeWidth="1.8" strokeLinecap="round" />
          </g>

          {/* LITTLE HAND-DRAWN YEAR "2026" */}
          <text 
            x="200" 
            y="280" 
            fontFamily="monospace" 
            fontWeight="900" 
            fontSize="18" 
            fill="#1E1E1E" 
            textAnchor="middle"
            letterSpacing="3"
          >
            2026
          </text>
        </svg>
      </div>

      <div className="mt-2 bg-[#FFFFFE] border-2 border-[#1E1E1E] px-4 py-1.5 rounded-full text-xs font-black tracking-wide text-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E]">
        🌻 OKINAWA ADVENTURE · 一家三口自駕探險 🚗
      </div>
    </motion.div>
  );
};
