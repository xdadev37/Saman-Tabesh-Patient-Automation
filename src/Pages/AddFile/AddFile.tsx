import { FC, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectPatientId } from "../../Redux/Slicer/idPasserSlice";
import {
  setAddFileData,
  selectAddFilesData,
} from "../../Redux/Slicer/addFilesDataSlice";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";

const AddFile: FC = () => {
  const dispatch = useAppDispatch();
  const patientId = useAppSelector(selectPatientId);
  const cardsData = useAppSelector(selectAddFilesData);

  useEffect(() => {
    axios
      .post("url", { id: patientId })
      .then((res) => {
        dispatch(setAddFileData(res.data));
      })
      .catch((error) => console.log(error));
  }, [patientId, dispatch]);

  const submit = (modality: number) => {};

  const cardMapper = () => {
    for (let i = 0; i < cardsData.length; i += 2)
      <Grid container justify="space-evenly">
        <Card key={cardsData[i].id}>
          <CardContent>
            <Typography variant="h5">{cardsData[i].value}</Typography>
            <Typography variant="subtitle2">
              {cardsData[i].description}
            </Typography>
          </CardContent>
        </Card>
        <Card key={cardsData[i + 1].id}>
          <CardContent>
            <Typography variant="h5">{cardsData[i + 1].value}</Typography>
            <Typography variant="subtitle2">
              {cardsData[i + 1].description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>;
  };

  return <Grid container>{cardMapper}</Grid>;
};

export default AddFile;
