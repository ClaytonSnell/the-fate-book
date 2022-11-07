const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/tags
router.route('/:thoughtId/tags').post(addReaction);

// /api/thoughts/:thoughtId/tags/:tagId
router.route('/:thoughtId/tags/:tagId').delete(removeReaction);

module.exports = router;


/// I stole this straight out of assingment 26 appRoutes, no sname