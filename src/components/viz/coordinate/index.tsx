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
                <Axis
                    axisType={AxisType.y}
                    axis={this.props.yAxis}
                    dimensions={this.props.dimensions}
                    dragItem={this.props.dragItem}
                    handleDrop={this.props.handleDropY}
                    handleAxisDropdown={this.props.handleAxisDropdown}
                />
                <Chart />
                <Axis
                    axisType={AxisType.x}
                    axis={this.props.xAxis}
                    dimensions={this.props.dimensions}
                    dragItem={this.props.dragItem}
                    handleDrop={this.props.handleDropX}
                    handleAxisDropdown={this.props.handleAxisDropdown}
                />
            </div>
        );
    }
}
