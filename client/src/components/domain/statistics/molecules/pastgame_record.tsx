import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PastGame } from "statistics-type";
import { useTheme } from "styled-components";
import Content from "../../../common/atoms/content";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  pastGame: PastGame[];
}

export default function PastGameRecord({ pastGame }: Props) {
  const theme = useTheme();

  if (pastGame.length === 0) {
    return (
      <Content
        fontSize={"2.0rem"}
      >
        "기록이 없습니다."
      </Content>
    )
  }

  return (
    <Line
      data={{
        labels: pastGame.map((game) => game.date.slice(2)),
        datasets: [
          {
            label: "시간(sec)",
            data: pastGame.map((game) => Math.floor(Number(game.record))),
            borderColor: theme.mainColor,
            backgroundColor: theme.mainColor
          },
        ],
      }}
    />
  )
}
