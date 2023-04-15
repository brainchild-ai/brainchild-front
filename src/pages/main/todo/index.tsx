import React from 'react';


type ITodoProps = {
  className?: string;
  style?: React.CSSProperties;
};
type ITodoState = {};

const Todo: React.FC<ITodoProps> = () => {
  return (
    <div>
      Todo
    </div>
  );
};

export default Todo;
