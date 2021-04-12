import React, {useEffect, useState} from 'react';

import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Form from './components/Form';
import Weather from './components/Weather';
import {KELVIN_DEGREES} from './constants';
import utils from './utils';
import config from './config';

const {showNotFoundResults} = utils;

const App = () => {
  const [searchTerm, setSearchTerm] = useState({
    city: '',
    country: '',
  });
  const [consultWeather, setConsultWeather] = useState(false);
  const [weatherResult, setWeatherResult] = useState({});
  const [bgcolor, setBgcolor] = useState('rgb(71, 149, 212)');

  const {city, country} = searchTerm;

  useEffect(() => {
    const verifyWeather = async () => {
      if (consultWeather) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${config.API_KEY}`;

        try {
          const response = await fetch(url);
          const result = await response.json();
          setWeatherResult(result);
          setConsultWeather(false);

          // this modifies the background colors according to the temperature of a city
          const {main} = result;
          const actual = main.temp - KELVIN_DEGREES;

          if (actual < 10) {
            setBgcolor('rgb( 105, 108, 149 )');
          } else if (actual >= 10 && actual < 25) {
            setBgcolor('rgb(71, 149, 212)');
          } else {
            setBgcolor('rgb( 178, 28, 61)');
          }
        } catch (error) {
          showNotFoundResults();
        }
      }
    };
    verifyWeather();
  }, [city, consultWeather, country]);

  const hideKeyBoard = () => {
    Keyboard.dismiss();
  };

  const bgColorApp = {
    backgroundColor: bgcolor,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyBoard()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.content}>
            <Weather weatherResult={weatherResult} />
            <Form
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setConsultWeather={setConsultWeather}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
  },
});

export default App;
