import React, { useState } from "react";

function OpenAITextGenerator() {
  const [inputText, setInputText] = useState("");      // 사용자가 입력한 원문
  const [summary, setSummary] = useState("");          // 요약 결과
  const [loading, setLoading] = useState(false);       // 로딩 상태

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
        const res = await fetch("http://localhost:5001/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
        });

        const data = await res.json();
        setSummary(data.summary);
    } catch (err) {
        setSummary("서버 오류 발생 ㅠㅠ");
    }

    setLoading(false);

  };

  return (
    <div>
      <h1>나만의 요약기</h1>

      <textarea
        rows={8}
        cols={60}
        value={inputText}
        onChange={handleChange}
        placeholder="여기에 요약하고 싶은 글을 붙여넣으세요"
      />

      <div>
        <button onClick={handleSummarize} disabled={loading || !inputText.trim()}>
          {loading ? "요약 중..." : "요약하기"}
        </button>
      </div>

      <div>
        <h2>요약 결과</h2>
        {summary ? <p>{summary}</p> : <p>아직 요약 결과가 없습니다.</p>}
      </div>
    </div>
  );
}

export default OpenAITextGenerator;
