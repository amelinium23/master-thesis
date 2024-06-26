import { Card, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlgorithmFormProps } from "./types";

export const AlgorithmForm = ({ options, currentOption, setCurrentOption }: AlgorithmFormProps) => {
  return (
    <div className="max-h-fit flex mx-auto min-w-screen-md w-full max-w-screen-md justify-center">
      <Card className="flex flex-col gap-2 w-full self-center p-4">
        <CardTitle>Perform benchmarks</CardTitle>
        <Select
          autoComplete="off"
          defaultValue={currentOption.value}
          onValueChange={(value) => setCurrentOption(options.find((val) => val.value === value)!)}
        >
          <SelectTrigger className="SelectTrigger" aria-label="Algorithm">
            <SelectValue placeholder="Select algorithm" defaultValue={currentOption.value} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>
    </div>
  );
};
