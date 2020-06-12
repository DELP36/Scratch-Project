import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import axios from 'axios';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import TextField from '@material-ui/core/TextField';
import { Fab } from '@material-ui/core';

import Comment from './Comment.jsx';

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

const CommentsModal = (props) => {
  // might need to pass down and invoke getComments from FeedItem
  const [formValue, setFormValue] = useState('');

  const addComment = () => {
    const reqBody = {
      resourceId: props.resourceId,
      comment: {
        text: formValue,
        userName: 'Greg P- ScrumMaster, AtlasMaster',
      },
    };
    axios
      .post(`resource/comments`, reqBody)
      .then((res) => {
        setFormValue('');
        props.getComments();
        console.log('response from add Comment', res);
      })
      .catch((err) => console.log(`Error in CommentsModal addComment: ${err}`));
  };

  //iterate through the commentList that was passed down FeedItem to display comments onclick
  const commentsArray = props.commentList.map((el, i) => (
    <Comment text={el.text} date={el.date} key={`comment ${i}`} />
  ));
  return (
    <div>
      {commentsArray}
      <TextField
        variant="filled"
        onChange={(e) => setFormValue(e.target.value)}
        value={formValue}
      />
      <Fab color="primary" aria-label="add" onClick={addComment}>
        submit
        {/* <AddIcon /> */}
      </Fab>
    </div>
  );
};

export default CommentsModal;
