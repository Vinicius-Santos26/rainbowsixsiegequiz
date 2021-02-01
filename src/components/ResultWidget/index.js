import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import '../../utils/i18n';
import { useRouter } from 'next/router';
import { Lottie } from '@crello/react-lottie';

import congratulationAnimation from '../../animations/congratulation.json';
import Widget from '../Widget';
import BackLinkArrow from '../BackLinkArrow';
import LanguageSelect from '../LanguageSelect';

export default function ResultWidget({ results }) {
  const { t } = useTranslation('quiz');
  const qtdAcertos = results.filter((x) => x).length;
  const router = useRouter();
  const {
    query: { name },
  } = router;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{t('resultado')}</h3>
        <LanguageSelect/>
      </Widget.Header>

      <Widget.Content>
        {qtdAcertos > 0 ? (
          <p>
            {`${t('parabens')} ${name}. ${t('voce-acertou')} ${qtdAcertos} ${t('perguntas')}`}
            <Lottie 
              width="200px"
              height="200px"
              className="lottie-container basic"
              config={{ animationData: congratulationAnimation, loop: true, autoplay: true }}
            />
          </p>
        ) : (
            <p>
              {t('tente-novamente')}
            </p>
          )}
        <ul>
          {results.map((result, index) => (
            <li key={`result_${index + 1}`}>
              { `#${index + 1} ${t('pergunta')}: `}
              {result === true
                ? t('acertou')
                : t('errou')}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};
