import React, {KeyboardEvent,ChangeEvent, useState} from 'react';
import '../../App'
import {v1} from "uuid";
import {string} from "prop-types";
import {FilterValuesType} from "../../App";
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemform";

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
        changeTodoListFilter,
    } = props

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

    const addTaskHandler = (title:string) => {
      addTask(todolistId, title)
    }

    return (
        <div className={'todo_container'}>
            <AddItemForm callBack={addTaskHandler}/>
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

