/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import '../../utils/i18n';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.mainBg};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  const { t } = useTranslation('quiz');
  return (
    <FooterWrapper {...props}>
      <a href="https://www.alura.com.br/">
        <img src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg" alt="Logo Alura" />
      </a>
      <p>
        {t('alura')}
        <a href="https://www.alura.com.br/">
          <span>
            {t('imersao')}
          </span>
        </a>
      </p>
    </FooterWrapper>
  );
}
