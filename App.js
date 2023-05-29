import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native'
import Router from './src/router/Router';
import { Provider } from 'react-redux';
import { STORE } from './src/store/storeConfig';
import * as Helpers from './src/helpers/Exporter'


const App = () => {

  return (
    <Provider store={STORE}>
      {/* <PersistGate persistor={PERSISTOR}> */}

        <SafeAreaView style={{ flex: 0, backgroundColor:Helpers.Theme.black  }} />
        <SafeAreaView style={{ flex: 1, backgroundColor:Helpers.Theme.black }}>
          <StatusBar barStyle="light-content" />

          <Router />
        </SafeAreaView>

      {/* </PersistGate> */}
    </Provider>

  );
};

export default App;
