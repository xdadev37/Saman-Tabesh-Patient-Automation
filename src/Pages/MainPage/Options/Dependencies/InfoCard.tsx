import { Card, CardContent, Typography } from "@material-ui/core";

const InfoCard: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2">{`تعداد کل بیماران : `}</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
