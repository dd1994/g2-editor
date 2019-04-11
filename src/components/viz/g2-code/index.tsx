import React from 'react';
import './prism.css';

export default class G2Code extends React.Component<
    {
        code: string;
    },
    {}
> {
    render() {
        return (
            <div className="g2-code">
                <pre>
                    <code className="lang-javascript">{this.props.code}</code>
                </pre>
            </div>
        );
    }
}
