import { Router, Request, Response } from "express";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
  return res.send({});
});

export { router as AuthenticationRouter };
