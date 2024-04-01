import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FilesRequest } from "@/store/services/request.types";

import { FilesResult } from "../FilesResult";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FilesSchema } from "./schema";
import { FilesFormValues } from "./type";

export const FilesForm = () => {
  const [filesRequest, setFilesRequest] = useState<FilesRequest | undefined>(undefined);

  const form = useForm<FilesFormValues>({
    resolver: zodResolver(FilesSchema),
    mode: "onBlur",
    defaultValues: {
      numberOfParagraphs: "20",
      numberOfIterations: "100",
      numberOfFiles: "20",
      shouldBeBunFiles: false
    }
  });

  const onSubmit = (values: FilesFormValues) => {
    setFilesRequest({
      number_of_files: Number(values.numberOfParagraphs),
      number_of_iterations: Number(values.numberOfIterations),
      number_of_paragraphs: Number(values.numberOfParagraphs),
      should_be_bun_files: values.shouldBeBunFiles
    } satisfies FilesRequest);
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
                  name="numberOfParagraphs"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Number of paragraphs</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="numberOfFiles"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Number of files</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="shouldBeBunFiles"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Should be bun files</FormLabel>
                      <FormControl className="flex flex-col">
                        <Checkbox {...field} />
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
      {filesRequest ? <FilesResult req={filesRequest} /> : null}
    </>
  );
};
