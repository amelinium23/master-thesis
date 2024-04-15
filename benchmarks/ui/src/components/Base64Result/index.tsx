import { Line } from "react-chartjs-2";

import { chartOptions, generateLabels, saveCharts } from "@/constants/chartOptions";
import { useGetBase64ResultsQuery } from "@/store/services/benchmarkService";
import { Base64Request } from "@/store/services/request.types";

import jsBunResult from "../../../../js/bun/bunBase64Result.json";
import jsDenoResult from "../../../../js/deno/denoBase64Result.json";
import jsNodeResult from "../../../../js/node/nodeBase64Result.json";
import tsBunResult from "../../../../ts/bun/bunBase64Result.json";
import tsDenoResult from "../../../../ts/deno/denoBase64Result.json";
import tsNodeResult from "../../../../ts/node/nodeBase64Result.json";
import { ErrorInformation } from "../ErrorInformation";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Base64ResultProps } from "./types";

const charts = [
  "jsChartEncoding",
  "tsChartEncoding",
  "jsChartDecoding",
  "tsChartDecoding",
  "jsChartEncodingMemory",
  "tsChartEncodingMemory",
  "jsChartDecodingMemory",
  "tsChartDecodingMemory"
];

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

export const Base64Result = ({ req }: Base64ResultProps) => {
  const { data, isLoading, isError } = useGetBase64ResultsQuery(req satisfies Base64Request);

  if (isError) return <ErrorInformation />;

  const labels = generateLabels(req.number_of_iterations);

  const encodingChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Base64 encoding benchmark result"
      }
    }
  };

  const decodingChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Base64 decoding benchmark result"
      }
    }
  };

  const encodingMemoryChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Base64 encoding memory usage"
      }
    }
  };

  const decodingMemoryChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Base64 decoding memory usage"
      }
    }
  };

  const jsEncodingChartData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data
          ? data?.js.result_bun?.resultOfEncoding.map((res) => res.rss)
          : jsonData.js.result_bun?.resultOfEncoding.map((res) => res.rss),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data
          ? data?.js.result_deno?.resultOfEncoding.map((res) => res.rss)
          : jsonData.js.result_deno?.resultOfEncoding.map((res) => res.rss),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data
          ? data?.js.result_node?.resultOfEncoding.map((res) => res.rss)
          : jsonData.js.result_node?.resultOfEncoding.map((res) => res.rss),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const tsEncodingChartData = {
    labels,
    datasets: [
      {
        label: "Bun result - TS",
        data: data
          ? data.ts.result_bun.resultOfEncoding.map((res) => res.timeEncoding)
          : jsonData.ts.result_bun.resultOfEncoding.map((res) => res.timeEncoding),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - TS",
        data: data
          ? data.ts.result_deno.resultOfEncoding.map((res) => res.timeEncoding)
          : jsonData.ts.result_deno.resultOfEncoding.map((res) => res.timeEncoding),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - TS",
        data: data
          ? data.ts.result_bun.resultOfEncoding.map((res) => res.timeEncoding)
          : jsonData.ts.result_bun.resultOfEncoding.map((res) => res.timeEncoding),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const jsDecodingMemoryData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data
          ? data.js.result_bun.resultOfDecoding.map((res) => res.timeDecoded)
          : jsonData.js.result_bun.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data
          ? data.js.result_deno.resultOfDecoding.map((res) => res.timeDecoded)
          : jsonData.js.result_deno.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data
          ? data.js.result_node.resultOfDecoding.map((res) => res.timeDecoded)
          : jsonData.js.result_node.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const tsDecodingMemoryData = {
    labels,
    datasets: [
      {
        label: "Bun result - TS",
        data: data
          ? data.ts.result_bun.resultOfDecoding.map((res) => res.rss)
          : jsonData.ts.result_bun.resultOfDecoding.map((res) => res.rss),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - TS",
        data: data
          ? data.ts.result_deno.resultOfDecoding.map((res) => res.rss)
          : jsonData.ts.result_deno.resultOfDecoding.map((res) => res.rss),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - TS",
        data: data
          ? data.ts.result_node.resultOfDecoding.map((res) => res.rss)
          : jsonData.ts.result_node.resultOfDecoding.map((res) => res.rss),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const jsEncodingMemoryData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data
          ? data?.js.result_bun?.resultOfEncoding.map((res) => res.rss)
          : jsonData.js.result_bun?.resultOfEncoding.map((res) => res.rss),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data
          ? data?.js.result_deno?.resultOfEncoding.map((res) => res.rss)
          : jsonData.js.result_deno?.resultOfEncoding.map((res) => res.rss),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data
          ? data?.js.result_node?.resultOfEncoding.map((res) => res.rss)
          : jsonData.js.result_node?.resultOfEncoding.map((res) => res.rss),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const tsEncodingMemoryData = {
    labels,
    datasets: [
      {
        label: "Bun result - TS",
        data: data
          ? data.ts.result_bun.resultOfEncoding.map((res) => res.rss)
          : jsonData.ts.result_bun.resultOfEncoding.map((res) => res.rss),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - TS",
        data: data
          ? data.ts.result_deno.resultOfEncoding.map((res) => res.rss)
          : jsonData.ts.result_deno.resultOfEncoding.map((res) => res.rss),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - TS",
        data: data
          ? data.ts.result_bun.resultOfEncoding.map((res) => res.rss)
          : jsonData.ts.result_bun.resultOfEncoding.map((res) => res.rss),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const jsDecodingChartData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data
          ? data.js.result_bun.resultOfDecoding.map((res) => res.timeDecoded)
          : jsonData.js.result_bun.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data
          ? data.js.result_deno.resultOfDecoding.map((res) => res.timeDecoded)
          : jsonData.js.result_deno.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data
          ? data.js.result_node.resultOfDecoding.map((res) => res.timeDecoded)
          : jsonData.js.result_node.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#417e38",
        backgroundColor: "#417e38",
        pointRadius: 0
      }
    ]
  };

  const tsDecodingChartData = {
    labels,
    datasets: [
      {
        label: "Bun result - TS",
        data: data
          ? data.ts.result_bun.resultOfDecoding.map((res) => res.timeDecoded)
          : jsonData.ts.result_bun.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - TS",
        data: data
          ? data.ts.result_deno.resultOfDecoding.map((res) => res.timeDecoded)
          : jsonData.ts.result_deno.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - TS",
        data: data
          ? data.ts.result_node.resultOfDecoding.map((res) => res.timeDecoded)
          : jsonData.ts.result_node.resultOfDecoding.map((res) => res.timeDecoded),
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
        <CardContent className="flex flex-col gap-4 rounded-xl">
          <Line id="jsChartEncoding" className="bg-white" data={jsEncodingChartData} options={encodingChartOptions} />
          <Line id="jsChartDecoding" className="bg-white" data={jsDecodingChartData} options={decodingChartOptions} />
          <Line id="tsChartEncoding" className="bg-white" data={tsEncodingChartData} options={encodingChartOptions} />
          <Line id="tsChartDecoding" className="bg-white" data={tsDecodingChartData} options={decodingChartOptions} />
          <Line
            id="jsChartEncodingMemory"
            className="bg-white"
            data={jsDecodingMemoryData}
            options={encodingMemoryChartOptions}
          />
          <Line
            id="jsChartDecodingMemory"
            className="bg-white"
            data={jsEncodingMemoryData}
            options={decodingMemoryChartOptions}
          />
          <Line
            id="tsChartEncodingMemory"
            className="bg-white"
            data={tsEncodingMemoryData}
            options={encodingMemoryChartOptions}
          />
          <Line
            id="tsChartDecodingMemory"
            className="bg-white"
            data={tsDecodingMemoryData}
            options={decodingMemoryChartOptions}
          />
          <Button onClick={() => saveCharts(charts)} className="w-md">
            Save charts
          </Button>
        </CardContent>
      ) : null}
    </Card>
  );
};
