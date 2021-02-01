import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import '../src/utils/i18n';
import { useTranslation } from 'react-i18next';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';
import LanguageSelect from '../src/components/LanguageSelect';

export default function Home() {
  const { t } = useTranslation('quiz');
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
        <meta property="og:image" content={db.bg} />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.7 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '80%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{t('title')}</h1>
            <LanguageSelect/>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <p>
                {t('description')}
              </p>
              <Input
                onChange={(event) => setName(event.target.value)}
                placeholder={t('placeholder')}
                name="NomeDoUsuario"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {t('jogar') + name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '80%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>
              {t('quiz-galera')}
            </h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                      style={name.length === 0 ? { backgroundColor: '#979797', cursor: 'not-allowed' } : {}}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>

          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Vinicius-Santos26" />
    </QuizBackground>
  );
}
