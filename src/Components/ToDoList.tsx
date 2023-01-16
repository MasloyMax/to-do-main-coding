import React, {KeyboardEvent,ChangeEvent, useState} from 'react';
import '../App'
import {v1} from "uuid";
import {string} from "prop-types";
import {FilterValuesType} from "../App";
import {Button} from "./Button";

type PropsType = {
    tasks: Array<TaskType>
    todolistId: string
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    checkedTasks: (todolistId: string, taskId: string, isDone: boolean) => void
    getFilteredForRender: (tasks: TaskType[], filter: FilterValuesType) => void
    changeTodoListFilter: (todolistId: string, filter: FilterValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList = (props: PropsType) => {
    const {
        tasks,
        todolistId,
        addTask,
        removeTask,
        checkedTasks,
        getFilteredForRender,
        changeTodoListFilter,
    } = props

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const onClickAddTaskHandler = () => {
        addTask(todolistId, title)
    }

    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEnterClickHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addTask(todolistId,title)
        }
    }

    const newTask = tasks.length
        ? tasks.map((t) => {

            const onClickRemoveTaskHandler = () => {
                removeTask(todolistId, t.id)
            }

            const onChangeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                checkedTasks(todolistId, t.id, e.currentTarget.checked)
            }

            return (
                <ul key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeCheckedHandler}/>
                    <span>{t.title}</span>
                    <Button callBack={onClickRemoveTaskHandler} name={'x'}/>
                </ul>
            )
        })
        : <div>
            Loading
        </div>

    return (
        <div className={'todo_container'}>
            <div>
                <input onChange={onChangeAddTaskHandler}
                       onKeyDown={onEnterClickHandler}
                       value={title}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <div>
                {newTask}
            </div>
            <div>
                <Button callBack={() => changeTodoListFilter(todolistId, 'all')} name={"All"}/>
                <Button callBack={() => changeTodoListFilter(todolistId, 'active')} name={"active"}/>
                <Button callBack={() => changeTodoListFilter(todolistId, 'completed')} name={"completed"}/>
            </div>
        </div>
    );
};

