import { Line } from "react-chartjs-2";

import { chartOptions, generateLabels, saveCharts } from "@/constants/chartOptions";
import { useGetBase64ResultsQuery } from "@/store/services/benchmarkService";
import { Base64Request } from "@/store/services/request.types";

import { ErrorInformation } from "../ErrorInformation";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Base64ResultProps } from "./types";

const charts = ["jsChartEncoding", "tsChartEncoding", "jsChartDecoding", "tsChartDecoding"];

export const Base64Result = ({ req }: Base64ResultProps) => {
  const { data, isLoading, isError } = useGetBase64ResultsQuery(req satisfies Base64Request);

  if (isError) return <ErrorInformation />;

  const labels = generateLabels(req.number_of_iterations);

  const jsEncodingChartData = {
    labels,
    datasets: [
      {
        label: "Bun result - JS",
        data: data?.js.result_bun?.resultOfEncoding.map((res) => res.timeEncoding),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data?.js.result_deno?.resultOfEncoding.map((res) => res.timeEncoding),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data?.js.result_node?.resultOfEncoding.map((res) => res.timeEncoding),
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
        data: data?.ts.result_bun?.resultOfEncoding.map((res) => res.timeEncoding),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - TS",
        data: data?.js.result_deno?.resultOfEncoding.map((res) => res.timeEncoding),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - TS",
        data: data?.ts.result_node?.resultOfEncoding.map((res) => res.timeEncoding),
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
        data: data?.js.result_bun?.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - JS",
        data: data?.js.result_deno?.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - JS",
        data: data?.js.result_node?.resultOfDecoding.map((res) => res.timeDecoded),
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
        data: data?.ts.result_bun?.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#c8373e",
        backgroundColor: "#c8373e",
        pointRadius: 0
      },
      {
        label: "Deno result - TS",
        data: data?.js.result_deno?.resultOfDecoding.map((res) => res.timeDecoded),
        borderColor: "#01C2FF",
        backgroundColor: "#01C2FF",
        pointRadius: 0
      },
      {
        label: "Node result - TS",
        data: data?.ts.result_node?.resultOfDecoding.map((res) => res.timeDecoded),
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
          <Line id="jsChartEncoding" className="bg-white" data={jsEncodingChartData} options={chartOptions} />
          <Line id="jsChartDecoding" className="bg-white" data={jsDecodingChartData} options={chartOptions} />
          <Line id="tsChartEncoding" className="bg-white" data={tsEncodingChartData} options={chartOptions} />
          <Line id="tsChartDecoding" className="bg-white" data={tsDecodingChartData} options={chartOptions} />
          <Button onClick={() => saveCharts(charts)} className="w-md">
            Save charts
          </Button>
        </CardContent>
      ) : null}
    </Card>
  );
};
