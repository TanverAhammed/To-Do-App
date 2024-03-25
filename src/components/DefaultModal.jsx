import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DefaultModal = ({show, handleClose, handleSubmit, children}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DefaultModal;