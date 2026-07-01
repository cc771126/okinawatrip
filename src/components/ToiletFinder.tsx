/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ITINERARY } from '../data/itinerary';
import { AlertTriangle, ShieldCheck, Footprints, Baby } from 'lucide-react';

export const ToiletFinder: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Group itinerary items by day
  const itemsForDay = ITINERARY.filter(item => item.day === selectedDay);

  return (
    <div className="bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#1E1E1E] text-[#1E1E1E]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-sans font-bold text-xl tracking-tight flex items-center gap-2">
            <Baby className="w-6 h-6 text-[#E57373]" />
            🚽 3歲幼兒洗手間 · 育嬰室急尋
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            為三歲寶寶精心整理的景點洗手間指南，支援尿布台與親子廁所過濾。
          </p>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex gap-1 bg-[#F9F6F0] p-1 border-2 border-[#1E1E1E] rounded-xl self-start">
          {[1, 2, 3, 4, 5, 6].map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`w-8 h-8 font-mono font-bold text-xs rounded-lg transition ${
                selectedDay === day ? 'bg-[#FFD54F] border border-[#1E1E1E]' : 'hover:bg-gray-200'
              }`}
            >
              D{day}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Quick Notice */}
      <div className="bg-[#FFEBEE] border-2 border-[#1E1E1E] rounded-2xl p-4 mb-6 flex gap-3 items-start">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-red-900 leading-relaxed font-medium">
          <span className="font-bold block mb-1">👶 3歲小孩沖繩如廁痛點與小訣竅：</span>
          1. <strong className="underline">日本超商是神隊友：</strong> 沖繩路上的 Lawson 或 FamilyMart 幾乎都有對外借用的洗手間，大膽跟店員借吧！<br />
          2. <strong className="underline">大推 AEON 與 iias 購物中心：</strong> 設有超夢幻的「Kid’s Restroom」兒童專用廁所（小馬桶、小小便斗、低洗手台），小孩不抗拒。<br />
          3. <strong className="underline">行車必備：</strong> 車上建議備有「拋棄式小尿袋」或「可折疊行動便盆」，開長途車在國道58號上突然喊尿尿時可以救急！
        </div>
      </div>

      {/* Toilets List */}
      <div className="space-y-4">
        {itemsForDay.map((item) => (
          <div key={item.id} className="border-2 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFFFFE] shadow-[3px_3px_0px_0px_#1E1E1E] hover:bg-[#FDFBF7] transition">
            <div className="flex items-center justify-between mb-3 border-b-2 border-dashed border-[#1E1E1E]/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gray-500">{item.time}</span>
                <h4 className="font-sans font-bold text-sm text-[#1E1E1E]">{item.activity}</h4>
              </div>
              <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full border border-gray-200">
                {item.location?.replace('桃園國際機場 ', '').replace('第一航廈', '')}
              </span>
            </div>

            {item.toilets && item.toilets.length > 0 ? (
              <div className="space-y-3">
                {item.toilets.map((toilet, tIdx) => (
                  <div key={tIdx} className="bg-[#F9F6F0] border border-[#1E1E1E] rounded-xl p-3 flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-blue-900">📍 {toilet.name}</span>
                        {toilet.hasBabyTable && (
                          <span className="flex items-center gap-0.5 text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                            🍼 尿布台/親子座
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{toilet.locationDetails}</p>
                      <p className="text-xs text-gray-700 font-semibold mt-1">💡 實用指南：{toilet.note}</p>
                    </div>

                    <div className="sm:w-28 flex flex-col justify-center items-end border-t border-dashed border-[#1E1E1E]/20 sm:border-t-0 sm:border-l sm:pl-3 pt-2 sm:pt-0">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#E57373]">
                        <Footprints className="w-3.5 h-3.5" />
                        {toilet.distance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">此行程點為移動時段，沿途可借用加油站或便利商店洗手間。</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-[#E8F5E9] border-2 border-[#1E1E1E] rounded-2xl p-4 flex gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-900 leading-relaxed font-medium">
          <span className="font-bold block mb-0.5">🇯🇵 日本公共衛生標準：</span>
          日本不愧是親子王國！幾乎 95% 的多功能廁所 (多目的トイレ) 都配置有溫水免治、嬰兒安全掛椅及感應式沖水。帶寶寶出遊，在上廁所這件事上非常省心！
        </div>
      </div>
    </div>
  );
};
