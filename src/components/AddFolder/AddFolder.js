import axios from 'axios';
import React, { useState } from 'react';
import styles from './AddFolder.module.css'

function AddFolder(props) {

  const [folder, setFolder] = useState({
    folderName:'',
    isWarningKey:false,
    isUpdateKey:false
  })

  async function clickButton(){
    if(!(folder.folderName==='')){
      const url = "http://localhost:3001/api/folder"
      await axios.post(url, {
        folderName:folder.folderName
      })
      setFolder({...folder, folderName:'', isUpdateKey:true})
      props.lockKey({isFolderKey:false, isFileKey:false})
    }else{
      setFolder({...folder, isWarningKey:true})
    }
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
                      <input onChange={(e)=>{setFolder({...folder, folderName:e.target.value, isWarningKey:false, isUpdateKey:false})}} value={folder.folderName} type="text" />
                      </div>
                    </div>
                    <div className='row'>
                      <button onClick={clickButton} type='submit' className={styles.ChangeButton}>Create now</button>
                    </div>
                      {folder.isWarningKey?(<p className={styles.warning}>enter the folder name</p>):folder.isUpdateKey?(<p className={styles.success}>folder created successfully</p>):('')}
                  </div>
            </div>
          </div>
                
     );
}

export default AddFolder;