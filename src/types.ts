/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ToiletInfo {
  name: string;
  locationDetails: string;
  distance: string;
  hasBabyTable: boolean; // For changing diapers or child helper
  note: string;
}

export interface ItineraryItem {
  id: string;
  day: number;
  date: string;
  time: string;
  activity: string;
  location?: string;
  description?: string;
  link?: string;
  toilets: ToiletInfo[];
  category: 'flight' | 'food' | 'hotel' | 'attraction' | 'shopping' | 'transport';
  parking?: string;       // Parking lot information & pricing
  parkingGuide?: string;  // Explicit entrance warning (e.g. Gokoku temple warning, Kouri shrimp steep path)
  backupSpots?: string;   // Alternative weather/time backup spots
  isBirthdaySpot?: boolean; // Highlight as a 3rd birthday special spot!
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  amountJpy: number;
  amountTwd: number;
  category: 'food' | 'shopping' | 'transport' | 'tickets' | 'stay' | 'other';
  createdBy?: string;
  createdAt: number;
}

export interface Memo {
  id: string;
  date: string;
  title: string;
  content: string;
  imageUrl?: string; // base64 string
  tags: string[];
  createdAt: number;
}

export interface WeatherInfo {
  temp: number;
  weatherCode: number;
  description: string;
  windSpeed: number;
  humidity?: number;
}

export interface DailyWeather {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  description: string;
}
