import styles from './SetPin.module.css'


function SetPin() {

    return ( 
       <div className={styles.LockContainer}>
        <div className={styles.inputContainer}>
            <div className='row'>
                <div className={styles.setName}><p>Set Pin</p></div>
            </div>
            <div className='row'>
                <label>Enter New Pin</label>
                <div>
                <input type="password" maxlength='4'/>
                </div>
            </div>
            <div className='row mt-4'>
                <label>Confirm New Pin</label>
                <div>
                <input type="password" maxlength='4'/>
                </div>
            </div>
            <div className='row'>
                <button className={styles.ChangeButton}>Save Changes</button>
            </div>
            </div>
       </div>
     );
}

export default SetPin;

