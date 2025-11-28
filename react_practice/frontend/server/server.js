import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey : process.env.OPEN_API_KEY,
});

// 요약 API
app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await client.responses.create({
      model: "gpt-4o-mini",   // 빠르고 싸고 요약용으로 충분
      input: `다음 글을 자연스럽게 3~4문장으로 요약해줘:\n${text}`,
    });

    const summary = response.output[0].content[0].text; 

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 에러 발생" });
  }
});

app.listen(5001, () => {
  console.log("서버 실행 중! http://localhost:5001");
});
