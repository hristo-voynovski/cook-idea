import React, { useState, useRef } from "react";

const AIRecipePrompt = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 600);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > 600 ? "auto" : "hidden";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    adjustTextareaHeight();
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-5">
      <h2 className="text-xl font-bold mb-4">AI Recipe Prompt</h2>
      <form className="flex flex-col items-center space-y-8 w-full max-w-4xl">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="What would you like to cook? Describe your recipe idea in detail..."
          className="w-full p-4 border rounded-md text-lg min-h-[300px] max-h-[600px] resize-none overflow-hidden border-2 border-green-500 focus:border-green-600 focus:ring-4 focus:ring-green-200 focus:outline-none transition-colors duration-300"
        />
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
          <button className="relative px-6 py-2 bg-green-500 rounded-lg text-white group-hover:bg-green-600 transition duration-300">
            Generate Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIRecipePrompt;
