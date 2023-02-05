import styles from './HomePage.module.css';
import logo from '../../Images/logo.png'
import file from '../../Images/file.svg';
import folder from '../../Images/folder.svg'
import lock from '../../Images/lock.svg'
import set from '../../Images/set.svg'
import logout from '../../Images/logout.svg'
import React, { useEffect, useState } from 'react';
import addFolder from '../../Images/addFolder.svg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import uploadFile from '../../Images/uploadFile.svg';
import searchIcon from '../../Images/searchIcon.svg'

function HomePage(props) {

    const [folderId, setFolderId] = useState('')
    const [foldersName, setFoldersName] = useState([])
    const [folderName, setFolderName] = useState('')
    const [fileNames, setFileNames] = useState([])
    const [filePath, setFilePath] = useState('')
    const [searchFile, setSearchFile] = useState([])
    const [fileUpdatedData, setFileUpdatedData] = useState('')
    const [selectedFolderName, setSelectedFolderName] = useState({
        selectedName:'/... /...',
        isSelectedActive:false,
        isWarningKey:false
    })

    function clickLockButton(){
        props.lockKey({
            isLockKey:false, 
            isEnterPinKey:true, 
            isSetPinKey:false
        });
        localStorage.setItem('localStatus', JSON.stringify(true));
    }
    function clickSettingButton(){
        props.lockKey({
            isLockKey:false, 
            isEnterPinKey:false, 
            isSetPinKey:true
        })
    }
    function clickLogoutButton(){
        props.lockKey({isLockKey:false, 
            isEnterPinKey:true, 
            isSetPinKey:false
        })
        localStorage.setItem('localStatus', JSON.stringify(null));
    }
    function clickAddFolderButton(){
        props.lockKey({
            isFolderKey:true, 
            isFileKey:false
        })
    }
    async function clickFolderSelect(data){
        const url = `http://localhost:3001/api/details/find/${data.folderName}`
        const AllFiles = await axios.get(url)
        setFileNames(AllFiles.data)
        setFolderName(data.folderName)
        setFolderId(data)

        setSelectedFolderName({
            ...selectedFolderName, 
            selectedName:data.folderName, 
            isWarningKey:false
        })
        props.folderName(data.folderName)
        setFilePath('')
    }


    function clickAddFileButton(){
        if(!(selectedFolderName.selectedName==='/... /...')){
            props.lockKey({
                isFolderKey:false, 
                isFileKey:true, 
                updateKey:false
            })
            props.getFileNames(fileNames)
        }else{
            setSelectedFolderName({
                ...selectedFolderName, 
                isWarningKey:true
            })
        }
    }
    async function searchChange(searchFile){
        if(searchFile.length){
            const url = `http://localhost:3001/api/details/search/${searchFile}`
            const search = await axios.get(url)
            setSearchFile(search.data)
        }
    }
    function clickOpenFile(files){
        props.fileData({fileData:files})
        props.lockKey({isFolderKey:false, isFileKey:false,isEditKey:true, updateKey:true})
        // console.log(files.fileName)
        setSearchFile([]) // clear search data after click on search button
    }

    useEffect(()=>{
        const url = 'http://localhost:3001/api/details/folder'
        axios.get(url).then(res => {
            setFoldersName(res.data)
        }).catch(err => console.log(err))

        if(!(folderName=='')){
            const urlUpdate = `http://localhost:3001/api/details/find/${folderName}`
            axios.get(urlUpdate).then(res => {
                setFileNames(res.data)
            }).catch(err => console.log(err));
            
        }
    }, [props, folderName])
    // }, [props, foldersName, folderName])



   

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
                                    <button key={index} onClick={()=>{clickFolderSelect(data)}} className={data._id==folderId._id?(`${styles.addFolder} ${styles.addFolderActive}`):(styles.addFolder)}>
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
                     <div>
                        <input onChange={(e)=>{searchChange(e.target.value)}} type='search' placeholder='search...'/>
                        <div className={styles.showFileds}>
                            <ul>
                                {
                                    searchFile.map((fileValues, index)=>{
                                        return(
                                            <div key={index}>
                                                <li onClick={()=>{clickOpenFile(fileValues)}} className='mb-1'>
                                                    <button> <img src={searchIcon} className='me-2'/> {fileValues.fileName}</button>
                                                </li>
                                            </div>
                                            
                                        )
                                    })
                                }
                            </ul>
                        </div>
                     </div>
                     <div className={styles.folderName}>
                        {`${selectedFolderName.selectedName} / ${filePath}`} 
                     </div>
                     <div className={styles.border}></div>
                     
                     <div className={styles.fileContainer}>
                        <div className='row'>
                            {
                                fileNames.map((files, index)=>{
                                    return(
                                            <div key={index} className='col-2 mt-5'>
                                                <button onClick={()=>{setFilePath(files.fileName)}} onDoubleClick={()=>{clickOpenFile(files)}} className={styles.file}>
                                                    <div className={styles.uploadFileIcon}><img src={uploadFile} /></div>
                                                    <div className={styles.fileName}>{files.fileName}</div>
                                                </button>  
                                            </div>
                                    )
                                })
                            }
                        </div>
                     </div>
            </div>
        </div>
        </div>
     );
}

export default HomePage;