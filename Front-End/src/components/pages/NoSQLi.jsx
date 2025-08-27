import React from 'react';
import NoSQLiIndex from './NoSQLiIndex';

const NoSQLiPage = () => {
  React.useEffect(() => {
    document.title = 'NoSQLi';
  }, []);
  return <NoSQLiIndex />;
};

export default NoSQLiPage;
