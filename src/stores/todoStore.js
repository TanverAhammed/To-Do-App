import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

const useTodoStore = create(
    persist(
        (set, get) => {
            return {
                todos: [],
                getAllTodoFromStore: () => get().todos,
                addTodoToStore: (todo = {}) => set((state) => {
                    return {
                        todos: [...state.todos, todo],
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