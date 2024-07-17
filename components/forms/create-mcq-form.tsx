"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormLoading from "../form-loading";
import { mcqCreationSchema } from "@/schemas/forms/mcq";
import { generateMCQ } from "@/actions/generate-mcq";

type Props = {
  topic?: string;
};

type Input = z.infer<typeof mcqCreationSchema>;

const CreateMcqForm = ({ topic: topicParam }: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);
  const { toast } = useToast();
  const { mutate: createMCQ, isPending } = useMutation({
    mutationFn: async ({ topic }: Input) => {
      const response = await generateMCQ(topic);
      return response;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(mcqCreationSchema),
    defaultValues: {
      topic: topicParam,
    },
  });

  const onSubmit = async (data: Input) => {
    setShowLoader(true);
    createMCQ(data, {
      onSuccess: () => {
        setFinishedLoading(true);
        setShowLoader(false);
        form.reset({
          topic: "",
        });
        router.refresh();
      },
    });
  };
  form.watch();

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create MCQ</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:space-y-8 flex flex-col md:flex-row gap-5 md:gap-8  "
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide any topic you would like to learn here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMcqForm;
