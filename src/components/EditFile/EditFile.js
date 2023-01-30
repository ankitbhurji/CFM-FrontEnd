import styles from './EditFile.module.css';

function EditFile() {
  function clickButton(){

  }
    return ( 
        <div className={styles.folderContainer}>
            <div className={styles.LockContainer}>
              <div className={styles.inputContainer}>
                <div className='row'>
                    <div className={styles.setName}><p>Create Folder</p></div>
                    </div>
                    <div className='row'>
                      <div>
                      <textarea placeholder='Type anything here!' rows="10" cols="50">
                      </textarea>
                      </div>
                    </div>
                    <div className='row'>
                      <button onClick={clickButton} type='submit' className={styles.ChangeButton}>Save file</button>
                    </div>
                      {/* {pin.isWarningKey?(<p className={styles.warning}>pin does't match</p>):pin.isUpdateKey?(<p className={styles.success}>pin updated successfully !</p>):pin.isBlank?(<p className={styles.warning}>please enter the pin</p>):('')} */}
                  </div>
            </div>
          </div>
     );
}

export default EditFile;