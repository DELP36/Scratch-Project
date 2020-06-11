import axios from 'axios';
import * as types from '../constants/actionTypes';

//Once backend has a GET request done, finish this function to render techs on the Navbar
export const getTech = () => {
  return (dispatch) => {
    axios
      .get(`/resource/tech`)
      .then((response) => {
        dispatch({
          type: types.GET_TECH,
          payload: response.data,
        });
      })
      .catch((err) =>
        console.log('there was an error in actions.js getTech:', err)
      );
  };
};

// Send get request to server for resource (tech name)
// Input: resource name
export const getResource = (currentTopic) => {
  return (dispatch) => {
    // console.log('request to : ', `/resource/${resource.toLowerCase()}`)
    axios
      // .get(`/resource/${resource.toLowerCase()}`)
      .get(`/resource/${currentTopic._id}`)
      .then((response) => {
        dispatch({
          type: types.GET_RESOURCE,
          payload: response.data,
        });
      });
  };
};

// Update the current topic to be rendered on screen (used once for initial load)
// Input: current topic (fetched from props)
export const updateTopic = (topic) => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_TOPIC,
      payload: topic,
    });
  };
};

// Send post request to server to add a new resource
// Input: resource name in the parameter and resource object to add to DB in body
export const addResource = (resource) => {
  return (dispatch) => {
    axios.post(`/resource/${resource.name}`, resource).then((response) => {
      dispatch({
        type: types.ADD_RESOURCE,
        payload: response.data,
      });
    });
  };
};

// add comment and send to db
// function moved to feedItem
// export const addComment = (comment) => {
//   axios
//     .post(`resource/comments`, comment)
//     .then((res) => {
//       return (dispatch) => {
//         dispatch({
//           type: types.ADD_COMMENT,
//           payload: res.locals.comment,
//         })
//       }
//     })
//     .catch(err => console.log(`Error in actions.js addComment ${err}`))
// }

// Send put request to increase like count
// Input: Id of the resource and the technology associated with the resource
export const upvote = (id) => {
  return (dispatch) => {
    axios.put('/resource/upvote', { resourceId: id }).then((response) => {
      dispatch({
        type: types.UPVOTE,
        payload: response.data,
      });
    });
  };
};

// Possibly add to DB to allow for negative numbers
// Send put request to increase like count
// Input: Id of the resource and the technology associated with the resource
export const downvote = (id) => {
  return (dispatch) => {
    axios.put('/resource/downvote', { resourceId: id }).then((response) => {
      dispatch({
        type: types.DOWNVOTE,
        payload: response.data,
      });
    });
  };
};
