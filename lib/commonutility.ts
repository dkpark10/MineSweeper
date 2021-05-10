export interface difficulty {
  row: number;
  col: number;
  numberOfMine: number;
}

export interface Coord {
  y: number;
  x: number;
}

export interface  MineBoard {
  mine: number;
  flag: boolean;
  visited: boolean;
  aroundNumber: number;
}

export interface MineData {
  row: number;
  col: number;
  numberOfMine: number;
  extraCell: number;
  board: MineBoard[][];
}

export enum EventStatus {
  END,
  NOTHING,
  DISABLED,
  NUMBERCELL,
  SETFLAG,
  RELIVEFLAG
}

export interface ResponseJSON {
  y: number;
  x: number;
  status: EventStatus;
  num: number;
}

export function cloneObject(obj: any) {
  let ret: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      ret[key] = cloneObject(obj[key]);
    } else {
      ret[key] = obj[key];
    }
  }
  return ret;
}