import React, { useEffect } from 'react';


type IFileProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IFileState = {};

const File: React.FC<IFileProps> = () => {
  return (
    <div>
      文章_{Math.floor(Math.random() * 100)}
    </div>
  );
};

export default File;
