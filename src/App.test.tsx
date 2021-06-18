import { render } from "@testing-library/react";
import App from "./App";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

it("App Rendered Correctly", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
