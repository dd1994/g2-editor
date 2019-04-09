import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class Geom extends React.Component<
    { geomTypeOptions: any; geomType: string; onGeomTypeChange: any; geomAttr: any; handleDropGeomAttr: any },
    any
> {
    handleDragOver(e: any) {
        e.preventDefault();
    }
    handleDrop = (attr: string) => {
        this.props.handleDropGeomAttr(attr);
    };
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
                <div
                    key={key}
                    className="geom-attr gray-border"
                    onDragOver={this.handleDragOver}
                    onDrop={this.handleDrop.bind(this, key)}
                >
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
