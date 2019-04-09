import React from 'react';
import { Select, Tag, message } from 'antd';
import { Menu, Dropdown, Icon } from 'antd';
import { Color, DropDownOperation, GeomAttr, Field } from '../types';

const Option = Select.Option;

export default class Geom extends React.Component<
    {
        geomTypeOptions: any;
        geomType: string;
        onGeomTypeChange: any;
        geomAttr: any;
        handleDropGeomAttr: any;
        dimensions: Array<string>;
        measures: Array<string>;
        handleGeomAttrDropdown: any;
    },
    any
> {
    handleDragOver(e: any) {
        e.preventDefault();
    }
    getFieldColor = (attr: string) => {
        return this.props.dimensions.includes(attr) ? Color.blue : Color.green;
    };

    handleDrop = (attr: string) => {
        this.props.handleDropGeomAttr(attr);
    };

    handleGeomAttrDropdown = ({ key }: { key: string }) => {
        // 这里用 JSON 也是无奈之举，因为 key 的类型只能是 number | string | undefined
        this.props.handleGeomAttrDropdown(JSON.parse(key));
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

        const geomAttrsValue = Object.keys(this.props.geomAttr).reduce((acc: any, key: string) => {
            return acc.concat(
                this.props.geomAttr[key].map((val: string) => {
                    const menu = (
                        <Menu onClick={this.handleGeomAttrDropdown}>
                            <Menu.Item
                                key={JSON.stringify({
                                    operation: DropDownOperation.remove,
                                    attr: key,
                                    value: val
                                })}
                            >
                                <a href="#">移除</a>
                            </Menu.Item>
                        </Menu>
                    );
                    return (
                        <li key={key + val} className="geom-attr-value-item">
                            <Tag color={this.getFieldColor(val)}>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" href="#">
                                        {key}: {val} <Icon type="down" />
                                    </a>
                                </Dropdown>
                            </Tag>
                        </li>
                    );
                })
            );
        }, []);

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
                <ul className="geom-attr-value">{geomAttrsValue}</ul>
            </div>
        );
    }
}
