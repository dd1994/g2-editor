import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class Geom extends React.Component<{ geomTypeOptions: any; geomType: string; onGeomTypeChange: any }, any> {
    render() {
        const options = this.props.geomTypeOptions.map((item: { label: string; value: string }) => {
            return (
                <Option value={item.value} key={item.value}>
                    {item.label}
                </Option>
            );
        });
        return (
            <div className="geom gray-border">
                <h3>GEOM</h3>
                <Select defaultValue={this.props.geomType} onChange={this.props.onGeomTypeChange}>
                    {options}
                </Select>
            </div>
        );
    }
}
