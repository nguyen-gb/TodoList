import { useState } from 'react'
import PropTypes from 'prop-types'

import { Todo } from '../../@types/todo.type'

import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editingTodo: (name: string) => void
  finishEditTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editingTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentTodo) {
      finishEditTodo()
    } else {
      addTodo(name)
    }
    setName('')
  }

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) editingTodo(e.currentTarget.value)
    else setName(e.target.value)
  }

  return (
    <div className='md-2'>
      <h1 className={styles.title}>To do List Typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption go here'
          value={currentTodo ? currentTodo.name : name}
          onChange={handleOnchange}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  editingTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired
    }),
    PropTypes.oneOf([null])
  ])
}
