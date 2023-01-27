import styles from './HomePage.module.css';
import logo from '../../Images/logo.png'
import file from '../../Images/file.svg';
import folder from '../../Images/folder.svg'
import lock from '../../Images/lock.svg'
import set from '../../Images/set.svg'
import logout from '../../Images/logout.svg'
import React, { useState } from 'react';

function HomePage(props) {

    function clickLockButton(){
        props.lockKey({isLockKey:false, isEnterPinKey:true, isSetPinKey:false});
    }
    function clickSettingButton(){
        props.lockKey({isLockKey:false, isEnterPinKey:false, isSetPinKey:true})
    }
    function clickLogoutButton(){
        props.lockKey({isLockKey:false, isEnterPinKey:true, isSetPinKey:true})
    }
  

    return ( 
        <div className='d-flex'>
            <div className={styles.LeftSidebarContainer}>
                <div className='row'>
                
                    <div className={styles.logo}><img src={logo} width={350} height={40} /></div>
                </div>
                <div className='row'>
                    <div className='d-flex'>
                        <button className={styles.buttonFile}>
                            <div className='d-flex'>
                                <div className={styles.file}><img src={file} /></div>
                                <div className={styles.name}>Add file</div>
                            </div>
                        </button>
                        <button className={styles.buttonFolder}>
                            <div className='d-flex'>
                                <div className={styles.folder}><img src={folder} /></div>
                                <div className={styles.name}>Add folder</div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className='row'>
                    <div className={styles.addedFolders}>
                        {/* <div>row for folders</div> */}
                    </div>
                </div>
                <div className='row'>
                    <button onClick={clickLockButton} className={styles.buttonLock}> 
                        <div className='d-flex'>
                            <div className={styles.folder}><img src={lock} /></div>
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
            </div>
        </div>
     );
}

export default HomePage;