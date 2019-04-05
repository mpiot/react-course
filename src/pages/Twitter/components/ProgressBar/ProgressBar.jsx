import React from 'react';
import PropTypes from "prop-types";

import classes from './ProgressBar.css';

export function ProgressBar(props) {
    const { title, percent } = props;

    return (
        <div className={classes.container}>
            <span className={classes.title}>{title}:</span>
            <div className={classes.progressbar}>
                <span>{percent}%</span>
                <div style={{ width: percent+"%" }}></div>
            </div>
        </div>
    );
}

ProgressBar.propTypes = {
    title: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired,
};
