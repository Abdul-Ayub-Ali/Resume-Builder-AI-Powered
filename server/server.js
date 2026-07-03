import "dotenv/config"; 
import app from "./src/app.js"; 
import connectDb from "./src/config/db.js";

const PORT = process.env.PORT || 3000;

// Database Connection & Server Start
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB connection error:", err);
  });