const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");

const init = async () => {
  try {
    await db.sync();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

init();
