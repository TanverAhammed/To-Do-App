import {Form} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import Button from "react-bootstrap/Button";

const TodoForm = ({defaultTodo, handleSubmit}) => {

    const [todo, setTodo] = useState(defaultTodo ? defaultTodo : {});

    const onChangeHandler = (e) => {
        switch (e.target.name) {
            case "title":
                setTodo({...todo, title: e.target.value})
                break;
            case "details":
                setTodo({...todo, details: e.target.value})
                break;
            case "status":
                setTodo({...todo, status: e.target.value})
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        defaultValue={todo.title}
                        name="title"
                        type="text"
                        placeholder="Enter title"
                        onChange={onChangeHandler}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Details</Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        defaultValue={todo.details}
                        name="details"
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Select
                        defaultValue={todo.status}
                        name="status"
                        onChange={onChangeHandler}
                    >
                        <option value="">Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Failed">Failed</option>
                    </Form.Select>
                </Form.Group>

                <div className="mt-3 float-end">
                    <Button variant="danger" className="me-2">
                        Reset
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit(todo)}>
                        {defaultTodo ? "Save Changes" : "Save"}
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default TodoForm;