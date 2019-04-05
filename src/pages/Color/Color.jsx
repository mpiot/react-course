import React from 'react';
import {SketchPicker} from 'react-color';
import {ColorList} from "../../components/ColorList/ColorList.jsx";
import classes from './Color.css';

const API = 'http://www.thecolorapi.com/id?hex=';

export class Color extends React.Component {
    constructor(props) {
        super(props);

        const colorStr = localStorage.getItem("colors") || '[]';

        this.state = {
            selectedColor: '#ffffff',
            colors: JSON.parse(colorStr)
        };
    }

    handleChangeComplete = (color) => {
        this.setState({
            selectedColor: color.hex
        });
    };

    addColor = () => {
        // Get selected color
        const color = this.state.selectedColor;

        // Is the object already added
        let colors = this.state.colors;
        const exist = colors.find((el) => el.key === color.substr(1));

        if (exist) {
            alert('Already in...');
            return;
        }

        // Retrieve info on color
        fetch(API + color.substr(1))
            .then(response => response.json())
            .then(data => {
                const colorObj = {
                    key: color.substr(1),
                    hex: color,
                    name: data.name.value,
                    img: data.image.bare
                };

                this.setState({
                    colors: [...colors, colorObj]
                });
            });
    };

    removeColor = (el) => {
        const colors = this.state.colors.filter((color) => color.key !== el.key);

        this.setState({
           colors
        });
    };

    componentDidUpdate = () => {
        localStorage.setItem("colors", JSON.stringify(this.state.colors));
    };

    render() {
        const { colors } = this.state;

        return (
            <div className={classes.row}>
                <div>
                    <SketchPicker
                        color={ this.state.selectedColor }
                        onChangeComplete={ this.handleChangeComplete }
                    />
                    <button onClick={this.addColor} className={classes.btn}>Add</button>
                </div>

                <div>
                    <ColorList list={colors} onDeleteColor={this.removeColor} />
                </div>
            </div>
        );
    }
}
