import React from 'react';
import classes from './ColorShow.css';

export class ColorShow extends React.Component {
    constructor(props) {
        super(props);

        const colorStr = localStorage.getItem("colors") || '[]';
        const colors = JSON.parse(colorStr);

        this.state = {
            colors,
            color: colors.find(color => {
                return color.key === this.props.match.params.key
            })
        };
    }

    onChangeName = (event) => {
        const { value } = event.target;
        const { colors, color } = this.state;

        const newColor = {...color, personalizedName: value};
        const newColors = colors.map((el) => {
            if (el.key === color.key) {
                return newColor;
            }

            return el;
        });

        this.setState({
            color: newColor,
            colors: newColors
        }, () => {console.log(this.state)});
    };

    componentDidUpdate = () => {
        localStorage.setItem("colors", JSON.stringify(this.state.colors));
    };

    render() {
        const { color } = this.state;

        return (
            <div className={classes.row}>
                <div>
                    <img src={color.img} alt={color.name}/>
                </div>

                <div className={classes.infos}>
                    Name: {color.name}<br/>
                    Personalized Name: <input type={"text"} value={color.personalizedName} onChange={this.onChangeName} /><br/>
                    Hex: {color.hex}
                </div>
            </div>
        );
    }
}
