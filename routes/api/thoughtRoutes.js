const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addNewThought,
  editThoughtById,
  deleteThoughtById,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtReactionController");

// Thought routes: /api/thoughts
router.route("/").get(getAllThoughts).post(addNewThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(editThoughtById)
  .delete(deleteThoughtById);

// Reaction routes: /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
