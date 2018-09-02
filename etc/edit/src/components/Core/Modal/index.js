import React, { Component } from 'react';
import {
  bool,
  func,
  node,
  string,
} from 'prop-types';
import { className } from './index.scss';
import handleClose from './handleClose';

class Modal extends Component {
  static propTypes = {
    show: bool,
    title: string,
    onClose: func,
    children: node,
  }

  static defaultProps = {
    show: false,
    title: '',
    onClose: undefined,
    children: undefined,
  }

  handleClose = () => {
  }

  render() {
    const {
      show,
      title,
      onClose,
      children,
    } = this.props;

    if (!show) { return null; }

    return (
      <div
        role="presentation"
        className={className}
        onClick={handleClose({ onClose })}
      >
        <div
          role="presentation"
          className="container"
          onClick={e => e.stopPropagation()}
        >
          <header>
            {title}
            {
              onClose && (
                <button
                  type="button"
                  onClick={handleClose({ onClose })}
                >
                  닫기
                </button>
              )
            }
          </header>
          <div className="body">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
