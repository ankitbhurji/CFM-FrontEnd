import HomePage from '../components/HomePage/HomePage';
import styles from './Home.module.css'

function Home() {
    return ( 
        <div className={styles.HomeContainer}>
            <HomePage />
        </div>
     );
}

export default Home;