import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > form > div": {
        paddingTop: theme.spacing(2),
        paddingInline: theme.spacing(5),
        paddingBottom: theme.spacing(5),
      },
      "& > form > #checkEntries > .hr": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
      "& > form > #checkEntries > div > p": {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      "& > #mainFilesUI": {
        paddingTop: theme.spacing(3),
        paddingInline: theme.spacing(5),
        paddingBottom: theme.spacing(3),
      },
      "& > form > #mainInfoUI > div > label": {
        marginBottom: theme.spacing(2),
      },
      "& > form > #mainInfoUI > div": {
        paddingTop: theme.spacing(2),
      },
    },
  })
);
