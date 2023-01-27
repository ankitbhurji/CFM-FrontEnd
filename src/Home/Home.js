import HomePage from '../components/HomePage/HomePage';
import EnterPin from '../components/EnterPin/EnterPin';
import styles from './Home.module.css'
import SetPin from '../components/SetPin/SetPin';
import { useEffect, useState } from 'react';

function Home() {

    const [keys, setKeys] = useState({
        isLockKey:false, 
        isEnterPinKey:false, 
        isSetPinKey:false
    })
    console.log(keys)
    
    return ( 
        <div >
            <div className={styles.HomeContainer}>
               
            {/* {keys.isLockKey?(<EnterPin />):(<HomePage keys={setKeys}/>)} */}
            {/* {!lockKey.isLockKey?(<HomePage lockKey={setLockKey}/>):(<EnterPin />)} */}
            {
            keys.isEnterPinKey?(<EnterPin lockKey={setKeys}/>)
            :
            keys.isSetPinKey?(<SetPin />)
            :
            (<HomePage lockKey={setKeys}/>)
            }
            {/* {keys.isEnterPinKey?(<EnterPin lockKey={setKeys}/>):(<HomePage lockKey={setKeys}/>)} */}
            {/* <HomePage lockKey={setLockKey}/> */}
            {/* <EnterPin /> */}
            {/* <SetPin/> */}
            </div>  
        </div>
     );
}

export default Home;