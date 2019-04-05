import React from 'react';
import classNames from 'classnames/bind';

import classes from "./Card.css";
let cx = classNames.bind(classes);

export function Card(props) {
    const {symbol, click, hidden} = props;
    const cardClasses = cx({
        card: true,
        visible: !hidden
    });

    return (
        <div className={cardClasses} onClick={() => click()}>
            <div className={classes.inner}>
                <div className={classes.front}>
                    ?
                </div>

                <div className={classes.back}>
                    { symbol }
                </div>
            </div>
        </div>
    )
}
