import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

export default function Link({ children, href, ...props }) {
  return (
    <NextLink href={href} passHref>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  );
}

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  href: PropTypes.string.isRequired,
};
