import React, { useContext, useState, useEffect } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/Modal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .ant-modal-body {
    height: '100%';
    padding: 16px!important;
  }
`;
interface IContent {
  content: React.ReactNode;
}
type ModalInterface = {
  show: any;
  close: any;
  visible: boolean;
  root?: string;
} & ModalProps;

type IModalProps = {
  root?: string;
  onOk?: () => {};
  onCancel?: () => {};
  onClear?: () => {};
} & ModalProps;

type IModal = {
  children: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
};

const ModalContext = React.createContext<ModalInterface>({
  show: async () => {},
  close: async () => {},
  visible: false,
});

const ModalProvider: React.FC<IModal> = props => {
  const [visible, setVisible] = useState(false);
  const [Modal, setModal] = useState<IContent>({ content: null }); // 设置children
  const [ModalProps, setModalProps] = useState<IModalProps>({}); // 设置默认的props
  useEffect(() => {
    return () => {
      setModal({ content: null });
    };
  }, []);
  const showModal = (params: IContent, dp?: IModalProps) => {
    setModal(params);
    setVisible(true);
    if (dp) {
      setModalProps(dp);
    }
  };
  const closeModal = () => {
    setVisible(false);
    setModal({ content: null });
  };
  const onCancel = () => {
    setVisible(false);
    setModal({ content: null });
  };
  const { children } = props;
  return (
    <ModalContext.Provider
      value={{
        show: showModal,
        close: closeModal,
        visible,
      }}
    >
      {children}
      <StyledModal
        closable={true}
        getContainer={
          ModalProps.root
            ? document.getElementById(ModalProps.root)
            : document.getElementById('modal-root')
        }
        footer={ModalProps.footer || null}
        maskClosable={false}
        onCancel={onCancel}
        visible={visible}
        destroyOnClose
        width={600}
        {...ModalProps}
      >
        {visible && Modal.content}
      </StyledModal>
    </ModalContext.Provider>
  );
};

function useModal() {
  const context = useContext(ModalContext);
  return {
    close: context.close,
    show: context.show,
    visible: context.visible,
  };
}

export { useModal, ModalProvider };
