import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import "./addItemForm.css"

type PropsType = {
    callBack: (title: string)=> void
}

export const AddItemForm = (props:PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const {callBack} = props

    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if(error){
            setError('')
        }
    }

    const onClickAddTaskHandler = () => {
        if(title.trim() != ''){
            callBack(title)
            setTitle('')
        }else{
            setError('Пустую строку не ввести')
        }
    }

    const onEnterClickHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(title.trim() != '' && e.key === 'Enter'){
            onClickAddTaskHandler()
        }else {
            setError('Пустую строку не ввести')
        }
    }

    return (
        <div>
            <input className={error ? 'input_error': ''}
                onChange={onChangeAddTaskHandler}
                   onKeyDown={onEnterClickHandler}
                   value={title}/>
            <button onClick={onClickAddTaskHandler}>+</button>
            {error ? <div className={error ? 'text_error' : ''}>{error}</div>: <div></div>}
        </div>
    );
};