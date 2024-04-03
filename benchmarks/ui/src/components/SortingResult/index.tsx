import { Line } from "react-chartjs-2";

import { chartOptions, generateLabels, saveCharts } from "@/constants/chartOptions";
import { useGetSortingResultsQuery } from "@/store/services/benchmarkService";
import { SortingRequest } from "@/store/services/request.types";

import { ErrorInformation } from "../ErrorInformation";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { SortingResultChartProps } from "./types";

const charts = ["jsChart", "tsChart"];

export const SortingResultChart = ({ req }: SortingResultChartProps) => {
  const { data, isLoading, isError } = useGetSortingResultsQuery(req satisfies SortingRequest);

  if (isError) return <ErrorInformation />;

  const labels = generateLabels(req.number_of_iterations);

  const sortingChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Sorting benchmark result"
      }
    }
  };

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

  return (
    <Card className="flex flex-col w-full text-center max-w-screen-md justify-evenly gap-2 min-h-[400px] py-4 px-4">
      <CardTitle className="text-md">Result</CardTitle>
      {isLoading ? (
        <CardContent className="flex flex-col justify-center">
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      ) : null}
      {data ? (
        <CardContent className=" rounded-xl flex flex-col gap-4">
          <Line id="jsChart" className="bg-white" data={jsChartData} options={sortingChartOptions} />
          <Line id="tsChart" className="bg-white" data={tsChartData} options={sortingChartOptions} />
          <Button onClick={() => saveCharts(charts)} className="w-md">
            Save charts
          </Button>
        </CardContent>
      ) : null}
    </Card>
  );
};
