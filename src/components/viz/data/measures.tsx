import React from 'react';
import { Tag, Button } from 'antd';

export default class Measure extends React.Component<
    { measures: Array<string>; setDragItem: any },
    {}
> {
    handleDragStart = (item: string, e: any) => {
        this.props.setDragItem(item);
    };
    render() {
        const measureItems = this.props.measures.map((item: string) => {
            return (
                <li
                    className="field-item"
                    draggable
                    key={item}
                    onDragStart={this.handleDragStart.bind(this, item)}
                >
                    <Button type="dashed" shape="round" size="small" block>
                        {item}
                    </Button>
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
