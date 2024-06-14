import React from 'react';
import { Provider } from 'react-redux';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/redux/store';
import { HomeScreen } from './src/screens';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              title: 'Weather App',
              headerTitleAlign: 'center',
              headerTintColor: '#162855',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
                fontFamily: 'DMSans-Bold',
              },
            }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
