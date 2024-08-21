const express = require('express')
const app = express()
const noteRoutes = require("./src/routes/notesRoutes")
const errorHandler = require("./src/middleware/errorHandler")

 
app.use(express.json());
app.use("/notes", noteRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});