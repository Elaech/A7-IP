import React, { ReactElement } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import './Modal.css';

interface Props {
    toggle: () => void;
    title: string;
    isOpen: boolean;
    children: ReactElement;
}

const ModalComponent: React.FC<Props> = (props: Props) => {
    const { isOpen, toggle, title } = props;

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>{props.children}</ModalBody>
            </Modal>
        </div>
    );
};

export default ModalComponent;

