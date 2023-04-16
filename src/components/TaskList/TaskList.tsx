import PropTypes from 'prop-types'

import { Todo } from '../../@types/todo.type'

import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo } = props

  const onChangeCheckbox = (idTodo: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(idTodo, e.target.checked)
  }

  return (
    <div className='md-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={onChangeCheckbox(todo.id)}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
              🖋️
            </button>
            <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired
    })
  ),
  handleDoneTodo: PropTypes.func,
  startEditTodo: PropTypes.func,
  deleteTodo: PropTypes.func
}
