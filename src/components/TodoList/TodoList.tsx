import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'
import { useEffect, useState } from 'react'

interface HandleNewTodos {
  (todosObj: Todo[]): Todo[]
}

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const handle = (todosObj: Todo[]) => {
      return [...todosObj, todo]
    }
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])

    syncReactToLocal(handle)
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    const handle = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    }
    setTodos(handle)
    syncReactToLocal(handle)
  }

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) setCurrentTodo(findedTodo)
  }

  const editingTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name: name }
      return null
    })
  }

  const finishEditTodo = () => {
    const handle = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo
        }
        return todo
      })
    }
    setTodos(handle)
    setCurrentTodo(null)
    syncReactToLocal(handle)
  }

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }

    const handle = (TodosObj: Todo[]) => {
      const findedIndexTodo = TodosObj.findIndex((todo) => todo.id === id)
      if (findedIndexTodo > -1) {
        const result = [...TodosObj]
        result.splice(findedIndexTodo, 1)
        return result
      }
      return TodosObj
    }
    setTodos(handle)
    syncReactToLocal(handle)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTodo={addTodo}
          currentTodo={currentTodo}
          editingTodo={editingTodo}
          finishEditTodo={finishEditTodo}
        />
        <TaskList
          todos={notDoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
