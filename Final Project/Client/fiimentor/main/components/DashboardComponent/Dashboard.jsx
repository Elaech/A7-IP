import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TitleContainer, DashboardContainer, CardsContainer, PostContainer, AuthorContainer, PostTitle, LogoContainer, ContentContainer, PostNr2, PostNr1, ButtonStyles } from './DashboardStyles';
import {Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import {LogoPosts} from '../../globalStyledVariables';


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
      <CardsContainer>
        <Card className={classes.root}>
          <Link href="/post/create">
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
          </Link>
        </Card>
        <Card className={classes.root}>
          <Link href="/post/posts">
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
          </Link>
        </Card>
      </CardsContainer>

 <PostContainer>
 <LogoContainer>
        <LogoPosts/>
    </LogoContainer>
    <PostNr1>
    <PostTitle>
        {'Aceasta postare nu are titlu'}
    </PostTitle>
    <AuthorContainer>
        Postat de "autor" pe data de "data"
    </AuthorContainer>
    <ContentContainer>
    Sudden looked elinor off gay estate nor silent. Son read such next see the rest two. Was use extent old entire sussex. Curiosity remaining own see repulsive household advantage son additions
    
    </ContentContainer>
    </PostNr1>

    <PostNr2>
    <PostTitle>
        {'Aceasta postare nu are titlu'}
    </PostTitle>
    <AuthorContainer>
        Postat de "autor" pe data de "data"
    </AuthorContainer>
    <ContentContainer>
    Sudden looked elinor off gay estate nor silent. Son read such next see the rest two. Was use extent old entire sussex. Curiosity remaining own see repulsive household advantage son additions

    </ContentContainer>
    </PostNr2>
    <ButtonStyles>
    <Button>
        Vezi mai multe posturi
    </Button>
    </ButtonStyles>
  </PostContainer>
    
    </DashboardContainer>
  );
}