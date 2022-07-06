import { Router, Request, Response, NextFunction } from "express";
import {
  insertPost,
  updatePost,
  deletePost,
} from "../posts/posts.controller";

import {
  recordAnonymousGame,
  recordUserGame,
  record2048GameLog,
} from "../game/game.controller";

import { logout } from "../user/user.controller";
import userIdentification from "../../../middlewares/user_identification";

const router: Router = Router();

router.post("/game/minesweeper", recordAnonymousGame);
// router.post("/game/2048", recordAnonymousGame);

// 로그인 토큰검증 미들웨어
router.use(async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (request.signedCookies["accessToken"] === undefined) {
      throw "토큰이 없습니다";
    }
    // Authorization 헤더
    const accessToken = request.headers.authorization?.split(" ")[1];
    const result = await userIdentification(request, response, accessToken);
    if (result === false) {
      throw "유저 식별에 실패하였습니다";
    }
    return next();
  }
  catch (e) {
    response.status(403).send(e);
  }
});

router.delete("/posts/:postid", deletePost);
router.post("/posts", insertPost);
router.patch("/posts", updatePost);
router.post("/logout", logout);
router.post("/game/minesweeper", recordUserGame);
router.post("/game/2048", record2048GameLog);

router.get("/test", async (req: Request, res: Response) => {
  res.status(200).send("....");
});

export default router;