import { FC, useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPatientId } from "../../../Redux/Slicer/StatePasserSlice/idPasserSlice";
import { setPatientId, setModality } from "../../../Redux/Slicer/CheckDataSlice/filePageSlice";
import { setBackdrop } from "../../../Redux/Slicer/GlobalReduxUIState/backdropSlice";
import {
  setAddFileData,
  selectAddFilesData,
} from "../../../Redux/Slicer/CachedDataSlice/addFilesDataSlice";
import { setPhysicianData } from "../../../Redux/Slicer/CachedDataSlice/physiciansSlice";
import Page2 from "./Page2";

const AddFile: FC = () => {
  const dispatch = useAppDispatch();
  const patientId = useAppSelector(selectPatientId);
  const cardsData = useAppSelector(selectAddFilesData);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    dispatch(setBackdrop(true));
    axios
      .post("url", { id: patientId })
      .then((res) => {
        dispatch(setAddFileData(res.data.ModalityData));
        dispatch(setPhysicianData(res.data.PhysiciansData));
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(setBackdrop(false)));
  }, [patientId, dispatch]);

  const submit = (modality: string) => {
    setPatientId(patientId);
    setModality(modality);
    setCompleted(true);
  };

  const cardMapper = () => {
    let i = 0;
    const cardsDataLength = cardsData.length;
    const card1Action = () => {
      submit(cardsData[i].id);
    };
    const card2Action = () => {
      submit(cardsData[i + 1].id);
    };

    for (i; i < cardsDataLength; i += 2)
      <Grid container justify="space-evenly">
        <Card key={cardsData[i].id} onClick={card1Action}>
          <CardContent>
            <Typography variant="h5">{cardsData[i].value}</Typography>
            <Typography variant="subtitle2">
              {cardsData[i].description}
            </Typography>
          </CardContent>
        </Card>
        <Card key={cardsData[i + 1].id} onClick={card2Action}>
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
