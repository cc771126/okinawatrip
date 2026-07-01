/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Flame, MapPin, Compass, AlertCircle, PhoneCall, Check } from 'lucide-react';

export const OkinawaTips: React.FC = () => {
  const [tipTab, setTipTab] = useState<'shopping' | 'food' | 'culture' | 'emergency'>('shopping');

  return (
    <div className="bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#1E1E1E] text-[#1E1E1E]">
      <div className="mb-6">
        <h3 className="font-sans font-bold text-xl tracking-tight flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#4FC3F7]" />
          沖繩旅遊百寶箱 · 購物美食安全指南
        </h3>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          由滑板狗約翰精心為三口之家整理的沖繩風俗、避坑指南與緊急醫療支援。
        </p>
      </div>

      {/* Grid tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setTipTab('shopping')}
          className={`py-2 px-3 font-sans font-bold text-xs rounded-xl border-2 border-[#1E1E1E] transition flex items-center justify-center gap-1.5 ${
            tipTab === 'shopping' ? 'bg-[#FFD54F] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          伴手禮與購物
        </button>
        <button
          onClick={() => setTipTab('food')}
          className={`py-2 px-3 font-sans font-bold text-xs rounded-xl border-2 border-[#1E1E1E] transition flex items-center justify-center gap-1.5 ${
            tipTab === 'food' ? 'bg-[#FFD54F] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          沖繩限定美食
        </button>
        <button
          onClick={() => setTipTab('culture')}
          className={`py-2 px-3 font-sans font-bold text-xs rounded-xl border-2 border-[#1E1E1E] transition flex items-center justify-center gap-1.5 ${
            tipTab === 'culture' ? 'bg-[#FFD54F] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          風俗與避坑
        </button>
        <button
          onClick={() => setTipTab('emergency')}
          className={`py-2 px-3 font-sans font-bold text-xs rounded-xl border-2 border-[#1E1E1E] transition flex items-center justify-center gap-1.5 ${
            tipTab === 'emergency' ? 'bg-[#FFD54F] shadow-[2px_2px_0px_0px_#1E1E1E]' : 'bg-[#FFFFFE] hover:bg-[#F9F6F0]'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-red-600 animate-pulse" />
          小童應急安全
        </button>
      </div>

      {/* Tab: Shopping */}
      {tipTab === 'shopping' && (
        <div className="space-y-4">
          <div className="border-2 border-[#1E1E1E] rounded-2xl p-4 bg-[#F9F6F0]">
            <h4 className="font-sans font-bold text-sm mb-2 text-[#1E1E1E] flex items-center gap-1">🛍️ 沖繩必買經典伴手禮</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
              <div className="bg-[#FFFFFE] border border-gray-300 p-2.5 rounded-xl">
                <span className="font-bold text-[#1E1E1E]">1. 元祖紅芋塔 (御菓子御殿)</span>
                <p className="text-gray-500 mt-0.5">香甜紅薯泥配上酥軟船形塔皮，沖繩絕對NO.1的特產，可烤過更香！</p>
              </div>
              <div className="bg-[#FFFFFE] border border-gray-300 p-2.5 rounded-xl">
                <span className="font-bold text-[#1E1E1E]">2. 宮古島雪鹽餅 (塩屋)</span>
                <p className="text-gray-500 mt-0.5">鹹甜綿密，入口即化，雪鹽棉花餅更是女孩子與小朋友的最愛。</p>
              </div>
              <div className="bg-[#FFFFFE] border border-gray-300 p-2.5 rounded-xl">
                <span className="font-bold text-[#1E1E1E]">3. 沖繩Orion黑糖與啤酒</span>
                <p className="text-gray-500 mt-0.5">Orion周邊（杯墊、T恤）十分文青，純黑糖對女性補身體特別好。</p>
              </div>
              <div className="bg-[#FFFFFE] border border-gray-300 p-2.5 rounded-xl">
                <span className="font-bold text-[#1E1E1E]">4. 首里石鹼 (SuiSavon)</span>
                <p className="text-gray-500 mt-0.5">純手工精油肥皂、護手霜，香氣取自沖繩在地蔬果花卉，送禮極體面。</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFF9C4]">
            <h4 className="font-sans font-bold text-sm mb-2 text-amber-950 flex items-center gap-1">👶 3歲寶寶購物推薦：西松屋精選</h4>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              位於最後一天 <strong>iias 豐崎</strong> 或其附近的 <strong>西松屋</strong>，是日本本土最大的嬰童用品連鎖，專門販售平價日系童裝、麵包超人周邊玩具、水壺、日本幼兒防曬與防蚊貼片。
              衣服一件多在 400 - 900 日圓之間，買一整年份也不心疼！
            </p>
          </div>
        </div>
      )}

      {/* Tab: Food */}
      {tipTab === 'food' && (
        <div className="space-y-4">
          <div className="border-2 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFF3E0]">
            <h4 className="font-sans font-bold text-sm mb-2 text-orange-950">😋 沖繩親子必吃美食口袋清單</h4>
            <div className="space-y-2.5 text-xs text-gray-700 font-medium">
              <div className="flex gap-2">
                <span className="text-orange-500">✔</span>
                <div>
                  <strong className="text-[#1E1E1E]">島豚屋 (蒸籠阿古豬)：</strong>
                  第一天晚餐安排！原汁原味蒸熟的阿古豬甜美無腥味，多餘油脂已被濾掉，搭配高麗菜，3歲寶寶可以安心大口嚼食。
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-orange-500">✔</span>
                <div>
                  <strong className="text-[#1E1E1E]">Pork Tamago Onigiri (沖繩飯糰)：</strong>
                  第二天早餐！香熱米飯包覆經典SPAM餐肉與嫩蛋，口味溫和，份量大。如果排隊人多，美榮橋站前和機場也有分店。
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-orange-500">✔</span>
                <div>
                  <strong className="text-[#1E1E1E]">琉球之牛 (頂級燒肉)：</strong>
                  第二天晚餐！肉質軟嫩至極。帶小朋友去吃，推薦點「和牛牛五花」剪成極碎拌白飯，寶寶一秒化身乾飯狂魔！
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-orange-500">✔</span>
                <div>
                  <strong className="text-[#1E1E1E]">A&W 漢堡 ＆ Blue Seal 冰淇淋：</strong>
                  沖繩特有的美式文化產物！A&W的華夫薯條跟Blue Seal的紅芋冰淇淋是絕配。
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Culture */}
      {tipTab === 'culture' && (
        <div className="space-y-4">
          <div className="border-2 border-[#1E1E1E] rounded-2xl p-4 bg-[#E8F5E9]">
            <h4 className="font-sans font-bold text-sm mb-2 text-emerald-950">🌾 沖繩風俗民情與旅遊避坑提醒</h4>
            <div className="space-y-2.5 text-xs text-gray-700 font-medium">
              <p>💡 <strong className="text-[#1E1E1E]">隨身攜帶小垃圾袋：</strong> 沖繩（全日本皆同）街道上極難找到垃圾桶！這是因為安全與環保考量。車上請常備空塑膠袋，等回飯店或在便利商店買完東西時再順便丟棄。</p>
              <p>💡 <strong className="text-[#1E1E1E]">風沙與艷陽避坑：</strong> 沖繩的陽光常夾帶海風與高濕度。夏日正午（11:00-14:00）應儘量待在室內或水族館，避免在毫無遮蔽的波之上海灘或首里城廣場合影太久，以免小朋友暴躁或熱感冒。</p>
              <p>💡 <strong className="text-[#1E1E1E]">風獅爺石像 (Shisa)：</strong> 在沖繩到處都可以看見張嘴或閉嘴的可愛獅子！張嘴的是雄獅，代表招福與大口咬錢；閉嘴的是雌獅，代表守財與守護家園。可以沿途跟小朋友玩「尋找風獅爺」的遊戲喔！</p>
              <p>💡 <strong className="text-[#1E1E1E]">沖繩熱情吶喊「イーヤーサッサ！」(Iiyasa Sa)：</strong> 這是沖繩傳統 Eisa 舞蹈與三線琴民俗中最經典的精神答腔！男士或琴師唱出「A-ryi-ga-to-sa-sa」，觀眾便會跟著拍手大喊「イーヤーサッサ！」或「ハイヤ！」(Ha-i-ya) 來助興，象徵快樂團結。在第四天民謠餐廳，和小朋友大方一起拍手喊出來吧！</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Emergency */}
      {tipTab === 'emergency' && (
        <div className="space-y-4">
          {/* Important contacts */}
          <div className="border-3 border-[#E57373] rounded-2xl p-4 bg-[#FFEBEE]">
            <h4 className="font-sans font-bold text-sm mb-2 text-red-900 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-red-600 animate-pulse" />
              🚨 沖繩緊急求助 ＆ 兒科醫療必備
            </h4>
            <p className="text-xs text-red-800 font-medium leading-relaxed mb-3">
              在國外最怕小朋友突發發燒、肚子痛或受傷。請立刻保存以下沖繩具備中英語翻譯、兒科實力最強的綜合性急診醫院：
            </p>

            <div className="space-y-2.5 text-xs text-gray-800">
              <div className="bg-[#FFFFFE] border border-red-200 p-2.5 rounded-xl">
                <span className="font-bold text-red-900">🏢 南部醫療中心 · 兒童醫療中心 (Nanbu Medical Center)</span>
                <p className="text-gray-500 mt-0.5">位置：那霸周邊 (Haebaru町)。這是沖繩最專業、全天候24H的「小兒急診急救中心」，醫護人員對嬰幼兒照護經驗極其豐富。</p>
                <p className="font-mono font-bold text-red-700 mt-0.5">📞 電話：098-888-0101</p>
              </div>

              <div className="bg-[#FFFFFE] border border-red-200 p-2.5 rounded-xl">
                <span className="font-bold text-red-900">🏢 沖繩縣立中部醫院 (Chubu Hospital)</span>
                <p className="text-gray-500 mt-0.5">位置：中部うるま市 (近美國村車程20分鐘)。也是著名的24H夜間急診中心，備有小兒急症特別通道。</p>
                <p className="font-mono font-bold text-red-700 mt-0.5">📞 電話：098-973-4111</p>
              </div>
            </div>
          </div>

          {/* Quick Translation Card */}
          <div className="border-2 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFFFFE] shadow-[2px_2px_0px_0px_#1E1E1E]">
            <h4 className="font-sans font-bold text-xs text-gray-500 uppercase tracking-wider mb-2">
              🚑 救急與親子實用日語口語/展示卡 (附羅馬拼音)
            </h4>
            <div className="bg-[#F9F6F0] p-3 rounded-xl space-y-3 border border-gray-200">
              <div className="text-xs">
                <span className="font-bold text-red-600 block">🚑 1. 孩子發燒急救出示：</span>
                <span className="font-bold text-[#1E1E1E] text-sm font-mono block mt-0.5">子供が熱を出しています。病院へ行きたいです。</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">讀音：Ko-do-mo ga ne-tsu o da-shi-te i-ma-su. Byo-in e i-ki-tai de-su.</span>
              </div>
              <hr className="border-dashed border-gray-300" />
              <div className="text-xs">
                <span className="font-bold text-red-600 block">🚑 2. 孩子肚子痛出示：</span>
                <span className="font-bold text-[#1E1E1E] text-sm font-mono block mt-0.5">子供がお腹をひどく痛がっています。</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">讀音：Ko-do-mo ga o-na-ka o hi-do-ku i-ta-ga-tte i-ma-su.</span>
              </div>
              <hr className="border-dashed border-gray-300" />
              <div className="text-xs">
                <span className="font-bold text-[#1E1E1E] block">🚽 3. 請問洗手間在哪裡？(頻尿小寶貝極需)</span>
                <span className="font-bold text-[#1E1E1E] text-sm font-mono block mt-0.5">すみません、トイレはどこですか？</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">讀音：Su-mi-ma-sen, to-i-re wa do-ko de-su ka?</span>
              </div>
              <hr className="border-dashed border-gray-300" />
              <div className="text-xs">
                <span className="font-bold text-[#1E1E1E] block">🛒 4. 請問有兒童椅 / 兒童餐具嗎？</span>
                <span className="font-bold text-[#1E1E1E] text-sm font-mono block mt-0.5">子供用の椅子と食器はありますか？</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">讀音：Ko-do-mo-yo no i-su to sho-kki wa a-ri-ma-su ka?</span>
              </div>
              <hr className="border-dashed border-gray-300" />
              <div className="text-xs">
                <span className="font-bold text-[#1E1E1E] block">🛗 5. 請問電梯在哪裡？(推嬰兒推車找路)</span>
                <span className="font-bold text-[#1E1E1E] text-sm font-mono block mt-0.5">すみません、エレベーターはどこですか？</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">讀音：Su-mi-ma-sen, e-re-be-ta wa do-ko de-su ka?</span>
              </div>
              <hr className="border-dashed border-gray-300" />
              <div className="text-xs">
                <span className="font-bold text-[#1E1E1E] block">🤱 6. 請問這裡有哺乳室 / 育嬰室嗎？</span>
                <span className="font-bold text-[#1E1E1E] text-sm font-mono block mt-0.5">授乳室（じゅにゅうしつ）はありますか？</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">讀音：Ju-nyu-shi-tsu wa a-ri-ma-su ka?</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
