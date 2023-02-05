import HomePage from '../components/HomePage/HomePage';
import EnterPin from '../components/EnterPin/EnterPin';
import styles from './Home.module.css'
import SetPin from '../components/SetPin/SetPin';
import { useEffect, useState } from 'react';
import AddFolder from '../components/AddFolder/AddFolder';
import AddFile from '../components/AddFile/AddFile';
import EditFile from '../components/EditFile/EditFile';
import axios from 'axios';

// import { useRef, useMemo } from 'react';
// import JoditEditor from 'jodit-react';


function Home() {

    // const editor = useRef(null);
	// const [content, setContent] = useState('');
    // const config = {
    //     buttons: ['bold', 'insertDate', 'italic', 'underline']
    // }


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
    // console.log(keys, getFileNames)
   
    async function getStatus(){
        
        const localStatus = JSON.parse(localStorage.getItem('localStatus'))
        
        if(localStatus==null){
            // const url = "http://localhost:3001/api/security/password/status"
            const url = "https://cfm-app.onrender.com/api/security/password/status"
            const status = await axios.get(url)
            if(status.data){
                setKeys({...keys, isEnterPinKey:true})
            }else{
                setKeys({...keys, isSetPinKey:true})
            }
        }else{
            if(localStatus){
                setKeys({...keys, isEnterPinKey:true})
            }
        }
    }           

    


    useEffect(()=>{
        getStatus()     
    }, [])

 
    
    return ( 
        <div >
            <div className={styles.HomeContainer}>
                <HomePage getFileNames={setGetFileNames} fileUpdatedData={fileUpdatedData} folderName={setFolderName} fileData={setFileData}  lockKey={setKeys}/>
                {
                keys.isEnterPinKey?(<EnterPin lockKey={setKeys}/>)
                :
                keys.isSetPinKey?(<SetPin lockKey={setKeys} />)
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

            {/* <JoditEditor
			ref={editor}
			value={content}
            config={config}
            tabIndex={1}
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			// onChange={newContent => {setContent(newContent)}}
		    /> */}
        </div>
     );
}

export default Home;