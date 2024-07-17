import { Question } from "@prisma/client";
import { inngest } from "./client";
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const generateMCQ = inngest.createFunction(
  { id: "generate-mcq" }, // Each function should have a unique ID
  { event: "app/generate-mcq" }, // When an event by this name received, this function will run

  async ({ event, step, prisma }) => {
    const systemPrompt =
      "You are a helpful AI that is able to generate content/article for a topic and mcq questions and answers based on the generated content/article. The length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array";
    const output_format = {
      topic: "{topic}",
      content: "Article content here",
      questions: [
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        },
      ],
    };
    const output_format_prompt: string = `\nYou are to output the following in json format: ${JSON.stringify(
      output_format
    )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    const userPrompt = event.data.prompt;

    const generatedMCQ = await step.run("generate-mcq", async () => {
      if (!OPENAI_API_KEY) {
        console.log("No open api key");
        return { data: null };
      }
      try {
        const openai = new OpenAI();
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: systemPrompt + output_format_prompt,
            },
            { role: "user", content: userPrompt.toString() },
          ],
          model: "gpt-3.5-turbo",
        });

        let res: string =
          completion.choices[0].message?.content?.replace(/'/g, '"') ??
          "Unexpected OpenAI response";

        res = res.replace(/(\w)"(\w)/g, "$1'$2");

        return { data: JSON.parse(res) };
      } catch (error) {
        return { data: null };
      }
    });

    if (!generatedMCQ.data) {
      return;
    }

    const manyData = generatedMCQ.data.questions.map((q: any) => {
      // mix up the options lol
      const options = [q.option1, q.option2, q.option3, q.answer].sort(
        () => Math.random() - 0.5
      );
      return {
        question: q.question,
        OptionA: options[0],
        OptionB: options[1],
        OptionC: options[2],
        OptionD: options[3],
        correctOption: q.answer,
      };
    });

    const updateMCQ = await step.run("update-mcq-data", async () => {
      return await prisma.mCQ.update({
        where: { id: event.data.mcqId as string },
        data: {
          content: generatedMCQ.data.content,
          isCreated: true,
          questions: {
            create: manyData,
          },
        },
      });
    });

    return { event, body: updateMCQ };
  }
);
