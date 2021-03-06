import React, { Component } from 'react';

import './App.css';
import Data from './components/viz/data/index';
import { data } from './components/viz/data/gdp';
import G2 from '@antv/g2';
import * as R from 'ramda';
import Geom from './components/viz/map';
import {
    Field,
    GeomAttr,
    DropDownOperation,
    AxisType,
    GeomType,
    CoordinateType,
    AdjustType
} from './components/viz/types';
import Chart from './components/viz/chart';
import G2Code from './components/viz/g2-code';
import Prism from 'prismjs';

const DataSet = require('@antv/data-set');
class App extends Component<
    {},
    {
        data: any;
        geomAttr: { [key: string]: Array<Field> };
        geomTypeOptions: Array<{ label: GeomType; value: GeomType }>;
        geomType: GeomType;
        dragItem: Field;
        xAxis: Array<Field>;
        yAxis: Array<Field>;
        chart: any;
        coordinateType: CoordinateType;
        adjustType: Array<AdjustType>;
        g2code: string;
    }
> {
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
                }),
            geomType: 'line',
            geomTypeOptions: [
                {
                    label: 'line',
                    value: 'line'
                },
                {
                    label: 'point',
                    value: 'point'
                },
                {
                    label: 'interval',
                    value: 'interval'
                },
                {
                    label: 'area',
                    value: 'area'
                }
            ],
            geomAttr: {
                color: [],
                size: [],
                label: [],
                tooltip: [],
                shape: [],
                opacity: []
            },
            dragItem: '',
            xAxis: [],
            yAxis: [],
            chart: null,
            coordinateType: CoordinateType.rect,
            adjustType: [],
            g2code: ''
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

    onGeomTypeChange = (val: GeomType) => {
        this.setState({ geomType: val }, this.renderChart);
    };

    setDragItem = (val: Field) => {
        this.setState({ dragItem: val });
    };
    geomAttrCouldIncludesMultipleValue(attr: GeomAttr) {
        return ['label', 'tooltip'].includes(attr);
    }
    handleDropGeomAttr = (attr: GeomAttr) => {
        if (this.geomAttrCouldIncludesMultipleValue(attr)) {
            this.setState(
                {
                    geomAttr: {
                        ...this.state.geomAttr,
                        [attr]: R.uniq(this.state.geomAttr[attr].concat([this.state.dragItem]))
                    }
                },
                this.renderChart
            );
        } else {
            this.setState(
                {
                    geomAttr: {
                        ...this.state.geomAttr,
                        [attr]: [this.state.dragItem]
                    }
                },
                this.renderChart
            );
        }
    };

    handleDropY = () => {
        if (!this.state.yAxis.includes(this.state.dragItem)) {
            this.setState(
                {
                    yAxis: [...this.state.yAxis, this.state.dragItem]
                },
                this.renderChart
            );
        }
    };
    handleDropX = () => {
        if (!this.state.xAxis.includes(this.state.dragItem)) {
            this.setState(
                {
                    xAxis: [...this.state.xAxis, this.state.dragItem]
                },
                this.renderChart
            );
        }
    };

    renderChart = () => {
        this.state.chart.clear();

        this.setState({
            g2code: ''
        });
        if (
            R.any(
                R.isEmpty,
                R.map(R.prop(R.__, this.state as any), ['data', 'geomType', 'xAxis', 'yAxis'])
            )
        ) {
            return;
        }

        this.state.chart.coord(this.state.coordinateType);

        const geom = this.state.chart.source(this.state.data)[this.state.geomType]();
        geom.position(`${this.state.xAxis[0]}*${this.state.yAxis[0]}`);

        let geomAttrCode = '';
        Object.keys(this.state.geomAttr).forEach((attr: GeomAttr) => {
            if (this.state.geomAttr[attr].length) {
                geom[attr](this.state.geomAttr[attr].join('*'));
                geomAttrCode += `geom.${attr}('${this.state.geomAttr[attr].join('*')}')
        `;
            }
        });
        if (this.state.adjustType.length) {
            geom.adjust(R.clone(this.state.adjustType));
            geomAttrCode += `geom.adjust(${JSON.stringify(this.state.adjustType)})
            `;
        }
        this.state.chart.repaint();

        let code = `
        const chart = new G2.Chart({
            container: 'mountNode',
            width: 800,
            padding: 'auto'
        })
        const data = ${this.state.data}
        chart.coord('${this.state.coordinateType}')
        const geom = chart.source(data).${this.state.geomType}()
        geom.position('${this.state.xAxis[0]}*${this.state.yAxis[0]}')
        ${geomAttrCode}
        chart.render()
        `;
        this.setState(
            {
                g2code: code
            },
            Prism.highlightAll
        );
    };
    componentDidMount() {
        const chart: G2.Chart = new G2.Chart({
            container: 'c',
            width: (document.getElementById('c') || { clientWidth: 0 }).clientWidth * 0.9,
            padding: 'auto'
        });
        this.setState({ chart });
    }

    handleAxisDropdown = ({
        operation,
        axis,
        value
    }: {
        operation: DropDownOperation;
        axis: AxisType;
        value: Field;
    }) => {
        if (operation === DropDownOperation.remove) {
            if (axis === AxisType.x) {
                this.setState(
                    {
                        xAxis: R.without([value], this.state.xAxis)
                    },
                    this.renderChart
                );
            } else if (axis === AxisType.y) {
                this.setState(
                    {
                        yAxis: R.without([value], this.state.yAxis)
                    },
                    this.renderChart
                );
            }
        }
    };
    handleCoordinateTypeChange = (val: CoordinateType) => {
        this.setState(
            {
                coordinateType: val
            },
            this.renderChart
        );
    };

    handleAdjustTypeChange = (val: Array<AdjustType>) => {
        this.setState(
            {
                adjustType: val
            },
            this.renderChart
        );
    };

    handleGeomAttrDropdown = ({
        operation,
        attr,
        value
    }: {
        operation: DropDownOperation;
        attr: GeomAttr;
        value: Field;
    }) => {
        if (operation === DropDownOperation.remove) {
            this.setState(
                {
                    geomAttr: {
                        ...this.state.geomAttr,
                        [attr]: R.without([value], this.state.geomAttr[attr])
                    }
                },
                this.renderChart
            );
        }
    };

    render() {
        const dimensions = this.dimensions;
        const measures = this.measures;
        return (
            <div className="App">
                <div className="workspace-container">
                    <Data
                        dimensions={dimensions}
                        measures={measures}
                        setDragItem={this.setDragItem}
                    />
                    <Geom
                        geomTypeOptions={this.state.geomTypeOptions}
                        geomType={this.state.geomType}
                        onGeomTypeChange={this.onGeomTypeChange}
                        geomAttr={this.state.geomAttr}
                        handleDropGeomAttr={this.handleDropGeomAttr}
                        dimensions={dimensions}
                        measures={measures}
                        handleGeomAttrDropdown={this.handleGeomAttrDropdown}
                        handleCoordinateTypeChange={this.handleCoordinateTypeChange}
                        handleAdjustTypeChange={this.handleAdjustTypeChange}
                        yAxis={this.state.yAxis}
                        xAxis={this.state.xAxis}
                        dragItem={this.state.dragItem}
                        handleDropX={this.handleDropX}
                        handleDropY={this.handleDropY}
                        handleAxisDropdown={this.handleAxisDropdown}
                    />
                    <div className="right-space-wrapper">
                        <Chart />
                        {this.state.g2code && <G2Code code={this.state.g2code} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
