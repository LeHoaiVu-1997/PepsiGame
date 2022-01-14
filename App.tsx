import React from 'react';
import RootNavigator from './src/presentation/navigation/RootNavigator';
import {store} from './src/presentation/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
