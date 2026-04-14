import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, CloudSnow, Wind } from 'lucide-react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // New York coordinates
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true');
        const data = await response.json();
        if (data.current_weather) {
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            code: data.current_weather.weathercode
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-4 h-4 text-amber-500" />;
    if (code <= 3) return <Cloud className="w-4 h-4 text-slate-400" />;
    if (code <= 48) return <Wind className="w-4 h-4 text-slate-400" />;
    if (code <= 67) return <CloudRain className="w-4 h-4 text-blue-400" />;
    if (code <= 77) return <CloudSnow className="w-4 h-4 text-blue-200" />;
    if (code <= 82) return <CloudRain className="w-4 h-4 text-blue-500" />;
    if (code <= 99) return <CloudLightning className="w-4 h-4 text-amber-600" />;
    return <Sun className="w-4 h-4 text-amber-500" />;
  };

  if (loading) return <div className="w-12 h-4 bg-slate-100 animate-pulse rounded-full"></div>;
  if (!weather) return null;

  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-slate-800/50 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="flex flex-col items-start">
        <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold leading-none">New York</span>
        <div className="flex items-center gap-1.5">
          {getWeatherIcon(weather.code)}
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{weather.temp}°C</span>
        </div>
      </div>
    </div>
  );
}
