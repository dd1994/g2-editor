import Dimension from './dimensions';
import Measure from './measures';
import React from 'react';

export default class Data extends React.Component<{ dimensions: Array<string>; measures: Array<string> }, {}> {
    render() {
        return (
            <div className="data gray-border">
                <Dimension dimensions={this.props.dimensions} />
                <Measure measures={this.props.measures} />
            </div>
        );
    }
}
