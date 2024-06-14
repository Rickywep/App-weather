import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_WEATHER_REQUEST,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  WeatherActionTypes,
} from '../actions/weatherActions';
import { WeatherResponse } from '../types';

const API_KEY = '1a5f3cde9a65291ab1b746fc0dfc80f3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

function* fetchWeather(action: WeatherActionTypes) {
  try {
    const response = yield call(axios.get, `${BASE_URL}?q=${action.payload}&appid=${API_KEY}&units=metric`);

    const data: WeatherResponse = response.data;
    yield put(fetchWeatherSuccess(data));
  } catch (error: any) {
    yield put(fetchWeatherFailure(error.message));
  }
}

function* weatherSaga(): Generator {
  yield takeEvery(FETCH_WEATHER_REQUEST, fetchWeather);
}

export default weatherSaga;
