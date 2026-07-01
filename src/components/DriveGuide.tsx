/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Car, CheckCircle, HelpCircle, ArrowRightLeft, ShieldAlert, Navigation2 } from 'lucide-react';
import { motion } from 'motion/react';

export const DriveGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tips' | 'signs' | 'simulator' | 'parking'>('tips');
  const [practiceTurn, setPracticeTurn] = useState<'none' | 'left' | 'right'>('none');

  const rentalChecklist = [
    '台灣駕照正本 (出發前確認沒過期)',
    '日文翻譯本 (至監理所辦理，切勿用國際駕照代替！)',
    '駕駛人護照 (需與駕照姓名拼音一致)',
    '安全座椅預約 (日本法規規定 6 歲以下童必坐，我們3歲北鼻絕對要坐！)',
    '還車加滿油證明 (還車前在附近指定加油站「レギュラー (Regular) / 満タン (Mantan)」加滿，並保存收據)'
  ];

  const roadSigns = [
    { title: '止まれ (一時停止)', desc: '車輛必須「完全靜止」3 秒，確認左右無車才可前進。違規會被警察攔截開罰喔！', icon: '🛑' },
    { title: '徐行 (慢行)', desc: '意指車輛速度必須降到隨時可以立刻停下來的狀態（通常為10km/h以下）。', icon: '⚠️' },
    { title: '一方通行 (單行道)', desc: '沖繩市區（如那霸國際通小巷、美榮橋附近）單行道極多，注意藍白標誌。', icon: '⬆️' },
    { title: '轉彎專用車道', desc: '路面劃有箭頭，接近路口前必須依據車道行駛，不可臨時變換。', icon: '↩️' }
  ];

  return (
    <div className="bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#1E1E1E] text-[#1E1E1E]">
      <h3 className="font-sans font-bold text-xl tracking-tight flex items-center gap-2 mb-4">
        <Car className="w-6 h-6 text-[#1976D2]" />
        沖繩自駕自救指南 ＆ 右駕教學
      </h3>

      {/* Tabs */}
      <div className="flex gap-2 border-b-3 border-[#1E1E1E] pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('tips')}
          className={`px-4 py-2 font-sans font-bold text-sm rounded-xl border-2 border-[#1E1E1E] transition whitespace-nowrap ${
            activeTab === 'tips' ? 'bg-[#FFD54F] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
          }`}
        >
          🔑 租車與右駕要領
        </button>
        <button
          onClick={() => setActiveTab('signs')}
          className={`px-4 py-2 font-sans font-bold text-sm rounded-xl border-2 border-[#1E1E1E] transition whitespace-nowrap ${
            activeTab === 'signs' ? 'bg-[#FFD54F] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
          }`}
        >
          🚏 日本常用路標
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 font-sans font-bold text-sm rounded-xl border-2 border-[#1E1E1E] transition whitespace-nowrap ${
            activeTab === 'simulator' ? 'bg-[#FFD54F] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
          }`}
        >
          🎮 轉彎肌肉記憶訓練
        </button>
        <button
          onClick={() => setActiveTab('parking')}
          className={`px-4 py-2 font-sans font-bold text-sm rounded-xl border-2 border-[#1E1E1E] transition whitespace-nowrap ${
            activeTab === 'parking' ? 'bg-[#FFD54F] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
          }`}
        >
          🅿️ 停車與繳費教學
        </button>
      </div>

      {/* Content 1: Tips */}
      {activeTab === 'tips' && (
        <div className="space-y-6">
          <div className="bg-[#FFF9C4] border-2 border-[#1E1E1E] rounded-2xl p-4">
            <h4 className="font-sans font-bold text-base mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-600" />
              ORIX 美榮橋站前 / 豐崎店 提車必備
            </h4>
            <ul className="space-y-1.5 text-xs font-medium text-gray-700">
              {rentalChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#1E1E1E]">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-[#1E1E1E] rounded-2xl p-4 bg-[#E3F2FD] shadow-[2px_2px_0px_0px_#1E1E1E]">
              <h5 className="font-sans font-bold text-sm text-blue-900 mb-2 flex items-center gap-1.5">
                <ArrowRightLeft className="w-4 h-4" />
                右駕新手上路「左右相反」
              </h5>
              <div className="space-y-2 text-xs text-gray-700 font-medium">
                <p>💡 <span className="font-bold text-[#1E1E1E]">方向燈在右、雨刷在左：</span> 轉彎時如果突然刷雨刷，別慌！這是每個右駕新手的必經之路。</p>
                <p>💡 <span className="font-bold text-[#1E1E1E]">駕駛座靠道路中線：</span> 不管在台灣還是日本，駕駛人的位置都應該貼近路中央的中線，就不容易偏向路邊。</p>
              </div>
            </div>

            <div className="border-2 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFEBEE] shadow-[2px_2px_0px_0px_#1E1E1E]">
              <h5 className="font-sans font-bold text-sm text-red-900 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                沖繩行車保險必保 (CDW + NOC)
              </h5>
              <div className="space-y-2 text-xs text-gray-700 font-medium">
                <p>💡 租車時請務必加購 <span className="font-bold text-red-700">豪華免責險 (NOC)</span>。萬一發生碰撞或小刮傷，不需賠償車行營業損失，自駕遊更無後顧之憂。</p>
                <p>💡 萬一發生事故，不論大小刮傷，<span className="font-bold text-red-700">一定要當場打110報警</span>並取得事故聯絡單，否則保險無法理賠！</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content 2: Signs */}
      {activeTab === 'signs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roadSigns.map((sign, idx) => (
            <div key={idx} className="border-2 border-[#1E1E1E] p-4 rounded-2xl bg-[#FFFFFE] shadow-[3px_3px_0px_0px_#1E1E1E] flex gap-4">
              <span className="text-4xl flex-shrink-0 select-none">{sign.icon}</span>
              <div>
                <h5 className="font-sans font-bold text-sm mb-1">{sign.title}</h5>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{sign.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content 3: Simulator */}
      {activeTab === 'simulator' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-600 font-medium">
            約翰為你準備的「十字路口思維訓練」。點選按鈕來模擬轉彎，嘴裡唸著口訣來建立肌肉記憶！
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setPracticeTurn('left')}
              className={`flex-1 py-3 px-4 font-sans font-bold text-xs rounded-xl border-2 border-[#1E1E1E] transition shadow-[2px_2px_0px_0px_#1E1E1E] active:scale-95 ${
                practiceTurn === 'left' ? 'bg-[#4FC3F7]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
              }`}
            >
              練習【左轉】👈
            </button>
            <button
              onClick={() => setPracticeTurn('right')}
              className={`flex-1 py-3 px-4 font-sans font-bold text-xs rounded-xl border-2 border-[#1E1E1E] transition shadow-[2px_2px_0px_0px_#1E1E1E] active:scale-95 ${
                practiceTurn === 'right' ? 'bg-[#E57373]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
              }`}
            >
              練習【右轉】👉
            </button>
          </div>

          {/* Interactive Turning Arena */}
          <div className="h-64 border-3 border-[#1E1E1E] rounded-2xl bg-[#F0EFE9] relative overflow-hidden flex items-center justify-center">
            {/* Horizontal Road */}
            <div className="absolute left-0 right-0 h-16 bg-[#B0BEC5] border-y-2 border-dashed border-[#1E1E1E]/40"></div>
            {/* Vertical Road */}
            <div className="absolute top-0 bottom-0 w-16 bg-[#B0BEC5] border-x-2 border-dashed border-[#1E1E1E]/40"></div>
            
            {/* Center Intersection mark */}
            <div className="absolute w-8 h-8 rounded-full border-2 border-dashed border-[#1E1E1E]/30 bg-[#F0EFE9]/10"></div>

            {/* Our Car (Starts from bottom lane - KEEP LEFT!) */}
            <motion.div 
              className="absolute w-6 h-10 bg-red-500 border-2 border-[#1E1E1E] rounded-md z-10 flex items-center justify-center text-[8px] font-bold text-white shadow-md"
              initial={{ x: 12, y: 100, rotate: 0 }}
              animate={
                practiceTurn === 'left'
                  ? { 
                      x: [12, 12, -20, -100], 
                      y: [100, 12, 12, 12], 
                      rotate: [0, 0, -90, -90] 
                    }
                  : practiceTurn === 'right'
                  ? { 
                      x: [12, 12, 12, 100], 
                      y: [100, -12, -12, -12], 
                      rotate: [0, 0, 90, 90] 
                    }
                  : { x: 12, y: 90, rotate: 0 }
              }
              transition={{ duration: 3, ease: "easeInOut" }}
            >
              🚗
            </motion.div>

            {/* Lane Directions Indicators (Okinawa Left Side driving) */}
            <div className="absolute bottom-2 right-12 text-[10px] font-mono font-bold text-gray-500">日本靠左</div>
            <div className="absolute top-2 left-12 text-[10px] font-mono font-bold text-gray-500">KEEP LEFT</div>

            {/* Instructional Overlay text */}
            {practiceTurn === 'left' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-x-4 bottom-4 bg-[#E3F2FD] border-2 border-[#1E1E1E] p-2.5 rounded-xl text-center z-20 shadow-md"
              >
                <div className="font-sans font-bold text-xs text-blue-900">👈 左轉要領：靠左轉小彎</div>
                <p className="text-[10px] text-gray-600 mt-0.5">直接順著左邊車道轉過去，不要開太大偏到對向右車道去了！</p>
              </motion.div>
            )}

            {practiceTurn === 'right' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-x-4 bottom-4 bg-[#FFEBEE] border-2 border-[#1E1E1E] p-2.5 rounded-xl text-center z-20 shadow-md"
              >
                <div className="font-sans font-bold text-xs text-red-900">👉 右轉要領：大弧度跨越、轉大彎</div>
                <p className="text-[10px] text-gray-600 mt-0.5">注意對向直行車輛先行！右轉要開過十字路口中心點，再切入最左側車道！</p>
              </motion.div>
            )}

            {practiceTurn === 'none' && (
              <span className="text-xs font-bold text-gray-500 bg-[#FFFFFE] px-3 py-1 rounded-full border border-gray-300 z-10 animate-pulse">
                點擊上方練習按鈕看自駕軌跡
              </span>
            )}
          </div>

          <div className="bg-[#E8F5E9] border-2 border-[#1E1E1E] rounded-xl p-3 flex gap-2 items-start text-xs text-emerald-800">
            <Navigation2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">重要路權提示：</span>
              日本路權最高是「行人」，再來是「直行車」。轉彎車輛必須百分之百禮讓直行車，就算路口是綠燈，也必須讓對向直行車通過後才能轉彎喔！
            </div>
          </div>
        </div>
      )}

      {/* Content 4: Parking Tutorial */}
      {activeTab === 'parking' && (
        <div className="space-y-6">
          <div className="bg-[#E3F2FD] border-2 border-[#1E1E1E] rounded-2xl p-4">
            <h4 className="font-sans font-bold text-base mb-1 text-blue-900 flex items-center gap-2">
              🅿️ 沖繩自駕必知：兩大停車場類型 ＆ 繳費教學
            </h4>
            <p className="text-xs text-blue-900 font-medium">
              沖繩停車場主要分為「柵欄式」與「地板擋板式」兩種，初次見到擋板式千萬不要慌，請按照以下步驟安全精算離場！
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type 1: Flap plate Lock */}
            <div className="border-3 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFFFFE] shadow-[3px_3px_0px_0px_#1E1E1E] space-y-3">
              <div className="flex items-center justify-between border-b-2 border-dashed border-gray-200 pb-2">
                <h5 className="font-sans font-black text-sm text-[#1E1E1E] flex items-center gap-1.5">
                  🚗 類型一：地板擋板式 (Coin Parking)
                </h5>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-300">
                  路邊無人車位常見
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                車子開進車位停妥後，約過 <strong>2~5 分鐘</strong>，車底正下方的金屬板 (鎖定擋板) 會自動升起鎖定車輛。
              </p>
              
              <div className="bg-[#F9F6F0] p-3 rounded-xl space-y-2 border border-gray-300 text-xs font-medium">
                <span className="font-bold text-[#1E1E1E] block text-[11px] underline">💡 擋板式精算機繳費四步驟：</span>
                <div className="space-y-1.5 text-gray-700">
                  <p><strong>1. 記住車位號碼：</strong> 下車或繳費前，請先看清楚您停放位置地板或牆上的<strong>「車室番号」</strong>(例如: 3 號)。</p>
                  <p><strong>2. 前往精算機：</strong> 走到場內的中央黃色繳費機 (精算機)。</p>
                  <p><strong>3. 輸入並確認：</strong> 在鍵盤上輸入您的車位號碼 ➔ 按下<strong>「確認」</strong>或<strong>「決定」</strong>按鈕 ➔ 螢幕會顯示應繳金額。</p>
                  <p><strong>4. 投幣與離場：</strong> 投遞硬幣或紙鈔，確認金額歸零後，<strong>車底下的擋板會完全降下</strong>。請在 <strong>10 分鐘內</strong>將車子開離車位，否則擋板會再次升起重新計費！</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 text-red-900 rounded-xl p-2.5 text-[10px] font-bold flex gap-1.5">
                <span>⚠️</span>
                <p><strong>超級重要：</strong> 開車離場前，請務必<strong>親眼確認車底下的擋板已完全降平</strong>！若擋板尚未降平就強行踩油門，會嚴重刮傷底盤或損壞租車公司的車輛，甚至得賠償天價的維修費喔！</p>
              </div>
            </div>

            {/* Type 2: Gate Barrier */}
            <div className="border-3 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFFFFE] shadow-[3px_3px_0px_0px_#1E1E1E] space-y-3">
              <div className="flex items-center justify-between border-b-2 border-dashed border-gray-200 pb-2">
                <h5 className="font-sans font-black text-sm text-[#1E1E1E] flex items-center gap-1.5">
                  🚧 類型二：入口柵欄取票式
                </h5>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded border border-blue-300">
                  大型商場、景點常見
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                入口處設有發票機，驅車接近時按下綠色大按鈕，抽取一張磁性<strong>駐車券 (Ticket)</strong>，柵欄便會開啟。
              </p>

              <div className="bg-[#F9F6F0] p-3 rounded-xl space-y-2 border border-gray-300 text-xs font-medium">
                <span className="font-bold text-[#1E1E1E] block text-[11px] underline">💡 柵欄式繳費與折扣領取：</span>
                <div className="space-y-1.5 text-gray-700">
                  <p><strong>1. 隨身攜帶駐車券：</strong> 不要把駐車券留在車上！因為在商場 (如永旺 AEON、iias) 消費，可以用駐車券去服務台或店家折抵停車費。</p>
                  <p><strong>2. 優先尋找事前精算機：</strong> 在電梯口或賣場出口，常有<strong>「事前精算機」</strong>。先在這裡插入卡片付清，出閘門時免排隊，閘門會自動偵測車牌或直接插卡快速放行。</p>
                  <p><strong>3. 出口車道付費：</strong> 若沒事前精算，則在出閘門時直接把駐車券插入出口精算機，並依螢幕顯示投幣付款。</p>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-2.5 text-[10px] font-bold flex gap-1.5">
                <span>💡</span>
                <p><strong>貼心叮嚀：</strong> 駐車券千萬不能弄丟或折疊！若不慎遺失，點選繳費機上的「紛失」按鈕通常需要賠償固定的高額費用 (通常為3,000至5,000日圓)，一定要收在皮夾中放好。</p>
              </div>
            </div>
          </div>

          {/* Useful Japanese Parking Vocabs */}
          <div className="border-2 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFF9C4]">
            <h5 className="font-sans font-bold text-xs text-[#1E1E1E] uppercase tracking-wider mb-2">
              🇯🇵 實用停車場日文對照表：
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono font-bold">
              <div className="bg-white p-2 rounded-lg border border-gray-300">
                <span className="text-gray-400 block text-[9px]">駐車券 (Ticket)</span>
                <span className="text-[#1E1E1E] text-xs">ちゅうしゃけん / Chūshaken</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-300">
                <span className="text-gray-400 block text-[9px]">精算機 (Payment)</span>
                <span className="text-[#1E1E1E] text-xs">せいさんき / Seisanki</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-300">
                <span className="text-gray-400 block text-[9px]">車室番号 (Spot No.)</span>
                <span className="text-[#1E1E1E] text-xs">しゃしつばんごう / Spot No.</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-300">
                <span className="text-gray-400 block text-[9px]">領収書 (Receipt)</span>
                <span className="text-[#1E1E1E] text-xs">りょうしゅうしょ / Ryōshūsho</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
