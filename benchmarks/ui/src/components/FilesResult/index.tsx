import { Line } from "react-chartjs-2";

import { chartOptions, generateLabels, saveCharts } from "@/constants/chartOptions";
import { useGetFilesResultsQuery } from "@/store/services/benchmarkService";
import { FilesRequest } from "@/store/services/request.types";

import jsBunResult from "../../../../js/bun/bunFilesResult.json";
import jsDenoResult from "../../../../js/deno/denoFilesResult.json";
import jsNodeResult from "../../../../js/node/nodeFilesResult.json";
import tsBunResult from "../../../../ts/bun/bunFilesResult.json";
import tsDenoResult from "../../../../ts/deno/denoFilesResult.json";
import tsNodeResult from "../../../../ts/node/nodeFilesResult.json";
import { ErrorInformation } from "../ErrorInformation";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { FilesResultProps } from "./types";

const charts = ["jsChartFiles", "tsChartFiles", "jsChartFilesMemory", "tsChartFilesMemory"];

const jsonData = {
  js: {
    result_bun: jsBunResult,
    result_deno: jsDenoResult,
    result_node: jsNodeResult
  },
  ts: {
    result_bun: tsBunResult,
    result_deno: tsDenoResult,
    result_node: tsNodeResult
  }
};

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

  const filesMemoryChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        title: {
          text: "Memory",
          display: true
        }
      }
    },
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Files Benchmark memory usage"
      }
    }
  };

  const jsResultData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data
          ? data.js.result_bun.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            )
          : jsonData.js.result_bun.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            ),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data
          ? data.js.result_deno.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            )
          : jsonData.js.result_deno.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            ),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data
          ? data.js.result_node.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            )
          : jsonData.js.result_node.results.map(
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
        data: data
          ? data.ts.result_bun.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            )
          : jsonData.ts.result_bun.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            ),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - ts",
        data: data
          ? data.ts.result_deno.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            )
          : jsonData.ts.result_deno.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            ),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - ts",
        data: data
          ? data.ts.result_node.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            )
          : jsonData.ts.result_node.results.map(
              (v) => v.resultOfReading.times.reduce((p, c) => p + c, 0) / v.resultOfReading.times.length
            ),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const jsResultMemoryData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data
          ? data.js.result_bun.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            )
          : jsonData.js.result_bun.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            ),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data
          ? data.js.result_deno.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            )
          : jsonData.js.result_deno.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            ),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data
          ? data.js.result_node.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            )
          : jsonData.js.result_node.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            ),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const tsResultMemoryData = {
    labels,
    datasets: [
      {
        label: "Bun result - ts",
        data: data
          ? data.ts.result_bun.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            )
          : jsonData.ts.result_bun.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            ),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - ts",
        data: data
          ? data.ts.result_deno.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            )
          : jsonData.ts.result_deno.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            ),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - ts",
        data: data
          ? data.ts.result_node.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
            )
          : jsonData.ts.result_node.results.map(
              (v) => v.resultOfReading.memory.reduce((p, c) => p + c, 0) / v.resultOfReading.memory.length
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
          <Line
            id="jsChartFilesMemory"
            className="bg-white"
            data={jsResultMemoryData}
            options={filesMemoryChartOptions}
          />
          <Line
            id="tsChartFilesMemory"
            className="bg-white"
            data={tsResultMemoryData}
            options={filesMemoryChartOptions}
          />
          <Button onClick={() => saveCharts(charts)} className="w-md">
            Save charts
          </Button>
        </CardContent>
      ) : null}
    </Card>
  );
};
