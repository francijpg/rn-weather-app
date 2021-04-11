import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {KELVIN_DEGREES} from '../constants';

const Weather = ({weatherResult}) => {
  const {name, main} = weatherResult;

  if (!name) {
    return null;
  }

  const mainTemp = parseInt(main.temp - KELVIN_DEGREES, 10);
  const minTemp = parseInt(main.temp_min - KELVIN_DEGREES, 10);
  const maxTemp = parseInt(main.temp_max - KELVIN_DEGREES, 10);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.current]}>
        {mainTemp}
        <Text style={styles.temperature}>&#x2103;</Text>
        <Image
          style={styles.image}
          source={{
            uri: `https://openweathermap.org/img/w/${weatherResult.weather[0].icon}.png`,
          }}
        />
      </Text>

      <View style={styles.temperatures}>
        <Text style={styles.text}>
          Min <Text style={styles.temperature}>{minTemp} &#x2103;</Text>
        </Text>

        <Text style={styles.text}>
          Max <Text style={styles.temperature}>{maxTemp} &#x2103;</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  image: {
    width: 66,
    height: 58,
  },
  current: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'normal',
  },
  temperatures: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Weather;
