import { saveAs } from "file-saver";

export const chartOptions = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Iteration"
      }
    },
    y: {
      title: {
        display: true,
        text: "Time"
      }
    }
  },
  plugins: {
    legend: {
      position: "top" as const
    },
    title: {
      display: true,
      text: ""
    }
  }
};

export const generateLabels = (length: number) => Array.from({ length: length }).map((_, i) => i + 1);

export const saveCharts = (charts: string[]) => {
  charts.forEach((chart) => {
    const canvasElement = document.getElementById(chart) as HTMLCanvasElement;
    if (canvasElement) canvasElement.toBlob((blob) => blob && saveAs(blob, `${chart}.png`));
  });
};
