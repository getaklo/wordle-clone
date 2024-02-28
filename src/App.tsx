import { SyntheticEvent, useEffect, useState } from "react";
import "./App.css";
import { getRandomWord } from "./api/word";
import toast from "react-hot-toast";
import { IoReload } from "react-icons/io5";

function App() {
  //const [word, setWord] = useState<{ letter: string; color: string }[]>([]);
  const [guess, setGuess] = useState<string>("");
  const [actualWord, setActualWord] = useState<string>("hello");
  const [attempt, setAttempt] = useState<number>(0);
  const [lines, setLines] = useState<{ letter: string; color: string }[][]>([]);

  useEffect(() => {
    getRandomWord()
      .then((word) => {
        setActualWord(word);
        //setWord(new Array(5).fill({ letter: "", color: "bg-gray-500" }));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (attempt === 5) {
      toast.error(
        "You have reached the maximum number of attempts. The word was " +
        actualWord
        );
        setTimeout(() => {window.location.reload()}, 3000);
      return;
    }
  },[attempt]);

  function checkGuess() {
    let newWord = new Array(5);
    if (guess.length !== 5) {
      toast.error("Please enter a 5 letter word");
      return;
    }

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === actualWord[i]) {
        newWord[i] = { letter: actualWord[i], color: "bg-green-500" };
        
      } else if (actualWord.includes(guess[i])) {
        newWord[i] = { letter: guess[i], color: "bg-yellow-500" };
       
      } else {
        newWord[i] = { letter: guess[i], color: "bg-gray-500" };
    
      }
    }
    if (newWord.map((item) => item.letter).join("") === actualWord) {
      toast.success("You have guessed the word correctly",{icon: "🎉"});
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    //setWord(newWord);
    setLines((prev) => {
      prev[attempt] = newWord;
      return prev;
    });
    setGuess("");
    setAttempt((prev) => prev + 1);
  }
  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault(); // Prevent the default form submission behavior
    checkGuess(); // Call your checkGuess function
  }

  return (
    <div>
      <h1 className=" text-center p-5 text-6xl">Wordle clone</h1>
      <div className="flex flex-col gap-4 justify-center items-center align-middle">
         <button
            className=" absolute top-10 right-10 border rounded-md p-1"
            onClick={() => window.location.reload()}
          >
            <IoReload />
          </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Guess the word!"
            className="text-4xl w-100 h-20 placeholder:opacity-20 border-2 border-black text-center uppercase tracking-widest "
            maxLength={5}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
        </form>
        <div className="flex flex-row gap-2">
           <div className="flex flex-col gap-2">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex flex-row gap-2">
              {line.map((item, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 ${item.color} uppercase rounded-md shadow-md text-4xl text-black border flex justify-center items-center`}
                >
                  {item.letter}
                </div>
              ))}
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
