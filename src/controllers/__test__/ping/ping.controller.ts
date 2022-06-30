import { Router, Request, Response } from "express";

const router = Router();

router.get("/api/ping", (req: Request, res: Response) => {
  res.send({
    message: "pong",
  });
});

export { router as PingRouter };
