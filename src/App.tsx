import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TaskType, ToDoList} from "./Components/ToDoList";
import {string} from "prop-types";
import {Button} from "./Components/Button";

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    const todoListId_1: string = v1()
    const todoListId_2: string = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},

    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "on orange", isDone: true},
        ],

    })

    const [todoTitle,setTodoTitle] = useState('')

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: true}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId]].filter(t => t.id !== taskId)})
    }

    const checkedTasks = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId]].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }

    const changeTodoListFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }

    const getFilteredForRender = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const toDoListRemoveHandler = (title: string, todolistId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }

    const addToDoLists = (todoTitle: string) => {
        let toDoId = v1()
        let newToDo: TodoListType = {id: toDoId, title: todoTitle, filter: "all"}
        setTodoLists([newToDo,...todoLists])
        setTasks({...tasks, [toDoId]: []})
    }

    const onChangeToDoLists = (e:ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.currentTarget.value)
        console.log(todoTitle)
    }

    const onKeyDownToDo = (e:KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter'){
          addToDoLists(todoTitle)
      }
    }

    const toDoMap =
        todoLists.map((t) => {
            const filteredTaskForRender = getFilteredForRender(tasks[t.id], t.filter)
            return (
                <div>
                    {t.title}
                    <Button callBack={() => toDoListRemoveHandler(t.title, t.id)} name={'X'}/>
                    <ToDoList tasks={filteredTaskForRender}
                              todolistId={t.id}
                              addTask={addTask}
                              removeTask={removeTask}
                              checkedTasks={checkedTasks}
                              getFilteredForRender={getFilteredForRender}
                              changeTodoListFilter={changeTodoListFilter}
                    />
                </div>

            )
        })

    return (
        <div className={'container_app'}>
            <div>
                <input onChange={onChangeToDoLists}
                onKeyDown={onKeyDownToDo}/>
                <button onClick={()=>addToDoLists(todoTitle)}>+</button>
            </div>
            {toDoMap}
        </div>
    );
}

export default App;
