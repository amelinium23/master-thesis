import { Line } from "react-chartjs-2";

import { chartOptions, generateLabels, saveCharts } from "@/constants/chartOptions";
import { useGetSqliteResultsQuery } from "@/store/services/benchmarkService";
import { SqLiteRequest } from "@/store/services/request.types";

import jsBunResult from "../../../../js/bun/bunSqlite.json";
import jsDenoResult from "../../../../js/deno/denoSqlite.json";
import jsNodeResult from "../../../../js/node/nodeSqlite.json";
import tsBunResult from "../../../../ts/bun/bunSqlite.json";
import tsDenoResult from "../../../../ts/deno/denoSqlite.json";
import tsNodeResult from "../../../../ts/node/nodeSqlite.json";
import { ErrorInformation } from "../ErrorInformation";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { SqliteResultProps } from "./types";

const charts = ["jsChartFiles", "tsChartFiles", "jsSqliteMemoryResult", "tsSqliteMemoryResult"];

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

export const SqliteResult = ({ req }: SqliteResultProps) => {
  const { data, isLoading, isError } = useGetSqliteResultsQuery(req satisfies SqLiteRequest);

  if (isError) return <ErrorInformation />;

  const labels = generateLabels(req.number_of_iterations);

  const sqliteChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Sqlite Benchmark result"
      }
    }
  };

  const sqliteMemoryChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Sqlite Benchmark memory usage"
      }
    }
  };

  const jsResultData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data ? data?.js.result_bun.times : jsonData.js.result_bun.times,
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data ? data?.js.result_deno.times : jsonData.js.result_deno.times,
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data ? data?.js.result_node.times : jsonData.js.result_node.times,
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
        data: data ? data?.ts.result_bun.times : jsonData.ts.result_bun.times,
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - ts",
        data: data ? data?.ts.result_deno.times : jsonData.ts.result_deno.times,
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - ts",
        data: data ? data?.ts.result_node.times : jsonData.ts.result_node.times,
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
        data: data ? data?.js.result_bun.memory : jsonData.js.result_bun.memory,
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data ? data?.js.result_deno.memory : jsonData.js.result_deno.memory,
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data ? data?.js.result_node.memory : jsonData.js.result_node.memory,
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
        data: data ? data?.ts.result_bun.memory : jsonData.ts.result_bun.memory,
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - ts",
        data: data ? data?.ts.result_deno.memory : jsonData.ts.result_deno.memory,
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - ts",
        data: data ? data?.ts.result_node.memory : jsonData.ts.result_node.memory,
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
        <CardContent className="flex flex-col gap-4 rounded-xl">
          <Line id="jsSqliteResult" className="bg-white" data={jsResultData} options={sqliteChartOptions} />
          <Line id="tsSqliteResult" className="bg-white" data={tsResultData} options={sqliteChartOptions} />
          <Line
            id="jsSqliteMemoryResult"
            className="bg-white"
            data={jsResultMemoryData}
            options={sqliteMemoryChartOptions}
          />
          <Line
            id="tsSqliteMemoryResult"
            className="bg-white"
            data={tsResultMemoryData}
            options={sqliteMemoryChartOptions}
          />
          <Button onClick={() => saveCharts(charts)} className="w-md">
            Save charts
          </Button>
        </CardContent>
      ) : null}
    </Card>
  );
};
