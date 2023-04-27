import React from 'react';
import Header from '@components/head';
import styles from './index.module.less';

type IGPTProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IGPTState = {};

const GPT: React.FC<IGPTProps> = () => {
  return (
    <div className={styles.gpt}>
      <Header />
      <div className={styles.content}>欢迎来到ChatGPT聊天室</div>
    </div>
  );
};

export default GPT;
