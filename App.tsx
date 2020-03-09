import React from 'react';
import { RootState } from "src/redux/reducer/mainReducer";
import { Store } from "redux";
import { configureStore } from "src/redux/store/configureStore";
import { Provider } from 'react-redux';
import Wrapper from "src/common/wrapper/Wrapper";
import { Root } from "native-base";

const store: Store<RootState, any> = configureStore({});

const App = () => {
  return (
    <Provider store={store}>
      <Root>
        <Wrapper />
      </Root>
    </Provider>
  )
};

export default App;
