import React from "react";
import { connect } from "react-redux";
import TestModal from "./testModal";
import LoginModal from "./loginModal";
import RegisterModal from "./registerModal";

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal
};

const mapState = state => ({
  currentModal: state.modals
});

const ModalManager = ({ currentModal }) => {
  let renderModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderModal}</span>;
};

export default connect(mapState)(ModalManager);
