import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import '../../utils/i18n';

import Widget from '../Widget';
import Button from '../Button';
import AlternativesForm from '../AlternativesForm';
import BackLinkArrow from '../BackLinkArrow';
import LanguageSelect from '../LanguageSelect';

export default function QuestionWidget({
  question,
  qtdQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const { t } = useTranslation('quiz');

  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`${t('pergunta')} ${questionIndex + 1} / ${qtdQuestions}`}
        </h3>
        <LanguageSelect/>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {t(`questions.${questionIndex}.title`)}
        </h2>
        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsFormSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              setSelectedAlternative(undefined);
              onSubmit();
              setIsFormSubmited(false);
            }, 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isFormSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  style={{ display: 'none' }}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {t(`questions.${questionIndex}.alternatives.${alternativeId}`)}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            {t('confirmar')}
          </Button>
          {isFormSubmited && isCorrect && <p>{t('voce-acertou')}</p>}
          {isFormSubmited && !isCorrect && <p>{t('voce-errou')}</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

QuestionWidget.propTypes = {
  question: PropTypes.shape({
    answer: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  qtdQuestions: PropTypes.number.isRequired,
  questionIndex: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addResult: PropTypes.func.isRequired,
};
