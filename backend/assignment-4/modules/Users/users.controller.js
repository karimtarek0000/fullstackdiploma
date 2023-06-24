import query from "../../DB/connections.js";

// Middleware
export const checkUserExist = (req, res, next) => {
  const { email } = req.body;
  const queryCheckForEmail = `select * from users where email = "${email}"`;

  if (email) {
    query.execute(queryCheckForEmail, (_, data) => {
      if (!data.length) return next();
      res.json({
        message: "User already exists",
        status: 500,
      });
    });
    return;
  }
  next();
};

export const checkId = (req, res, next) => {
  const id = req.params.id;
  const queryId = `select * from users where id = ${id}`;

  query.execute(queryId, (err, data) => {
    if (!err && data.length) return next();

    res.json({
      message: "This id not exist",
      status: 500,
    });
  });
};

//
export const getAllUsers = (_, res) => {
  query.execute("select * from users", (err, data) => {
    if (!err) {
      res.json({
        message: "Success",
        status: 200,
        data,
      });
    }
  });
};

export const addUser = (req, res) => {
  const { name, email, password, age } = req.body;

  if (name && email && password && age) {
    const queryAddNewUser = `insert into users (name, email, password, age) values ("${name}","${email}", "${password}", "${age}")`;

    query.execute(queryAddNewUser, (err) => {
      if (!err) {
        res.json({
          message: "User has been added successfully",
          status: 201,
          data: {
            name,
            email,
            age,
          },
        });
      }
    });
  }
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;

  if (name && age) {
    const queryUpdateUser = `UPDATE users SET name='${name}', age=${age} where id=${id}`;

    query.execute(queryUpdateUser, (err) => {
      if (!err) {
        res.json({
          message: "User has been updated",
          status: 201,
        });
      }
    });
  }
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  const queryDeleteUser = `delete from users where id=${id}`;

  query.execute(queryDeleteUser, (err, _) => {
    if (!err) {
      res.json({
        message: "User has been deleted",
        status: 200,
      });
    }
  });
};

export const searchByUser = (req, res) => {
  const search = req.params.search;
  const querySearchUser = `SELECT * FROM users WHERE name like "${search}%" and age < 30`;

  query.execute(querySearchUser, (err, data) => {
    if (!err && data.length) {
      return res.json({
        message: "Success",
        status: 200,
        data,
      });
    }
    res.json({
      message: "No name exists",
      status: 200,
    });
  });
};

export const searchUsersIds = (req, res) => {
  const ids = req.body.ids;
  const querySearchUser = `SELECT * FROM users WHERE id IN (${ids.join(",")})`;

  query.execute(querySearchUser, (err, data) => {
    if (!err && data.length) {
      return res.json({
        message: "Success",
        status: 200,
        data,
      });
    }
    res.json({
      message: "Ids not exists",
      status: 200,
    });
  });
};

export const getAllUsersWithProducts = (_, res) => {
  const querySearch = `SELECT users.id as user_id, users.name as user_name, products.id as product_id, products.pName as product_name FROM users JOIN products ON users.id = products.createdby`;

  query.execute(querySearch, (err, data) => {
    if (!err && data.length) {
      return res.json({
        message: "Success",
        status: 200,
        data,
      });
    }
    res.json({
      message: "Ids not exists",
      status: 200,
    });
  });
};
