// install to support react-native console time calculate
import 'react-native-console-time-polyfill';
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {
  setCustomView,
  setCustomText,
  setCustomImage,
  setCustomTextInput,
  setCustomTouchableOpacity,
} from 'react-native-global-props';

import { Global } from 'App/Theme';
import createStore from 'App/Stores';
import SplashScreen from 'App/Containers/Splash/SplashScreen';
import AppNavigator from 'App/Navigators/AppNavigator';

const reduxStore = createStore();

export const { store, persistor } = reduxStore;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Calling the functions and passing the custom props into their respective params
    setCustomView(Global.ViewProps);
    setCustomText(Global.TextProps);
    setCustomImage(Global.ImageProps);
    setCustomTextInput(Global.TextInputProps);
    setCustomTouchableOpacity(Global.TouchableOpacityProps);

    __DEV__ && console.log('@Apply global theme!');
  }

  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md
       */
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
