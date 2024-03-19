import "./index.css";

import { useState } from "react";

import { AlgorithmForm } from "./components/AlgorithmForm";
import { Base64Form } from "./components/Base64Form";
import { FilesForm } from "./components/FilesForm";
import { ServerForm } from "./components/ServerForm";
import { SortingForm } from "./components/SortingForm";
import { SqliteForm } from "./components/SqliteForm";
import { options } from "./constants/options";

const selectedForm = (option: (typeof options)[number]) => {
  switch (option.value) {
    case "sorting":
      return <SortingForm />;
    case "files":
      return <FilesForm />;
    case "sqlite":
      return <SqliteForm />;
    case "base64":
      return <Base64Form />;
    default:
      return <ServerForm />;
  }
};

export const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(options[0]);

  return (
    <div className="w-100 max-w-screen flex flex-col gap-8 py-2">
      <div className="flex flex-col gap-2 items-center">
        <AlgorithmForm currentOption={selectedAlgorithm} setCurrentOption={setSelectedAlgorithm} options={options} />
        {selectedForm(selectedAlgorithm)}
      </div>
    </div>
  );
};
