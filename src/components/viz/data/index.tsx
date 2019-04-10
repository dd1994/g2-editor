import Dimension from './dimensions';
import Measure from './measures';
import React from 'react';
import { Divider } from 'antd';

export default class Data extends React.Component<
    { dimensions: Array<string>; measures: Array<string>; setDragItem: any },
    {}
> {
    render() {
        return (
            <div className="data">
                <Dimension
                    dimensions={this.props.dimensions}
                    setDragItem={this.props.setDragItem}
                />
                <Divider />
                <Measure measures={this.props.measures} setDragItem={this.props.setDragItem} />
            </div>
        );
    }
}
