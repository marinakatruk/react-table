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
    const [isConstructorOpened, setIsConstructorOpened] = useState(false);
    const [sortDirection, setSortDirection] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

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

    //Вывод данных для каждой страницы

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentData = isFiltered ? filteredData.slice(indexOfFirstUser, indexOfLastUser)
        : data.slice(indexOfFirstUser, indexOfLastUser);
   
    console.log(currentData);


    //Смена текущей страницы

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //Выбран пользователь
    const selectUser = (id) => {
        const users = data;
        let selectedOne;
        for (let user of users) {
            if (Number(user.id) === Number(id)) {
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

    //Открыть, закрыть форму добавления нового пользователя

    const openConstructor = () => {
        setIsConstructorOpened(true)
    };

    const closeConstructor = () => {
        setIsConstructorOpened(false);
    };

    //Добавить пользователя
    const addUser = (obj) => {
        const currentData = [...data];
        currentData.unshift(obj);
        setData(currentData);
        setIsConstructorOpened(false);
    };

    //Сортировка столбца
    const sortBy = (name) => {
        const dataForSort = [...data];
        if (name === 'id') {
            dataForSort.sort((a, b) => (
                sortDirection[name] === '' || sortDirection[name] === 'desc'
                ? a[name] - b[name] : b[name] - a[name]
            ));
        } else if (name === 'phone') {
            dataForSort.sort((a, b) => {
                const phoneA = phoneToNumber(a[name]);
                const phoneB = phoneToNumber(b[name]);
                return sortDirection[name] === '' || sortDirection[name] === 'desc'
                ? phoneA-phoneB : phoneB-phoneA;
            })
        } else {
            dataForSort.sort((a, b) => {
                const nameA = a[name].toLowerCase();
                const nameB = b[name].toLowerCase();
                if (nameA < nameB) {
                    return sortDirection[name] === '' || sortDirection[name] === 'desc'
                    ? -1 : 1;
                } else if (nameA > nameB) {
                    return sortDirection[name] === '' || sortDirection[name] === 'desc'
                    ? 1 : -1;
                } else return 0;
            })
        }
        setData(dataForSort);
        let direction = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        }
        direction[name] = sortDirection[name] === '' || sortDirection[name] === 'desc'
        ? 'asc' : 'desc';
        setSortDirection(direction);
    }


    // Телефон в число для сортировки
    const phoneToNumber = (str) => {
        const arr = str.split('');
        const newArr = arr.filter(sym => {
            return Number(sym) === +sym;
        })
        return Number(newArr.join(''));
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
                isConstructorOpened={isConstructorOpened}
                openConstructor={openConstructor}
                closeConstructor={closeConstructor}
                addUser={addUser}
                sortBy={sortBy}
                sortDirection={sortDirection}
            />}

            {isUserSelected ? <UserBlock user={selectedUser}/> : ''}
        </div>
    )
}

export default DataManager;
