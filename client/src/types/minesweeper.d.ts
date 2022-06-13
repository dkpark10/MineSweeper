declare module 'mine-sweeper-type' {
  export interface Level {
    row: number;
    col: number;
    countOfMine: number;
  }

  export interface CellData {
    primaryIndex: number;
    mine: boolean;
    neighbor: number;
    visited: boolean;
    flaged: boolean;
    visible: number | string;
  }

  export interface Coord {
    y: number;
    x: number;
  }

  export interface BoardSize {
    row: number,
    col: number
  }

  export interface ClickRenderStatus {
    render: boolean;
    clickBomb: boolean;
    removeCell: number;
  }

  export type LevelType = 'easy' | 'normal' | 'hard';
}
