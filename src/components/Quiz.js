import React, { useState, useContext } from "react";
import "../App.css";
import { Questions } from "../helpers/Questions";
import { GameStateContext } from "../helpers/Contexts";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [historyChosen, setHistoryChosen] = useState([]);
  const [one, setOne] = useState(0); // button 1
  const [two, setTwo] = useState(0); // button 2
  const [three, setThree] = useState(0); // button 3
  const [four, setFour] = useState(0); // button 4

  const { score, setScore, gameState, setGameState } =
    useContext(GameStateContext);
  // * FUNCTION:
  const switchFunction = (option) => {
    switch (option) {
      case "optionA":
        setOne(1);
        setTwo(0);
        setThree(0);
        setFour(0);
        break;
      case "optionB":
        setOne(0);
        setTwo(1);
        setThree(0);
        setFour(0);
        break;
      case "optionC":
        setOne(0);
        setTwo(0);
        setThree(1);
        setFour(0);
        break;
      case "optionD":
        setOne(0);
        setTwo(0);
        setThree(0);
        setFour(1);
        break;
      default:
        setOne(0);
        setTwo(0);
        setThree(0);
        setFour(0);
        break;
    }
  };
  const chooseOption = (option) => {
    setOptionChosen(option);
    switchFunction(option);
  };

  // * FUNCTION:
  const nextQuestion = () => {
    if (Questions[currentQuestion].asnwer == optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setOne(0);
    setTwo(0);
    setThree(0);
    setFour(0);

    setHistoryChosen([...historyChosen, { currentQuestion, optionChosen }]);
  };

  const previousQuestion = () => {
    let hh = historyChosen.find(
      (h) => h.currentQuestion == currentQuestion - 1
    ).optionChosen;
    setCurrentQuestion(currentQuestion - 1);
    switchFunction(hh);
  };
  // * FUNCTION:
  const finishQuiz = () => {
    setGameState("finished");
    setOne(0);
    setTwo(0);
    setThree(0);
    setFour(0);
  };

  return currentQuestion <= Questions.length - 1 ? (
    <div className="Quiz">
      <h1>{Questions[currentQuestion].prompt}</h1>
      <div className="questions">
        <button
          className={one ? "selected_button" : "unselected_button"}
          onClick={() => {
            chooseOption("optionA");
          }}
        >
          {Questions[currentQuestion].optionA}
        </button>
        <button
          className={two ? "selected_button" : "unselected_button"}
          onClick={() => {
            chooseOption("optionB");
          }}
        >
          {Questions[currentQuestion].optionB}
        </button>
        <button
          className={three ? "selected_button" : "unselected_button"}
          onClick={() => {
            chooseOption("optionC");
          }}
        >
          {Questions[currentQuestion].optionC}
        </button>
        <button
          className={four ? "selected_button" : "unselected_button"}
          onClick={() => {
            chooseOption("optionD");
          }}
        >
          {Questions[currentQuestion].optionD}
        </button>
      </div>

      <div>
        <button onClick={previousQuestion} id="previousQuestion">
          Previous Question
        </button>
        <button onClick={nextQuestion} id="nextQuestion">
          Next Question
        </button>
      </div>
    </div>
  ) : (
    <button onClick={finishQuiz} id="nextQuestion">
      Finish Quiz
    </button>
  );
}

export default Quiz;
