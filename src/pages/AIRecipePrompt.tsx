import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  generateDishSummary,
  clearRecipe,
} from "../store/slices/aiRecipeSlice";

const AIRecipePrompt: React.FC = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const { dishName, description, recipe, loading, error, step } =
    useAppSelector((state) => state.aiRecipe);

  useEffect(() => {
    return () => {
      dispatch(clearRecipe());
    };
  }, [dispatch]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(generateDishSummary(text.trim()));
    }
  };

  // const handleGenerateFullRecipe = async () => {
  //   if (recipe?.dishName && recipe.description) {
  //     dispatch(generateFullRecipe({ dishName: recipe.dishName, description: recipe.description }));
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col items-center p-5">
      <h2 className="text-xl font-bold mb-4 dark:text-white">AI Recipe Prompt</h2>
      <div className="w-full max-w-4xl space-y-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-8"
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            placeholder="What would you like to cook? Describe your recipe idea in detail..."
            className="w-full p-4 border rounded-md text-lg min-h-[300px] max-h-[600px] resize-none overflow-hidden border-2 border-green-500 focus:border-green-600 focus:ring-4 focus:ring-green-200 focus:outline-none transition-colors duration-300 dark:bg-gray-800 dark:text-white"
          />
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <button
              className="relative px-6 py-2 bg-white dark:bg-gray-800 border border-green-500 rounded-lg text-black dark:text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md dark:text-red-400">
            {error}
          </div>
        )}

        {step === "summary" && dishName && (
          <>
            <h3 className="text-lg font-bold dark:text-white">{dishName}</h3>
            <p className="dark:text-white">{description}</p>
            <button className="bg-white dark:bg-gray-800 border border-green-500 rounded-lg text-black dark:text-white">I want to cook this!</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AIRecipePrompt;
