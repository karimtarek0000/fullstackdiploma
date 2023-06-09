const Http = require("http");

const users = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Osama",
  },
  {
    id: 3,
    name: "Ahmed",
  },
  {
    id: 4,
    name: "Stevie",
  },
  {
    id: 5,
    name: "Baha",
  },
];

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

const server = Http.createServer((req, res) => {
  const { url, method } = req;

  res.setHeader("Content-Type", "application/json");

  // Users
  if (url === "/users" && method === "GET") {
    res.end(JSON.stringify(users));
  }

  if (url === "/adduser" && method === "POST") {
    req.on("data", (user) => {
      const userObj = JSON.parse(user);

      if (userObj.name) {
        const newUser = { id: users.length + 1, name: userObj.name };
        users.push(newUser);
        res.statusCode = 201;
        res.end(JSON.stringify(users));
      }
    });
  }

  if (url === "/users-sorted" && method === "GET") {
    // Sort
    const _users = [...users].sort((a, b) => {
      if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
      return 1;
    });
    res.end(JSON.stringify(_users));
  }

  if (url === "/user" && method === "DELETE") {
    req.on("data", (user) => {
      const userObj = JSON.parse(user);

      if (userObj.id) {
        const index = users.findIndex((user) => user.id == userObj.id);
        users.splice(index, 1);
        res.end(JSON.stringify(users));
      }
    });
  }

  if (url === "/user" && method === "PATCH") {
    req.on("data", (user) => {
      const userObj = JSON.parse(user);

      if (userObj.id) {
        const index = users.findIndex((user) => user.id == userObj.id);
        users.splice(index, 1, { id: index + 1, ...userObj });
        res.end(JSON.stringify(users));
      }
    });
  }

  if (url === "/user" && method === "POST") {
    req.on("data", (user) => {
      const userObj = JSON.parse(user);

      if (userObj.id) {
        const _user = users.find((user) => user.id == userObj.id);
        res.end(JSON.stringify(_user));
      }
    });
  }

  // Posts
  if (url === "/posts" && method === "GET") {
    res.end(JSON.stringify(posts));
  }

  if (url === "/addpost" && method === "POST") {
    req.on("data", (post) => {
      const postObj = JSON.parse(post);

      if (postObj.desc) {
        const newPost = { id: posts.length + 1, desc: postObj.desc };
        posts.push(newPost);
        res.statusCode = 201;
        res.end(JSON.stringify(posts));
      }
    });
  }

  if (url === "/posts-reversed" && method === "GET") {
    const _posts = [...posts].reverse();
    res.end(JSON.stringify(_posts));
  }

  if (url === "/post" && method === "DELETE") {
    req.on("data", (post) => {
      const postObj = JSON.parse(post);

      if (postObj.id) {
        const index = posts.findIndex((post) => post.id == postObj.id);
        posts.splice(index, 1);
        res.end(JSON.stringify(posts));
      }
    });
  }

  if (url === "/post" && method === "PATCH") {
    req.on("data", (post) => {
      const postObj = JSON.parse(post);

      if (postObj.id) {
        const index = posts.findIndex((post) => post.id == postObj.id);
        posts.splice(index, 1, postObj);
        res.end(JSON.stringify(posts));
      }
    });
  }

  if (url === "/post" && method === "POST") {
    req.on("data", (post) => {
      const postObj = JSON.parse(post);

      if (postObj.id) {
        const _post = posts.find((post) => post.id == postObj.id);
        res.end(JSON.stringify(_post));
      }
    });
  }
});

server.listen(3000, () => console.log("Server is running..."));
