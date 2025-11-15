'use client'
import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'

export type Todo = { id: string; text: string; completed: boolean }

type TodoState = {
    todos: Todo[]
    addTodo: (text: string) => void
    toggleTodo: (id: string) => void
    removeTodo: (id: string) => void
    filter: 'all' | 'active' | 'completed'
    setFilter: (filter: 'all' | 'active' | 'completed') => void
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: [],

    addTodo: (text) => {
        set((state) => {
            const newTodos = [...state.todos, { id: nanoid(), text, completed: false }]
            if (typeof window !== 'undefined') localStorage.setItem('todos', JSON.stringify(newTodos))
            return { todos: newTodos }
        })
    },

    toggleTodo: (id) => {
        set((state) => {
            const newTodos = state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
            if (typeof window !== 'undefined') localStorage.setItem('todos', JSON.stringify(newTodos))
            return { todos: newTodos }
        })
    },

    removeTodo: (id) => {
        set((state) => {
            const newTodos = state.todos.filter((todo) => todo.id !== id)
            if (typeof window !== 'undefined') localStorage.setItem('todos', JSON.stringify(newTodos))
            return { todos: newTodos }
        })
    },

    filter: 'all',
    setFilter: (filter) => set({ filter }),
}))

export function useInitTodos() {
    const setTodos = useTodoStore((state) => state.todos)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('todos')
        if (stored) {
            const todos = JSON.parse(stored)
            useTodoStore.setState({ todos })
        }
        setMounted(true)
    }, [])

    return mounted
}
