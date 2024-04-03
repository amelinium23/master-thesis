import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { SqLiteRequest } from "@/store/services/request.types";

import { SqliteResult } from "../SqliteResult";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { SqliteSchema } from "./schema";
import { SqliteFormValues } from "./type";

export const SqliteForm = () => {
  const [sqliteRequest, setSqliteRequest] = useState<SqLiteRequest | undefined>(undefined);

  const form = useForm<SqliteFormValues>({
    resolver: zodResolver(SqliteSchema),
    mode: "onBlur",
    defaultValues: {
      numberOfIterations: "20",
      numberOfRecords: "20"
    }
  });

  const onSubmit = (values: SqliteFormValues) => {
    setSqliteRequest({
      number_of_iterations: Number(values.numberOfIterations),
      number_of_records: Number(values.numberOfRecords)
    } satisfies SqLiteRequest);
  };

  return (
    <>
      <Card className="flex flex-col max-w-screen-md gap-1 min-w-screen-md w-full py-4 px-4">
        <CardTitle>Files algorithm</CardTitle>
        <CardDescription>Prepare following benchmark parameters</CardDescription>
        <CardContent className="flex flex-col w-full justify-evenly  gap-2 py-4 px-0">
          <Form {...form}>
            <form className="flex flex-col justify-stretch p-0 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex items-stretch justify-between mx-auto gap-6 w-full">
                <FormField
                  name="numberOfIterations"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Number of iterations</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="numberOfRecords"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Number of records</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-fit self-center" type="submit">
                Perform benchmark
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {sqliteRequest ? <SqliteResult req={sqliteRequest} /> : null}
    </>
  );
};
