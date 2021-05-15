import { FC, Fragment } from "react";
import {
  Table,
  TableRow,
  TableCell,
  Collapse,
  Box,
  TableHead,
  TableBody,
  Avatar,
  Link,
} from "@material-ui/core";
import ButtonsGroup from "./ButtonsGroup";
import { useAppSelector } from "../../../../../Redux/hook";
import { selectOpen } from "../../../../../Redux/Slicer/collapsibleSlice";
import { selectDataGrids } from "../../../../../Redux/Slicer/dataGridSlice";

const MoreDetailsTable: FC = () => {
  const open = useAppSelector(selectOpen);
  const selectDataGridAN = useAppSelector(selectDataGrids);

  return (
    <Fragment>
      {selectDataGridAN.map((data) => (
        <TableRow key={data.patientId}>
          <TableCell colSpan={6}>
            <Collapse in={open} unmountOnExit>
              <Box>
                <Table size="small">
                  <TableHead>
                    <TableCell>عکس پرسنلی بیمار</TableCell>
                    <TableCell>کپی کارت ملی بیمار</TableCell>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Avatar src={data.avatar} alt="Avatar" />
                      </TableCell>
                      <TableCell>
                        <Link href={data.nationalIdDoc}>مشاهده پی دی اف</Link>
                      </TableCell>

                      {/* Buttons */}
                      <ButtonsGroup />
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
};

export default MoreDetailsTable;
