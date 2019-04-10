import React from 'react';
import { Color } from '../types';
import GeomTypeSelector from './geom-type-selector';
import GeomAttrList from './geom-attr-list';
import { GeomAttrValueList } from './geom-attr-value-list';

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
            <div className="geom gray-border">
                <h3>GEOM</h3>
                <GeomTypeSelector
                    geomTypeOptions={this.props.geomTypeOptions}
                    geomType={this.props.geomType}
                    onGeomTypeChange={this.props.onGeomTypeChange}
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
        );
    }
}
