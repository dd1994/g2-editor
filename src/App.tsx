import React, { Component } from 'react';
import Button from 'antd/lib/button';

import './App.css';
import Data from './components/viz/data/data';
class App extends Component {
    render() {
        return (
            <div className="App">
                <Data />
            </div>
        );
    }
}

export default App;
