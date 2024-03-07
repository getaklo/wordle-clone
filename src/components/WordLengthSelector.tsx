import React, { useEffect } from "react";

export default function WordLengthSelector() {
  let length = localStorage.getItem("wordLength")
    ? parseInt(localStorage.getItem("wordLength")!)
    : 5;

  function handleClick(length: number) {
    localStorage.setItem("wordLength", length.toString());
    window.location.reload();
  }

  const activeStyle = "bg-cyan-400 text-black outline outline-offset-2 outline-2 outline-slate-500";
  return (
    <div className="flex align-middle justify-center gap-3 w-full h-full">
      <button
        onClick={() => handleClick(4)}
        className={`px-2 py-1 text-xl border rounded-md ${
          length === 4 ? activeStyle : null
        } `}
      >
        easy
      </button>
      <button
        onClick={() => handleClick(5)}
        className={`px-2 py-1 text-xl border rounded-md ${
          length === 5 ? activeStyle : null
        } `}
      >
        medium
      </button>
      <button
        onClick={() => handleClick(6)}
        className={`px-2 py-1 text-xl border rounded-md ${
          length === 6 ? activeStyle : null
        } `}
      >
        hard
      </button>
    </div>
  );
}
