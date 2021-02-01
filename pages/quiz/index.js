import React from 'react';

import db from '../../db.json';
import QuizScreen from '../../src/screens/Quiz';

export default function MyQuizPage() {
  const myQuestions = db.questions;
  const myBackground = db.bg;
  return <QuizScreen questions={myQuestions} background={myBackground} />;
}
