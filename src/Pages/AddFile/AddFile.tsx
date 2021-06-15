import { FC, useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectPatientId } from "../../Redux/Slicer/idPasserSlice";
import { setPatientId, setModality } from "../../Redux/Slicer/filePageSlice";
import { setBackdrop } from "../../Redux/Slicer/backdropSlice";
import {
  setAddFileData,
  selectAddFilesData,
} from "../../Redux/Slicer/addFilesDataSlice";
import { setPhysicianData } from "../../Redux/Slicer/physiciansSlice";
import Page2 from "./Page2";

const AddFile: FC = () => {
  const dispatch = useAppDispatch();
  const patientId = useAppSelector(selectPatientId);
  const cardsData = useAppSelector(selectAddFilesData);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setBackdrop();
    axios
      .post("url", { id: patientId })
      .then((res) => {
        dispatch(setAddFileData(res.data.ModalityData));
        dispatch(setPhysicianData(res.data.PhysiciansData));
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(setBackdrop()));
  }, [patientId, dispatch]);

  const submit = (modality: string) => {
    setPatientId(patientId);
    setModality(modality);
    setCompleted(true);
  };

  const cardMapper = () => {
    for (let i = 0; i < cardsData.length; i += 2)
      <Grid container justify="space-evenly">
        <Card key={cardsData[i].id} onClick={() => submit(cardsData[i].id)}>
          <CardContent>
            <Typography variant="h5">{cardsData[i].value}</Typography>
            <Typography variant="subtitle2">
              {cardsData[i].description}
            </Typography>
          </CardContent>
        </Card>
        <Card
          key={cardsData[i + 1].id}
          onClick={() => submit(cardsData[i + 1].id)}
        >
          <CardContent>
            <Typography variant="h5">{cardsData[i + 1].value}</Typography>
            <Typography variant="subtitle2">
              {cardsData[i + 1].description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>;
  };

  return <Grid container>{completed ? <Page2 /> : cardMapper}</Grid>;
};

export default AddFile;
