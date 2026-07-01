/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Baby, 
  Plane, 
  Compass, 
  CheckSquare, 
  FileText, 
  ShoppingBag, 
  HelpCircle,
  AlertTriangle,
  Map,
  Sparkles,
  Info,
  Car
} from 'lucide-react';

import { ITINERARY } from './data/itinerary';
import { ItineraryItem } from './types';
import { SkaterJohnMascot } from './components/SkaterJohnMascot';
import { FamilyIllustration } from './components/FamilyIllustration';
import { WeatherPanel } from './components/WeatherPanel';
import { DriveGuide } from './components/DriveGuide';
import { ToiletFinder } from './components/ToiletFinder';
import { ExpenseTracker } from './components/ExpenseTracker';
import { MemoSection } from './components/MemoSection';
import { OkinawaTips } from './components/OkinawaTips';
import { JapanesePhrases } from './components/JapanesePhrases';
import { FloatingNavigator } from './components/FloatingNavigator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'toilet' | 'expense' | 'memo' | 'drive' | 'tips' | 'japanese'>('itinerary');
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const handleTabSelect = (tabId: 'itinerary' | 'toilet' | 'expense' | 'memo' | 'drive' | 'tips' | 'japanese') => {
    setActiveTab(tabId);
    setTimeout(() => {
      const element = document.getElementById('tab-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  const [selectedItem, setSelectedItem] = useState<ItineraryItem | null>(null);
  const [countdownText, setCountdownText] = useState('');
  const [daysLeft, setDaysLeft] = useState<number>(0);

  // Set initial selected item when day changes
  useEffect(() => {
    const items = ITINERARY.filter(item => item.day === selectedDay);
    if (items.length > 0) {
      setSelectedItem(items[0]);
    } else {
      setSelectedItem(null);
    }
  }, [selectedDay]);

  // Calculate dynamic countdown
  useEffect(() => {
    const calculateCountdown = () => {
      const tripStartDate = new Date('2026-07-21T00:00:00');
      const tripEndDate = new Date('2026-07-26T23:59:59');
      const now = new Date();

      // Zero out hours for precise day math
      const d1 = new Date(tripStartDate.getFullYear(), tripStartDate.getMonth(), tripStartDate.getDate());
      const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      const diffTime = d1.getTime() - d2.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (now >= tripStartDate && now <= tripEndDate) {
        const currentDay = Math.floor((now.getTime() - tripStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        setCountdownText(`🎉 沖繩熱血自駕中！今天是 Day ${currentDay} 🌺`);
        setDaysLeft(0);
      } else if (now > tripEndDate) {
        setCountdownText('🏝️ 沖繩自駕完美落幕！滿載一家三口幸福回憶 🐾');
        setDaysLeft(-1);
      } else {
        setCountdownText(`距出發還有 ${diffDays} 天！`);
        setDaysLeft(diffDays);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentDayDateString = () => {
    switch (selectedDay) {
      case 1: return '7/21 (二)';
      case 2: return '7/22 (三)';
      case 3: return '7/23 (四)';
      case 4: return '7/24 (五)';
      case 5: return '7/25 (六)';
      case 6: return '7/26 (日)';
      default: return '';
    }
  };

  const getCategoryIcon = (cat: ItineraryItem['category']) => {
    switch (cat) {
      case 'flight': return '✈️';
      case 'food': return '🍔';
      case 'hotel': return '🏨';
      case 'attraction': return '🌴';
      case 'shopping': return '🛍️';
      default: return '🚗';
    }
  };

  const filteredTimeline = ITINERARY.filter(item => item.day === selectedDay);

  return (
    <div className="min-h-screen bg-[#FCF8F2] font-sans text-[#1E1E1E] selection:bg-[#FFD54F] selection:text-[#1E1E1E]">
      
      {/* Visual Skater John & Family Banner */}
      <div className="bg-[#FFD54F] border-b-4 border-[#1E1E1E] py-8 px-4 relative overflow-hidden">
        {/* Decorative background pawprints */}
        <div className="absolute top-2 left-6 text-black/5 text-4xl select-none font-mono">🐾</div>
        <div className="absolute bottom-2 right-12 text-black/5 text-5xl select-none font-mono">🐾</div>
        <div className="absolute top-8 right-6 text-black/5 text-3xl select-none font-mono">🛹</div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Banner Text Left Side (7 columns) */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#1E1E1E] text-white font-mono text-xs font-bold px-3 py-1 rounded-full border-2 border-white shadow-md">
              <span>NIMURA DAISUKE × FAMILY ART</span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-sans text-[#1E1E1E] leading-tight uppercase">
              沖繩一夏！<span className="bg-white px-2 py-0.5 rounded-xl border-3 border-[#1E1E1E] inline-block transform -rotate-1">三口之家</span> 自駕探險記
            </h1>

            <p className="text-sm md:text-base font-extrabold text-[#1E1E1E]/90 max-w-xl mx-auto lg:mx-0">
              爸爸、媽媽 ＆ 3歲北鼻的沖繩自駕之旅 🛹 7/21 ~ 7/26 陽光果凍海暑期計畫
            </p>

            {/* Dynamic Countdown */}
            <div className="inline-block bg-[#FFFFFE] border-3 border-[#1E1E1E] px-5 py-2.5 rounded-2xl shadow-[4px_4px_0px_0px_#1E1E1E] transition transform hover:-rotate-1">
              <span className="font-sans font-black text-sm md:text-base tracking-wide flex items-center gap-1.5 justify-center">
                📅 {countdownText}
              </span>
            </div>
          </div>

          {/* Banner Illustration Right Side (5 columns) */}
          <div className="lg:col-span-5 w-full max-w-[420px] mx-auto lg:max-w-none">
            <FamilyIllustration />
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Mascot Bubble and Nav Menu (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Adorable Dynamic Mascot */}
          <SkaterJohnMascot context={activeTab} />

          {/* Menu Card */}
          <div className="bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-4 shadow-[5px_5px_0px_0px_#1E1E1E]">
            <h3 className="font-sans font-bold text-xs text-gray-400 uppercase tracking-wider px-2 mb-3">
              🐾 行程小幫手選單
            </h3>
            
            <nav className="space-y-1.5">
              {[
                { id: 'itinerary', label: '📋 互動式行程表', desc: '詳細每日時間、地圖連結' },
                { id: 'toilet', label: '👶 3歲寶寶洗手間急尋', desc: '全行程親子廁所與尿布台' },
                { id: 'japanese', label: '🗣️ 實用親子急救日語', desc: '緊急就醫、兒童椅、播音翻譯' },
                { id: 'expense', label: '記帳本 ＆ 即時換算', desc: '日圓記帳，自動換算台幣' },
                { id: 'memo', label: '📸 備忘錄與收據拍照', desc: '拖曳上傳/壓縮保存收據' },
                { id: 'drive', label: '🚗 租車右駕自救教學', desc: '右駕口訣與十字路口模擬' },
                { id: 'tips', label: '🎐 沖繩百寶箱 ＆ 安全', desc: '伴手禮、美食、兒科急診醫院' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id as any)}
                  className={`w-full text-left p-3 rounded-2xl border-2 transition active:scale-[0.99] flex flex-col ${
                    activeTab === tab.id 
                      ? 'bg-[#FFD54F] border-[#1E1E1E] shadow-[3px_3px_0px_0px_#1E1E1E]' 
                      : 'bg-transparent border-transparent hover:bg-[#F9F6F0] hover:border-[#1E1E1E]/20'
                  }`}
                >
                  <span className="font-sans font-extrabold text-sm text-[#1E1E1E]">{tab.label}</span>
                  <span className="text-[10px] text-gray-500 font-medium mt-0.5">{tab.desc}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Real-time Weather Panel */}
          <WeatherPanel />

        </div>

        {/* Right Side: Tab Content Area (8 columns) */}
        <div id="tab-content" className="lg:col-span-8 scroll-mt-6">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              
              {/* Tab 1: Itinerary */}
              {activeTab === 'itinerary' && (
                <div className="space-y-6">
                  {/* Day Navigation */}
                  <div className="bg-[#FFFFFE] border-4 border-[#1E1E1E] p-4 rounded-3xl shadow-[5px_5px_0px_0px_#1E1E1E] flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      <span className="font-sans font-black text-base">目前行程天數</span>
                    </div>

                    {/* Day selector buttons */}
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6].map((day) => (
                        <button
                          key={day}
                          onClick={() => setSelectedDay(day)}
                          className={`w-11 h-11 rounded-2xl border-2 border-[#1E1E1E] font-mono font-black text-sm flex flex-col items-center justify-center transition active:scale-95 shadow-[2px_2px_0px_0px_#1E1E1E] ${
                            selectedDay === day 
                              ? 'bg-[#FFD54F] text-[#1E1E1E]' 
                              : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
                          }`}
                        >
                          <span className="text-[8px] text-gray-400 -mb-0.5">DAY</span>
                          <span>{day}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Day Overview Intro */}
                  <div className="bg-[#E3F2FD] border-4 border-[#1E1E1E] rounded-3xl p-5 shadow-[5px_5px_0px_0px_#1E1E1E] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-sans font-black text-xl text-[#1976D2]">
                        📅 沖繩冒險 DAY {selectedDay} · {currentDayDateString()}
                      </h3>
                      <p className="text-xs text-blue-900 font-bold mt-1">
                        {selectedDay === 1 && '✈️ 泰亞航出發！降落沖繩，入住市區水之都酒店，吃蒸籠阿古豬！'}
                        {selectedDay === 2 && '⛩️ 提領 ORIX 租車！朝聖波上宮與牧志市場，下午首里城，晚上爽吃琉球之牛！'}
                        {selectedDay === 3 && '🍍 北上自駕行！登古宇利海洋塔吃蝦蝦飯，暢玩鳳梨園，入住北部海灘度假村！'}
                        {selectedDay === 4 && '🐬 重頭戲！美麗海水族館觀賞豆腐鯊，下午飯店游水吹蛋糕蠟燭，晚上聽民謠！'}
                        {selectedDay === 5 && '🚢 海中玻璃船看珊瑚，朝聖萬座毛，入住最佛親子 Vessel 飯店，晚上陽台看煙火！'}
                        {selectedDay === 6 && '🛍️ 最後血拼！iias 豐崎大逛西松屋與童裝，吃 A&W 漢堡，依依不捨搭機返台！'}
                      </p>
                    </div>
                  </div>

                  {/* Timeline layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Timeline Left list (7 cols) */}
                    <div className="md:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {filteredTimeline.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className={`border-3 rounded-2xl p-4 cursor-pointer transition flex items-start gap-4 hover:translate-x-1 hover:bg-[#FDFBF7] relative overflow-hidden ${
                            item.isBirthdaySpot
                              ? 'border-[#EC4899] bg-pink-50/20 shadow-[3px_3px_0px_0px_#EC4899]'
                              : selectedItem?.id === item.id 
                                ? 'border-[#1E1E1E] bg-[#FFFDE7]/60 shadow-[3px_3px_0px_0px_#1E1E1E]' 
                                : 'border-gray-200 bg-white shadow-sm'
                          }`}
                        >
                          {item.isBirthdaySpot && (
                            <div className="absolute top-0 right-0 bg-[#EC4899] text-white font-mono text-[8px] font-black px-2 py-0.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 select-none">
                              <Sparkles className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '4s' }} />
                              <span>3歲生日主題 🎂</span>
                            </div>
                          )}
                          <div className="text-2xl pt-1 select-none">
                            {getCategoryIcon(item.category)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-xs font-black text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                {item.time}
                              </span>
                            </div>
                            <h4 className="font-sans font-extrabold text-sm text-[#1E1E1E] truncate">{item.activity}</h4>
                            <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">{item.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Detail Right panel (5 cols) */}
                    <div className="md:col-span-5">
                      <div className="sticky top-4 bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-5 shadow-[5px_5px_0px_0px_#1E1E1E] text-[#1E1E1E] space-y-4">
                        {selectedItem ? (
                          <>
                            {selectedItem.isBirthdaySpot && (
                              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white border-2 border-[#1E1E1E] rounded-2xl p-3.5 space-y-1 shadow-[2px_2px_0px_0px_#1E1E1E] text-center relative overflow-hidden">
                                <div className="absolute -top-6 -left-6 text-white/10 text-5xl select-none">🎈</div>
                                <div className="absolute -bottom-6 -right-6 text-white/10 text-5xl select-none">🎉</div>
                                <h5 className="font-sans font-black text-[10px] tracking-wider flex items-center justify-center gap-1.5">
                                  👑 3 歲小主角專屬生日慶祝點 👑
                                </h5>
                                <p className="text-[10px] text-pink-100 font-bold leading-relaxed">
                                  祝寶貝 3 歲生日快樂！爸爸媽媽為您精心準備的專屬驚喜、美味與回憶在此展現 🥳🎂
                                </p>
                              </div>
                            )}
                            <div>
                              <div className="text-3xl mb-1">{getCategoryIcon(selectedItem.category)}</div>
                              <span className="font-mono text-xs text-gray-400 font-black">{selectedItem.time} · 行程詳情</span>
                              <h4 className="font-sans font-black text-base mt-0.5">{selectedItem.activity}</h4>
                              <p className="text-xs text-gray-500 font-bold mt-1">📍 {selectedItem.location}</p>
                            </div>

                            <p className="text-xs text-gray-600 font-medium leading-relaxed bg-[#F9F6F0] p-3 rounded-2xl border border-gray-200 whitespace-pre-line">
                              {selectedItem.description}
                            </p>

                            {/* Parking Lot Section */}
                            {selectedItem.parking && (
                              <div className="bg-[#FFFDE7] border-2 border-[#1E1E1E] rounded-2xl p-3 space-y-1.5 shadow-[2px_2px_0px_0px_#1E1E1E]">
                                <div className="text-xs font-black text-[#795548] flex items-center gap-1">
                                  <Car className="w-4 h-4 text-amber-600" />
                                  🅿️ 周邊停車與指南：
                                </div>
                                <p className="text-[11px] text-gray-700 font-medium leading-normal">
                                  {selectedItem.parking}
                                </p>
                                {selectedItem.parkingGuide && (
                                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-2.5 text-[10px] text-amber-900 font-bold flex gap-1 items-start leading-normal">
                                    <span className="flex-shrink-0">⚠️</span>
                                    <span>{selectedItem.parkingGuide}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Nearby Toilets Section */}
                            {selectedItem.toilets && selectedItem.toilets.length > 0 && (
                              <div className="bg-[#FFEBEE] border-2 border-[#1E1E1E] rounded-2xl p-3 space-y-1.5 shadow-[2px_2px_0px_0px_#1E1E1E]">
                                <div className="text-xs font-black text-red-900 flex items-center gap-1">
                                  <Baby className="w-4 h-4 text-[#E57373]" />
                                  👶 3歲幼兒洗手間備忘：
                                </div>
                                {selectedItem.toilets.map((toilet, idx) => (
                                  <div key={idx} className="text-[11px] text-gray-700 leading-normal">
                                    <span className="font-bold text-[#1E1E1E]">🚽 {toilet.name}</span>
                                    <span className="text-[9px] text-gray-400 ml-1">({toilet.distance})</span>
                                    <p className="text-gray-500 text-[10px]">{toilet.locationDetails}</p>
                                    {toilet.hasBabyTable && <span className="inline-block text-[8px] bg-emerald-100 text-emerald-800 border border-emerald-300 rounded px-1 mt-0.5 font-bold">有尿布更換台</span>}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Backup Spots Section */}
                            {selectedItem.backupSpots && (
                              <div className="bg-[#E8F5E9] border-2 border-[#1E1E1E] rounded-2xl p-3 space-y-1.5 shadow-[2px_2px_0px_0px_#1E1E1E]">
                                <div className="text-xs font-black text-emerald-950 flex items-center gap-1">
                                  <Compass className="w-4 h-4 text-emerald-600" />
                                  🗺️ 附近備案景點：
                                </div>
                                <p className="text-[11px] text-gray-700 font-medium leading-normal">
                                  {selectedItem.backupSpots}
                                </p>
                              </div>
                            )}

                            {/* External Link */}
                            {selectedItem.link && (
                              <a 
                                href={selectedItem.link}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-[#1E1E1E] text-white text-xs font-sans font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 hover:bg-[#333333] transition"
                              >
                                <ExternalLink className="w-4 h-4" />
                                查看店家 / 資訊官網
                              </a>
                            )}
                          </>
                        ) : (
                          <div className="py-12 text-center text-gray-400">
                            <Compass className="w-8 h-8 mx-auto stroke-[1.5]" />
                            <p className="text-xs font-semibold mt-2">請選取左側行程點</p>
                            <p className="text-[10px]">查看詳細描述與廁所尋找喔！</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Toilet Finder */}
              {activeTab === 'toilet' && <ToiletFinder />}

              {/* Tab 3: Expense Tracker */}
              {activeTab === 'expense' && <ExpenseTracker />}

              {/* Tab 4: Memo Section */}
              {activeTab === 'memo' && <MemoSection />}

              {/* Tab 5: Drive Guide */}
              {activeTab === 'drive' && <DriveGuide />}

              {/* Tab 6: Tips & Safety */}
              {activeTab === 'tips' && <OkinawaTips />}

              {/* Tab 7: Japanese Phrases */}
              {activeTab === 'japanese' && <JapanesePhrases />}

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      {/* Footer credit */}
      <footer className="border-t-3 border-[#1E1E1E] mt-16 bg-[#FFFFFE] py-8 text-center text-xs font-mono font-bold text-[#1E1E1E]/60">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p>🐾 OKINAWA FAMILY TRIP PLANNER — SKATER JOHN THEMED EDITION 🛹</p>
          <p className="text-[10px] text-gray-400">專為家庭親子自駕遊設計 · 支援離線與 Firebase 雲端資料庫雙儲存</p>
        </div>
      </footer>

      {/* Floating Navigator Helper for mobile scroll support */}
      <FloatingNavigator 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />

    </div>
  );
}
