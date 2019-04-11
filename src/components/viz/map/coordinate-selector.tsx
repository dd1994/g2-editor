import React from 'react';
import { Select } from 'antd';
import { CoordinateType } from '../types';
const Option = Select.Option;

export default class CoordinateSelector extends React.Component<
    {
        handleCoordinateTypeChange: any;
    },
    {}
> {
    render() {
        const options = Object.keys(CoordinateType).map(item => {
            return (
                <Option value={item} key={item}>
                    {item}
                </Option>
            );
        });
        return (
            <div className="coordinate-selector">
                <Select
                    style={{ width: 120 }}
                    defaultValue={CoordinateType.rect}
                    onChange={this.props.handleCoordinateTypeChange}
                >
                    {options}
                </Select>
            </div>
        );
    }
}
