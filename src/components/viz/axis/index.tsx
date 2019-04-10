import React from 'react';
import { Field, AxisType, Color } from '../types';
import AxisItem from './axis-item';
import { Divider } from 'antd';

export default class Axis extends React.Component<
    {
        axisType: AxisType;
        axis: Array<Field>;
        dimensions: Array<Field>;
        dragItem: Field;
        handleDrop: any;
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
        const list = this.props.axis.map((field: Field) => {
            return (
                <AxisItem
                    key={this.props.axisType + field}
                    field={field}
                    axis={this.props.axisType}
                    color={this.getFieldColor(field)}
                    handleAxisDropdown={this.props.handleAxisDropdown}
                />
            );
        });

        return (
            <div className="axis" onDrop={this.props.handleDrop} onDragOver={this.handleDragOver}>
                <h3>{this.props.axisType} 轴</h3>
                <ul>{list}</ul>
                <Divider />
            </div>
        );
    }
}
