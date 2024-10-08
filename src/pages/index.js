"use client";

import React, { useState, useEffect } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  useEffect(() => {
    const wordsArray = text.toLowerCase().match(/\b\w+\b/g);

    const uniqueWords = new Set(wordsArray);
    setUniqueWordCount(uniqueWords.size);

    // Count characters excluding spaces and punctuation
    const charsArray = text.replace(/[^a-zA-Z0-9]/g, "");
    setCharCount(charsArray.length);
  }, [text]);

  const handleReplaceAll = () => {
    const newText = text.split(searchText).join(replaceText);
    setText(newText);

    // Highlight replaced words
    const highlighted = newText.replace(
      new RegExp(replaceText, "g"),
      `<mark class="bg-yellow-200 font-bold">${replaceText}</mark>`
    );
    setHighlightedText(highlighted);
  };

  return (
    <div className="p-8 bg-white text-black max-w-4xl mx-auto font-sans">
      <h1 className="text-xl md:text-3xl text-center font-bold mb-6 border-b-2 pb-1 border-b-green-400 ">
        Real-Time Text Analysis and Replacement
      </h1>

      <textarea
        className="w-full h-96 text-gray-700 p-4 border  rounded-md shadow-md focus:outline-none  resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
      ></textarea>

      <div className="mt-4 flex flex-col md:flex-row md:space-x-8">
        <p className="text-lg">
          Unique Words: <span className="font-semibold">{uniqueWordCount}</span>
        </p>
        <p className="text-lg">
          Characters: <span className="font-semibold">{charCount}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          className="border rounded-md px-4 py-2 w-full md:w-1/3 focus:outline-none "
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="String to search"
        />
        <input
          type="text"
          className="border rounded-md px-4 py-2 w-full md:w-1/3 focus:outline-none "
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="String to replace"
        />
        <button
          className="bg-green-600 font-bold text-white px-4 py-2 rounded-md hover:bg-green-900 transition"
          onClick={handleReplaceAll}
        >
          Replace All
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Highlighted Replacements:</h3>
        <div
          className="bg-green-100 p-4 rounded-md mt-2"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />
      </div>
    </div>
  );
};

export default App;
