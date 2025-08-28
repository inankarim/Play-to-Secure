import React from 'react';
import CSSInjectionIndex from './CSSInjectionIndex';

const CSSInjectionPage = () => {
  React.useEffect(() => {
    document.title = 'CSS Injection';
  }, []);
  return <CSSInjectionIndex />;
};

export default CSSInjectionPage;
