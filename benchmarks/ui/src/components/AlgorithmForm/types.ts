export type SelectOption = {
  value: string;
  label: string;
};

export type AlgorithmFormProps = {
  options: SelectOption[];
  currentOption: SelectOption;
  setCurrentOption: (newValue: { value: string; label: string }) => void;
};
