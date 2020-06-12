const db = require('./../models/resourceModels');
const Resource = require('../../models/resource');
const Tech = require('../../models/tech');
const Comment = require('../../models/comment');
const User = require('../../models/user');
// Initialize controller object
const resourceController = {};

// Get all resources from the db needs to be filtered by TECH_ID:
resourceController.getResources = (req, res, next) => {
  console.log('Inside getResources');
  // declare variable representing the tech id
  let tech_id = req.params.id;
  // perform find method on resource with techId >> techId.name
  // perform find on our React_ID
  Resource.find({ techId: tech_id })
    .exec()
    .then((resource) => {
      res.locals.resources = resource;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// ============================
// LIST ALL TECHS USED AND IDS
// ============================
resourceController.getTech = (req, res, next) => {
  // get the techs
  Tech.find({})
    .exec()
    .then((techList) => {
      res.locals.techList = techList;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// we need a name, desc, url, likes, comments
resourceController.createResources = (req, res, next) => {
  console.log('inside createresource ****** ?????////',req.body)
  const tech_id = req.body.techId;

  Tech.findById(tech_id)
    .exec()
    .then(
      (tech) =>
        // const { name, description, url, likes, comments } = req.body;
        // whatever the create resource is, we push to tech
        Resource.create({
          name: req.body.name,
          description: req.body.description,
          url: req.body.url,
          likes: 0,
          comments: [],
          techId: tech_id,
        })
          .then((resource) => {
            // console.log(resource);
            // tech needs to be associated with a given resource
            tech.resources.push(resource);
            console.log(tech);
          })
          .then(() => {
            tech.save();
          })
          .then(() => {
            return next();
          })
          .catch((err) => {
            console.log(err);
            return next(err);
          })
      // push tech onto resources array
    )
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

// push a resource onto the tech.resources property --> tech.resources.

resourceController.createTech = (req, res, next) => {
  Tech.create({ id: 7, name: 'Enzyme', resources: [] })
    .then((tech) => {
      res.locals.tech = tech;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// ============================
// GET COMMENTS by resource._id
// ============================
resourceController.getComment = (req, res, next) => {
  // find our resources by ID and get the comments associated with that Id
  const resource_id = req.params.id;
  console.log('req.body in getComment *****', resource_id);

  // const getData = async () => {
  //   return Promise.all(list.map(item => anAsyncFunction(item)))
  // }

  Resource.findById(resource_id)
    .exec()
    .then((resource) => {
      const comments = resource.comments;
      const asyncFunc = async (comment) => Comment.findById(comment);
      const getData = async () => {
        return Promise.all(comments.map((comment) => asyncFunc(comment)));
      };
      getData()
        .then((data) => {
          res.locals.comments = data;
          return next();
        })
        .catch((err) => {
          console.log(err);
          return next(err);
        });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
// console.log(comments)
// return Comment.findById(comments)
// return comments.map(comment => Promise.resolve(Comment.findById('5ee1b8c8618c7c33aa2b1133')))
// })
// .then(results => {
//   console.log(results)
//   // console.log('commentsArray ****: ', commentsArray)
//   // console.log(commentsArray[0])
//   // res.locals.comments = commentsArray;
//   // console.log('Comments for a given resource: ', comments);
//   return next();

// })

// const reqBody = {
//   resourceId: currentResource,
//   comment: {
//     text: formValue,
//     userName: 'Greg P- ScrumMaster, AtlasMaster'
//   }
// }

// =======================
// CREATE COMMENT
// =======================
resourceController.createComment = (req, res, next) => {
  const resource_id = req.body.resourceId;

  const currTime = Date.now();
  Resource.findById(resource_id)
    .exec()
    .then((resource) =>
      Comment.create({
        text: req.body.comment.text,
        date: currTime,
        userName: req.body.comment.userName,
      })
        .then((comment) => {
          resource.comments.push(comment);
          console.log(resource);
        })
        .then(() => {
          resource.save();
        })
        .then(() => {
          return next();
        })
        .catch((err) => {
          console.log(err);
          return next(err);
        })
    )
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

// Creates a new resource by combining a tech id and the request body info

// Creates a new resource by combining a tech id and the request body info
// ========================
// ADDS LIKE TO RESOURCE
// ========================
resourceController.addLike = (req, res, next) => {
  const resource_id = req.body.resourceId;
  Resource.findByIdAndUpdate(resource_id, { $inc: { likes: 1 } })
    .exec()
    .then((resource) => {
      res.locals.resources = resource;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// Decrease the like count of a resource by one
// =============================
// REMOVE LIKE FROM RESOURCE
// ============================
resourceController.subtractLike = (req, res, next) => {
  const resource_id = req.body.resourceId;
  Resource.findByIdAndUpdate(resource_id, { $inc: { likes: -1 } })
    .exec()
    .then((resource) => {
      res.locals.resources = resource;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = resourceController;
