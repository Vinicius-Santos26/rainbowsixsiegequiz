import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import QuizContainer from '../../components/QuizContainer';
import ResultWidget from '../../components/ResultWidget';
import LoadingWidget from '../../components/LoadingWidget';
import QuestionWidget from '../../components/QuestionWidget';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizScreen({ questions, background }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const qtdQuestions = questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = questions[questionIndex];
  const bg = background;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3500);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < qtdQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <Head>
        <title>Alura Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            qtdQuestions={qtdQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}

QuizScreen.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  background: PropTypes.string.isRequired,
};
