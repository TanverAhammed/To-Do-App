import './App.css';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useState} from "react";
import DefaultModal from "./components/DefaultModal";
import useTodoStore from "./stores/todoStore";
import Todo from "./models/Todo";

const App = () => {

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const {getAllTodoFromStore, addTodoToStore, addAllTodoToStore, updateTodoToStore} = useTodoStore();

    const [todo, setTodo] = useState({});
    //const [existingTodo, setExistingTodo] = useState({});

    const filterableTodos = getAllTodoFromStore();

    const [todos, setTodos] = useState(filterableTodos);

    const handleSearch = (e) => {
        const keyword = e.target.value.trim();

        const fTodos = filterableTodos.filter((item) => {
            return item.title.toLowerCase().includes(keyword.toLowerCase());
        })

        setTodos(fTodos);
    }

    const handleDelete = (id) => {
        const fTodos = filterableTodos.filter(item => item.id !== id)

        setTodos(fTodos);
        addAllTodoToStore(fTodos)
    }

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

    const handleSubmit = (todo) => {
        todo = {...new Todo, title: todo.title, details: todo.details, status: todo.status}
        addTodoToStore(todo)
        setShowModal(false)
    }

    const handleUpdate = (todo) => {
        updateTodoToStore(todo)
        setShowEditModal(false)
        setTodos(getAllTodoFromStore())
    }

    return (
        <div className="App">
            <Container className="mt-4">
                <div className="mb-4">
                    <Row>
                        <Col md={6}>
                            <Button variant="outline-primary" className="float-start"
                                    onClick={() => setShowModal(true)}
                            >
                                Add New
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                name="search"
                                placeholder="Search"
                                onChange={handleSearch}
                            />
                        </Col>
                    </Row>
                </div>
                <Table striped responsive>
                    <thead>
                    <tr>
                        <td>TITLE</td>
                        <td>DETAILS</td>
                        <td>STATUS</td>
                        <td>CREATED AT</td>
                        <td>UPDATED AT</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {todos.length > 0 ?
                        todos.map((todo, index) => {
                            return <tr key={index}>
                                <td>{todo.title}</td>
                                <td>{todo.details}</td>
                                <td>{todo.status}</td>
                                <td>{todo.created_at}</td>
                                <td>{todo.updated_at}</td>
                                <td>
                                    <Button variant="btn btn-success me-2"
                                            onClick={() => {
                                                setShowEditModal(true)
                                                setTodo(todo)
                                            }}
                                    > Update </Button>
                                    <button type="button" className="btn btn-danger"
                                            onClick={() => handleDelete(todo.id)}>Delete
                                    </button>
                                </td>
                            </tr>
                        })
                        :
                        <tr>
                            <td colSpan={6}>Todo not available</td>
                        </tr>
                    }
                    </tbody>
                </Table>
            </Container>

            <DefaultModal show={showModal}
                          handleClose={() => setShowModal(false)}
                          handleSubmit={() => handleSubmit(todo)}
            >
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
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
                            name="details"
                            onChange={onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select
                            name="status"
                            onChange={onChangeHandler}
                        >
                            <option>Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Failed">Failed</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </DefaultModal>

            <DefaultModal show={showEditModal}
                          handleClose={() => setShowEditModal(false)}
                          handleSubmit={() => handleUpdate(todo)}
            >
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
                        <Form.Control defaultValue={todo.details}
                            as="textarea" rows={3}
                            name="details"
                            onChange={onChangeHandler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select
                            name="status"
                            onChange={onChangeHandler}
                            defaultValue={todo.status}
                        >
                            <option>Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Failed">Failed</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </DefaultModal>

        </div>
    );
}

export default App;
