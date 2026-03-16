import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "null";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const promptConfig = `
      You are an expert technical portfolio writer. Based on the following prompt, generate a JSON object matching this structure EXACTLY. No markdown formatting, just raw JSON. Do not include markdown \`\`\`json wrappers.
      {
        "title": "Short Project Title",
        "subtitle": "Brief subtitle / catchphrase",
        "description": "A punchy 1-2 sentence description",
        "year": ${new Date().getFullYear()},
        "skills": ["Skill1", "Skill2", "Skill3"],
        "keyPoints": ["Bullet 1", "Bullet 2", "Bullet 3"],
        "details": "<p>Rich HTML string describing the architecture, purpose, and challenges.</p>"
      }
      User Prompt: ${prompt}
    `;

    const result = await model.generateContent(promptConfig);
    const response = await result.response;
    let text = response.text();

    // Clean potential formatting
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("JSON Parse Error:", text);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
