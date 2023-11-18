import React from 'react';
import type {FC} from 'react';

import RootStack from './navigation/RootStack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ThemeProviderContext from './components/ThemeProvider';

const gestureStyle = {flex: 1};

const App: FC = () => {
  return (
    <GestureHandlerRootView style={gestureStyle}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProviderContext>
            <RootStack />
          </ThemeProviderContext>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
