import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { List } from '../redux/types';

type DayWeatherProps = {
  day: List;
};
export default function DayWeather({ day }: DayWeatherProps) {
  const dt = new Date(day.dt * 1000);
  const tempCelsius = day.main.temp;

  return (
    <View style={styles.weatherContainer}>
      <Text>{dt.toDateString()}</Text>
      <Text>{tempCelsius}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#286BBC',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
