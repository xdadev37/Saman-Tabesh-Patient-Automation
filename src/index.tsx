import { StrictMode, Suspense } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <StrictMode>
    <Suspense
      fallback={
        <Backdrop open={true}>
          <CircularProgress color="secondary" />
        </Backdrop>
      }
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
