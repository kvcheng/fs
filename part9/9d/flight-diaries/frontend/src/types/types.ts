export const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
}

export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
}

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export interface Diary {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export type NewDiaryEntry = Omit<Diary, 'id'>;
