require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is listening on port http://localhost:${PORT}`);
  }
});
