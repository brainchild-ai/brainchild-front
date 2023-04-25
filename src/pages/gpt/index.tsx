import React from 'react';
import Header from '@components/head';

type IGPTProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IGPTState = {};

const GPT: React.FC<IGPTProps> = () => {
  return (
    <div>
    <Header />
    </div>
  );
};

export default GPT;
