const router = require("express").Router();
const { Blog, Comment, User } = require("../models");
// const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // console.log("start");
    // Get all blog post and JOIN with comment data and user name
    const blogData = await Blog.findAll({
      // include: [{ model: User }],
      // include: [{ model: Comment }]
      include: [
        {
          model: Comment,
          // attributes: ["text"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // console.log(blogData);

    // Serialize blog data
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);

    // pass data
    // res.render("homepage", {
    //   blogs,
    //   logged_in: req.session.logged_in,
    // });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("profile", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
