import { ColorModeScript, extendTheme, ThemeProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './redux/store';
import App from './App';

// Define a custom theme that extends the default Chakra theme
const customTheme = extendTheme({
  colors: {
    brand: {
      500: '#00bfff',
    },
  },
});



const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const persistor = persistStore(store);

root.render(
  <ThemeProvider theme={customTheme}>
    <ColorModeScript />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
