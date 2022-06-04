import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "styled-components";
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  winRate: number;
}

export default function WinRateRecord({ winRate }: Props) {
  const theme = useTheme();
  const data = {
    datasets: [
      {
        data: [winRate, 100 - winRate],
        backgroundColor: [
          theme.mainColor,
          "white"
        ],
        borderWidth: 1,
        cutout: "72%",
        borderRadius: 100
      }
    ]
  };

  return <Doughnut data={data} />;
}