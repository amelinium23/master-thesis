import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { SortingSchema } from "./schema";
import { SortingFormValues } from "./type";

export const SortingForm = () => {
  const form = useForm<SortingFormValues>({
    resolver: zodResolver(SortingSchema),
    defaultValues: {
      numberOfIterations: 1,
      sizeOfArray: 2
    }
  });

  const onSubmit = (values: SortingFormValues) => {
    console.log(values);
  };

  return (
    <Card className="flex flex-col max-w-screen-md min-w-screen-md w-1/2 p-4">
      <CardTitle>Sorting algorithm</CardTitle>
      <CardDescription>Prepare following benchmark parameters</CardDescription>
      <CardContent className="flex flex-col gap-2 py-4 px-0">
        <Form {...form}>
          <form className="flex flex-col p-0 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-8">
              <FormField
                name="numberOfIterations"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Iterations</FormLabel>
                    <FormControl>
                      <Input placeholder="0" type="number" {...field} />
                    </FormControl>
                    <FormDescription>Here specify number of iterations</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="sizeOfArray"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size of array</FormLabel>
                    <FormControl>
                      <Input placeholder="0" type="number" {...field} />
                    </FormControl>
                    <FormDescription>Here specify size of array</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-fit self-center" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
