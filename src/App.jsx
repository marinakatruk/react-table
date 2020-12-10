import React, { useState, useEffect } from 'react'
import styles from './App.module.scss';
import axios from 'axios'
import Table from './components/Table/Table'

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(40);


  useEffect(() => {
    // const smallDataUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    const bigDataUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    const fetchData = async() => {
      setLoading(true);
      const resp = await axios.get(bigDataUrl);
      const fetchedData = resp.data;
      setData(fetchedData);
      setLoading(false);
    }
    fetchData();
  },[]);

  //Выводим данные для каждой страницы

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  //Меняем текущую страницу

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      {loading ? <div className={styles.status}>Loading...</div>
      : <Table tableData={currentData}
          rowsPerPage={rowsPerPage}
          totalRows={data.length}
          paginate={paginate}
        />}
    </div>
  );
}

export default App;
