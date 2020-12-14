import React, { useState } from 'react'
import styles from './DataSelector.module.scss'

const DataSelector = ({ selectData }) => {
    const [value, setValue] = useState('small');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const submitForm = () => {
        selectData(value);
        setValue('small');
    }
    console.log(value);

    return (
        <form className={styles.form}>
            <label>
                Please select the amount of data:
                <select value={value} onChange={handleChange} className={styles.selector}>
                    <option value="small">Small</option>
                    <option value="big">Big</option>
                </select>
            </label>
            <input className={styles.button}
                type="button"
                value="Load"
                onClick={submitForm}/>
        </form>
    )
}

export default DataSelector;
