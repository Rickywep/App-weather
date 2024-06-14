import React, { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { fetchWeatherRequest } from '../redux/actions/weatherActions';
import { RootState } from '../redux/reducers';
import { DayWeather, Cities } from '../components';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeatherRequest('London'));
  }, [dispatch]);

  const handleCityPress = useCallback(
    (city: string) => {
      dispatch(fetchWeatherRequest(city));
    },
    [dispatch],
  );

  const listfiltered = useMemo(() => {
    if (weather.data) {
      const sameDate = new Set<string>();
      const today = weather.data.list[0];
      return weather.data.list.filter(day => {
        const date = day.dt_txt.toString().split(' ')[0];
        if (sameDate.has(date) || date === today.dt_txt.toString().split(' ')[0]) {
          return false;
        } else {
          sameDate.add(date);
          return true;
        }
      });
    }
  }, [weather.data]);

  if (weather.error) {
    return <Text>Error: {weather.error}</Text>;
  }

  if (!weather.data) {
    return null;
  }

  const today = weather.data.list[0];
  const tempCelsiusToday = today.main.temp;

  return (
    <View style={styles.container}>
      <Cities onPress={handleCityPress} cityName={weather.data.city.name} />
      {weather.loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={styles.weatherContainer}>
            <Text style={styles.title}>Current Weather Today in</Text>
            <Text style={styles.cityName}>{weather.data.city.name}</Text>
            <Text style={styles.temp}>{tempCelsiusToday}°C</Text>
            <Text style={styles.description}>{today.weather[0].description}</Text>
          </View>
          <FlatList
            data={listfiltered}
            renderItem={({ item }) => <DayWeather day={item} />}
            keyExtractor={item => item.dt.toString()}
            horizontal
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    gap: 16,
  },
  weatherContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'DMSans-Bold',
    color: '#162855',
  },
  cityName: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: 'DMSans-Bold',
    color: '#162855',
  },
  temp: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    color: '#162855',
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
    fontFamily: 'DMSans-Regular',
    color: '#535D66',
  },
});

export default Home;
