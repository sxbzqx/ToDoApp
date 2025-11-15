'use client'

import { Todo, useTodoStore } from '../store/store'

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)

  return (
    <div className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow">
      <p
        className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </p>
      <button
        className="text-red-500 ml-2 hover:text-red-700 hover:cursor-pointer"
        onClick={() => removeTodo(todo.id)}
      >
        ✕
      </button>
    </div>
  )
}
