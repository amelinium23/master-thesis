import { useGetServerResultsQuery } from "@/store/services/benchmarkService";

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
                                  <TableCell>{}</TableCell>
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
