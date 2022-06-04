declare module "statistics-type" {
  export type Levels = "easy" | "normal" | "hard";
  export type LevelsProps = "GameTotalCount" | "GameWinCount" | "BestRecord";
  export type AlignmentLevelsProps = `${Levels}${LevelsProps}`;

  export interface PastGame {
    record: string;
    date: string;
    success: number;
    level: string;
  }

  export type GameRecordType = {
    [key in AlignmentLevelsProps]: number;
  }

  export type GameStatisticsProps = GameRecordType & {
    pastGame: PastGame[];
  }
}