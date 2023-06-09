const posts = [
  {
    id: 1,
    desc: "Ut distinctio dolorem dolorum. Incidunt rerum sapiente tenetur doloremque veniam dicta. Praesentium explicabo tempora nemo facilis debitis ipsam tempora iure. Iusto adipisci sed illo deserunt adipisci.",
  },
  {
    id: 2,
    desc: "Sunt nobis ab eum sit corrupti facilis praesentium illum. Vitae distinctio nisi explicabo cumque quae dolorem veritatis tempora. Beatae est hic quis iusto dignissimos quisquam dicta. Provident minus deleniti. Ipsam veniam quasi doloribus odit occaecati cum possimus sequi eos. Quae esse ratione autem.",
  },
  {
    id: 3,
    desc: "Asperiores quibusdam porro laudantium quo maxime. Maxime voluptas itaque adipisci. Distinctio optio laudantium officia. Aliquam voluptatem consequuntur quasi. Distinctio doloribus accusantium ex molestias atque consectetur veritatis. Laborum repellendus culpa natus dicta.",
  },
  {
    id: 4,
    desc: "Id magnam nesciunt nobis nihil. Excepturi consequatur temporibus quaerat harum. Doloribus illum laborum. Nostrum optio assumenda. Iusto et eius.",
  },
  {
    id: 5,
    desc: "Possimus assumenda impedit repellendus velit quisquam aut autem consectetur ex. Placeat nemo sed. Tempora nam earum ipsum quas dignissimos quibusdam cupiditate. Facere reprehenderit aut facilis consequatur blanditiis optio reprehenderit provident distinctio.",
  },
];

const getAllPosts = (req, res) => {
  const isReverse = req.query.reverse;

  let _posts = null;

  if (isReverse) _posts = [...posts].reverse();

  res.json({ message: "Success", status: 200, data: _posts ?? posts });
};

const addPost = (req, res) => {
  const desc = req.body.desc;

  if (desc) {
    const newPost = { id: posts.length + 1, desc: desc };
    posts.push(newPost);
    res.json({
      message: "Success",
      status: 201,
      data: posts,
    });
  } else {
    res.json({
      status: 500,
      message: "Data not found",
    });
  }
};

const deletePost = (req, res) => {
  const postId = req.params.id;
  const index = posts.findIndex((post) => post.id == postId);

  if (index >= 0) {
    posts.splice(index, 1);
    res.json({
      message: "Success",
      status: 200,
      data: posts,
    });
  } else {
    res.json({
      status: 404,
      message: "Id not found",
    });
  }
};

const updatePost = (req, res) => {
  const postData = req.body;
  const postId = req.params.id;
  const index = posts.findIndex((post) => post.id == postId);

  if (index >= 0 && Object.keys(postData).length) {
    posts.splice(index, 1, { id: index + 1, ...postData });
    res.json({
      message: "Success",
      status: 201,
      data: posts,
    });
  } else {
    res.json({
      status: 404,
      message: "Some data is missing",
    });
  }
};

const getPost = (req, res) => {
  const postId = req.params.id;

  const post = posts.find((post) => post.id == postId);

  if (post) {
    res.json({
      message: "Success",
      status: 200,
      data: post,
    });
  } else {
    res.json({
      status: 404,
      message: "Id not found",
    });
  }
};

module.exports = {
  getAllPosts,
  addPost,
  deletePost,
  updatePost,
  getPost,
};
