import React from 'react';
import styles from './index.module.less';


type IIndexProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IIndexState = {};

const Index: React.FC<IIndexProps> = () => {
  return (
    <div className={styles.welcome}>
      使用说明：请先关注公众号
    </div>
  );
};

export default Index;
