import React, {FunctionComponent} from 'react';

import styles from './app.module.scss';
import Thermostat from './thermostat/thermostat';

const App: FunctionComponent = () => {
    return(
        <div className={styles.wrapper}>
            <Thermostat/>
        </div>
    )
}

export default App;