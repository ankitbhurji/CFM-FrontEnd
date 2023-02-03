import styles from './SetPin.module.css'
import React, { useState } from 'react'
import axios from "axios";


function SetPin() {

    const [pin, setPin] = useState({
        pin:'',
        confirmPin:'',
        isWarningKey:false, 
        isUpdateKey:false,
        isBlank:false
    })
    
    async function clickSubmit(e){
        e.preventDefault();

        if(pin.pin===pin.confirmPin){
            if(pin.pin==='' || pin.confirmPin===''){
                setPin({...pin, isBlank:true})
            }else{
                // setPin({...pin,  isWarningKey:false})
                const url = 'http://localhost:3001/password'
                await axios.post(url, {
                    pin:pin.pin,
                    confirmPin:pin.confirmPin
                });
                setPin({
                    ...pin, 
                    pin:'', 
                    confirmPin:'', 
                    isUpdateKey:true
                })
            }
        }
        else{
            setPin({
                ...pin, 
                isWarningKey:true, 
                isBlank:false
            });
        }
           
    }



    return ( 
        <div className={styles.demo}>
       <div className={styles.LockContainer}>
            <div className={styles.inputContainer}>
                <form onSubmit={clickSubmit}>
                    <div className='row'>
                        <div className={styles.setName}><p>Set Pin</p></div>
                    </div>
                    <div className='row'>
                        <label>Enter New Pin</label>
                        <div>
                        <input 
                            onChange={(e)=>{setPin({
                                ...pin, 
                                pin:e.target.value, 
                                isWarningKey:false, 
                                isBlank:false
                                })}} 
                                value={pin.pin} 
                                name='pin' 
                                type="tel"  
                                maxLength='4'
                        />
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <label>Confirm New Pin</label>
                        <div>
                        <input 
                            onChange={(e)=>{setPin({
                                ...pin, 
                                confirmPin:e.target.value, 
                                isWarningKey:false, 
                                isBlank:false
                                })}}
                                value={pin.confirmPin} 
                                name='confirmPin' 
                                type="tel" 
                                maxLength='4'
                        />
                        </div>
                    </div>
                    <div className='row'>
                        <button type='submit' className={styles.ChangeButton}>Save Changes</button>
                    </div>
                        {
                            pin.isWarningKey?(<p className={styles.warning}>pin does't match</p>)
                            :
                            pin.isUpdateKey?(<p className={styles.success}>pin updated successfully !</p>)
                            :
                            pin.isBlank?(<p className={styles.warning}>please enter the pin</p>)
                            :
                            ('')
                        }
                </form>
            </div>
       </div>
       </div>
     );
}

export default SetPin;

