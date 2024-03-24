import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

const useTodoStore = create(
    persist(
        (set, get) => {
            return {
                todos: [],
                getAllTodoFromStore: () => get().todos,
                addAllTodoToStore: (todos = []) => set((state) => {
                    return {
                        todos: [...todos],
                    }
                }),
                addTodoToStore: (todo = {}) => set((state) => {
                    return {
                        todos: [...state.todos, todo],
                    }
                }),
                updateTodoToStore: (todo = {}) => set((state) => {
                    return {
                        todos: get().todos.map((item) => {
                            return item.id === todo.id ? todo : item;
                        }),
                    }
                }),
            }
        },
        {
            name: 'todos',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useTodoStore;