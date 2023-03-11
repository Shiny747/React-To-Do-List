import { useState } from 'react'
import './Toggle.css'

export const Toggle = ({ label, toggled, onClick }) => {
    const [toggle, setToggle] = useState(toggled)

    const callback = () => {
        setToggle(!toggle)
        onClick()
    }

    return (
        <label>
            <input className='checkbox-input' type="checkbox" defaultChecked={toggle} onClick={callback} />
            <span className='toggle-span' />
            <b>{label}</b>
        </label>
    )
}