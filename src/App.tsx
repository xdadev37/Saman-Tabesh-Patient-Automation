import { createMuiTheme, Grid } from "@material-ui/core";
import Header from "./Pages/Header/Header";
import MainPage from "./Pages/MainPage/MainPage";
import { ThemeProvider } from "@material-ui/core/styles";
import RTLProvider from "./RTLProvider";
import AddPatientPage from "./Pages/AddPatientPage/AddPatientPage";
// import AddFilesPage from "./Pages/AddFilesPage/optionalFields";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
            <Switch>
              <Grid item xs={12} sm={12} lg={12}>
                <Route component={MainPage} path="/" />
                <Route component={AddPatientPage} path="/addNewPatient" />
                {/* <Route component={AddFilesPage} path="/AddFiles" /> */}
              </Grid>
            </Switch>
          </Grid>
        </BrowserRouter>
      </RTLProvider>
    </ThemeProvider>
  );
};

export default App;
