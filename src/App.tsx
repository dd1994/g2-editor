import React, { Component } from 'react';
import Button from 'antd/lib/button';

import './App.css';
import Data from './components/viz/data/data';
import { data } from './components/viz/data/gdp';
import G2 from '@antv/g2';
import * as R from 'ramda';

const DataSet = require('@antv/data-set');

class App extends Component<{}, { data: any }> {
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

    get dimensions() {
        // 默认生成度量的机制如下：
        // 查看用户是否制定了对应字段的数据类型，查看列定义
        // 如果没有，判断字段的第一条数据的字段类型

        // 如果数据中不存在对应的字段，则为 'identity'

        // 如果是数字则为 'linear'；

        // 如果是字符串，判定是否是时间格式，如果是时间格式则为时间类型 'time',

        // 否则是分类类型 'cat'

        const exampleData = this.state.data.rows[0] || {};
        return Object.keys(exampleData).filter(key => {
            return R.is(Number, exampleData[key]);
        });
    }

    get measures() {
        const exampleData = this.state.data.rows[0] || {};
        return Object.keys(exampleData).filter(key => {
            return R.not(R.is(Number, exampleData[key]));
        });
    }

    render() {
        const dimensions = this.dimensions;
        const measures = this.measures;
        return (
            <div className="App">
                <Data dimensions={dimensions} measures={measures} />
            </div>
        );
    }
}

export default App;
