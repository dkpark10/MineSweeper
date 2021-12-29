import React, { ReactText } from "react";

const colorofButtonNumber: string[] = [
  "",
  "#FF245E",
  "#8CA9FA",
  "#FFAA39",
  "#7EEE62",
  "#D9D1E8",
  "#0DEBEB",
  "#A566F8",
  "#A9350B"
];

interface CellProps {
  value: string | number | ReactText,
  islock: boolean,
  onMouseDown: React.MouseEventHandler<HTMLDivElement>,
  onContextMenu: React.MouseEventHandler<HTMLDivElement>
};

const Cell = (props: CellProps) => {

  const { value, islock, onMouseDown, onContextMenu }: CellProps = props;
  const strColor = colorofButtonNumber[value];

  return (
    <div
      className={islock ? "lock" : "cell"}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
    >
      <div className='cell-text' style={{ color: `${strColor}` }}>{value}</div>
    </div>
  );
}

export default Cell;
