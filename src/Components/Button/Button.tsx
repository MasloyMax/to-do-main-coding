import React from 'react';

type PropsType = {
    callBack: () => void
    name: string
}

export const Button = (props: PropsType) => {

    const {callBack,name} = props

    const onClickHandler = () => {
      callBack()
    }

    return (
        <button onClick={onClickHandler}>{name}</button>
    );
};