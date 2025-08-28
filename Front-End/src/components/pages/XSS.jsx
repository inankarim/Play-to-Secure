import React from 'react';
import XSSIndex from './XSSIndex';

const XSSPage = () => {
  React.useEffect(() => {
    document.title = 'XSS';
  }, []);
  return <XSSIndex />;
};

export default XSSPage;
