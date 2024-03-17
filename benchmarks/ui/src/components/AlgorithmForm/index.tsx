import { Card, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlgorithmFormProps } from "./types";

export const AlgorithmForm = ({ options, currentOption, setCurrentOption }: AlgorithmFormProps) => {
  return (
    <div className="w-full max-h-fit flex mx-auto justify-center">
      <Card className="flex flex-col gap-2 w-1/2 self-center p-4">
        <CardTitle>Perform benchmarks</CardTitle>
        <Select
          autoComplete="off"
          onValueChange={(value) => setCurrentOption(options.find((val) => val.value === value)!)}
        >
          <SelectTrigger className="SelectTrigger" aria-label="Algorithm">
            <SelectValue placeholder="Select algorithm" defaultValue={currentOption.label} />
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
