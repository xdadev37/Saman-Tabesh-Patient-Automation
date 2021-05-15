import { FC, ChangeEvent, Fragment, useState } from "react";
import { InputLabel, Input, FormHelperText, Modal } from "@material-ui/core";
import FilesFields from "./filesFields";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { setComment } from "../../Redux/Slicer/patientInfoSlice";
import { selectOptionalField } from "../../Redux/Slicer/patientInfoSlice";
import axios from "axios";
import {
  selectPatientId,
  setFileId,
  selectFiletId,
} from "../../Redux/Slicer/idPasserSlice";

const OptionalFields: FC = () => {
  const dispatch = useAppDispatch();
  const optionalField = useAppSelector(selectOptionalField);
  const selectId = useAppSelector(selectPatientId);
  const [submitNewAction, setSubmitNewAction] = useState(true);
  const [newActionName, setNewActionName] = useState("");
  const [actionId, setActionId] = useState();
  const fileId = useAppSelector(selectFiletId);

  const newActionSubmit = async () => {
    const submit = new Promise((submitted, failed) => {
      axios
        .post("http://localhost:3003/actionName", {
          Name: newActionName,
          PatientId: selectId,
        })
        .then((res) => {
          if ((res.status = 201)) {
            submitted(async () => {
              setActionId(res.data.id);
              const patientFiles = new Promise((created, failed) => {
                axios
                  .post("http://localhost:3001/optionalForm", {
                    ActionId: actionId,
                  })
                  .then((res) => {
                    if ((res.status = 201)) {
                      created(() => {
                        dispatch(setFileId(res.data.id));
                        setSubmitNewAction(false);
                      });
                    } else {
                      failed(
                        console.log(
                          "patientFile Creating Failed",
                          res.statusText
                        )
                      );
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });

              await patientFiles;
            });
          } else {
            failed(console.log("newAction Failed", res.statusText));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    await submit;
  };

  const submitComment = async () => {
    const comment = new Promise((sent, rejected) => {
      axios
        .patch(`http://localhost:3001/optionalForm/${fileId}`, {
          Comment: optionalField.Comment,
        })
        .then((res) => {
          if ((res.status = 201)) {
            sent(console.log("کامنت رفت", res.statusText));
          } else {
            rejected(console.log("کامنت نرفت"));
          }
        });
    });

    await comment;
  };

  return (
    <Fragment>
      <Modal open={submitNewAction}>
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
      </Modal>

      {/* Files */}
      <FilesFields />
      <form onSubmit={submitComment}>
        {/* Comment */}
        <InputLabel htmlFor="Comment">توضیحات</InputLabel>
        <Input
          id="Comment"
          type="text"
          rows={5}
          inputProps={{ maxLength: 800 }}
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setComment(event.target.value));
          }}
        />
        <Input type="submit" value="ثبت توضیحات" />
        <FormHelperText>حداکثر تعداد کاراکتر مجاز : 800</FormHelperText>
      </form>
    </Fragment>
  );
};

export default OptionalFields;
