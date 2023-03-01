import styles from './HomePage1.module.css'
import file from '../../Images/file.svg';
import folder from '../../Images/folder.svg'
import logo from '../../Images/logo.png'
import folder1 from '../../Images/folder1.svg'
import file11 from '../../Images/file11.svg'
import added_folder from '../../Images/added_folder.svg'
import reset1 from '../../Images/reset1.svg'
import logout1 from '../../Images/logout1.svg'
import uploadFile from '../../Images/uploadFile.svg';
import lock1 from '../../Images/lock1.svg'

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import searchIcon from '../../Images/searchIcon.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function HomePage1(props) {
    // const notify = () => toast("Wow so easy!");

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
        // const url = `http://localhost:3001/api/details/find/${data.folderName}`
        const url = `https://cfm-app.onrender.com/api/details/find/${data.folderName}`
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
            // const url = `http://localhost:3001/api/details/search/${searchFile}`
            const url = `https://cfm-app.onrender.com/api/details/search/${searchFile}`
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
        // const url = 'http://localhost:3001/api/details/folder'
        const url = 'https://cfm-app.onrender.com/api/details/folder'
        axios.get(url).then(res => {
            setFoldersName(res.data)
        }).catch(err => console.log(err))

        if(!(folderName=='')){
            // const urlUpdate = `http://localhost:3001/api/details/find/${folderName}`
            const urlUpdate = `https://cfm-app.onrender.com/api/details/find/${folderName}`
            axios.get(urlUpdate).then(res => {
                setFileNames(res.data)
            }).catch(err => console.log(err));
        }
    }, [props, folderName])
    // }, [props, foldersName, folderName])


    return ( 
        <div>
            <div className={styles.home_container}>
                <div className={styles.left_container}>

                    <div className={styles.logo_container}>
                        <img className={styles.logo_image} src='https://cdn-icons-png.flaticon.com/512/1091/1091038.png?w=740&t=st=1677703255~exp=1677703855~hmac=391283ebac12ae0f7192fc3cc79792028d6a4358bd4bf4a20b191a3d86147e88'  />
                        <div className={styles.logo_name}> Centralized File Manager</div>
                    </div>
                    <div>
                        <div className={styles.file_folder_icon_container}>
                            <div onClick={clickAddFileButton} className={styles.add_file}>
                                <img src={file11}/>
                            </div>
                            <div onClick={clickAddFolderButton} className={styles.add_folder}>
                                <img src={folder1}/>
                            </div>
                        </div>
                        {selectedFolderName.isWarningKey?(<p className={styles.warning}>Folder Is Not Selected !</p>):('')}
                    </div>

                    <div className={styles.folder_container}>
                        {
                        foldersName.map((data, index)=>{
                            return (
                                <div key={index} onClick={()=>{clickFolderSelect(data)}} className={data._id==folderId._id?(`${styles.folder} ${styles.addFolderActive}`):(styles.folder)}>
                                    <div className={styles.folder_icon}><img src={added_folder}/></div>
                                    <div className={styles.folder_name}>{data.folderName}</div>
                                </div>
                            )
                        })
                        }
                        {/* <div className={styles.folder}>
                            <div className={styles.folder_icon}><img src={added_folder}/></div>
                            <div className={styles.folder_name}>name</div>
                        </div> */}
                    </div>
                    <div className={styles.lock_container}>
                        <button onClick={clickLockButton} className={styles.lock_button}><img className={styles.lock_icon} src={lock1}/>Lock now</button>
                    </div>
                </div>

                <div className={styles.right_container}>
                    <div className={styles.top_bar}>
                        <div className={styles.search_container}>
                            <input onChange={(e)=>{searchChange(e.target.value)}} type='search'  placeholder='search...'/>
                            <ul className={styles.search_ul}>
                                {
                                    searchFile.map((fileValues, index)=>{
                                        return(
                                            <div key={index}>
                                                <li onClick={()=>{clickOpenFile(fileValues)}} className={styles.search_li}>
                                                    <button className={styles.search_button}> <img src={searchIcon} className='me-2'/> {fileValues.fileName}</button>
                                                </li>
                                            </div>
                                            
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={styles.reset_logout_container}>
                            <div onClick={clickSettingButton} className={styles.reset_container}><img src={reset1}/></div>
                            <div onClick={clickLogoutButton} className={styles.logout_container}><img src={logout1}/></div>
                        </div>
                    </div>
                    <div className={styles.selected_file_folder}>
                    {`${selectedFolderName.selectedName}/ ${filePath}`}
                        <hr className={styles.line}></hr>
                    </div>
                    <div className={styles.file_container}>
                        {
                            fileNames.map((files, index)=>{
                                return(
                                    <div onClick={()=>{setFilePath(files.fileName)}} onDoubleClick={()=>{clickOpenFile(files)}} className={styles.upload_file}>
                                        <img src={uploadFile}/>
                                        <div>{files.fileName}</div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className={styles.upload_file}>
                            <img src={uploadFile}/>
                            <div>name</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
     );
}

export default HomePage1;