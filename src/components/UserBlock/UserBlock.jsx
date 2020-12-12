import React from 'react'
import styles from './UserBlock.module.scss'

const UserBlock = ({ user }) => {

    const name = user.firstName + ' ' + user.lastName
    const address = user.address;

    return (
        <div className={styles.container}>
            <p>Selected user: <b>{name}</b></p>
            <p>Description:</p>
            <textarea readOnly value={user.description ? user.description : 'data not found'}></textarea>
            <p>Address: <b>{address ? address.streetAddress : 'data not found'}</b></p>
            <p>City: <b>{address ? address.city : 'data not found'}</b></p>
            <p>State: <b>{address ? address.state : 'data not found'}</b></p>
            <p>Zip: <b>{address ? address.zip : 'data not found'}</b></p>  
        </div>
    )
}

export default UserBlock;