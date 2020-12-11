import React from 'react'
import styles from './UserBlock.module.scss'

const UserBlock = ({ user }) => {

    const name = user.firstName + ' ' + user.lastName
    const address = user.address;

    return (
        <div className={styles.container}>
            <p>Selected user: <b>{name}</b></p>
            <p>Description:</p>
            <textarea defaultValue={user.description}></textarea>
            <p>Address: <b>{address.streetAddress}</b></p>
            <p>City: <b>{address.city}</b></p>
            <p>State: <b>{address.state}</b></p>
            <p>Zip: <b>{address.zip}</b></p>  
        </div>
    )
}

export default UserBlock;