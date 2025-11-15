'use client'
import TodoInput from './components/ToDoInput'
import TodoItem from './components/ToDoItem'
import { useInitTodos, useTodoStore } from './store/store'

export default function Page() {
  const todos = useTodoStore((state) => state.todos)
  const filter = useTodoStore((state) => state.filter)
  const setFilter = useTodoStore((state) => state.setFilter)
  const mounted = useInitTodos()

  if (!mounted) return null 

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter((todo) => !todo.completed).length

  return (
    <>
      <TodoInput />

      <div className="flex justify-center gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('active')}
        >
          Активные
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('completed')}
        >
          Выполненные
        </button>
      </div>

      <div>
        {filteredTodos.length === 0 && <p className="text-gray-500 text-center">Нет задач</p>}
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>

      <p className="mt-4 text-gray-600 text-center">
        Активных задач: {activeCount}
      </p>
    </>
  )
}
