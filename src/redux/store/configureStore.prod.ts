import { applyMiddleware, createStore, Store } from "redux";
import { rootReducer, RootState } from "src/redux/reducer/mainReducer";
import thunk from "redux-thunk";

const configureStore = (preloadedState: any): Store<RootState, any> => {
  const store: Store<RootState, any> = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  );

  return store;
};

export default configureStore;
