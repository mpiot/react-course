import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './ColorList.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export class ColorList extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        onDeleteColor: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            filter: ''
        };
    }

    onChangeFilter = (event) => {
        const { value } = event.target;

        this.setState({
            filter: value,
        });
    };

    filterColor = (color) => {
        const {filter} = this.state;

        if ('' === filter) {
            return color;
        } else {
            const regex = new RegExp(filter,"gi");
            return (color.name.match(regex) || color.hex.match(regex)) ? color : null;
        }
    };

    render() {
        const {list, onDeleteColor} = this.props;
        const {filter} = this.state;

        return (
            <div className={classes.container}>
                <input type={"text"} value={filter} onChange={this.onChangeFilter}/>
                <ul>
                    <TransitionGroup className="color-list">
                        {list.filter(this.filterColor).map((color) => (
                            <CSSTransition
                                key={color.key}
                                timeout={500}
                                classNames="item"
                            >
                                <li style={{color: color.hex}}>
                                    <Link to={"/color/" + color.key } className="link" style={{color: color.hex}}>
                                        {color.personalizedName || color.name}: {color.hex}
                                    </Link>
                                    <FontAwesomeIcon icon="trash" onClick={() => onDeleteColor(color)} />
                                </li>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ul>
            </div>
        );
    }
}
