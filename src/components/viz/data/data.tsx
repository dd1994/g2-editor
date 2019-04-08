import Dimension from './dimensions';
import Measure from './measures';
import React from 'react';

export default class Data extends React.Component {
    render() {
        return (
            <div className="data">
                <Dimension />
                <Measure />
            </div>
        );
    }
}
