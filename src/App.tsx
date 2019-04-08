import React, { Component } from 'react';
import Button from 'antd/lib/button';

import './App.css';
import Data from './components/viz/data/data';
import { data } from './components/viz/data/gdp';
import G2 from '@antv/g2';
const DataSet = require('@antv/data-set');

class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            data: new DataSet.View()
                .source(data, {
                    type: 'csv'
                })
                .transform({
                    type: 'filter',
                    callback(row: any) {
                        // 判断某一行是否保留，默认返回true
                        return ['China', 'Japan', 'United States'].includes(row['Entity']);
                    }
                })
                .transform({
                    type: 'map',
                    callback(row: any) {
                        row.GDP = Number(row.GDP);
                        return row;
                    }
                })
        };
    }
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
