import React, { FunctionComponent } from 'react';

import s from './App.module.pcss';

const App: FunctionComponent = () => {
    return (
        <div className={s.app}>
            Manually configured react app
        </div>
    );
};

export default App;
