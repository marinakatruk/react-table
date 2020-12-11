import React from 'react'
import styles from './Table.module.scss'
import Pagination from '../Pagination/Pagination'
import SearchBar from '../SearchBar/SearchBar'

const Table = ({ tableData, usersPerPage, totalUsers, paginate, selectUser, dataSearch, cancelSearch }) => {

    const selectRow = (event) => {
        const id = event.currentTarget.id;
        selectUser(id);
    };



    return (
        <div className={styles.container}>
            <div className={styles.tools}>
                <SearchBar dataSearch={dataSearch} cancelSearch={cancelSearch} />
                <button type="button" className={styles.button}>Add user</button>
            </div>
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
                                <tr key={i} className={styles.trow} id={item.id} onClick={selectRow}>
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

            <Pagination usersPerPage={usersPerPage} totalUsers={totalUsers} paginate={paginate}/>

            
        </div>
    )
}

export default Table;
