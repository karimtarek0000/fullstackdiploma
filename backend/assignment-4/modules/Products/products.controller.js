import query from "../../DB/connections.js";

export const checkProduct = (req, res, next) => {
  const { pName } = req.body;
  const queryCheck = `SELECT * FROM products WHERE pName = '${pName}'`;

  if (pName) {
    query.execute(queryCheck, (err, data) => {
      if (!err && !data.length) return next();

      res.json({
        message: "Product already exists",
        status: 500,
      });
    });
  }
};

export const getAllProducts = (_, res) => {
  query.execute("SELECT * FROM products", (err, data) => {
    res.json({
      message: "Success",
      status: 200,
      data,
    });
  });
};

export const addNewProduct = (req, res) => {
  const { pName, pDescription, price, createdBy } = req.body;

  const queryForAdd = `INSERT INTO products 
                      (pName, pDescription, price, createdBy) VALUES 
                      ('${pName}', '${pDescription}', ${price}, ${createdBy})
                     `;

  query.execute(queryForAdd, (err, data) => {
    if (!err) {
      return res.json({
        message: "Success",
        status: 200,
        data: { pName, pDescription, price },
      });
    }
    res.json({
      message: "User id not correct",
      status: 500,
    });
  });
};

export const searchProduct = (_, res) => {
  const queryForSearch = `SELECT * FROM products WHERE price > 3000`;

  query.execute(queryForSearch, (err, data) => {
    if (!err) {
      return res.json({
        message: "Success",
        status: 200,
        data,
      });
    }
    res.json({
      message: "Error",
      status: 500,
    });
  });
};

export const updateProduct = (req, res) => {
  const productId = req.params.productId;
  const { ownerId, data } = req.body;
  const { pName, price, pDescription } = data;

  if (pName && price && pDescription) {
    const queryForUpdate = `UPDATE products
                            SET 
                              pName = '${pName}', 
                              price = ${price},
                              pDescription = '${pDescription}'
                            WHERE createdBy = ${ownerId} AND id = ${productId}
                          `;

    query.execute(queryForUpdate, (err, data) => {
      if (!err && data.affectedRows) {
        return res.json({
          message: "Product updated successfully",
          status: 200,
          data: {
            pName,
            pDescription,
            price,
          },
        });
      }
      res.json({
        message: "Owner id not correct",
        status: 500,
      });
    });
  }
};

export const deleteProduct = (req, res) => {
  const productId = req.params.productId;
  const ownerId = req.body.ownerId;

  if (ownerId) {
    const queryForDelete = `DELETE FROM products
                            WHERE createdBy = ${ownerId} AND id = ${productId}
                          `;

    query.execute(queryForDelete, (err, data) => {
      if (!err && data.affectedRows) {
        return res.json({
          message: "Delete product successfully",
          status: 200,
        });
      }
      res.json({
        message: "Owner id or product id not correct",
        status: 500,
      });
    });
  }
};
