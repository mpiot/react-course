import React from 'react';

import classes from "./Memory.css";
import {Card} from "./components/Card/Card.jsx";

export class Memory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbols: [1, 2, 3, 4, 5, 6],
            cards: [],
            discoveredCards: [],
            nbAttempt: 0,
        };

        this.start();
    }

    start() {
        const {symbols} = this.state;

        let finalCards = [];
        let cards = symbols.concat(symbols);

        cards = this.shuffle(cards);
        cards.map((symbol) => {
            finalCards.push({
                symbol,
                hidden: true,
                complete: false
            })
        });

        this.state.nbAttempt = 0;
        this.state.cards = finalCards;
    };

    shuffle(givenArray) {
        let array = givenArray;

        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    handleClick(card, index) {
        const {cards, discoveredCards} = this.state;

        let dicoveredCard = {
            card,
            index
        };

        // Do not handle check if there is already 2 cards selected
        if(discoveredCards.length < 2 && card.hidden === true) {
            cards[index].hidden = false;
            discoveredCards.push(dicoveredCard);

            this.setState({
                discoveredCards: discoveredCards,
                cards: cards
            });

            if (discoveredCards.length === 2) {
                setTimeout(() => {
                    this.check()
                }, 800)
            }
        }
    }

    check() {
        const {cards, discoveredCards} = this.state;

        if(discoveredCards[0].card.symbol === discoveredCards[1].card.symbol){
            cards[discoveredCards[0].index].complete = true;
            cards[discoveredCards[1].index].complete = true;
        }else {
            cards[discoveredCards[0].index].hidden = true;
            cards[discoveredCards[1].index].hidden = true;
        }

        this.setState(state => ({
            cards,
            discoveredCards: [],
            nbAttempt: state.nbAttempt + 1
        }));
    }

    render() {
        const {nbAttempt} = this.state;

        return (
            <div>
                <p className={classes.attempts}>Attempts: {nbAttempt}</p>
                <div className={classes.playground}>
                    {
                        this.state.cards.map((card, index) => {
                            return <Card key={index} symbol={card.symbol} click={() => {this.handleClick(card, index)}} hidden={card.hidden} />
                        })
                    }
                </div>
            </div>
        )
    }
}
