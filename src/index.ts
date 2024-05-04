import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";

import movieRouter from "./router/moviesRoute";

declare global {
  namespace Express {
    interface Request {
      requestedAt: string;
    }
  }
}

const app: Express = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestedAt = new Date().toISOString();
  next();
});

app.use(express.json());
app.use(morgan("dev"));
app.use("/v1/movies", movieRouter);

export default app;
