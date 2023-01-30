import styles from './AddFile.module.css'
import React, { useState } from 'react';

function AddFile(props) {

    const [file, setFile] = useState({
        fileName:''
      })

    function clickButton(){
        props.lockKey({isFolderKey:false, isFileKey:false, isEditKey:true})
    }
    
    return ( 
        
            <div className={styles.folderContainer}>
            <div className={styles.LockContainer}>
              <div className={styles.inputContainer}>
                <div className='row'>
                    <div className={styles.setName}><p>Create File</p></div>
                    </div>
                    <div className='row'>
                      <label>Enter File Name</label>
                      <div>
                      <input onChange={(e)=>{setFile({...file, fileName:e.target.value})}} value={file.fileName} type="text" />
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

export default AddFile;