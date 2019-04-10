import React from 'react';
import { Color, AxisType, Field } from '../types';
import GeomTypeSelector from './geom-type-selector';
import GeomAttrList from './geom-attr-list';
import { GeomAttrValueList } from './geom-attr-value-list';
import CoordinateSelector from './coordinate-selector';
import AdjustTypeSelector from './adjust-type-selector';
import Axis from '../axis/index';

export default class Geom extends React.Component<
    {
        geomTypeOptions: any;
        geomType: string;
        onGeomTypeChange: any;
        geomAttr: any;
        handleDropGeomAttr: any;
        dimensions: Array<string>;
        measures: Array<string>;
        handleGeomAttrDropdown: any;
        handleCoordinateTypeChange: any;
        handleAdjustTypeChange: any;

        yAxis: Array<Field>;
        xAxis: Array<Field>;
        dragItem: Field;
        handleDropY: any;
        handleDropX: any;
        handleAxisDropdown: any;
    },
    any
> {
    handleDragOver(e: any) {
        e.preventDefault();
    }
    getFieldColor = (attr: string) => {
        return this.props.dimensions.includes(attr) ? Color.blue : Color.green;
    };

    handleDrop = (attr: string) => {
        this.props.handleDropGeomAttr(attr);
    };

    handleGeomAttrDropdown = ({ key }: { key: string }) => {
        // 这里用 JSON 也是无奈之举，因为 key 的类型只能是 number | string | undefined
        this.props.handleGeomAttrDropdown(JSON.parse(key));
    };

    render() {
        return (
            <div className="map">
                <Axis
                    axisType={AxisType.x}
                    axis={this.props.xAxis}
                    dimensions={this.props.dimensions}
                    dragItem={this.props.dragItem}
                    handleDrop={this.props.handleDropX}
                    handleAxisDropdown={this.props.handleAxisDropdown}
                />
                <Axis
                    axisType={AxisType.y}
                    axis={this.props.yAxis}
                    dimensions={this.props.dimensions}
                    dragItem={this.props.dragItem}
                    handleDrop={this.props.handleDropY}
                    handleAxisDropdown={this.props.handleAxisDropdown}
                />
                <div className="geom">
                    <h3>GEOM</h3>
                    <GeomTypeSelector
                        geomTypeOptions={this.props.geomTypeOptions}
                        geomType={this.props.geomType}
                        onGeomTypeChange={this.props.onGeomTypeChange}
                    />
                    <CoordinateSelector
                        handleCoordinateTypeChange={this.props.handleCoordinateTypeChange}
                    />
                    <AdjustTypeSelector
                        handleAdjustTypeChange={this.props.handleAdjustTypeChange}
                    />
                    <GeomAttrList
                        geomAttr={this.props.geomAttr}
                        handleDropGeomAttr={this.props.handleDropGeomAttr}
                    />
                    <GeomAttrValueList
                        geomAttr={this.props.geomAttr}
                        handleGeomAttrDropdown={this.props.handleGeomAttrDropdown}
                        getFieldColor={this.getFieldColor}
                    />
                </div>
            </div>
        );
    }
}
