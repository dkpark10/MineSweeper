export interface Level {
  row: number,
  col: number,
  numberOfMine: number
};

export type LevelType = { [key: string]: Level };

export const levelList: LevelType = {
  Easy: { row: 10, col: 10, numberOfMine: 10 },
  Normal: { row: 16, col: 16, numberOfMine: 40 },
  Hard: { row: 16, col: 30, numberOfMine: 99 },
};

export interface CellData {
  mine: boolean,
  neighbor: number,
  visited: boolean,
  flaged: boolean,
  visible: number | string,
}

export interface Coord {
  y: number,
  x: number
};

export interface BoardSize {
  row: number,
  col: number
}

export interface ClickRenderStatus{
  render: boolean;
  flag:boolean;
  removeCell: number;
}