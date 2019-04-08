import Dimension from './dimensions';
import Measure from './measures';
import React from 'react';

export default class Data extends React.Component {
    render() {
        const dimension = ['xx', 'uy'];
        const measure = ['n', 'y'];
        return (
            <div className="data gray-border">
                <Dimension dimensions={dimension} />
                <Measure measures={measure} />
            </div>
        );
    }
}
