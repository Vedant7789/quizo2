import { useState } from "react";

export default function QuizForm({ onSubmit }: { onSubmit: (title: string) => void }) {
  const [title, setTitle] = useState("");

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={() => onSubmit(title)}
        className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
      >
        Create Quiz
      </button>
    </div>
  );
}