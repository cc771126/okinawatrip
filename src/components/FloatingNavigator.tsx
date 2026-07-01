/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp, 
  Menu, 
  X, 
  Calendar, 
  Baby, 
  Volume2, 
  CreditCard, 
  Camera, 
  ShieldAlert, 
  Car,
  Compass,
  Sparkles
} from 'lucide-react';

interface FloatingNavigatorProps {
  activeTab: 'itinerary' | 'toilet' | 'expense' | 'memo' | 'drive' | 'tips' | 'japanese';
  setActiveTab: (tab: 'itinerary' | 'toilet' | 'expense' | 'memo' | 'drive' | 'tips' | 'japanese') => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}

export const FloatingNavigator: React.FC<FloatingNavigatorProps> = ({
  activeTab,
  setActiveTab,
  selectedDay,
  setSelectedDay
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button when scrolled down more than 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabSelect = (tabId: 'itinerary' | 'toilet' | 'expense' | 'memo' | 'drive' | 'tips' | 'japanese') => {
    setActiveTab(tabId);
    setIsOpen(false);
    // Smooth scroll to top of content after slight delay to allow rendering
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  const handleDaySelect = (dayNum: number) => {
    setActiveTab('itinerary');
    setSelectedDay(dayNum);
    setIsOpen(false);
    setTimeout(() => {
      // Scroll to top of content
      scrollToTop();
    }, 100);
  };

  const menuItems = [
    { id: 'itinerary', label: '📋 行程表', icon: Calendar, color: 'bg-[#FFE082]' },
    { id: 'toilet', label: '👶 找洗手間', icon: Baby, color: 'bg-[#FFCDD2]' },
    { id: 'japanese', label: '🗣️ 親子日語', icon: Volume2, color: 'bg-[#F0F4C3]' },
    { id: 'expense', label: '🪙 記帳本', icon: CreditCard, color: 'bg-[#C8E6C9]' },
    { id: 'memo', label: '📸 備忘錄', icon: Camera, color: 'bg-[#B2DFDB]' },
    { id: 'drive', label: '🚗 租車右駕', icon: Car, color: 'bg-[#FFE082]' },
    { id: 'tips', label: '🎐 百寶箱', icon: ShieldAlert, color: 'bg-[#D1C4E9]' },
  ] as const;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none select-none">
      
      {/* Quick Directory Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-4 shadow-[6px_6px_0px_0px_#1E1E1E] w-[290px] max-w-[calc(100vw-2rem)] text-[#1E1E1E]"
          >
            {/* Mascot Banner Header */}
            <div className="flex justify-between items-center border-b-2 border-dashed border-gray-200 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl animate-bounce">🛹</span>
                <div>
                  <h4 className="font-sans font-black text-sm text-[#1E1E1E]">Skater John 導覽小助手</h4>
                  <p className="text-[10px] text-gray-400 font-bold">點擊即可快速跳轉目的地</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition border-2 border-transparent active:border-[#1E1E1E]"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* If on Itinerary, show Day Jump section first */}
            {activeTab === 'itinerary' && (
              <div className="bg-[#FFFDE7] border-2 border-[#1E1E1E] rounded-2xl p-2.5 mb-3 text-center">
                <p className="text-[10px] font-black text-amber-950 mb-1.5 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> 快速切換行程天數：
                </p>
                <div className="grid grid-cols-6 gap-1">
                  {[1, 2, 3, 4, 5, 6].map((day) => (
                    <button
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      className={`py-1 rounded-lg border text-xs font-mono font-black transition active:scale-90 ${
                        selectedDay === day
                          ? 'bg-[#FFD54F] border-[#1E1E1E] text-[#1E1E1E] font-bold shadow-[1px_1px_0px_0px_#1E1E1E]'
                          : 'bg-white border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      D{day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nav List */}
            <div className="space-y-1 max-h-[280px] overflow-y-auto pr-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabSelect(item.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl border-2 text-left transition duration-150 active:scale-[0.98] ${
                      isSelected
                        ? 'bg-[#FFD54F] border-[#1E1E1E] shadow-[2px_2px_0px_0px_#1E1E1E]'
                        : 'bg-white border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded-lg border-2 border-[#1E1E1E] ${item.color} flex items-center justify-center`}>
                        <Icon className="w-3.5 h-3.5 text-[#1E1E1E]" />
                      </span>
                      <span className="font-sans font-extrabold text-xs text-[#1E1E1E]">
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Active Indicator */}
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Quick Helper Tip */}
            <div className="mt-3 pt-2 border-t border-dashed border-gray-100 text-[9px] text-gray-400 font-bold text-center">
              🌺 イーヤーサッサ！沖繩親子自駕
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons Row */}
      <div className="flex flex-col gap-2.5 items-end pointer-events-auto">
        {/* Back to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={scrollToTop}
              className="w-11 h-11 bg-white hover:bg-[#F9F6F0] text-[#1E1E1E] rounded-full border-3 border-[#1E1E1E] shadow-[3px_3px_0px_0px_#1E1E1E] flex items-center justify-center transition active:translate-y-1 active:shadow-none"
              title="回到最上方"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Directory Toggle Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full border-4 border-[#1E1E1E] shadow-[4px_4px_0px_0px_#1E1E1E] flex items-center justify-center transition active:translate-y-1 active:shadow-none ${
            isOpen ? 'bg-[#FF4081]' : 'bg-[#FFD54F]'
          }`}
          title="快速跳轉目錄"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5] text-[#1E1E1E]" />
          ) : (
            <Menu className="w-6 h-6 stroke-[2.5] text-[#1E1E1E]" />
          )}
        </button>
      </div>

    </div>
  );
};
