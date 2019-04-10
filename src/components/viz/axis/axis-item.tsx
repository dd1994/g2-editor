import React from 'react';
import { Tag, Dropdown, Icon, Menu, Button } from 'antd';
import { Color, AxisType, Field, DropDownOperation } from '../types';

export default class AxisItem extends React.Component<
    { field: Field; axis: AxisType; color: any; handleAxisDropdown: any },
    {}
> {
    handleAxisDropdown = ({ key }: { key: string }) => {
        this.props.handleAxisDropdown(JSON.parse(key));
    };
    render() {
        const menu = (
            <Menu onClick={this.handleAxisDropdown}>
                <Menu.Item
                    key={JSON.stringify({
                        operation: DropDownOperation.remove,
                        axis: this.props.axis,
                        value: this.props.field
                    })}
                >
                    <a href="#">移除</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <li className="field-item">
                <Button type={this.props.color} shape="round" size="small" block>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            {this.props.field} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Button>
            </li>
        );
    }
}
