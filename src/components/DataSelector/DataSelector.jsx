import React, { useState } from 'react'
import styles from './DataSelector.module.scss'

const DataSelector = ({ selectData }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const submitForm = () => {
        selectData(value);
        setValue('');
    }

    return (
        <form className={styles.form}>
            <label>
                Please select the data:
                <select value={value} onChange={handleChange} className={styles.selector}>
                    <option value=""></option>
                    <option value="smallData">Small Data</option>
                    <option value="bigData">Big Data</option>
                </select>
            </label>
            <input className={styles.button}
                type="button"
                disabled={value === ''}
                value="Load"
                onClick={submitForm}/>
        </form>
    )
}

export default DataSelector;
