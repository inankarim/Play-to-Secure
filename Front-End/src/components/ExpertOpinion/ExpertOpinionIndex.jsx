import React from 'react';
import ExpertOpinion from '@/components/ExpertOpinion/ExpertOpinion';
import QuoteSection from '@/components/ExpertOpinion/QuoteSection';
import RememberSection from '@/components/ExpertOpinion/RememberSection';
import ExplanationSection from '@/components/ExpertOpinion/ExplanationSection';
import NavigationSection from '@/components/ExpertOpinion/NavigationSection';
import AnswerSection from '@/components/ExpertOpinion/AnswerSection';

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
