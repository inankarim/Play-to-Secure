import React from 'react';
import IDORIndex from './IDORIndex';

const IDORPage = () => {
  React.useEffect(() => {
    document.title = 'IDOR';
  }, []);
  return <IDORIndex />;
};

export default IDORPage;
