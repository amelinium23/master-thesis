import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Base64Request } from "@/store/services/request.types";

import { Base64Result } from "../Base64Result";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Base64Schema } from "./schema";
import { Base64FormValues } from "./type";

export const Base64Form = () => {
  const [base64Request, setBase64Request] = useState<Base64Request | undefined>(undefined);

  const form = useForm<Base64FormValues>({
    resolver: zodResolver(Base64Schema),
    mode: "onBlur",
    defaultValues: {
      numberOfIterations: "20"
    }
  });

  const onSubmit = (values: Base64FormValues) => {
    const req = { number_of_iterations: Number(values.numberOfIterations) };
    setBase64Request(req);
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
              </div>
              <Button className="w-fit self-center" type="submit">
                Perform benchmark
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {base64Request ? <Base64Result req={base64Request} /> : null}
    </>
  );
};
