import { Card, CardContent, Typography } from "@material-ui/core";

const InfoCard: React.FC = () => {
  return (
      <Card>
        <CardContent>
          <Typography>{`تعداد کل بیماران: `}</Typography>
        </CardContent>
      </Card>
  );
};

export default InfoCard;
