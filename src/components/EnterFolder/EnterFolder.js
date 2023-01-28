import React, { useState } from 'react';
import styles from './EnterFolder.module.css'

function EnterFolder() {

  const [folder, setFolder] = useState({
    folderName:''
  })
  function clickButton(){
    console.log('clicked')
  }

    return ( 
          <div className={styles.folderContainer}>
            <div className={styles.LockContainer}>
              <div className={styles.inputContainer}>
                <div className='row'>
                    <div className={styles.setName}><p>Create Folder</p></div>
                    </div>
                    <div className='row'>
                      <label>Enter Folder Name</label>
                      <div>
                      <input onChange={(e)=>{setFolder(e.target.value)}} value={folder.folderName} type="text" />
                      </div>
                    </div>
                    <div className='row'>
                      <button onClick={clickButton} type='submit' className={styles.ChangeButton}>Create now</button>
                    </div>
                      {/* {pin.isWarningKey?(<p className={styles.warning}>pin does't match</p>):pin.isUpdateKey?(<p className={styles.success}>pin updated successfully !</p>):pin.isBlank?(<p className={styles.warning}>please enter the pin</p>):('')} */}
                  </div>
            </div>
          </div>
                
     );
}

export default EnterFolder;