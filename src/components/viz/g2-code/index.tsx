import React from 'react';
import Prism from 'prismjs';
import './prism.css';

export default class G2Code extends React.Component {
    componentDidMount() {
        Prism.highlightAll();
    }

    render() {
        return (
            <div className="g2-code">
                <pre>
                    <code className="lang-javascript">console.log('h')</code>
                </pre>
            </div>
        );
    }
}
