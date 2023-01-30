import styles from './HomePage.module.css';
import logo from '../../Images/logo.png'
import file from '../../Images/file.svg';
import folder from '../../Images/folder.svg'
import lock from '../../Images/lock.svg'
import set from '../../Images/set.svg'
import logout from '../../Images/logout.svg'
import React, { useEffect, useState } from 'react';
// import EnterFolder from '../EnterFolder/EnterFolder';
import addFolder from '../../Images/addFolder.svg';
import axios from "axios";



function HomePage(props) {

    // const [selectedFolder, setSelectedFolder] = useState('')
    const [foldersName, setFoldersName] = useState([])
    const [selectedFolderName, setSelectedFoldername] = useState({
        selectedName:'',
        isSelectedActive:false,
        isWarningKey:false
    })

    function clickLockButton(){
        props.lockKey({isLockKey:false, isEnterPinKey:true, isSetPinKey:false,});
    }
    function clickSettingButton(){
        props.lockKey({isLockKey:false, isEnterPinKey:false, isSetPinKey:true})
    }
    function clickLogoutButton(){
        props.lockKey({isLockKey:false, isEnterPinKey:true, isSetPinKey:false})
    }
    function clickAddFolderButton(){
        props.lockKey({isFolderKey:true, isFileKey:false})
    }
    // function clickFolderSelect(data){
    //     console.log(data)
    // }
    function clickAddFileButton(){
        console.log(selectedFolderName.selectedName==='')
        if(!(selectedFolderName.selectedName==='')){
            props.lockKey({isFolderKey:false, isFileKey:true})
        }else{
            setSelectedFoldername({...selectedFolderName, isWarningKey:true})
        }
    }

    // async function getPasswords(){
    //     const url = 'http://localhost:3001/api/folder'
    //     const folders = await axios.get(url);
    //     setFoldersName(folders.data)
    // }

    useEffect(()=>{
        // getPasswords()
        const url = 'http://localhost:3001/api/folder'
        axios.get(url).then(res => {
            setFoldersName(res.data)
        }).catch(err => console.log(err))
    }, [props])


    return ( 
       <div className={styles.demo}>
        <div className='d-flex'>
            <div className={styles.LeftSidebarContainer}>
                <div className='row'>
                
                    <div className={styles.logo}><img src={logo} width={350} height={40} /></div>
                </div>
                <div className='row'>
                    <div className='d-flex'>
                        <button onClick={clickAddFileButton} className={styles.buttonFile}>
                            <div className='d-flex'>
                                <div className={styles.file}><img src={file} /></div>
                                <div className={styles.name}>Add file</div>
                            </div>
                        </button>
                        <button onClick={clickAddFolderButton} className={styles.buttonFolder}>
                            <div className='d-flex'>
                                <div className={styles.folder}><img src={folder} /></div>
                                <div className={styles.name}>Add folder</div>
                            </div>
                        </button>
                    </div>
                    {selectedFolderName.isWarningKey?(<p className={styles.warning}>folder is not selected !</p>):('')}
                </div>
                <div className='row'>
                    <div className={styles.folderContainer}>
                        {
                            foldersName.map((data, index)=>{
                                return(
                                    <button onClick={()=>{setSelectedFoldername({...selectedFolderName, selectedName:data.folderName, isWarningKey:false})}} className={selectedFolderName.isSelectedActive?(`${styles.addFolder} ${styles.addFolderActive}`):(styles.addFolder)}>
                                        <div className='d-flex'>
                                            <div><img src={addFolder} /></div>
                                            <div className='ms-3 mt-1'>{data.folderName}</div>
                                        </div>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='row'>
                    <button onClick={clickLockButton} className={styles.buttonLock}> 
                        <div className='d-flex'>
                            <div className={styles.lockIcon}><img src={lock} /></div>
                            <div className={styles.lockName}>Lock now</div>
                        </div>
                    </button>
                </div>
            </div>
            <div className={styles.RightContainer}>
                     <div className={styles.right}>
                        <div className='d-flex'>
                            <button onClick={clickSettingButton} className={styles.buttonSetting}><img src={set} /></button>
                            <button onClick={clickLogoutButton} className={styles.buttonLogout}><img src={logout}/></button>
                        </div>
                     </div>
                     <div className={styles.folderName}>
                        {`${selectedFolderName.selectedName} /`} 
                     </div>
                     <div className={styles.border}></div>
                     {/* all added file section */}
                     {/* <div className={styles.fileContainer}>
                        <div className='row'>
                            <div className='col-2 mt-5'>col1</div>
                            <div className='col-2 mt-5'>col1</div>
                            <div className='col-2 mt-5'>col1</div>
                            <div className='col-2 mt-5'>col1</div>
                            <div className='col-2 mt-5'>col1</div>
                            <div className='col-2 mt-5'>col1</div>
                            <div className='col-2 mt-5'>col1</div>
                            <div className='col-2 mt-5'>col1</div>
                        </div>
                     </div> */}
            </div>
        </div>
        </div>
     );
}

export default HomePage;