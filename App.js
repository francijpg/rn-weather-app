import React, {useEffect, useState} from 'react';

import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Form from './components/Form';
import Weather from './components/Weather';
import {KELVIN_DEGREES} from './constants';

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
        const appId = 'f4724b3520be5275668b4a50823c1799';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

        try {
          const response = await fetch(url);
          const result = await response.json();
          setWeatherResult(result);
          setConsultWeather(false);

          // this modifies the background colors based on temperature
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
          showAlert();
        }
      }
    };
    verifyWeather();
  }, [city, consultWeather, country]);

  const showAlert = () => {
    Alert.alert('Error', 'No results, try another city or country', [
      {text: 'OK '},
    ]);
  };

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
