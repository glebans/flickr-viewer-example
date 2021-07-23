import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SimplePopover from './SimplePopover';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.data.url_s}
                    title={props.data.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.data.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {props.data.bookmarked ?
                    (<Button size="small"
                        color="primary"
                        onClick={() => props.removeBookmark(props.data)}>
                        Remove Bookmark
                    </Button>) : (<Button size="small"
                        color="primary"
                        onClick={() => props.bookmarkItem(props.data)}>
                        Bookmark It!
                    </Button>)}
                <SimplePopover data={props.data.tags}></SimplePopover>
            </CardActions>
        </Card>
    );
}
