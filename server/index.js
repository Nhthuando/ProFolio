import express from "express";
import cors from "cors";
import authRoute from './routes/authRoute.js';
import userRoute from "./routes/userRoute.js";
import projectRoute from "./routes/projectRoute.js";
import skillRoute from "./routes/skillRoute.js";
import expRoute from "./routes/expRoute.js";
import eduRoute from "./routes/eduRoute.js";
import socialRoute from "./routes/socialRoute.js";
import portfolioRoute from "./routes/portfolioRoute.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/projects', projectRoute);
app.use('/api/portfolios', skillRoute)
app.use('/api/portfolios', expRoute);
app.use('/api/portfolios', eduRoute);
app.use('/api/portfolios', socialRoute);
app.use('/api/portfolios', portfolioRoute);

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});