import React from 'react';
import red from '@material-ui/core/colors/red';
import Checkbox from '@material-ui/core/Checkbox';
import { ValidatorComponent } from 'react-material-ui-form-validator';
 
const red300 = red['500'];
 
const style = {
    right: 0,
    fontSize: '12px',
    color: red300,
    position: 'absolute',

};
 
class CheckboxValidatorElement extends ValidatorComponent {
 
    render() {
        const { errorMessages, validators, requiredError, value, ...rest } = this.props;
 
        return (
            <div>
                <Checkbox
                    {...rest}
                    ref={(r) => { this.input = r; }}
                />
                {this.errorText()}
            </div>
        );
    }
 
    errorText() {
        const { isValid } = this.state;
 
        if (isValid) {
            return null;
        }
 
        return (
            <div style={style}>
                {this.getErrorMessage()}
            </div>
        );
    }
}
 
export default CheckboxValidatorElement;