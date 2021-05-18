import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  Grid,
} from "@material-ui/core";
import Header from "./Pages/Header/Header";
import { ThemeProvider } from "@material-ui/core/styles";
import RTLProvider from "./RTLProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import AddPatientPage from "./Pages/AddPatientPage/AddPatientPage";

const App: React.FC = () => {
  const theme = createMuiTheme({
    direction: "rtl",
  });

  return (
    <ThemeProvider theme={theme}>
      <RTLProvider theme={theme}>
        <BrowserRouter>
          <Grid container>
            <Grid item xs={12} sm={12} lg={12}>
              <Header />
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
