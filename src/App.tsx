import { FC, useMemo } from "react";
import { Grid, CssBaseline } from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Header from "./Pages/Header/Header";
import RTLProvider from "./GloballyComponents/RTLProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import AddPatientPage from "./Pages/AddPatientPage/AddPatientPage";
import { useAppSelector } from "./Redux/hook";
import { selectDarkMode } from "./Redux/Slicer/GlobalReduxUIState/darkModeSlice";
import { selectLogin } from "./Redux/Slicer/AuthSlice/loginSlice";
import Login from "./Pages/Admin/Login/Login";
import GlobalRedux from "./GloballyComponents/globalRedux";

const App: FC = () => {
  const darkMode = useAppSelector(selectDarkMode);
  const login = useAppSelector(selectLogin);

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
        <CssBaseline />
        {login ? (
          <BrowserRouter>
            <Grid container justify="center">
              <Header />
              <Grid
                container
                justify="center"
                style={{ marginTop: 90, marginBottom: 50, marginInline: 150 }}
              >
                <Switch>
                  <Route component={MainPage} exact path="/" />
                  <Route component={AddPatientPage} path="/addNewPatient" />
                </Switch>
              </Grid>
            </Grid>
          </BrowserRouter>
        ) : (
          <Login />
        )}
        <GlobalRedux />
      </RTLProvider>
    </ThemeProvider>
  );
};

export default App;
