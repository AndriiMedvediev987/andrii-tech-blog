const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

//create new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    console.log("new post");
    const newProject = await Blog.create({
      ...req.body,
      post_date: new Date().toJSON(),
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update blog post by id
router.put('/:id', async (req, res) => {
  try {
    const post = await Blog.update(
      {
        title: req.body.title,
        text: req.body.text,
        post_date: Date.now(),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete blog post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;