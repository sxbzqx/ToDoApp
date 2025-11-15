'use client'

import { useState } from 'react'
import { useTodoStore } from '../store/store'
import { FormEvent } from 'react'

export default function TodoInput() {
  const [text, setText] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim() === '') return
    addTodo(text.trim())
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить новую задачу"
        className="flex-1 p-2 border rounded-2xl outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-2xl hover:bg-blue-600"
      >
        Добавить
      </button>
    </form>
  )
}
