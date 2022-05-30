import { Request, Response } from "express";
import db from "../models/index";
import { signToken, verifyToken } from "../util/jwttHandler";

export default async function userIdentification(request: Request, response: Response, tempAccessToken: string | undefined): Promise<boolean> {
  if (!tempAccessToken) {
    return false;
  }

  const id = request.signedCookies["accessToken"].userid;
  const jwtKey = request.app.get("secret-key").jwtKey;
  const tempRefreshToken = await db.user.getRedisValue(id) || "";

  const accessToken = await verifyToken(jwtKey, tempAccessToken);
  const refreshToken = await verifyToken(jwtKey, tempRefreshToken);

  if (accessToken === undefined) {
    if (refreshToken === undefined) {
      throw "두개 토큰 둘다 유효하지 않다.";
    }

    const userInfo = await db.user.getUserInfo({
      columns: ["ID", "PWD", "GRADE", "AUTH"], id: id
    });

    const newAccessToken = await signToken(jwtKey, "1h", {
      id: userInfo.ID,
      grade: userInfo.GRADE,
      auth: userInfo.AUTH
    });

    response.cookie("accessToken", { id, accessToken: newAccessToken }, {
      httpOnly: process.env.NODE_ENV === "production",
      signed: true
    });
  }
  else if (refreshToken === undefined) {
    if (accessToken === undefined) {
      throw "두개 토큰 둘다 유효하지 않습니다";
    }
    const newRefreshToken = await signToken(jwtKey, "1h");
    db.user.setRefreshToken(id, newRefreshToken);
  }
  return true;
}

