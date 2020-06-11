const express = require('express');
const resourceController = require('../controllers/resourceController');
const router = express.Router();

// get req /tech
// ==========================
// GET LIST OF TECHS --> React, Redux, etc.
// ==========================
router.get('/tech', resourceController.getTech, (req, res) => {
  return res.status(200).json(res.locals.techList);
});

// =========================
// GET COMMENT
// =========================
router.get('/comments/:id', resourceController.getComment, (req, res) => {
  return res.status(200).json(res.locals.comments);
});

// =========================
// CREATE COMMENT
// =========================
router.post('/comments', resourceController.createComment),
  (req, res) => {
    return res.status(200).json(res.locals.comments);
  };

// =================================
// GET OUR array of RESOURCES BY TECH:ID
// =================================
router.get('/:id', resourceController.getResources, (req, res) => {
  return res.status(200).json(res.locals.resources);
});

// =========================
// CREATE/ ADD RESOURCE
// =========================
router.post('/create', resourceController.createResources, (req, res) => {
  return res.status(200).json(res.locals.tech);
});

router.post(
  '/:name',
  // adds resource by getting TechId for the tech_name inputted(i.e. react)
  // PLEASE NOTE: RESOURCES Table does not take in tech_name(aka tech)
  // ONLY TECHS table knows tech
  // so we must get tech_id before placing the resource in the Resources Table
  // resourceController.getTechId,
  // resourceController.addResource,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

// Add a like and return the new list of resources
router.put(
  '/upvote',
  resourceController.addLike,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

// Subtract a like and return the new list of resources
router.put(
  '/downvote',
  resourceController.subtractLike,
  // resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

module.exports = router;
