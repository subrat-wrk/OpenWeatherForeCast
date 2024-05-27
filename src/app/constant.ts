// export const baseWeatherURL =
//   'https://api.openweathermap.org/data/2.5/forecast?q=';
// export const urlSuffix = '&units=metric&APPID=fe3695759da76e0c9dcaf566634a08ed';

export const baseWeatherURL =
  'https://api.openweathermap.org/data/2.5/forecast?q=';
export const urlSuffix = '&units=metric&APPID=fe3695759da76e0c9dcaf566634a08ed';

// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

// 642e26e74fca78d7aa88a9104086a658
// fe3695759da76e0c9dcaf566634a08ed
// fe3695759da76e0c9dcaf566634a08ed

export const Cities = [
  { id: 1, name: 'Birmingham' },
  { id: 1, name: 'London' },
  { id: 1, name: 'Cardiff' },
];

export const LoadingStatus = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle',
};

export const constants: { [key: string]: any } = {
  LoadingStatus: {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
  },
};
