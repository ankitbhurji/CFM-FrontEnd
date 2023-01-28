import HomePage from '../components/HomePage/HomePage';
import EnterPin from '../components/EnterPin/EnterPin';
import styles from './Home.module.css'
import SetPin from '../components/SetPin/SetPin';
import { useEffect, useState } from 'react';
import EnterFolder from '../components/EnterFolder/EnterFolder';

function Home() {

    const [keys, setKeys] = useState({
        isLockKey:false, 
        isEnterPinKey:false, 
        isSetPinKey:false,
        isFolderKey:false, 
        isFileKey:false
    })
    console.log(keys)
    
    return ( 
        <div >
            <div className={styles.HomeContainer}>
               
            {/* {keys.isLockKey?(<EnterPin />):(<HomePage keys={setKeys}/>)} */}
            {/* {!lockKey.isLockKey?(<HomePage lockKey={setLockKey}/>):(<EnterPin />)} */}
            {/* <HomePage lockKey={setKeys} /> */}
            {/* <EnterFolder/> */}
            {/* {keys.isFolderKey?(<EnterFolder/>):("")} */}

            <HomePage lockKey={setKeys}/>

            {
            keys.isEnterPinKey?(<EnterPin lockKey={setKeys}/>)
            :
            keys.isSetPinKey?(<SetPin />)
            :
            keys.isFolderKey?(<EnterFolder/>)
            :
            ("")
            }


            {/* {
            keys.isEnterPinKey?(<EnterPin lockKey={setKeys}/>)
            :
            keys.isSetPinKey?(<SetPin />)
            :
            (<HomePage lockKey={setKeys}/>)
            } */}
            {/* {keys.isEnterPinKey?(<EnterPin lockKey={setKeys}/>):(<HomePage lockKey={setKeys}/>)} */}
            
            {/* {keys.isEnterPinKey?(<EnterPin lockKey={setKeys}/>):keys.isSetPinKey?(<SetPin />):('')} */}
            {/* <EnterFolder/> */}
            {/* <EnterPin /> */}
            {/* <SetPin/> */}
            </div>  
        </div>
     );
}

export default Home;