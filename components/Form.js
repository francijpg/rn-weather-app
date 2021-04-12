import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import utils from '../utils';

const {showRequiredFields} = utils;

const Form = ({searchTerm, setSearchTerm, setConsultWeather}) => {
  const {city, country} = searchTerm;
  const [buttonAnimation] = useState(new Animated.Value(1));

  const checkWeather = () => {
    if (!city.length || !country.length) {
      showRequiredFields();
      return;
    }
    setConsultWeather(true);
  };

  const inputAnimation = () => {
    Animated.spring(buttonAnimation, {
      toValue: 0.75,
      useNativeDriver: true,
    }).start();
  };

  const outputAnimation = () => {
    Animated.spring(buttonAnimation, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const animationStyle = {
    transform: [{scale: buttonAnimation}],
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            value={city}
            style={styles.input}
            // onChangeText={selectedCity =>
            //   setSearchTerm({...searchTerm, selectedCity})
            // }
            // eslint-disable-next-line no-shadow
            onChangeText={city => setSearchTerm({...searchTerm, city})}
            placeholder="City"
            placeholderTextColor="#666"
          />
        </View>
        <View>
          <Picker
            selectedValue={country}
            itemStyle={styles.itemList}
            // onValueChange={selectedCountry =>
            //   setSearchTerm({...searchTerm, selectedCountry})
            // }>
            // eslint-disable-next-line no-shadow
            onValueChange={country => setSearchTerm({...searchTerm, country})}>
            <Picker.Item label="-- Select a Country --" value="" />
            <Picker.Item label="United States" value="US" />
            <Picker.Item label="Chile" value="CL" />
            <Picker.Item label="México" value="MX" />
            <Picker.Item label="Perú" value="PE" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Spain" value="ES" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          delayPressIn
          onPressIn={() => inputAnimation()}
          onPressOut={() => outputAnimation()}
          onPress={() => checkWeather()}>
          <Animated.View style={[styles.btnSearch, animationStyle]}>
            <Text style={styles.textSearch}>Look Up Weather Status</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  itemList: {
    height: 120,
    backgroundColor: '#FFF',
  },
  btnSearch: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textSearch: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Form;
