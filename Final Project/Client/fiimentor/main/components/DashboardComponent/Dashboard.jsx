import React, {FC, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    CardsContainer,
    DashboardContainer,
    Notification,
    NotificationsContainer,
    TitleContainer,
} from './DashboardStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import type {SearchedPosts} from '../../store/Post/searchPostReducer';
import {getNotificationsThunk} from '../../store/Notifications/getNotificationsThunk';
import {connect} from 'react-redux';
import type {AppState} from '../../store/AppState';
import type {UserToken} from '../../store/User/tokenReducer';
import {AuthorContainer, PostTitle} from '../PostDetailsComponent/PostDetailsStyles';
import {Context} from '../../Context';
import {Label, Badge, Button} from 'reactstrap';

interface Store {
    notifications: SearchedPosts;
    token: UserToken;
}

interface Dispatch {
    getNotifications(authorizer: string): void;
}

type Props = Store & Dispatch;

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

const UnconnectedDashboard: FC<Props> = ({notifications, token, ...props}) => {

    const [notificationsVisibility, setVisibility] = useState(false);

    useEffect(() => {
        props.getNotifications(token);
    }, []);

    const setVisibile = () => {
        setVisibility(!notificationsVisibility);
    };

    const classes = useStyles();

    return (
        <DashboardContainer>
            <CardsContainer>
                <Card className={classes.root}>
                    <Link href="/post/create">
                        <CardActionArea>

                            <CardContent>
                                <TitleContainer>
                                    Postari
                                </TitleContainer>
                            </CardContent>

                            <CardMedia
                                className={classes.media}
                                image="/static/images/logoPost.png"
                                title="logo"
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    Creeaza o postare
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
                                    Postari
                                </TitleContainer>
                            </CardContent>

                            <CardMedia
                                className={classes.media}
                                image="/static/images/logoPost.png"
                                title="logo"
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    Vezi postarile
                                </Typography>
                            </CardContent>

                        </CardActionArea>
                    </Link>
                </Card>
            </CardsContainer>

            <NotificationsContainer>
                <div>
                    <Button color="info"  size="lg" outline onClick={setVisibile}>
                        Notificari <Badge color="info">{notifications.total || 0}</Badge>
                    </Button>
                </div>
                {
                    notifications
                    && notifications.posts
                    && notificationsVisibility
                    && notifications.posts.map((post, index) => {

                    const id = post.pmessageID ? post.pmessageID : post.postID;
                    const type = post.pmessageID ? 'privateMessage' : 'post';

                    return (
                        <Link href="/post/[id]" as={`/post/${id}&${type}`} key={index}>

                            <Notification>
                                <PostTitle>
                                    {post.title || 'Aceasta postare nu are titlu'}
                                </PostTitle>
                                <AuthorContainer>
                                    Postat de {post.author} pe data de {Context.dateService.formatTime(post.timestamp)}
                                </AuthorContainer>
                            </Notification>
                        </Link>
                    )
                })}
            </NotificationsContainer>
        </DashboardContainer>
    );
};

const mapStateToProps = ({notifications, token}: AppState): Store => ({
    notifications,
    token,
});

const mapDispatchToProps: Dispatch = {
    getNotifications: getNotificationsThunk,
};

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(UnconnectedDashboard);
