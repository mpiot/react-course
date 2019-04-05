import React from 'react';
import { Count } from "../../components/Count/Count.jsx";
import classes from './DemoCount.css';

export class DemoCount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count1: 0,
            count2: 0
        };

        this.onChangeCount1 = this.onChangeCount1.bind(this);
        this.onChangeCount2 = this.onChangeCount2.bind(this);
    }

    onChangeCount1(count1) {
        this.setState({ count1 });
    }

    onChangeCount2(count2) {
        this.setState({ count2 });
    }

    render() {
        const { count1, count2 } = this.state;
        return (
            <div className={classes["demo-count-container"]}>
                <div>Total: {count1 + count2}</div>
                <Count count={count1} onChange={this.onChangeCount1} />
                <Count count={count2} onChange={this.onChangeCount2} />
            </div>
        );
    }
}
