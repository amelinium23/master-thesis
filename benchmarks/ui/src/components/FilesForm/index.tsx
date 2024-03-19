import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FilesSchema } from "./schema";
import { FilesFormValues } from "./type";

export const FilesForm = () => {
  const form = useForm<FilesFormValues>({
    resolver: zodResolver(FilesSchema),
    mode: "onBlur",
    defaultValues: {
      numberOfParagraphs: "20",
      numberOfIterations: "100",
      numberOfFiles: "20"
    }
  });

  const onSubmit = (values: FilesFormValues) => {
    console.log(values);
  };

  return (
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
                    <FormMessage />s
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
            </div>
            <Button className="w-fit self-center" type="submit">
              Perform benchmark
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
