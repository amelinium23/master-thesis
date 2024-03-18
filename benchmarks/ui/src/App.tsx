import "./index.css";

import { useState } from "react";

import { AlgorithmForm } from "./components/AlgorithmForm";
import { SortingForm } from "./components/SortingForm";
import { options } from "./constants/options";

const selectedForm = (option: (typeof options)[number]) => {
  switch (option.value) {
    case "sorting":
      return <SortingForm />;

    default:
      return <></>;
  }
};

export const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(options[0]);

  return (
    <div className="w-100 max-w-screen flex flex-col gap-2 p-4">
      <div className="flex flex-col gap-2 items-center">
        <AlgorithmForm currentOption={selectedAlgorithm} setCurrentOption={setSelectedAlgorithm} options={options} />
        {selectedForm(selectedAlgorithm)}
      </div>
    </div>
  );
};
