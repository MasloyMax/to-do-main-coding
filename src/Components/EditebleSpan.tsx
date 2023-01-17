import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {string} from "prop-types";

type PropsType = {
    OLDtitle: string
    callBack: (value: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.OLDtitle)

    const onClickSpanHandler = () => {
        setEdit(!edit)
        updateTask()
    }

    const onKeyEnterUpdate = (e:KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter'){
          onClickSpanHandler()
      }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const updateTask = () => {
        props.callBack(newTitle)
    }


    return (
        edit
            ? <input onKeyDown={onKeyEnterUpdate}
                autoFocus
                     onBlur={onClickSpanHandler}
                     onChange={onChangeInputHandler}
                     value={newTitle}/>
            : <span onDoubleClick={onClickSpanHandler}>{props.OLDtitle}</span>
    );
};