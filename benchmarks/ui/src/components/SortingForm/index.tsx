import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { sortingOptions } from "@/constants/options";
import { SortingRequest } from "@/store/services/request.types";

import { SortingResultChart } from "../SortingResult";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SortingSchema } from "./schema";
import { SortingFormValues } from "./type";

export const SortingForm = () => {
  const [sortingRequest, setSortingRequest] = useState<SortingRequest | undefined>(undefined);

  const form = useForm<SortingFormValues>({
    resolver: zodResolver(SortingSchema),
    defaultValues: {
      sortingType: sortingOptions[0].value,
      numberOfIterations: "10",
      sizeOfArray: "10"
    }
  });

  const onSubmit = (values: SortingFormValues) => {
    const req = {
      number_of_iterations: Number(values.numberOfIterations),
      number_of_samples: Number(values.sizeOfArray),
      sorting_type: values.sortingType
    } satisfies SortingRequest;
    setSortingRequest(req);
  };

  return (
    <div className="flex flex-col max-w-screen-md gap-6 min-w-screen-md w-full">
      <Card className="flex flex-col py-4 px-4">
        <CardTitle>Sorting algorithm</CardTitle>
        <CardDescription>Prepare following benchmark parameters</CardDescription>
        <CardContent className="flex flex-col w-full justify-evenly gap-2 py-4 px-0">
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
      {sortingRequest ? <SortingResultChart req={sortingRequest} /> : null}
    </div>
  );
};
