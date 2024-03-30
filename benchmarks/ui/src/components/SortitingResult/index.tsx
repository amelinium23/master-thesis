import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { saveAs } from "file-saver";
import { Line } from "react-chartjs-2";

import { useGetSortingResultsQuery } from "@/store/services/benchmarkService";
import { SortingRequest } from "@/store/services/request.types";

import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { SortingResultChartProps } from "./types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const SortingResultChart = ({ req }: SortingResultChartProps) => {
  const { data, isLoading, isError } = useGetSortingResultsQuery(req satisfies SortingRequest);

  if (isError) return <p>Error, check console log</p>;

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Iteration"
        }
      },
      y: {
        title: {
          display: true,
          text: "Time"
        }
      }
    },
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Sorting benchmark"
      }
    }
  };

  const labels = Array.from({ length: req.number_of_iterations }).map((_, i) => i);

  const jsChartData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data?.js.result_bun?.result.map((res) => res.time),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data?.js.result_deno?.result.map((res) => res.time),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data?.js.result_node?.result.map((res) => res.time),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const tsChartData = {
    labels,
    datasets: [
      {
        label: "Bun result - TS",
        data: data?.ts.result_bun?.result.map((res) => res.time),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - TS",
        data: data?.js.result_deno?.result.map((res) => res.time),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - TS",
        data: data?.ts.result_node?.result.map((res) => res.time),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const saveCharts = () => {
    const jsChart = document.getElementById("jsChart") as HTMLCanvasElement;
    jsChart.toBlob((blob) => {
      saveAs(blob, "jsSortingChart.png");
    });
    const tsChart = document.getElementById("tsChart") as HTMLCanvasElement;
    tsChart.toBlob((blob) => {
      saveAs(blob, "tsSortingChart.png");
    });
  };

  return (
    <Card className="flex flex-col w-full text-center justify-evenly gap-2 min-h-[400px] py-4 px-4">
      <CardTitle className="text-md">Result</CardTitle>
      {isLoading ? (
        <CardContent className="flex flex-col justify-center">
          <div>
            <Skeleton className="h-[300px] w-full" />
          </div>
        </CardContent>
      ) : null}
      {data ? (
        <CardContent className=" rounded-xl flex flex-col gap-4">
          <Line id="jsChart" className="bg-white" data={jsChartData} options={chartOptions} />
          <Line id="tsChart" className="bg-white" data={tsChartData} options={chartOptions} />
          <Button onClick={saveCharts} className="w-md">
            Save charts
          </Button>
        </CardContent>
      ) : null}
    </Card>
  );
};
