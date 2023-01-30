import styles from './AddFile.module.css'
import React, { useState } from 'react';
import axios from 'axios';

function AddFile(props) {

    const [file, setFile] = useState({
        fileName:'',
        isWarningKey:false
      })

    async function clickButton(){
      if(!(file.fileName==='')){
        const url = 'http://localhost:3001/api/folder'
        await axios.post(url, {
          fileName:file.fileName
        })
        props.lockKey({isFolderKey:false, isFileKey:false, isEditKey:true})
      }else{
        setFile({...file, isWarningKey:true})
      }
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
                      <input onChange={(e)=>{setFile({...file, fileName:e.target.value, isWarningKey:false})}} value={file.fileName} type="text" />
                      </div>
                    </div>
                    <div className='row'>
                      <button onClick={clickButton} type='submit' className={styles.ChangeButton}>Create now</button>
                    </div>
                      {file.isWarningKey?(<p className={styles.warning}>add file name</p>):('')}
                  </div>
            </div>
          </div>
  
     );
}

export default AddFile;