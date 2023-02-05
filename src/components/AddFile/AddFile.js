import styles from './AddFile.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddFile(props) {

    const [file, setFile] = useState({
        fileName:'',
        isWarningKey:false,
        isExistKey:false
      })
    const [fileData, setFileData] = useState([])

    function clickButton(){
      if(!(file.fileName==='') && !(file.fileName.trim().length==0)){
        
        var test = fileData.filter((value)=>{
          return value.fileName==file.fileName
        })

        if(test.length>0){
          setFile({...file, isExistKey:true})
        }else{
          props.lockKey({
            isFolderKey:false, 
            isFileKey:false, 
            isEditKey:true
          })
          props.fileName(file.fileName)
        }
      }else{
        setFile({...file, isWarningKey:true})
      }
    }

    function clickChange(values){
      setFile({
        ...file, 
        fileName:values, 
        isWarningKey:false, 
        isExistKey:false
      })
      setFileData(props.getFileNames)
      
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
                      {/* <input onChange={(e)=>{setFile({...file, fileName:e.target.value, isWarningKey:false})}} value={file.fileName} type="text" /> */}
                      <input onChange={(e)=>{clickChange(e.target.value)}} value={file.fileName} type="text" />
                      </div>
                    </div>
                    <div className='row'>
                      <button onClick={clickButton} type='submit' className={styles.ChangeButton}>Create now</button>
                    </div>
                      {file.isWarningKey?(<p className={styles.warning}>add file name</p>)
                      :
                      file.isExistKey?(<p className={styles.warning}>file already exist</p>)
                      :
                      ('')}
                  </div>
            </div>
          </div>
  
     );
}

export default AddFile;