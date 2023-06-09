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

const getAllUsers = (req, res) => {
  const isSort = req.query.sort;

  let _users = null;

  if (isSort) {
    // Sort
    _users = [...users].sort((a, b) => {
      if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
      return 1;
    });
  }

  res.json({ message: "Success", status: 200, data: _users ?? users });
};

const addUser = (req, res) => {
  if (Object.keys(req.body).length) {
    const userData = { id: users.length + 1, ...req.body };
    users.push(userData);
    res.json({
      message: "Success",
      status: 201,
      data: users,
    });
  } else {
    res.json({
      status: 500,
      message: "No user data exist",
    });
  }
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const index = users.findIndex((user) => user.id == userId);

  if (index >= 0) {
    users.splice(index, 1);
    res.json({
      message: "Success",
      status: 200,
      data: users,
    });
  } else {
    res.json({
      status: 404,
      message: "Id not found",
    });
  }
};

const updateUser = (req, res) => {
  const userData = req.body;
  const userId = req.params.id;
  const index = users.findIndex((user) => user.id == userId);

  if (index >= 0 && Object.keys(userData).length) {
    users.splice(index, 1, { id: index + 1, ...userData });
    res.json({
      message: "Success",
      status: 201,
      data: users,
    });
  } else {
    res.json({
      status: 404,
      message: "Id not found",
    });
  }
};

const getUser = (req, res) => {
  const userId = req.params.id;

  const user = users.find((user) => user.id == userId);

  if (user) {
    res.json({
      message: "Success",
      status: 200,
      data: user,
    });
  } else {
    res.json({
      status: 404,
      message: "Id not found",
    });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  getUser,
};
