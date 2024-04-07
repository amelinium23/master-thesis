import { useGetServerResultsQuery } from "@/store/services/benchmarkService";

import jsBunResult from "../../../../js/bun/bunServerResult.json";
import jsDenoResult from "../../../../js/deno/denoServerResult.json";
import jsNodeResult from "../../../../js/node/nodeServerResult.json";
import tsBunResult from "../../../../ts/bun/bunServerResult.json";
import tsDenoResult from "../../../../ts/deno/denoServerResult.json";
import tsNodeResult from "../../../../ts/node/nodeServerResult.json";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ServerResultProps } from "./types";

type ResultKeys = "result_bun" | "result_deno" | "result_bun";
type SummaryKeys =
  | "summary"
  | "responseTimeHistogram"
  | "rps"
  | "details"
  | "statusCodeDistribution"
  | "errorDistribution";

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

const showValue = (value: unknown) => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  if (typeof value === "object" && value) {
    return Object.entries(value).map(([key, value]) => (
      <TableRow key={key}>
        <TableCell>{value as string | number}</TableCell>
      </TableRow>
    ));
  }
  return null;
};

export const ServerResult = ({ req }: ServerResultProps) => {
  const { data, isLoading } = useGetServerResultsQuery(req);

  return (
    <Card className="flex flex-col w-full text-center max-w-screen-md justify-evenly gap-2 min-h-[400px] py-4 px-4">
      <CardTitle className="text-md">Result</CardTitle>
      <CardContent className="flex flex-col justify-center">
        {isLoading ? <Skeleton className="h-[300px] w-full" /> : null}
        {data ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(data.js).map((key) => (
                <>
                  <TableCaption className="flex text-center w-full">
                    {key
                      .split("_")
                      .filter((x) => x)
                      .join(" - js")}
                  </TableCaption>
                  {Object.keys(data.js[key as ResultKeys]).map((summaryKey) => (
                    <TableRow key={summaryKey}>
                      <TableCell>{summaryKey}</TableCell>
                      <TableCell className="break-words max-w-[300px]">
                        {typeof data.js[key as ResultKeys][summaryKey as SummaryKeys] === "object"
                          ? Object.entries(data.js[key as ResultKeys][summaryKey as SummaryKeys]).map(
                              ([insertedKey, value]) => (
                                <TableRow key={insertedKey}>
                                  <TableCell>{insertedKey}</TableCell>
                                  <TableCell>{showValue(value)}</TableCell>
                                </TableRow>
                              )
                            )
                          : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
              {Object.keys(data.ts).map((key) => (
                <>
                  <TableCaption className="flex text-center w-full">
                    {key
                      .split("_")
                      .filter((x) => x)
                      .join(" - ts")}
                  </TableCaption>
                  {Object.keys(data.ts[key as ResultKeys]).map((summaryKey) => (
                    <TableRow key={summaryKey}>
                      <TableCell>{summaryKey}</TableCell>
                      <TableCell className="break-words max-w-[300px]">
                        {typeof data.ts[key as ResultKeys][summaryKey as SummaryKeys] === "object"
                          ? Object.entries(data.ts[key as ResultKeys][summaryKey as SummaryKeys]).map(
                              ([insertedKey, value]) => (
                                <TableRow key={insertedKey}>
                                  <TableCell>{insertedKey}</TableCell>
                                  <TableCell>{showValue(value)}</TableCell>
                                </TableRow>
                              )
                            )
                          : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        ) : jsonData ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(jsonData.js).map((key) => (
                <>
                  <TableCaption className="flex text-center w-full">
                    {key
                      .split("_")
                      .filter((x) => x)
                      .join(" - js")}
                  </TableCaption>
                  {Object.keys(jsonData.js[key as ResultKeys]).map((summaryKey) => (
                    <TableRow key={summaryKey}>
                      <TableCell>{summaryKey}</TableCell>
                      <TableCell className="break-words max-w-[300px]">
                        {typeof jsonData.js[key as ResultKeys][summaryKey as SummaryKeys] === "object"
                          ? Object.entries(jsonData.js[key as ResultKeys][summaryKey as SummaryKeys]).map(
                              ([insertedKey, value]) => (
                                <TableRow key={insertedKey}>
                                  <TableCell>{insertedKey}</TableCell>
                                  <TableCell>{showValue(value)}</TableCell>
                                </TableRow>
                              )
                            )
                          : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
              {Object.keys(jsonData.ts).map((key) => (
                <>
                  <TableCaption className="flex text-center w-full">
                    {key
                      .split("_")
                      .filter((x) => x)
                      .join(" - ts")}
                  </TableCaption>
                  {Object.keys(jsonData.ts[key as ResultKeys]).map((summaryKey) => (
                    <TableRow key={summaryKey}>
                      <TableCell>{summaryKey}</TableCell>
                      <TableCell className="break-words max-w-[300px]">
                        {typeof jsonData.ts[key as ResultKeys][summaryKey as SummaryKeys] === "object"
                          ? Object.entries(jsonData.ts[key as ResultKeys][summaryKey as SummaryKeys]).map(
                              ([insertedKey, value]) => (
                                <TableRow key={insertedKey}>
                                  <TableCell>{insertedKey}</TableCell>
                                  <TableCell>{showValue(value)}</TableCell>
                                </TableRow>
                              )
                            )
                          : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </CardContent>
    </Card>
  );
};
