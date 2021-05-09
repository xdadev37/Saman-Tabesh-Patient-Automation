import { FC, StrictMode } from "react";
import { createMuiTheme, Grid } from "@material-ui/core";
import Header from "./Pages/Header/Header";
import MainPage from "./Pages/MainPage/MainPage";
import { ThemeProvider } from "@material-ui/core/styles";
import RTLProvider from "./RTLProvider";
import AddPatientPage from "./Pages/AddPatientPage/AddPatientPage";

const App: FC = () => {
  const theme = createMuiTheme({
    direction: "rtl",
  });

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RTLProvider theme={theme}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={12}>
              {/* <Header /> */}
            </Grid>
            <Grid xs={12} sm={12} lg={12}>
              {/* <MainPage /> */}
              <AddPatientPage />
            </Grid>
          </Grid>
        </RTLProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
