import { createMuiTheme, Grid } from "@material-ui/core";
import Header from "./Pages/Header/Header";
import MainPage from "./Pages/MainPage/MainPage";
import { ThemeProvider } from "@material-ui/core/styles";
import RTLProvider from "./RTLProvider";
import AddPatientPage from "./Pages/AddPatientPage/AddPatientPage";
import AddFilesPage from "./Pages/AddFilesPage/optionalFields";

const App: React.FC = () => {
  const theme = createMuiTheme({
    direction: "rtl",
  });

  return (
    <ThemeProvider theme={theme}>
      <RTLProvider theme={theme}>
        <Grid container>
          <Grid item xs={12} sm={12} lg={12}>
            {/* <Header /> */}
          </Grid>
          <Grid xs={12} sm={12} lg={12}>
            {/* <MainPage /> */}
            <AddPatientPage />
            <AddFilesPage />
          </Grid>
        </Grid>
      </RTLProvider>
    </ThemeProvider>
  );
};

export default App;
