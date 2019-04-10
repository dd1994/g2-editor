import { Menu, Tag, Dropdown, Icon } from 'antd';
import { GeomAttr, Field, DropDownOperation, Color } from '../types';
import React from 'react';

export default class GeomAttrValueItem extends React.Component<
    {
        attr: GeomAttr;
        val: Field;
        handleGeomAttrDropdown: any;
        getFieldColor: any;
    },
    {}
> {
    handleGeomAttrDropdown = ({ key }: { key: string }) => {
        // 这里用 JSON 也是无奈之举，因为 key 的类型只能是 number | string | undefined
        this.props.handleGeomAttrDropdown(JSON.parse(key));
    };

    render() {
        const menu = (
            <Menu onClick={this.handleGeomAttrDropdown}>
                <Menu.Item
                    key={JSON.stringify({
                        operation: DropDownOperation.remove,
                        attr: this.props.attr,
                        value: this.props.val
                    })}
                >
                    <a href="#">移除</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <li key={this.props.attr + this.props.val} className="geom-attr-value-item">
                <Tag color={this.props.getFieldColor(this.props.val)}>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            {this.props.attr}: {this.props.val} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Tag>
            </li>
        );
    }
}
