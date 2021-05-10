import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
  Link,
} from "@material-ui/core";

const MoreDetailsRow2: React.FC = () => {
  const rows2 = [
    {
      title: "گزارش CT",
      link: "",
    },
    {
      title: "گزارش PET",
      link: "",
    },
    {
      title: "گزارش سونو",
      link: "",
    },
    {
      title: "گزارش ماموگرافی",
      link: "",
    },
  ];

  return (
    <Table size="small">
      <TableHead>
        {rows2.map((row) => (
          <TableCell key={row.title}>{row.title}</TableCell>
        ))}
        <TableCell>توضیحات</TableCell>
      </TableHead>
      <TableBody>
        <TableRow>
          {rows2.map((row) => (
            <TableCell key={row.title}>
              <Link href={row.link} target="_blank" rel="noreferrer">
                مشاهده عکس
              </Link>
            </TableCell>
          ))}
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default MoreDetailsRow2;
