import React from 'react';
import ExpertOpinion from './ExpertOpinion';
import QuoteSection from './QuoteSection';
import RememberSection from './RememberSection';
import ExplanationSection from './ExplanationSection';
import NavigationSection from './NavigationSection';
import AnswerSection from './AnswerSection';

const ExpertOpinionIndex = () => {
  React.useEffect(() => {
    document.title = 'Expert Opinion';
  }, []);

  return (
    <main className="overflow-hidden py-[38px]">
      <div className="flex w-full flex-col font-normal px-20 max-md:max-w-full max-md:px-5">
        <div className="self-center flex w-full max-w-[1253px] flex-col items-stretch max-md:max-w-full">
          <ExpertOpinion />
          <QuoteSection />
        </div>
        <RememberSection />
      </div>
      <div className="z-10 flex w-full flex-col text-foreground font-normal pl-11 pr-[5px] max-md:max-w-full">
        <ExplanationSection />
      </div>
      <AnswerSection />
      <NavigationSection />
    </main>
  );
};

export default ExpertOpinionIndex;
