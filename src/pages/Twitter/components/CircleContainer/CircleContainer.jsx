import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {Circle} from "../Circle/Circle.jsx";
import "./CircleContainer.css";
import PropTypes from "prop-types";

export function CircleContainer(props) {
    const { tweets, onClickCallback } = props;

    return (
        <TransitionGroup
            component={"svg"}
            width={"500px"}
            height={"500px"}
        >
            {tweets.map((tweet) => {
                return (
                    <CSSTransition
                        key={tweet.id}
                        timeout={500}
                        classNames="circle"
                    >
                        <Circle key={tweet.id} tweet={tweet} onClickCallback={onClickCallback}/>
                    </CSSTransition>
                );
            })}
        </TransitionGroup>
    );
}

CircleContainer.propTypes = {
    tweets: PropTypes.array.isRequired,
    onClickCallback: PropTypes.func.isRequired,
};
