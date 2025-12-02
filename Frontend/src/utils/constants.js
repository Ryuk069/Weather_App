// Temperature conversion
export const kelvinToCelsius = (kelvin) => {
  if (kelvin == null) return "-";
  return (kelvin - 273.15).toFixed(0);
};

// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fallback values
export const FALLBACK_VALUES = {
  temperature: '26',
  wind: '50 mph',
  humidity: '99 %',
  condition: 'Clear Sky'
};

// Time intervals (in milliseconds)
export const TIME_UPDATE_INTERVAL = 60000; // 1 minute
export const STALE_TIME = 1000 * 60 * 5; // 5 minutes
