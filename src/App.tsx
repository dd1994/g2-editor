import React, { Component } from 'react';
import Button from 'antd/lib/button';

import './App.css';
import Data from './components/viz/data/data';
class App extends Component {
    render() {
        const dimensions = ['xx', 'yy'];
        const measures = ['oo', 'mm'];
        return (
            <div className="App">
                <Data dimensions={dimensions} measures={measures} />
            </div>
        );
    }
}

export default App;
