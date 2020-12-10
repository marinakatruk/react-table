import React from 'react'
import styles from './Table.module.scss'
import Pagination from '../Pagination/Pagination'

const Table = ({ tableData, rowsPerPage, totalRows, paginate }) => {


    return (
        <div className={styles.container}>
        <div className={styles.tableBox}>
            <table>
                <tbody>
                    <tr className={styles.thead}>
                        <th>id</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>email</th>
                        <th>phone</th>
                    </tr>

                    {
                        tableData.map((item, i) => (
                            <tr key={i} className={styles.trow}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>

            <Pagination rowsPerPage={rowsPerPage} totalRows={totalRows} paginate={paginate}/>

            
        </div>
    )
}

export default Table;
