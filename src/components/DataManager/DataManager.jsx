import React, { useState, useEffect } from 'react'
import styles from './DataManager.module.scss'
import axios from 'axios'
import Table from '../Table/Table'
import UserBlock from '../UserBlock/UserBlock'

const DataManager = ({ dataType }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(40);
    const [isUserSelected, setIsUserSelected] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        let dataUrl;
        switch(dataType) {
            case 'smallData':
                dataUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
                break;
            case 'bigData':
                dataUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
                break;
            default:
                dataUrl = '';
            }
        
        const fetchData = async() => {
            setLoading(true);
            const resp = await axios.get(dataUrl);
            const fetchedData = resp.data;
            setData(fetchedData);
            setLoading(false);
        }
        fetchData();
    },[dataType]);

    //Выводим данные для каждой страницы

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentData = isFiltered ? filteredData.slice(indexOfFirstUser, indexOfLastUser)
        : data.slice(indexOfFirstUser, indexOfLastUser);

    console.log(currentData);

    //Меняем текущую страницу

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //Выбран пользователь
    const selectUser = (id) => {
        const users = data;
        let selectedOne;
        for (let user of users) {
            if (user.id === Number(id)) {
                selectedOne = user;
            }     
        }
        console.log(selectedOne);
        setSelectedUser(selectedOne);
        setIsUserSelected(true);
    };


    //Фильтр-поиск данных
    const dataSearch = (str) => {
        if (str !== '') {
            const newData = data.filter(user => {
                const userDataToString = user.id + user.firstName + user.lastName + user.email + user.phone;
                console.log(userDataToString);
                return userDataToString.toLowerCase().includes(str.toLowerCase());
            })
            setFilteredData(newData);
            setIsFiltered(true);
        }
    }

    //Отмена поиска
    const cancelSearch = () => {
        setIsFiltered(false);
        setFilteredData([]);
    }

    return (
        <div>
            {loading ? <div className={styles.status}>Loading...</div>
            : <Table tableData={currentData}
                usersPerPage={usersPerPage}
                totalUsers={isFiltered ? filteredData.length : data.length}
                paginate={paginate}
                selectUser={selectUser}
                dataSearch={dataSearch}
                cancelSearch={cancelSearch}
            />}

            {isUserSelected ? <UserBlock user={selectedUser}/> : ''}
        </div>
    )
}

export default DataManager;
