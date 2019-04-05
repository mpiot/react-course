import React from 'react';
import openSocket from 'socket.io-client';
import {Doughnut, HorizontalBar} from 'react-chartjs-2';

import {CircleContainer} from "./components/CircleContainer/CircleContainer.jsx";
import {ProgressBar} from "./components/ProgressBar/ProgressBar.jsx";
import {Tweet} from "./components/Tweet/Tweet.jsx";

import classes from "./Twitter.css";

export class Twitter extends React.Component {
    constructor(props) {
        super(props);

        const colorsStr = localStorage.getItem("colors") || '[]';
        this.colors = JSON.parse(colorsStr);

        this.state = {
            tweets: [],
            lastTweet: null,
            reTweetNumber: 0,
            numberTweets: 0,
            numberHashTags: 0,
            numberLinks: 0,
            numberMentions: 0,
            numberReTweet: 0,
            clickedTweet: null,
            time: 0,
        };

        const urls = [
            '10.136.9.164:3001',
            '10.136.12.168:3001',
            '10.136.13.134:3000',
            '10.152.20.157:3000',
            '10.136.19.175:3000',
            '10.152.22.30:3000',
            '10.136.10.144:3000',
            '10.136.9.147:3000',
            '10.136.10.144:3000',
        ];

        this.sockets = urls.map(url => {
            const socket = openSocket(url);
            socket.on('tweet', this.onNewTweet);
            return socket;
        });

        setInterval(() => {
            this.setState(state => ({
                time: state.time + 1
            }));
        }, 1000);

        // Batch treatment
        // 20 each 200 ms
        const batchNumber = 20;
        const batchTime = 200;
        this.tempTweets = [];
        setInterval(() => {
            let temp = [];
            for (let i = 0; i < this.tempTweets.length; i++) {
                if (i < batchNumber) {
                    this.tempTweets.shift();
                    temp  = [...temp, this.tempTweets[i]];
                }

                break;
            }

            this.treatTweet(temp);
        }, batchTime);
    }

    componentWillUnmount = () => {
        this.sockets.forEach(socket => socket.disconnect());
    };

    onNewTweet = (tweet) => {
        this.tempTweets = [...this.tempTweets, tweet];
    };

    treatTweet = (tweets) => {
        tweets.map((tweet) => {
            const r = this.defineCircleSize(tweet);

            tweet.circle = {
                r: r,
                x: Math.floor(Math.random() * (500 - r*2) + r),
                y: Math.floor(Math.random() * (500 - r*2) + r),
                color: this.colors.length > 0 ? this.colors[Math.floor(Math.random() * this.colors.length)].hex : "#000000",
            };

            this.setState(state => ({
                tweets: [...state.tweets.slice(-19), tweet],
                lastTweet: tweet,
                numberTweets: state.numberTweets + 1,
                numberMentions: state.numberMentions + (tweet.entities.user_mentions.length > 0 ? 1 : 0),
                numberHashTags: state.numberHashTags + (tweet.entities.hashtags.length > 0 ? 1 : 0),
                numberLinks: state.numberLinks + (tweet.entities.urls.length > 0 ? 1 : 0),
                numberReTweet: state.numberReTweet + (tweet.retweeted_status ? 1 : 0),
            }));
        })
    };

    defineCircleSize(tweet) {
        let size = 10;

        if (!tweet.retweeted_status) {
            return size;
        }

        const count = tweet.retweeted_status.retweet_count;

        if (count > 0 && count < 10) {
            size = 15;
        } else if (count > 10 && count < 50) {
            size = 20;
        } else if(count > 50) {
            size = 25;
        }

        return size;
    }

    calculatePercent() {
        const {numberTweets, numberHashTags, numberLinks, numberMentions, numberReTweet} = this.state;

        return {
            hashTags: Math.floor(numberHashTags / numberTweets * 100) || 0,
            links: Math.floor(numberLinks / numberTweets * 100) || 0,
            mentions: Math.floor(numberMentions / numberTweets * 100) || 0,
            reTweet: Math.floor(numberReTweet / numberTweets * 100) || 0,
        };
    }

    displayTweet = (tweet) => {
        this.setState({
            clickedTweet: tweet,
        });
    };

    render() {
        const {tweets, lastTweet, clickedTweet, numberTweets, numberReTweet, numberMentions, numberLinks, numberHashTags, time} = this.state;
        const percent = this.calculatePercent();
        const reTweetData = {
            datasets: [{
                data: [numberTweets - numberReTweet, numberReTweet],
                backgroundColor: ["rgba(74, 144, 226, 0.5)", "rgba(5, 214, 119, 0.5)"],
            }],
            labels: [
                'Tweet',
                'ReTweet',
            ]
        };
        const numbersData = {
            datasets: [{
                data: [numberMentions, numberHashTags, numberLinks],
                backgroundColor: ["rgba(76, 245, 204, 0.5)", "rgba(76, 186, 245, 0.5)", "rgba(0, 29, 185, 0.5)"],
                borderColor: ["rgba(76, 245, 204, 0.9)", "rgba(76, 186, 245, 0.9)", "rgba(0, 29, 185, 0.9)"],
                borderWidth: 2,
            }],
            labels: [
                'Mentions',
                'HashTags',
                'Links',
            ],
        };
        const minutes = Math.floor(time/60) || 0;
        const seconds = time%60 || 0;

        return (
            <div className={classes.row}>
                <div className={classes.col}>
                    <CircleContainer tweets={tweets} onClickCallback={this.displayTweet} />
                </div>

                <div className={classes.col}>
                    <div className={classes.row}>
                        <div className={classes.col}>
                            <ProgressBar title={"Mentions"} percent={percent.mentions}/>
                            <ProgressBar title={"HashTags"} percent={percent.hashTags}/>
                        </div>

                        <div className={classes.col}>
                            <ProgressBar title={"Links"} percent={percent.links}/>
                            <ProgressBar title={"Re-Tweet"} percent={percent.reTweet}/>
                        </div>
                    </div>

                    <div className={classes.row}>
                        <div className={classes.col}>
                            <Doughnut data={reTweetData} />
                        </div>

                        <div className={classes.col}>
                            <HorizontalBar data={numbersData} options={{
                                legend: {
                                    display: false
                                },
                                scales: {
                                    xAxes: [{
                                        ticks: {
                                            suggestedMax: 10,
                                            suggestedMin: 0
                                        }
                                    }],
                                }
                            }} />
                        </div>
                    </div>

                    <div className={classes.row}>
                        <div className={classes.col}>
                            <div className={classes.card}>
                                <div className={classes.card_title}>Total Tweets</div>
                                <div className={classes.card_value}>{numberTweets}</div>
                            </div>
                        </div>

                        <div className={classes.col}>
                            <div className={classes.card}>
                                <div className={classes.card_title}>Tweet / min</div>
                                <div className={classes.card_value}>{Math.floor(numberTweets / time * 60) || 0}</div>
                            </div>
                        </div>

                        <div className={classes.col}>
                            <div className={classes.card}>
                                <div className={classes.card_title}>Time</div>
                                <div className={classes.card_value}>{minutes}' {seconds}"</div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.row}>
                        <div className={classes.col}>
                            {lastTweet && <Tweet tweet={lastTweet}/>}
                        </div>

                        <div className={classes.col}>
                            {clickedTweet && <Tweet tweet={clickedTweet}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
