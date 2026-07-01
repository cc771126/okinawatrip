/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudSun, CloudRain, CloudLightning, RefreshCw, Thermometer, Wind, HelpCircle } from 'lucide-react';
import { WeatherInfo, DailyWeather } from '../types';

export const WeatherPanel: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherInfo | null>(null);
  const [forecast, setForecast] = useState<DailyWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      // Open-Meteo API for Naha, Okinawa (Lat: 26.2124, Lon: 127.6809)
      const url = `https://api.open-meteo.com/v1/forecast?latitude=26.2124&longitude=127.6809&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia/Tokyo`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('無法取得天氣資料');
      const data = await res.json();

      // Parse Current Weather
      const current = data.current_weather;
      setCurrentWeather({
        temp: Math.round(current.temperature),
        weatherCode: current.weathercode,
        description: getWeatherDesc(current.weathercode),
        windSpeed: Math.round(current.windspeed)
      });

      // Parse Daily Forecast (5 Days)
      const daily = data.daily;
      const days: DailyWeather[] = [];
      const daysCount = Math.min(daily.time.length, 5);
      
      for (let i = 0; i < daysCount; i++) {
        days.push({
          date: daily.time[i],
          tempMax: Math.round(daily.temperature_2m_max[i]),
          tempMin: Math.round(daily.temperature_2m_min[i]),
          weatherCode: daily.weathercode[i],
          description: getWeatherDesc(daily.weathercode[i])
        });
      }
      setForecast(days);
    } catch (err) {
      console.error(err);
      setError('天氣預報加載失敗，暫時顯示沖繩夏季常規氣溫');
      // Fallback with realistic Okinawa July weather
      setFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const setFallbackData = () => {
    setCurrentWeather({
      temp: 32,
      weatherCode: 1,
      description: '晴時多雲 (常規夏日)',
      windSpeed: 12
    });
    setForecast([
      { date: '2026-07-21', tempMax: 33, tempMin: 28, weatherCode: 0, description: '晴朗 ☀️' },
      { date: '2026-07-22', tempMax: 32, tempMin: 27, weatherCode: 1, description: '晴時多雲 ⛅' },
      { date: '2026-07-23', tempMax: 32, tempMin: 27, weatherCode: 2, description: '多雲 ☁️' },
      { date: '2026-07-24', tempMax: 31, tempMin: 26, weatherCode: 61, description: '午後短暫雨 🌧️' },
      { date: '2026-07-25', tempMax: 33, tempMin: 28, weatherCode: 0, description: '晴朗 ☀️' },
    ]);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherDesc = (code: number): string => {
    if (code === 0) return '晴朗無雲';
    if ([1, 2, 3].includes(code)) return '晴時多雲';
    if ([45, 48].includes(code)) return '霧氣瀰漫';
    if ([51, 53, 55].includes(code)) return '毛毛細雨';
    if ([61, 63, 65].includes(code)) return '陣雨襲來';
    if ([80, 81, 82].includes(code)) return '局部短暫雨';
    if ([95, 96, 99].includes(code)) return '雷陣雨注意';
    return '多雲氣候';
  };

  const getWeatherIcon = (code: number, className = "w-6 h-6") => {
    if (code === 0) return <Sun className={`${className} text-[#FFB300]`} />;
    if ([1, 2, 3].includes(code)) return <CloudSun className={`${className} text-[#4FC3F7]`} />;
    if ([45, 48].includes(code)) return <Cloud className={`${className} text-gray-400`} />;
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className={`${className} text-[#1976D2]`} />;
    if ([95, 96, 99].includes(code)) return <CloudLightning className={`${className} text-[#E53935]`} />;
    return <Cloud className={`${className} text-gray-500`} />;
  };

  const formatDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[1]}/${parts[2]}`;
    }
    return dateStr;
  };

  // Check if any day has rain
  const hasRainInForecast = forecast.some(day => [61, 63, 65, 80, 81, 82, 95, 96, 99].includes(day.weatherCode));

  return (
    <div className="bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#1E1E1E] text-[#1E1E1E]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-sans font-bold text-xl tracking-tight flex items-center gap-2">
          <Sun className="w-6 h-6 text-[#FBC02D] fill-[#FBC02D]" />
          那霸實時天氣 ＆ 5日預報
        </h3>
        <button 
          onClick={fetchWeather}
          className="p-2 border-2 border-[#1E1E1E] rounded-xl hover:bg-[#F9F6F0] transition active:scale-95 shadow-[2px_2px_0px_0px_#1E1E1E] flex items-center justify-center"
          title="重新整理"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 border-4 border-[#1E1E1E] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-mono text-xs text-gray-500">正在觀測沖繩天空中...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Current Weather Box */}
          {currentWeather && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#E3F2FD] border-3 border-[#1E1E1E] rounded-2xl p-4 shadow-[3px_3px_0px_0px_#1E1E1E]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FFFFFE] border-2 border-[#1E1E1E] rounded-2xl shadow-[2px_2px_0px_0px_#1E1E1E]">
                  {getWeatherIcon(currentWeather.weatherCode, "w-12 h-12")}
                </div>
                <div>
                  <div className="font-mono text-xs text-blue-800 font-semibold tracking-wider bg-blue-100 px-2 py-0.5 rounded-full inline-block mb-1">
                    那霸市 · 實時觀測
                  </div>
                  <div className="text-3xl font-extrabold font-mono flex items-center">
                    {currentWeather.temp}
                    <span className="text-xl font-normal ml-0.5">°C</span>
                  </div>
                  <p className="text-sm font-bold text-gray-700 mt-0.5">{currentWeather.description}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-2 border-t-2 border-dashed border-[#1E1E1E]/20 md:border-t-0 md:border-l-2 md:pl-6 pt-2 md:pt-0">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span>沖繩夏秋常規：紫外線極強，體感溫度約 +3°C</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <Wind className="w-4 h-4 text-blue-500" />
                  <span>實時風速：{currentWeather.windSpeed} km/h (海風舒適)</span>
                </div>
              </div>
            </div>
          )}

          {/* 5-Day Forecast Grid */}
          <div>
            <h4 className="font-sans font-bold text-sm text-gray-500 uppercase tracking-wider mb-3">
              📅 5日行程天氣預測
            </h4>
            <div className="grid grid-cols-5 gap-2.5">
              {forecast.map((day, idx) => (
                <div 
                  key={idx}
                  className={`border-2 border-[#1E1E1E] rounded-xl p-2 flex flex-col items-center justify-between text-center transition hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_#1E1E1E] ${
                    idx === 0 ? 'bg-[#FFF9C4]' : 'bg-[#FFFFFE]'
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-gray-700">{formatDate(day.date)}</span>
                  <div className="my-2 bg-[#F9F6F0] p-1.5 border border-[#1E1E1E] rounded-lg">
                    {getWeatherIcon(day.weatherCode, "w-6 h-6")}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold">{day.tempMax}°</span>
                    <span className="font-mono text-[10px] text-gray-400">{day.tempMin}°</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 mt-1 truncate max-w-full">
                    {day.description.replace('朗無雲', '晴').replace('時多雲', '晴多雲')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rain / High Heat Warning */}
          <div className="bg-[#FFF3E0] border-2 border-[#1E1E1E] rounded-xl p-3 flex gap-2.5 items-start">
            <HelpCircle className="w-5 h-5 text-[#F57C00] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#E65100]">
              <span className="font-bold">約翰的晴雨備案提醒：</span>
              {hasRainInForecast ? (
                <span>預報顯示有局部陣雨！別擔心，下雨可以把戶外海灘移到 <strong className="underline">iias 沖繩豐崎</strong> 或 <strong className="underline">永旺名護店</strong> 逛街，或者帶小朋友在美麗海水族館看室內鯨鯊，完全不掃興！</span>
              ) : (
                <span>高溫炎熱注意！戶外景點（波上宮、萬座毛）一定要幫小朋友帶遮陽帽與大水壺，每30分鐘補水一次，防止中暑喔！</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
