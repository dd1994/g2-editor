import React from 'react';
import { Field, GeomAttr } from '../types';
import GeomAttrValueItem from './geom-attr-value-item';

export class GeomAttrValueList extends React.Component<
    {
        geomAttr: any;
        handleGeomAttrDropdown: any;
        getFieldColor: any;
    },
    {}
> {
    handleGeomAttrDropdown = ({ key }: { key: string }) => {
        // 这里用 JSON 也是无奈之举，因为 key 的类型只能是 number | string | undefined
        this.props.handleGeomAttrDropdown(JSON.parse(key));
    };

    render() {
        const geomAttrValue = Object.keys(this.props.geomAttr).reduce(
            (acc: any, attr: GeomAttr) => {
                return acc.concat(
                    this.props.geomAttr[attr].map((val: Field) => {
                        return (
                            <GeomAttrValueItem
                                key={attr + val}
                                attr={attr}
                                val={val}
                                handleGeomAttrDropdown={this.props.handleGeomAttrDropdown}
                                getFieldColor={this.props.getFieldColor}
                            />
                        );
                    })
                );
            },
            []
        );
        return <ul className="geom-attr-value">{geomAttrValue}</ul>;
    }
}
