import React from 'react';
import { GeomAttr } from '../types';

export default class GeomAttrList extends React.Component<
    {
        geomAttr: any;
        handleDropGeomAttr: any;
    },
    {}
> {
    handleDragOver(e: any) {
        e.preventDefault();
    }
    handleDrop(attr: GeomAttr) {
        this.props.handleDropGeomAttr(attr);
    }
    render() {
        const geomAttrs = Object.keys(this.props.geomAttr).map((key: string) => {
            return (
                <div
                    key={key}
                    className="geom-attr gray-border"
                    onDragOver={this.handleDragOver}
                    onDrop={this.handleDrop.bind(this, key)}
                >
                    {key}
                </div>
            );
        });
        return <div className="geom-attr-list">{geomAttrs}</div>;
    }
}
