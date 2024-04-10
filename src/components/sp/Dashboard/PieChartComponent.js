import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieChartComponent() {
  const monthlyIncomeData = [
    { month: "January", income: 100000 },
    { month: "February", income: 120000 },
    { month: "March", income: 160000 },
    { month: "april", income: 160000 },
    // Add data for other months
  ];

  const pieChartData = monthlyIncomeData.map((entry, index) => ({
    id: index,
    value: entry.income,
    label: entry.month,
  }));

  return (
    <PieChart
      series={[
        {
          data: pieChartData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
