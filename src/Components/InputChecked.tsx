import {ChangeEvent} from "react";

type PropsType = {
    onChange:(checked: boolean)=>void
    checked: boolean
}

export const InputChecked = (props:PropsType) => {
    const {onChange,checked} = props

    const onChangehandler = (e:ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }

  return (
      <input type="checkbox"
      onChange={onChangehandler}
      checked={checked}/>
  )
}