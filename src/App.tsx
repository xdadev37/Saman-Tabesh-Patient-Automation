import { FC, useMemo, useState } from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Header from "./Pages/Header/Header";
import RTLProvider from "./RTLProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import AddPatientPage from "./Pages/AddPatientPage/AddPatientPage";

const App: FC = () => {
  const [darkMode, setDarkMode] = useState(
    useMediaQuery("(prefers-color-scheme: light)")
  );

  const theme = useMemo(
    () =>
      createMuiTheme({
        direction: "rtl",
        palette: {
          type: darkMode ? "dark" : "light",
          primary: {
            main: "#2962ff",
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <RTLProvider theme={theme}>
        <BrowserRouter>
          <Grid container>
            <Grid item xs={12} sm={12} lg={12}>
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <Switch>
                <Route component={MainPage} exact path="/" />
                <Route component={AddPatientPage} path="/addNewPatient" />
              </Switch>
            </Grid>
          </Grid>
        </BrowserRouter>
      </RTLProvider>
    </ThemeProvider>
  );
};

export default App;
