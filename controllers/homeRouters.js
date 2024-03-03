const router = require("express").Router();
const { Blog, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//get all posts
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post by id with comments related to it.
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["text", "comment_date"],
          include: [
            {
              model: User,
              attributes: ["name", "email"],
            },
          ],
        },
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    req.session.save(() => {
// save blog.id to the session to know which post will be commented
      req.session.blog_id = blog.id;
      res.render("post", {
        blog,
        logged_in: req.session.logged_in,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all blog posts related to current user
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Get all blog post related to the current user
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    },
    );
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Just check user and render new post.
router.get("/dashboard/new", withAuth, async (req, res) => {
  try {
    res.render("newpost", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // logged
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  // to login page
  res.render("login");
});

module.exports = router;
