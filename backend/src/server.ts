import express from "express";
import cors from "cors";

import formRoutes from "./routes/form.routes.js";
import submissionRoutes from "./routes/submission.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", formRoutes);
app.use("/api", submissionRoutes);

// simple error handler (you can make a better one later)
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
