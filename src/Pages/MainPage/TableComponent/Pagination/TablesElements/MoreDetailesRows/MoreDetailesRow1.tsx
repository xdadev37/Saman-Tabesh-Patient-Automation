import {
  TableRow,
  TableCell,
  Table,
  Avatar,
  TableBody,
  TableHead,
  Link,
} from "@material-ui/core";
import { ICollapsible } from "../Collapsible";

const MoreDetailesRow1: React.FC<ICollapsible> = () => {
  const rows1 = [
    {
      title: "کارت ملی",
      link: "",
    },
    {
      title: "برگ پاتولوژی",
      link: "",
    },
    {
      title: "برگ اول پرونده",
      link: "",
    },
    {
      title: "فرم رضایت بیمار",
      link: "",
    },
    {
      title: "گزارش MR",
      link: "",
    },
  ];

  return (
    <Table size="small">
      <TableHead>
        <TableCell>عکس پرسنلی بیمار</TableCell>
        {rows1.map((row) => (
          <TableCell key={row.title}>{row.title}</TableCell>
        ))}
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Avatar alt="Avatar" src=""></Avatar>
          </TableCell>
          {rows1.map((row) => (
            <TableCell key={row.title}>
              <Link href={row.link} target="_blank" rel="noreferrer">
                مشاهده عکس
              </Link>
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default MoreDetailesRow1;
