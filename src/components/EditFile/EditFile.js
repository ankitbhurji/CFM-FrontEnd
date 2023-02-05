import styles from './EditFile.module.css';
import axios, { all } from 'axios';
import { useEffect, useState } from 'react';

import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';


function EditFile(props) {

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [isDebouncing, isSetDebouncing] = useState(false)
  const buttons = ['bold', '|', 'italic','|', 'underline']
  const config = useMemo(
    () => ({
        readonly: false, 
        toolbar: true,
        spellcheck: true,
        language: 'en',
        toolbarButtonSize: 'medium',
        toolbarAdaptive: false,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
        defaultActionOnPaste: "insert_clear_html",
        buttons: buttons,
        uploader: {
        insertImageAsBase64URI: true
        },
        height: 300
    }),
    []
);

  const [allValues, setAllValues] = useState({
    folderName:props.folderName,
    fileName:props.fileName,
    fileData:'', 
    isWarningKey:false,
    // fileName:props.fileData.fileData.fileName,
    // fileData:props.fileData.fileData.fileData, 
  })

    // console.log('filename', props.fileData.fileData.fileName)
    // console.log('filename', props.props.fileName)
    // console.log('filedata', props.fileData.fileData.fileData)
    // console.log('key', props.updateKey, allValues) 
    // console.log(props.fileName=='') 
    // console.log(props.fileName, props.folderName)
    // console.log(allValues.folderName)


  function clickChange(value){
    // setAllValues({...allValues, fileData:value, isWarningKey:false})
    // props.fileUpdatedData(allValues.fileData)
    setContent(value)
    isSetDebouncing(true)
    setTimeout(() => {
      Debounce()
    }, 2000);
  }

  function Debounce(){
    isSetDebouncing(false)
    // console.log('clicked')
  }


  async function clickButton (){
        // // if(!(allValues.fileData==='')){
        if(true){
          if(props.updateKey){
            // const url = 'http://localhost:3001/api/details/update'
            const url = 'https://cfm-app.onrender.com/api/details/update'
            await axios.post(url, {
             folderName:allValues.folderName,
             fileName:props.fileData.fileData.fileName,
             fileData: content,
           });
          }else{
            // const url = 'http://localhost:3001/api/details/file'
            const url = 'https://cfm-app.onrender.com/api/details/file'
            await axios.post(url, {
             folderName:allValues.folderName,
             fileName:allValues.fileName,
             fileData: content
           });
          }
          
          setAllValues({...allValues, fileData:''});
          props.lockKey({isLockKey:false, isEnterPinKey:false, isSetPinKey:false, isEditKey:false});
          // props.fileUpdatedData(allValues.fileData)
        }else{
          setAllValues({...allValues, isWarningKey:true})
        }
        
  }


    return ( 
        <div className={styles.folderContainer}>
            <div className={styles.LockContainer}>
              <div className={styles.inputContainer}>
                <div className='row'>
                    <div className={styles.setName}>
                      <p>Edit File</p>
                      {isDebouncing?(<p className={styles.saving}>saving...</p>):('')}
                    </div>
                </div>
                    <div className='row'>
                      <div>
                      {/* <textarea onChange={(e)=>{clickChange(e.target.value)}} placeholder='Type anything here!' rows="10" cols="50"> */}
                       {/* {props.fileData.fileData==undefined?(''):(props.fileData.fileData.fileData)} */}
                       {/* {props.updateKey?(props.fileData.fileData.fileData):('')} */}
                      {/* </textarea> */}
                      </div>
                      <JoditEditor
                          ref={editor}
                          value={props.updateKey?(props.fileData.fileData.fileData):('')}
                          config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                          // onChange={newContent => {setContent(newContent)}}
                          onChange={newContent => clickChange(newContent)}
                      />
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