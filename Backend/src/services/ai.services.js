import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const generateTaskSuggestion = async (
  title,
  description
) => {
  const prompt = `
You are an experienced software project manager.

Task Title:
${title}

Task Description:
${description || "No description"}

Generate:

1. Step-by-step implementation plan.
2. Complexity (Easy/Medium/Hard).
3. Possible challenges.
4. Best practices.

Respond using markdown.
`;

  const response = await client.chat.complete({
    model: "mistral-small-latest",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
};