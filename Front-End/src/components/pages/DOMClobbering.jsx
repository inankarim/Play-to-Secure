import React from 'react';
import DOMClobberingIndex from '@/components/pages/DOMClobberingIndex';

const DOMClobberingPage = () => {
  React.useEffect(() => {
    document.title = 'DOM Clobbering';
  }, []);
  return <DOMClobberingIndex />;
};

export default DOMClobberingPage;
