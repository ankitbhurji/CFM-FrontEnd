import HomePage from '../components/HomePage/HomePage';
import EnterPin from '../components/EnterPin/EnterPin';
import styles from './Home.module.css'
import SetPin from '../components/SetPin/SetPin';
import { useEffect, useState } from 'react';
import AddFolder from '../components/AddFolder/AddFolder';
import AddFile from '../components/AddFile/AddFile';
import EditFile from '../components/EditFile/EditFile';

function Home() {

    // const [allValues, setAllValues] = useState({
    //     folderName:'',
    //     fileName:'',
    //     fileValues:''
    // })
    const [fileName, setFileName] = useState('')
    const [folderName, setFolderName] = useState('')
    const [fileData, setFileData]= useState({})
    const [fileUpdatedData, setFileUpdatedData] = useState('')
    const [getFileNames ,setGetFileNames] = useState([])

    const [keys, setKeys] = useState({
        isLockKey:false, 
        isEnterPinKey:false, 
        isSetPinKey:false,
        isFolderKey:false, 
        isFileKey:false, 
        isEditKey:false,
        updateKey:false
    })
    console.log(keys, getFileNames)
   
    

 
    
    return ( 
        <div >
            <div className={styles.HomeContainer}>
                <HomePage getFileNames={setGetFileNames} fileUpdatedData={fileUpdatedData} folderName={setFolderName} fileData={setFileData}  lockKey={setKeys}/>
                {
                keys.isEnterPinKey?(<EnterPin lockKey={setKeys}/>)
                :
                keys.isSetPinKey?(<SetPin />)
                :
                keys.isFolderKey?(<AddFolder lockKey={setKeys}/>)
                :
                keys.isFileKey?(<AddFile getFileNames={getFileNames} fileName={setFileName} lockKey={setKeys}/>)
                :
                keys.isEditKey?(<EditFile fileUpdatedData={setFileUpdatedData} folderName={folderName} fileName={fileName} fileData={fileData} updateKey={keys.updateKey} lockKey={setKeys} />)
                :
                ("")
                }
            </div>  
        </div>
     );
}

export default Home;