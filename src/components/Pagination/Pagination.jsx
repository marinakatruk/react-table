import React from 'react'
import styles from './Pagination.module.scss'

const Pagination = ({ usersPerPage, totalUsers , paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i+=1) {
        pageNumbers.push(i);
    }

    return (
        
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers.map((num) => (
                        <li key={num} className={styles.item}>
                            <a onClick={() => paginate(num)} href="!#" className={styles.link}>{num}</a>
                        </li>
                ))}
            </ul>
        </nav>    

    )
}

export default Pagination;
