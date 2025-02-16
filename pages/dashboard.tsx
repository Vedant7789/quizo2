import { useEffect, useState } from "react";
import QuizForm from "../components/QuizForm";

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("/api/quizzes")
      .then((res) => res.json())
      .then(setQuizzes);
  }, []);

  const handleCreateQuiz = async (title: string) => {
    const res = await fetch("/api/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      setQuizzes([...quizzes, await res.json()]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Quizzes</h1>
      <QuizForm onSubmit={handleCreateQuiz} />
      <ul className="mt-4">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="p-2 border-b">
            {quiz.title}
          </li>
        ))}
      </ul>
    </div>
  );
}