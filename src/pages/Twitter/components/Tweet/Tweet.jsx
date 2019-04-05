import React from 'react';
import PropTypes from "prop-types";

import classes from "./Tweet.css";

export function Tweet(props) {
    const {tweet} = props;

    return (
        <div className={classes.tweet}>
            <div className={classes.tweet_profile_image}>
                <img src={tweet.user.profile_image_url} alt={"Profile image"} />
            </div>
            <div className={classes.tweet_body}>
                {tweet.text}
            </div>
        </div>
    );
}

Tweet.propTypes = {
    tweet: PropTypes.object.isRequired,
};
