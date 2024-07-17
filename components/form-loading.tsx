import React from "react";
import { Progress } from "./ui/progress";
import Loading from "./layout/loading";

type Props = { finished: boolean };

const FormLoading = ({ finished }: Props) => {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finished]);

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Loading />
      <Progress value={progress} className="w-full mt-4" />
      <h1 className="mt-2 text-xl">
        {" "}
        Generating MCQ. This might take a few seconds.
      </h1>
    </div>
  );
};

export default FormLoading;
