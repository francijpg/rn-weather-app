import {Alert} from 'react-native';

export const showNotFoundResults = () => {
  Alert.alert('Error', 'No results. Try another city or country', [
    {text: 'OK '},
  ]);
};

export const showRequiredFields = () => {
  Alert.alert(
    'Error',
    'Please. Add a city and country before to start the search',
    [{text: 'Agreed '}],
  );
};

export default {
  showNotFoundResults,
  showRequiredFields,
};
