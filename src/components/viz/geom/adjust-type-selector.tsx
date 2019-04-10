import React from 'react';
import { Select } from 'antd';
import { CoordinateType, AdjustType } from '../types';
const Option = Select.Option;

export default class AdjustTypeSelector extends React.Component<
    {
        handleAdjustTypeChange: any;
    },
    {}
> {
    render() {
        const options = Object.keys(AdjustType).map(item => {
            return (
                <Option value={item} key={item}>
                    {item}
                </Option>
            );
        });
        return (
            <div>
                <Select
                    mode="multiple"
                    style={{ width: 120 }}
                    onChange={this.props.handleAdjustTypeChange}
                >
                    {options}
                </Select>
            </div>
        );
    }
}
