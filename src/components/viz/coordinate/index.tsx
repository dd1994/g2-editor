import React from 'react';
import Chart from '../chart';
import { AxisType, Field } from '../types';
import Axis from './axis';

export default class Coordinate extends React.Component<
    {
        yAxis: Array<Field>;
        xAxis: Array<Field>;
        dimensions: Array<Field>;
        dragItem: Field;
        handleDropY: any;
        handleDropX: any;
        handleAxisDropdown: any;
    },
    {}
> {
    render() {
        return (
            <div className="coordinates-container">
                <Chart />
            </div>
        );
    }
}
