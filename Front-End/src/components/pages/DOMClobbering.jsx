import React from 'react';
import Index from '@/components/pages/Index';

const DOMClobberingPage = () => {
  React.useEffect(() => {
    document.title = 'DOM Clobbering';
  }, []);
  return <Index />;
};

export default DOMClobberingPage;
