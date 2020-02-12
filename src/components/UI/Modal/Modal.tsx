import * as React from 'react';
import styles from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

interface ModalProps {
    children: any;
    show: boolean;
    cancel: () => void;
}

class Modal extends React.Component<ModalProps> {
    shouldComponentUpdate(nextProps: ModalProps) {
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop 
                    show={this.props.show}
                    cancel={this.props.cancel}/>
                <div 
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }   
}

export default Modal;