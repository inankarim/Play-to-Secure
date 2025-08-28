import React from 'react';
import CSPBypassIndex from './CSPBypassIndex';

const CSPBypassPage = () => {
  React.useEffect(() => {
    document.title = 'CSP Bypass';
  }, []);
  return <CSPBypassIndex />;
};

export default CSPBypassPage;
