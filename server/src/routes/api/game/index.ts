import { Router, Request, Response, NextFunction } from "express";
import {
  getUserGameData,
  getGameRankData,
  getUserGameSearch,
  get2048RankData,
} from './game.controller';

const router = Router();

router.get('/minesweeper', getGameRankData, getUserGameSearch);
router.get('/2048', get2048RankData);
router.get('/', getUserGameData);

export default router;