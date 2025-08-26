import React from 'react';
import SQLiIndex from './SQLiIndex';

const SQLiPage = () => {
  React.useEffect(() => {
    document.title = 'SQLi';
  }, []);
  return <SQLiIndex />;
};

export default SQLiPage;
