import React from 'react';
import Chart from '../chart';
import AxisItem from './axis-item';
import { Axis, Color, Field, GeomAttr } from '../types';

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
    getFieldColor = (field: Field) => {
        return this.props.dimensions.includes(field) ? Color.blue : Color.green;
    };
    handleDragOver(e: any) {
        e.preventDefault();
    }
    render() {
        const y = this.props.yAxis.map((field: Field) => {
            return (
                <AxisItem
                    key={'y' + field}
                    field={field}
                    axis={Axis.y}
                    color={this.getFieldColor(field)}
                    handleAxisDropdown={this.props.handleAxisDropdown}
                />
            );
        });
        const x = this.props.xAxis.map((field: Field) => {
            return (
                <AxisItem
                    key={'x' + field}
                    field={field}
                    axis={Axis.x}
                    color={this.getFieldColor(field)}
                    handleAxisDropdown={this.props.handleAxisDropdown}
                />
            );
        });
        return (
            <div className="coordinates-container">
                <div
                    className="axis y-axis gray-border"
                    onDrop={this.props.handleDropY}
                    onDragOver={this.handleDragOver}
                >
                    <h3>Y 轴</h3>
                    <ul>{y}</ul>
                </div>
                <Chart />
                <div
                    className="axis x-axis gray-border"
                    onDrop={this.props.handleDropX}
                    onDragOver={this.handleDragOver}
                >
                    <h3>X 轴</h3>
                    <ul>{x}</ul>
                </div>
            </div>
        );
    }
}
