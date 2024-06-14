import { WeatherResponse } from '../types';

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

interface FetchWeatherRequestAction {
  type: typeof FETCH_WEATHER_REQUEST;
  payload: string;
}

interface FetchWeatherSuccessAction {
  type: typeof FETCH_WEATHER_SUCCESS;
  payload: WeatherResponse;
}

interface FetchWeatherFailureAction {
  type: typeof FETCH_WEATHER_FAILURE;
  payload: string;
}

export type WeatherActionTypes = FetchWeatherRequestAction | FetchWeatherSuccessAction | FetchWeatherFailureAction;

export const fetchWeatherRequest = (city: string) => ({
  type: FETCH_WEATHER_REQUEST,
  payload: city,
});

export const fetchWeatherSuccess = (data: WeatherResponse): FetchWeatherSuccessAction => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: data,
});

export const fetchWeatherFailure = (error: string): FetchWeatherFailureAction => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});
