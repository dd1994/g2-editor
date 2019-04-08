import React from 'react';
import { Tag } from 'antd';

export default class Dimensions extends React.Component<{ dimensions: Array<string> }, {}> {
    render() {
        const dimensionItems = this.props.dimensions.map((item: string) => {
            return (
                <li key={item}>
                    <Tag color="blue">{item}</Tag>
                </li>
            );
        });

        return (
            <div>
                <h3>Dimensions</h3>
                {dimensionItems}
            </div>
        );
    }
}
