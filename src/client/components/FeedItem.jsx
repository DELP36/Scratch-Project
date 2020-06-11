import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import CommentsModal from './CommentsModal';

const useStyles = makeStyles({
  itemWrap: {
    background: '#fdfdfd',
    marginBottom: 15,
    minWidth: 350,
  },
  itemActions: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  itemDiv: {
    marginTop: 8,
    marginBottom: 8,
  },
});

const FeedItem = (props) => {
  const classes = useStyles();
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [likes, setLikes] = useState(props.likes);
  let data;

  // useEffect(() => {
  //   setLikes(props.likes);
  // }, [props.likes]);

  const getComments = () => {
    fetch(`/resource/comments/${props.id}`)
      // fetch(`/resource/comments/5ee15416955bd9125fbdcabd`)
      .then((res) => res.json())
      .then((response) => {
        setCommentList(response);
      });
    // .then(response => setCommentList(data));
  };
  // toggles the heart icon and calls action to increment/decrement 'likes' accordingly
  // props.liked, props.tech, and props.id passed down from DB to parent component to FeedItem
  const toggleLike = () => {
    props.upvote(props.id, props.tech);
  };

  const toggleDislike = () => {
    props.downvote(props.id, props.tech);
  };

  const toggleComments = () => {
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
      getComments();
    }
  };
  let comments = null;
  if (showComments)
    comments = (
      <CommentsModal
        commentList={commentList}
        getComments={getComments}
        resourceId={props.id}
      />
    );
  return (
    <Card className={classes.itemWrap}>
      <CardContent>
        <Box>
          {/* displays resource title */}
          <Typography variant="h6">{props.name}</Typography>
        </Box>
        {/* displays resource description */}
        <Typography variant="body1">{props.description}</Typography>
        <Divider className={classes.itemDiv} />
        <div className={classes.itemActions}>
          {/* displays resource link */}
          <Button size="small" color="primary">
            <a href={props.url} target="_blank">
              Visit Resource
            </a>
          </Button>
          <Button size="small" color="primary" onClick={() => toggleComments()}>
            Comments
          </Button>
          {/* toggles heart */}
          <Button
            color="primary"
            size="small"
            onClick={() => {
              props.upvote(props.id, props.tech);
              setLikes(likes + 1);
            }}
          >
            {likes}
            <ThumbUpIcon />
          </Button>
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              props.downvote(props.id, props.tech);
              setLikes(likes - 1);
            }}
          >
            <ThumbDownIcon />
            {/* {props.likes} */}
          </Button>
        </div>
        {comments}
      </CardContent>
    </Card>
  );
};

export default FeedItem;
