import express from "express";
// import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import serveStatic from 'serve-static';
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./utils/swagger.json";
import connectDB from "./database/connection.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import ebl2012Routes from "./routes/ebl2012.js";
import { error } from "console";

// Config 
const app = express();
dotenv.config();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));
// Serve static files from the 'public' directory
app.use(serveStatic('public'));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ebl2012", ebl2012Routes);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api", (req, res) => {
	res.json({ message: "Welcome to KHRC Backend API" });
});

// Starting Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
