const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//create comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      comment_date: new Date().toJSON(),
      blog_id: req.session.blog_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//edit comment by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const comment = await Comment.update(
      {
        text: req.body.text,
        comment_date: Date.now(),
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete comment by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;