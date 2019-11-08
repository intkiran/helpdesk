import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import reducers from "./store/reducers";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { setupInterceptors } from "./services/axiosInstance";
import Spinner from "./components/spinner";

import * as serviceWorker from "./serviceWorker";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
setupInterceptors(store, persistor);

const app = (
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <BrowserRouter forceRefresh={true}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
