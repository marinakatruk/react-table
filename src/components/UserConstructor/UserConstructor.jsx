import React, { useState, useEffect } from 'react'
import styles from './UserConstructor.module.scss'

const UserConstructor = ( { closeConstructor, addUser }) => {

    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    })
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        checkEmptyFields(user);
    });

    const checkEmptyFields = (obj) => {
        let result = true;
        for (let fieldName in obj) {
            if (obj[fieldName] === '') {
                result = false;
            }
        }
        setIsValid(result);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        let newUser = Object.assign({}, user);
        if (name === 'id') {
            newUser[name] = Number(value);
        } else {
            newUser[name] = value;
        }
        setUser(newUser);
    };


    const submitForm = () => {
        addUser(user);
        setUser({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        });
    }

    const cancel = () => {
        setUser({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        });
        closeConstructor();
    }

    return (
        <div className={styles.container}>
            <div className={styles.formBlock}>
                <h3>Please fill in the data</h3>    
                <form className={styles.form}>
                    <label className={styles.item}>
                        id:
                        <input type="text"
                            name="id"
                            id="id"
                            value={user.id}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.item}>
                        firstName:
                        <input type="text"
                            name="firstName"
                            id="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.item}>
                        lastName:
                        <input type="text"
                            name="lastName"
                            id="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.item}>
                        email:
                        <input type="text"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.item}>
                        phone:
                        <input type="text"
                            name="phone"
                            id="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                    <input type="button"
                        // disabled={!isValid}
                        value="Add"
                        onClick={submitForm}
                        className={styles.submit}
                        disabled={!isValid}
                    />
                    <input type="button"
                        value="x"
                        onClick={cancel}
                        className={styles.cancel}
                    />
                </form>
            </div>
        </div>
    )
}

export default UserConstructor;
