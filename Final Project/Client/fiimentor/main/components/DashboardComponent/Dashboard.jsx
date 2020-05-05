import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TitleContainer, DashboardContainer, CardsContainer } from './DashboardStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 200,
    marginBottom: 25,
    marginTop: 35,
    marginRight: 25,
  },
  media: {
    height: 70,
  },
});

export default function Dashboard() {

  const classes = useStyles();
  return (
    <DashboardContainer>
      <TitleContainer>
        Tablou de lucru
      </TitleContainer>
      <CardsContainer>
        <Card className={classes.root}>
          <CardActionArea>

            <CardContent>
              <TitleContainer>
                Postări
              </TitleContainer>
            </CardContent>

            <CardMedia
              className={classes.media}
              image="/static/images/logoPost.png"
              title="logo"
            />

            <CardContent>
              <Typography gutterBottom variant="h6">
                Creează o postare
              </Typography>
            </CardContent>

          </CardActionArea>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>

            <CardContent>
              <TitleContainer>
                Postări
              </TitleContainer>
            </CardContent>

            <CardMedia
              className={classes.media}
              image="/static/images/logoPost.png"
              title="logo"
            />

            <CardContent>
              <Typography gutterBottom variant="h6">
                Vezi postările
            </Typography>
            </CardContent>

          </CardActionArea>
        </Card>
      </CardsContainer>
    </DashboardContainer>
  );
}