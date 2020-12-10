import React, { useState } from 'react'
import styles from './App.module.scss';
import DataSelector from './components/DataSelector/DataSelector'
import DataManager from './components/DataManager/DataManager'

function App() {
  const [dataSelected, setDataSelected] = useState(false);
  const [dataType, setDataType] = useState('');

  //Выбираем тип данных

  const selectData = (d) => {
    setDataType(d);
    setDataSelected(true);
  }

  if (!dataSelected) {
    return (
      <div className={styles.container}>
        <DataSelector selectData={selectData}/>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <DataManager dataType={dataType}/>
      </div>
    );
  }
}

export default App;
