import React, { Component } from 'react';
import { Transition, config } from 'react-spring';
import { ModalWrapper, Overlay, ModalContent } from './styles';
import Portal from '../Portal';
import Confetti from 'react-confetti';

class Modal extends Component {
  handleClick() {
    const { toggle, on } = this.props;
    if(on) {
      toggle();
    }
  }
  
  render() {
    const { children, toggle, on } = this.props;
    return (
      <Transition
        native
        from={{ opacity: 0, y: '50px', scale: '0.5' }}
        enter={{ opacity: 1, y: '0px', scale: '1' }}
        leave={{ opacity: 0, y: '50px', scale: '0'}}
        >
          { on && 
            (styles => (
              <Portal>
                <ModalWrapper onClick={ () => this.handleClick() } style={{
                  opacity: styles.opacity.interpolate( opacity => opacity )
                }}
                >
                  <Overlay>
                        <Confetti width={ window.innerWidth } height={ window.innerHeight } />
                  </Overlay>
                  <ModalContent style={{
                    opacity: styles.opacity.interpolate( opacity => opacity ),
                    transform: styles.y.interpolate( y => `translate3d(0, ${y}, 0)` )
                  }}
                  config={ config.fast }
                  >
                    {children()}
                  </ModalContent>
                </ModalWrapper>
              </Portal>
            ))}
      </Transition>
    )
  }
}

export default Modal;