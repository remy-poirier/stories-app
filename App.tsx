import React from 'react';
import { RootState } from "src/redux/reducer/mainReducer";
import { Store } from "redux";
import { configureStore } from "src/redux/store/configureStore";
import { Provider } from 'react-redux';
import Wrapper from "src/common/wrapper/Wrapper";
import { Root } from "native-base";
import { ApplicationProvider } from "@ui-kitten/components";
import { mapping, dark as darkTheme } from '@eva-design/eva';

const store: Store<RootState, any> = configureStore({});

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider theme={darkTheme} mapping={mapping}>
      <Root>
        <Wrapper />
      </Root>
      </ApplicationProvider>
    </Provider>
  )
};

export default App;
