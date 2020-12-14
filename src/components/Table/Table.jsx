import React from 'react'
import styles from './Table.module.scss'
import Pagination from '../Pagination/Pagination'
import SearchBar from '../SearchBar/SearchBar'
import UserConstructor from '../UserConstructor/UserConstructor'

const Table = ({ tableData,
            usersPerPage,
            totalUsers,
            paginate,
            selectUser,
            dataSearch,
            cancelSearch,
            isConstructorOpened,
            openConstructor,
            closeConstructor,
            addUser,
            sortBy,
            sortDirection
        }) => {

    
    const selectRow = (event) => {
        const id = event.currentTarget.id;
        selectUser(id);
    };

    return (
        <div className={styles.container}>
            <div className={styles.tools}>
                <SearchBar dataSearch={dataSearch} cancelSearch={cancelSearch} />
                <button type="button"
                    onClick={openConstructor}
                    className={styles.button}
                >
                    Add user
                </button>
            </div>
            <div className={styles.tableBox}>
                {isConstructorOpened ? <UserConstructor closeConstructor={closeConstructor} addUser={addUser} /> : ''}
                <table>
                    <tbody>
                        <tr className={styles.thead}>
                            <th>
                                <button type="button"
                                    onClick={() => sortBy('id')}
                                    className={styles.headButton}
                                >
                                    id
                                </button>
                                { sortDirection.id === 'asc' ? <UpPointer /> : ''}
                                { sortDirection.id === 'desc' ? <DownPointer /> : ''}
                            </th>
                            <th>
                                <button type="button"
                                    onClick={() => sortBy('firstName')}
                                    className={styles.headButton}
                                >
                                    firstName
                                </button>
                                { sortDirection.firstName === 'asc' ? <UpPointer /> : ''}
                                { sortDirection.firstName === 'desc' ? <DownPointer /> : ''}
                            </th>
                            <th>
                                <button type="button"
                                    onClick={() => sortBy('lastName')}
                                    className={styles.headButton}
                                >
                                    lastName
                                </button>
                                { sortDirection.lastName === 'asc' ? <UpPointer /> : ''}
                                { sortDirection.lastName === 'desc' ? <DownPointer /> : ''}
                            </th>
                            <th>
                                <button type="button"
                                    onClick={() => sortBy('email')}
                                    className={styles.headButton}
                                >
                                    email
                                </button>
                                { sortDirection.email === 'asc' ? <UpPointer /> : ''}
                                { sortDirection.email === 'desc' ? <DownPointer /> : ''}
                            </th>
                            <th>
                                <button type="button"
                                    onClick={() => sortBy('phone')}
                                    className={styles.headButton}
                                >
                                    phone
                                </button>
                                { sortDirection.phone === 'asc' ? <UpPointer /> : ''}
                                { sortDirection.phone === 'desc' ? <DownPointer /> : ''}
                            </th>
                        </tr>

                        {
                            tableData.map((item, i) => (
                                <tr key={i} className={styles.trow} id={item.email} onClick={selectRow}>
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
};

export default Table;

const UpPointer = () => {
    return (
        <div className={styles.up}><div></div></div>
    )
};

const DownPointer = () => {
    return (
        <div className={styles.down}><div></div></div>
    )
};
