import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
export default function NavItem({ topic, getFunc }) {
  return (
    // each button item will send pass its respective topic to the function sending a GET request
    <ListItem button onClick={(e) => getFunc(topic)}>
      <ArrowRightRoundedIcon></ArrowRightRoundedIcon>
      <ListItemText primary={topic.name} />
    </ListItem>
  );
}
