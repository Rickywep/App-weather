import { View, Text, FlatList, Pressable } from 'react-native';
import React from 'react';
import { cities } from '../data/data';

type CitiesProps = {
  onPress: (city: string) => void;
  cityName: string;
};
export default function Cities({ onPress, cityName }: CitiesProps) {
  return (
    <View style={{ height: 60 }}>
      <Text style={{ textAlign: 'center' }}>Choose a city</Text>
      <FlatList
        data={cities}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPress(item)}
            style={{
              margin: 8,
              backgroundColor: item === cityName ? 'lightblue' : 'lightgray',
              height: 26,
              padding: 4,
              paddingHorizontal: 8,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: item === cityName ? 'blue' : 'black',
                fontFamily: 'DMSans-Regular',
              }}
            >
              {item}
            </Text>
          </Pressable>
        )}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
