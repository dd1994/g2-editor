import React from 'react';
import { Tag } from 'antd';

export default class Dimensions extends React.Component<{ dimensions: Array<string>; setDragItem: any }, {}> {
    handleDragStart = (item: string, e: any) => {
        this.props.setDragItem(item);
    };
    render() {
        const dimensionItems = this.props.dimensions.map((item: string) => {
            return (
                <li draggable key={item} onDragStart={this.handleDragStart.bind(this, item)}>
                    <Tag color="blue">{item}</Tag>
                </li>
            );
        });

        return (
            <div className="dimensions">
                <h3>Dimensions</h3>
                <ul>{dimensionItems}</ul>
            </div>
        );
    }
}
