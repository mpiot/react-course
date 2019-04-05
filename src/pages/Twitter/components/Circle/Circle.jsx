import React from 'react';
import PropTypes from "prop-types";

export function Circle(props) {
    const { tweet, onClickCallback } = props;

    return <circle cx={tweet.circle.x} cy={tweet.circle.y} r={tweet.circle.r} fill={tweet.circle.color} onClick={() => onClickCallback(tweet)}/>;
}

Circle.propTypes = {
    tweet: PropTypes.any.isRequired,
    onClickCallback: PropTypes.func.isRequired,
};
