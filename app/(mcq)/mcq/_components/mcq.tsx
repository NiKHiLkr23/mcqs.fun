"use client";
import { MCQ as McqType, Question } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { differenceInSeconds } from "date-fns";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart,
  ChevronRight,
  Loader2,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { checkAnswerSchema, endGameSchema } from "@/schemas/questions";
import MCQCounter from "./mcq-counter";
import { endGameAction } from "@/actions/end-game-action";
import { useRouter } from "next/navigation";

type Props = {
  mcq: McqType & { questions: Question[] };
};

const MCQ = ({ mcq }: Props) => {
  const router = useRouter();
  const [isGameActive, setIsGameActive] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0,
  });
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [now, setNow] = React.useState(new Date());

  const currentQuestion = React.useMemo(() => {
    return mcq.questions[questionIndex];
  }, [questionIndex, mcq.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    return [
      currentQuestion.OptionA,
      currentQuestion.OptionB,
      currentQuestion.OptionC,
      currentQuestion.OptionD,
    ];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: options[selectedChoice],
      };
      const isCorrect =
        currentQuestion.correctOption.toLowerCase().trim() ===
        payload.userInput.toLowerCase().trim();
      return { isCorrect };
    },
  });

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: mcq.id,
      };
      const response = await endGameAction(payload);
    },
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  const handleNext = React.useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          setStats((stats) => ({
            ...stats,
            correct_answers: stats.correct_answers + 1,
          }));
          toast.success("Correct", { description: "You got it right!" });
        } else {
          setStats((stats) => ({
            ...stats,
            wrong_answers: stats.wrong_answers + 1,
          }));

          toast.error("Incorrect", { description: "You got it wrong!" });
        }
        if (questionIndex === mcq.questions.length - 1) {
          endGame();
          setHasEnded(true);
          return;
        }
        setQuestionIndex((questionIndex) => questionIndex + 1);
      },
    });
  }, [checkAnswer, questionIndex, mcq.questions.length, endGame]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === "1") {
        setSelectedChoice(0);
      } else if (key === "2") {
        setSelectedChoice(1);
      } else if (key === "3") {
        setSelectedChoice(2);
      } else if (key === "4") {
        setSelectedChoice(3);
      } else if (key === "Enter") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  if (!isGameActive) {
    return (
      <div className="p-10">
        <Button variant="outline" onClick={() => router.push("/explore")}>
          <ArrowLeft className="w-4 h-4" /> Back to explore
        </Button>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>{mcq.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                {mcq.content}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="default"
              onClick={() => {
                setIsGameActive(true);
              }}
            >
              Start Game
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Link
          href={`/explore`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic */}
          <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {mcq.title}
            </span>
          </p>
          {/* <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div> */}
        </div>
        <MCQCounter
          correct_answers={stats.correct_answers}
          wrong_answers={stats.wrong_answers}
        />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {mcq.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              key={option}
              variant={selectedChoice === index ? "default" : "outline"}
              className="justify-start w-full py-8 mb-4"
              onClick={() => setSelectedChoice(index)}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button
          variant="default"
          className="mt-2"
          size="lg"
          disabled={isChecking || hasEnded}
          onClick={() => {
            handleNext();
          }}
        >
          {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
