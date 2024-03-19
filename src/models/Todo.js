import {uid} from "uid";

class Todo {
    constructor() {
        this.id = uid();
        this.title = "";
        this.details = "";
        this.status = 1;
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }
}

export default Todo;