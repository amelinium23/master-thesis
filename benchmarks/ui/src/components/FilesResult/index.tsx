import { Line } from "react-chartjs-2";

import { chartOptions, generateLabels, saveCharts } from "@/constants/chartOptions";
import { useGetFilesResultsQuery } from "@/store/services/benchmarkService";
import { FilesRequest } from "@/store/services/request.types";

import { ErrorInformation } from "../ErrorInformation";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { FilesResultProps } from "./types";

const charts = ["jsChartFiles", "tsChartFiles"];

export const FilesResult = ({ req }: FilesResultProps) => {
  const { data, isLoading, isError } = useGetFilesResultsQuery(req satisfies FilesRequest);

  if (isError) return <ErrorInformation />;

  const labels = generateLabels(req.number_of_iterations);

  const filesChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Files Benchmark result"
      }
    }
  };

  const jsResultData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data?.js.result_bun?.results.map(
          (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
        ),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data?.js.result_deno?.results.map(
          (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
        ),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data?.js.result_node?.results.map(
          (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
        ),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const tsResultData = {
    labels,
    datasets: [
      {
        label: "Bun result - ts",
        data: data?.ts.result_bun?.results.map(
          (v) => v.resultOfWriting.times.reduce((p, c) => p + c, 0) / v.resultOfWriting.times.length
        ),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - ts",
        data: data?.ts.result_deno.results.map(
          (v) => v.resultOfWriting.times.reduce((p, c) => p + c, 0) / v.resultOfWriting.times.length
        ),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - ts",
        data: data?.ts.result_node.results.map(
          (v) => v.resultOfWriting.times.reduce((p, c) => p + c, 0) / v.resultOfWriting.times.length
        ),
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
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      ) : null}
      {data ? (
        <CardContent className=" rounded-xl flex flex-col gap-4">
          <Line id="jsChartFiles" className="bg-white" data={jsResultData} options={filesChartOptions} />
          <Line id="tsChartFiles" className="bg-white" data={tsResultData} options={filesChartOptions} />
          <Button onClick={() => saveCharts(charts)} className="w-md">
            Save charts
          </Button>
        </CardContent>
      ) : null}
    </Card>
  );
};
