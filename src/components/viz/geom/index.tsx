import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class Geom extends React.Component<
    { geomTypeOptions: any; geomType: string; onGeomTypeChange: any; geomAttr: any },
    any
> {
    render() {
        const options = this.props.geomTypeOptions.map((item: { label: string; value: string }) => {
            return (
                <Option value={item.value} key={item.value}>
                    {item.label}
                </Option>
            );
        });
        const geomAttrs = Object.keys(this.props.geomAttr).map((key: string) => {
            return (
                <div key={key} className="geom-attr gray-border">
                    {key}
                </div>
            );
        });

        return (
            <div className="geom gray-border">
                <h3>GEOM</h3>
                <Select
                    style={{ width: 120 }}
                    defaultValue={this.props.geomType}
                    onChange={this.props.onGeomTypeChange}
                >
                    {options}
                </Select>
                <div className="geom-attr-container">{geomAttrs}</div>
            </div>
        );
    }
}
