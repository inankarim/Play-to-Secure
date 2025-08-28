import React from 'react';
import ClickjackingIndex from './ClickjackingIndex';

const ClickjackingPage = () => {
  React.useEffect(() => {
    document.title = 'Clickjacking';
  }, []);
  return <ClickjackingIndex />;
};

export default ClickjackingPage;
