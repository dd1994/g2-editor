import React from 'react';
import { Tag } from 'antd';

export default class Measure extends React.Component<{ measures: Array<string>; setDragItem: any }, {}> {
    handleDragStart = (item: string, e: any) => {
        this.props.setDragItem(item);
    };
    render() {
        const measureItems = this.props.measures.map((item: string) => {
            return (
                <li draggable key={item} onDragStart={this.handleDragStart.bind(this, item)}>
                    <Tag color="green">{item}</Tag>
                </li>
            );
        });

        return (
            <div className="measures">
                <h3>Measures</h3>
                <ul>{measureItems}</ul>
            </div>
        );
    }
}
