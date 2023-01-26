import HomePage from '../components/HomePage/HomePage';
import EnterPin from '../components/EnterPin/EnterPin';
import styles from './Home.module.css'
import SetPin from '../components/SetPin/SetPin';

function Home() {
    return ( 
        <div >
            <div className={styles.HomeContainer}>
            {/* <HomePage /> */}
            {/* <EnterPin /> */}
            <SetPin/>
            </div>  
        </div>
     );
}

export default Home;