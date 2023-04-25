import React from 'react';
import { Empty } from 'antd';
import styles from './index.module.less'

type IFolerIndexProps = {
  className?: string;
  style?: React.CSSProperties;
};
type IFolerIndexState = {};

const FolerIndex: React.FC<IFolerIndexProps> = () => {
  return (
    <div className={styles.empty}>
      <Empty />
    </div>
  );
};

export default FolerIndex;
