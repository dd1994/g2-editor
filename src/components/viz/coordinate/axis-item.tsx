import React from 'react';
import { Tag, Dropdown, Icon, Menu } from 'antd';
import { Color, Axis, Field } from '../types';

export default class AxisItem extends React.Component<{ field: Field; axis: Axis; color: Color }, {}> {
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="#">移除</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <li key={this.props.axis}>
                <Tag color={this.props.color}>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            {this.props.field} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Tag>
            </li>
        );
    }
}
