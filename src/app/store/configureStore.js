import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import firebase from "../config/config";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

const rrfirebaseConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true
};

export const configureStore = preloadedState => {
  const middleWares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const middlewareEnhancer = applyMiddleware(...middleWares);
  const storeEnhancer = [middlewareEnhancer];
  const composedEnhancer = composeWithDevTools(
    ...storeEnhancer,
    reactReduxFirebase(firebase, rrfirebaseConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers/rootReducer", () => {
        const newRootReducer = require("../reducers/rootReducer").default;
        store.replaceReducer(newRootReducer);
      });
    }
  }
  return store;
};
