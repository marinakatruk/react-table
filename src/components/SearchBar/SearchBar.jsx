import React, { useState } from 'react'
import styles from './SearchBar.module.scss'

const SearchBar = ({ dataSearch, cancelSearch }) => {

    const [line, setLine] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setLine(value);
    };

    const eraseLine = () => {
        setLine('');
        cancelSearch();
    }


    return (
        <form className={styles.form}>
        <input type="text"
            value={line}
            onChange={handleChange}
            className={styles.input}
        />
        <input type="button"
            value="Search"
            onClick={() => dataSearch(line)}
            className={styles.button}
        />
        <input type="button"
            value="x"
            onClick={eraseLine}
            className={styles.cancel}
        />
            
        </form>
    )
}

export default SearchBar;
