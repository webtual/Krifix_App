import React from 'react';

/*  Redux Files  */
import store from './src/redux/store/store'
import { Provider } from 'react-redux'
import AppNavigator from './src/navigations/AppNavigator';


const App = () => {

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
