import React from 'react';


type IIndexProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IIndexState = {};

const Index: React.FC<IIndexProps> = () => {
  return (
    <div>
      使用说明：请先关注xxx
    </div>
  );
};

export default Index;
