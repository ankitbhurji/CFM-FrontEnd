import styles from './EditFile.module.css';
import axios, { all } from 'axios';
import { useEffect, useState } from 'react';

function EditFile(props) {
  
  const [allValues, setAllValues] = useState({
    folderName:props.folderName,
    fileName:props.fileName,
    fileData:'', 
    isWarningKey:false
    // fileName:props.fileData.fileData.fileName,
    // fileData:props.fileData.fileData.fileData, 
  })

 
  console.log('key', props.updateKey) 
  // console.log(props.fileName=='') 
 
  function clickChange(value){
    setAllValues({...allValues, fileData:value, isWarningKey:false})
    // props.fileUpdatedData(allValues.fileData)
  }

  async function clickButton (){
        if(!(allValues.fileData==='')){
          if(props.updateKey){
            const url = 'http://localhost:3001/api/update'
            await axios.post(url, {
             folderName:allValues.folderName,
             fileName:props.fileData.fileData.fileName,
             fileData: allValues.fileData,
           });
          }else{
            const url = 'http://localhost:3001/api/file'
            await axios.post(url, {
             folderName:allValues.folderName,
             fileName:allValues.fileName,
             fileData: allValues.fileData
           });
          }
          setAllValues({...allValues, fileData:''});
          props.lockKey({isLockKey:false, isEnterPinKey:false, isSetPinKey:false, isEditKey:false});
          // props.fileUpdatedData(allValues.fileData)
        }else{
          setAllValues({...allValues, isWarningKey:true})
        }
        // console.log(props.fileName, props.folderName)
        console.log(allValues.folderName)
  }


    return ( 
        <div className={styles.folderContainer}>
            <div className={styles.LockContainer}>
              <div className={styles.inputContainer}>
                <div className='row'>
                    <div className={styles.setName}><p>Edit File</p></div>
                    </div>
                    <div className='row'>
                      <div>
                      <textarea onChange={(e)=>{clickChange(e.target.value)}}   placeholder='Type anything here!' rows="10" cols="50">
                       {props.fileData.fileData==undefined?(''):(props.fileData.fileData.fileData)}
                      </textarea>
                      </div>
                    </div>
                    <div className='row'>
                      <button onClick={clickButton} type='submit' className={styles.ChangeButton}>Save file</button>
                    </div>
                      {allValues.isWarningKey?(<p className={styles.warning}>you not entered yet !</p>):('')}
                  </div>
            </div>
          </div>
     );
}

export default EditFile;