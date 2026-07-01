/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Check, Copy, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';

interface Phrase {
  id: string;
  category: 'emergency' | 'dining' | 'directions' | 'baby';
  chinese: string;
  japanese: string;
  kana: string;
  romaji: string;
  note?: string;
  emoji: string;
}

const PHRASES: Phrase[] = [
  {
    id: 'em_1',
    category: 'emergency',
    emoji: '🌡️',
    chinese: '孩子發燒了，需要看醫生。',
    japanese: '子供が熱を出しています。病院へ行きたいです。',
    kana: 'こどもが ねつを だしています。びょういんへ いきたいです。',
    romaji: 'Kodomo ga netsu o dashite imasu. Byōin e ikitai desu.',
    note: '急診或櫃檯排隊最速口語！出示此卡給醫護或司機。'
  },
  {
    id: 'em_2',
    category: 'emergency',
    emoji: '🤢',
    chinese: '孩子肚子很痛。',
    japanese: '子供がお腹をひどく痛がっています。',
    kana: 'こどもが おなかを ひどく いたがっています。',
    romaji: 'Kodomo ga onaka o hidoku itagatte imasu.',
    note: '寶寶急性腸胃炎、吐奶、腹痛緊急求助出示卡。'
  },
  {
    id: 'em_3',
    category: 'emergency',
    emoji: '🏥',
    chinese: '請問這附近有夜間小兒科急診嗎？',
    japanese: 'すみません、この近くに夜間小児救急はありますか？',
    kana: 'すみません、この ちかくに やかん しょうに きゅうきゅうは ありますか？',
    romaji: 'Sumimasen, kono chikaku ni yakan shōni kyūkyū wa arimasu ka?',
    note: '深夜若寶寶突發狀況，向飯店櫃檯或路人求助口語。'
  },
  {
    id: 'din_1',
    category: 'dining',
    emoji: '🪑',
    chinese: '請問有兒童椅嗎？',
    japanese: '子供用の椅子はありますか？',
    kana: 'こどもようの いすは ありますか？',
    romaji: 'Kodomoyō no isu wa arimasu ka?',
    note: '帶3歲小寶貝去食堂、拉麵店最常問的一句話。'
  },
  {
    id: 'din_2',
    category: 'dining',
    emoji: '🍴',
    chinese: '請問可以提供一組兒童餐具嗎？',
    japanese: '子供用の食器をセットでいただけますか？',
    kana: 'こどもようの しょっきを セットで いただけますか？',
    romaji: 'Kodomoyō no shokki o setto de itadakemasu ka?',
    note: '要兒童湯匙、小叉子和塑膠碗時專用。'
  },
  {
    id: 'din_3',
    category: 'dining',
    emoji: '🌶️',
    chinese: '請幫我做完全不辣的，謝謝。',
    japanese: '辛くしないでください。完全に辛さ抜きでお願いします。',
    kana: 'からくしないでください。かんぜんに からさぬきで おねがいします。',
    romaji: 'Karaku shinaide kudasai. Kanzen ni karasanuki de onegaishimasu.',
    note: '沖繩部分拉麵與咖哩飯有辣度，此句能確保孩子可安心分食！'
  },
  {
    id: 'din_4',
    category: 'dining',
    emoji: '✂️',
    chinese: '請問有借食物剪刀（剪碎食物用）嗎？',
    japanese: 'フードカッター（離乳食ハサミ）の貸し出しはありますか？',
    kana: 'フードカッター（りにゅうしょくハサミ）の かしだしは ありますか？',
    romaji: 'Fūdo kattā (Rinyūshoku hasami) no kashidashi wa arimasu ka?',
    note: '剪和牛、阿古豬、麵條用。部分日式餐廳會貼心備有。'
  },
  {
    id: 'dir_1',
    category: 'directions',
    emoji: '🛗',
    chinese: '請問電梯在哪裡？（推嬰兒車找路）',
    japanese: 'すみません、エレベーターはどこですか？',
    kana: 'すみません、エレベーターは どこですか？',
    romaji: 'Sumimasen, erebētā wa doko desu ka?',
    note: '沖繩單軌電車站或百貨大樓推車行進必備口語！'
  },
  {
    id: 'dir_2',
    category: 'directions',
    emoji: '🚽',
    chinese: '請問洗手間在哪裡？',
    japanese: 'すみません、トイレはどこですか？',
    kana: 'すみません、トイレは どこですか？',
    romaji: 'Sumimasen, toire wa doko desu ka?',
    note: '孩子突然喊尿尿、急找廁所時最速救星。'
  },
  {
    id: 'dir_3',
    category: 'directions',
    emoji: '🚗',
    chinese: '請問這附近有收費停車場嗎？',
    japanese: 'すみません、この近くにコインパーキングはありますか？',
    kana: 'すみません、この ちかくに コインパーキングは ありますか？',
    romaji: 'Sumimasen, kono chikaku ni koin pākingu wa arimasu ka?',
    note: '自駕尋找周邊車位時向路人、店員詢問。'
  },
  {
    id: 'baby_1',
    category: 'baby',
    emoji: '🤱',
    chinese: '請問這裡有哺乳室 / 育嬰室嗎？',
    japanese: '授乳室（じゅにゅうしつ）はありますか？',
    kana: 'じゅにゅうしつは ありますか？',
    romaji: 'Junyūshitsu wa arimasu ka?',
    note: '方便換尿布、沖泡奶粉或餵奶。'
  },
  {
    id: 'baby_2',
    category: 'baby',
    emoji: '🧻',
    chinese: '請問有提供換尿布的平台（尿布床）嗎？',
    japanese: 'おむつ交換台はありますか？',
    kana: 'おむつ こうかんだいは ありますか？',
    romaji: 'Omutsu kōkandai wa arimasu ka?',
    note: '3歲大寶寶站立或躺著更換尿布急需。'
  },
  {
    id: 'baby_3',
    category: 'baby',
    emoji: '🍼',
    chinese: '請問哪裡有沖泡牛奶用的熱水？',
    japanese: 'ミルク用の調乳お湯はどこでいただけますか？',
    kana: 'ミルクようの ちょうにゅう おゆは どこで いただけますか？',
    romaji: 'Miruku-yō no chōnyū oyu wa doko de itadakemasu ka?',
    note: '向超商、餐廳或服務中心借 70 度以上沖奶專用熱水。'
  }
];

export const JapanesePhrases: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'emergency' | 'dining' | 'directions' | 'baby'>('emergency');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPlayingId, setIsPlayingId] = useState<string | null>(null);

  const filteredPhrases = PHRASES.filter(p => p.category === activeCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; // Slow down slightly for easier listening
      
      utterance.onstart = () => setIsPlayingId(id);
      utterance.onend = () => setIsPlayingId(null);
      utterance.onerror = () => setIsPlayingId(null);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('您的瀏覽器不支援語音播放，請直接出示畫面給工作人員看喔！');
    }
  };

  return (
    <div className="bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#1E1E1E] text-[#1E1E1E]">
      
      {/* Header with Title and Mascot Credit */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-3 border-dashed border-[#1E1E1E]/20 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#E91E63] text-white font-mono text-[10px] font-black px-2.5 py-0.5 rounded-full mb-1 shadow-sm uppercase">
            <span>🗣️ 雙向救急口語卡</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
          </div>
          <h3 className="font-sans font-black text-xl tracking-tight text-[#1E1E1E] flex items-center gap-2">
            🗣️ 3歲寶寶親子旅遊·實用救急日語
          </h3>
          <p className="text-xs text-gray-500 font-bold mt-1">
            專為沖繩自駕家庭設計！配備 <strong className="text-pink-600">🔊 日語真人發音播放</strong>，遇到狀況免驚慌，直接播音或出示手機畫面即可！
          </p>
        </div>
        
        {/* Okinawa Cheer Accent */}
        <div className="bg-[#FFF9C4] border-2 border-[#1E1E1E] px-3.5 py-1.5 rounded-2xl transform rotate-1 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#1E1E1E]">
          <span className="text-xs font-black text-amber-950">🌺 イーヤーサッサ！</span>
        </div>
      </div>

      {/* Category selector button tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {[
          { id: 'emergency', label: '🚑 醫療應急', color: 'bg-[#FFEBEE]', text: 'text-red-800' },
          { id: 'dining', label: '🍽️ 餐廳用餐', color: 'bg-[#FFF3E0]', text: 'text-orange-800' },
          { id: 'directions', label: '🛗 推車路況', color: 'bg-[#E3F2FD]', text: 'text-blue-800' },
          { id: 'baby', label: '🍼 育嬰備品', color: 'bg-[#E8F5E9]', text: 'text-emerald-800' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id as any);
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            }}
            className={`py-2.5 px-3 font-sans font-black text-xs rounded-2xl border-2 border-[#1E1E1E] transition flex items-center justify-center gap-1.5 active:scale-95 ${
              activeCategory === cat.id 
                ? 'bg-[#FFD54F] shadow-[3px_3px_0px_0px_#1E1E1E]' 
                : 'bg-white hover:bg-[#F9F6F0]'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Warning/Guideline banner */}
      <div className="bg-[#FFF9C4] border-3 border-[#1E1E1E] rounded-2xl p-3.5 flex items-start gap-3 mb-6 shadow-[2px_2px_0px_0px_#1E1E1E]">
        <span className="text-xl">💡</span>
        <div className="text-[11px] text-amber-950 font-bold leading-relaxed">
          <p className="font-extrabold text-xs">出示小訣竅：</p>
          <p className="mt-0.5">
            進入藥妝店、餐廳或診所時，若語言不通，您可以直接點開對應的卡片，<strong>把日文字體放大給店員或醫護人員看</strong>。
            您也可以點擊右側的 <strong className="text-amber-800">🔊 播放讀音</strong> 按鈕，系統會以標準日語自動朗讀出來！
          </p>
        </div>
      </div>

      {/* Phrases Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map((phrase) => (
          <motion.div
            key={phrase.id}
            layoutId={phrase.id}
            className={`border-3 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFFFFE] shadow-[3px_3px_0px_0px_#1E1E1E] relative overflow-hidden transition-all ${
              isPlayingId === phrase.id ? 'bg-amber-50/50 border-amber-500 shadow-[3px_3px_0px_0px_#FFC107]' : ''
            }`}
          >
            {/* Play overlay ring */}
            {isPlayingId === phrase.id && (
              <div className="absolute top-0 right-0 w-2 h-full bg-[#FFC107] animate-pulse"></div>
            )}

            <div className="flex justify-between items-start gap-2 mb-2">
              <span className="text-2xl select-none bg-gray-100 p-1.5 rounded-xl border border-gray-200">
                {phrase.emoji}
              </span>
              
              {/* Quick action buttons */}
              <div className="flex items-center gap-1.5">
                {/* Speech synthesis play button */}
                <button
                  onClick={() => handleSpeak(phrase.id, phrase.japanese)}
                  className={`p-2 rounded-xl border-2 border-[#1E1E1E] transition active:scale-90 ${
                    isPlayingId === phrase.id 
                      ? 'bg-[#FFD54F] animate-bounce' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                  title="點擊播放日語語音"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingId === phrase.id ? 'text-[#1E1E1E] animate-pulse' : 'text-gray-600'}`} />
                </button>

                {/* Copy text button */}
                <button
                  onClick={() => handleCopy(phrase.id, phrase.japanese)}
                  className="p-2 rounded-xl border-2 border-[#1E1E1E] bg-white hover:bg-gray-100 transition active:scale-90"
                  title="複製日文"
                >
                  {copiedId === phrase.id ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Translation Text area */}
            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">中文意思：</span>
                <p className="font-sans font-black text-xs text-[#1E1E1E] bg-[#F9F6F0] px-2.5 py-1 rounded-lg inline-block border border-gray-200/50">
                  {phrase.chinese}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-red-500 font-bold block uppercase tracking-wider">🇯🇵 醫護/店員展示字體 (大字)：</span>
                <p className="font-sans font-black text-base text-[#1E1E1E] select-all leading-snug tracking-wide mt-0.5">
                  {phrase.japanese}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">假名讀音：</span>
                <p className="font-mono text-[10px] text-gray-500 leading-normal bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                  {phrase.kana}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">羅馬拼音（跟著唸）：</span>
                <p className="font-mono text-[10px] text-amber-900 font-semibold leading-normal">
                  {phrase.romaji}
                </p>
              </div>

              {phrase.note && (
                <div className="mt-2 border-t border-dashed border-gray-200 pt-2 flex items-start gap-1 text-[10px] text-gray-400">
                  <span className="text-amber-500">📌</span>
                  <span className="font-medium">{phrase.note}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Birthday custom parenting note */}
      <div className="mt-6 bg-[#E3F2FD] border-3 border-[#1E1E1E] rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1E1E1E] flex flex-col sm:flex-row items-center gap-4">
        <span className="text-3xl select-none">🎂</span>
        <div className="text-xs text-blue-950 font-bold leading-relaxed text-center sm:text-left">
          <p className="text-sm font-black">🎉 3 歲小主角生日快樂應急大補帖！</p>
          <p className="mt-1">
            3歲孩子活動量大，且處於頻尿、情緒豐富期。如果在外突然大哭鬧，可以用日文跟店員打招呼並稍微致歉：
            <br />
            <span className="bg-white/80 px-2 py-0.5 rounded text-blue-900 font-mono inline-block mt-1 border border-blue-200">
              「すみません、子供が３歳（さんさい）の誕生日（たんじょうび）で、少し興奮（こうふん）しています。」
            </span>
            <span className="block text-[10px] text-gray-400 mt-0.5">
              (讀音：Su-mi-ma-sen, ko-do-mo ga san-sai no tan-jō-bi de, su-ko-shi kō-fun shi-te i-ma-su. 意思是：不好意思，小孩正在過3歲生日，有點太興奮了。)
            </span>
          </p>
        </div>
      </div>

    </div>
  );
};
