import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { setupSwagger } from "./config/swagger.js";
import resourceRoutes from "./routes/resourceRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Swagger Documentation
setupSwagger(app);

// Connect to Database
connectDB();

// API Routes
app.use("/api/resources", resourceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`📖 Swagger Docs: http://localhost:${PORT}/api-docs`);
});
