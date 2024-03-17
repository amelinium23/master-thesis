import "./index.css";

import { useState } from "react";

import { AlgorithmForm } from "./components/AlgorithmForm";
import { options } from "./constants/options";

export const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(options[0]);

  console.log(selectedAlgorithm);

  return (
    <div className="w-100 max-w-screen flex flex-col gap-2 p-4">
      <div className="max-w-scree-lg">
        <AlgorithmForm currentOption={selectedAlgorithm} setCurrentOption={setSelectedAlgorithm} options={options} />
      </div>
    </div>
  );
};
