import { SyntheticEvent, useEffect, useState } from "react";
import "./App.css";
import { getRandomWord } from "./api/word";
import toast from "react-hot-toast";
import { IoReload } from "react-icons/io5";
import WordLengthSelector from "./components/WordLengthSelector";
import Disclamer from "./components/Disclamer";

function App() {
  const [guess, setGuess] = useState<string>("");
  const [actualWord, setActualWord] = useState<string>("hello");
  const [attempt, setAttempt] = useState<number>(0);
  const [lines, setLines] = useState<{ letter: string; color: string }[][]>([]);
  const [wordLength, setWordLength] = useState<number>(
    localStorage.getItem("wordLength")
      ? parseInt(localStorage.getItem("wordLength")!)
      : 5
  );
  const [won, setWon] = useState<boolean>(false);

  useEffect(() => {
   console.log(wordLength)
    getRandomWord(wordLength)
      .then((word) => {
        setActualWord(word);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (attempt === 5 && !won) {
      toast.error("Sorry, all attempts are used :( The word was " + actualWord);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return;
    }
  }, [attempt]);

  function checkGuess() {
    let newWord = new Array(wordLength);
    if (guess.length !== wordLength) {
      toast.error("Please enter a 5 letter word");
      return;
    }

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === actualWord[i]) {
        newWord[i] = { letter: actualWord[i], color: "bg-green-500" };
      } else if (actualWord.includes(guess[i]) && !newWord.includes(guess[i])) {
        newWord[i] = { letter: guess[i], color: "bg-yellow-500" };
      } else {
        newWord[i] = { letter: guess[i], color: "bg-gray-500" };
      }
    }
    if (newWord.map((item) => item.letter).join("") === actualWord) {
      setWon(true);
      toast.success("You win!", { icon: "🎉" });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }

    setLines((prev) => {
      prev[attempt] = newWord;
      return prev;
    });
    if(!won){
      setGuess("");
      setAttempt((prev) => prev + 1);
    }
  }
  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    checkGuess();
  }

  return (
    <div className="p-4 h-screen">
      <div className="p-5">
        <h1 className=" title text-center text-6xl font-extrabold text-cyan-400">
          Wordle Clone
        </h1>
        <h2 className="text-center text-sm font-extrabold">
          (But not really..)
        </h2>
        <Disclamer />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center align-middle">
        <button
          className=" absolute top-10 right-10 p-1 hover:scale-110 hover:animate-pulse"
          onClick={() => window.location.reload()}
        >
          <IoReload size={25} />
        </button>
        <WordLengthSelector />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            autoFocus={true}
            placeholder={wordLength + " letter word"}
            className="text-4xl items-center rounded-md w-full p-8 h-20 placeholder:font-extrabold placeholder:scale-75 placeholder:opacity-20 border-2 border-black text-center uppercase tracking-widest "
            maxLength={wordLength}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
        </form>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2">
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="flex flex-row gap-2 slideDown">
                {line.map((item, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 ${item.color} uppercase rounded-md shadow-md text-4xl text-black border flex justify-center items-center  `}
                  >
                    {item.letter}
                  </div>
                ))}
              </div>
            ))}
            {attempt === 4 && (
              <h1 className="text-2xl text-center font-bold text-cyan-300">Only one try left!</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
