import React from 'react';
import FooterLarge from '../components/sections/footers/FooterLarge';
import { footerProps } from './utilities';

export default function Footer() {
  return (
    <>
      <FooterLarge {...footerProps} />
    </>
  );
}
