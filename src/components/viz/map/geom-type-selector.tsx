import React from 'react';
import { Select } from 'antd';
import { GeomType } from '../types';
const Option = Select.Option;

export default class GeomTypeSelector extends React.Component<
    {
        geomTypeOptions: Array<{ label: GeomType; value: GeomType }>;
        geomType: GeomType;
        onGeomTypeChange: any;
    },
    {}
> {
    render() {
        const options = this.props.geomTypeOptions.map(item => {
            return (
                <Option value={item.value} key={item.value}>
                    {item.label}
                </Option>
            );
        });
        return (
            <div className="geom-type-selector">
                <Select
                    style={{ width: 120 }}
                    defaultValue={this.props.geomType}
                    onChange={this.props.onGeomTypeChange}
                >
                    {options}
                </Select>
            </div>
        );
    }
}
