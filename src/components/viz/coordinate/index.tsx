import React from 'react';
import Chart from '../chart';

export default class Coordinate extends React.Component {
    render() {
        return (
            <div className="coordinates-container">
                <div className="axis y-axis gray-border">
                    <h3>Y 轴</h3>
                </div>
                <Chart />
                <div className="axis x-axis gray-border">
                    <h3>X 轴</h3>
                </div>
            </div>
        );
    }
}
