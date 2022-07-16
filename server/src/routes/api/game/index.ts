import { Router } from "express";
import {
  getUserGameData,
  getMineSweeperRankData,
  getUserSearchMineSweeper,
  getUserSearch2048,
  get2048RankData,
} from './game.controller';

const router = Router();

router.get('/minesweeper', getMineSweeperRankData, getUserSearchMineSweeper);
router.get('/2048', get2048RankData, getUserSearch2048);
router.get('/', getUserGameData);

export default router;