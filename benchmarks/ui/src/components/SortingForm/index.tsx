import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { sortingOptions } from "@/constants/options";

import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SortingSchema } from "./schema";
import { SortingFormValues } from "./type";

export const SortingForm = () => {
  const form = useForm<SortingFormValues>({
    resolver: zodResolver(SortingSchema),
    mode: "onBlur",
    defaultValues: {
      sortingType: sortingOptions[0].value,
      numberOfIterations: "1",
      sizeOfArray: "2"
    }
  });

  const onSubmit = (values: SortingFormValues) => {
    console.log(values);
  };

  return (
    <Card className="flex flex-col max-w-screen-md gap-1 min-w-screen-md w-full py-4 px-4">
      <CardTitle>Sorting algorithm</CardTitle>
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
                    <FormLabel>Number of Iterations</FormLabel>
                    <FormControl>
                      <Input placeholder="1" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="sortingType"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Sorting algorithm</FormLabel>
                    <FormControl>
                      <Select onValueChange={(value) => form.setValue("sortingType", value)} {...field}>
                        <SelectTrigger className="SelectTrigger" aria-label="Algorithm">
                          <SelectValue placeholder="Select algorithm" defaultValue={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          {sortingOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="sizeOfArray"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Size of array</FormLabel>
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
