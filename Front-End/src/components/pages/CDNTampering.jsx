import React from 'react';
import CDNTamperingIndex from './CDNTamperingIndex';

const CDNTamperingPage = () => {
  React.useEffect(() => {
    document.title = 'CDN Tampering';
  }, []);
  return <CDNTamperingIndex />;
};

export default CDNTamperingPage;
