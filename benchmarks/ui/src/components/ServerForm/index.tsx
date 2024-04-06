import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ServerRequest } from "@/store/services/request.types";

import { ServerResult } from "../ServerResult";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ServerSchema } from "./schema";
import { ServerFormValues } from "./type";

export const ServerForm = () => {
  const [serverRequest, setServerRequest] = useState<ServerRequest | undefined>(undefined);

  const form = useForm<ServerFormValues>({
    resolver: zodResolver(ServerSchema),
    mode: "onBlur",
    defaultValues: {
      numberOfConnections: "1",
      numberOfRequests: "1"
    }
  });

  const onSubmit = (values: ServerFormValues) => {
    setServerRequest({
      number_of_connections: Number(values.numberOfConnections),
      number_of_requests: Number(values.numberOfRequests)
    } satisfies ServerRequest);
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
                  name="numberOfConnections"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Number of connections</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="numberOfRequests"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Number of requests</FormLabel>
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
      {serverRequest ? <ServerResult req={serverRequest} /> : null}
    </>
  );
};
