import { FC, ChangeEvent, useState } from "react";
import { Modal, InputLabel, Input } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectPatientId, setFileId } from "../../Redux/Slicer/idPasserSlice";

const GetActionName: FC = () => {
  const dispatch = useAppDispatch();
  const [newActionName, setNewActionName] = useState("");
  const [actionId, setActionId] = useState();
  const selectId = useAppSelector(selectPatientId);

  const newActionSubmit = async () => {
    const submit = new Promise((submitted, failed) => {
      axios
        .post("http://localhost:3003/actionName", {
          Name: newActionName,
          PatientId: selectId,
        })
        .then(async (res) => {
          if ((res.status = 201)) {
            // const fileFieldCreator = async () => {
            console.log(res.data.id);
            setActionId(res.data.id);
            // const patientFiles = new Promise((created, failed) => {
            await axios
              .post("http://localhost:3001/optionalForm", {
                ActionId: actionId,
              })
              .then((res) => {
                if ((res.status = 201)) {
                  console.log(res);
                  dispatch(setFileId(res.data.id));
                  return <Redirect to="/AddFiles" />;
                  // const postFile = () => {};
                  // created(postFile);
                } else {
                  failed(
                    console.log("patientFile Creating Failed", res.statusText)
                  );
                }
              })
              .catch((error) => {
                // failed(console.log(error));
              });
            // });

            // await patientFiles;
            // };

            // submitted(fileFieldCreator);
          } else {
            // failed(console.log("newAction Failed", res.statusText));
          }
        })
        .catch((error) => {
          // failed(console.log(error));
        });
    });

    await submit;
  };

  return (
    <Modal open={true}>
      <form onSubmit={newActionSubmit}>
        <InputLabel htmlFor="newAction">نام رویداد</InputLabel>
        <Input
          id="newAction"
          type="text"
          onSelect={(event: ChangeEvent<HTMLInputElement>) => {
            setNewActionName(event.target.value);
          }}
        />
        <Input type="submit" value="ثبت نام رویداد" />
      </form>
      {/* {modalEntry} */}
    </Modal>
  );
};

export default GetActionName;
