import React from 'react';
import red from '@material-ui/core/colors/red';
import Checkbox from '@material-ui/core/Checkbox';
import { ValidatorComponent } from 'react-material-ui-form-validator';
 
/**
 * Component used in the forms to check if "I agree" is checked
 * @author Prabhdeep Singh
 */
const red300 = red['500'];
 
const style = {
    right: 0,
    fontSize: '12px',
    color: red300,

};
 
/**
 * This class will show the error when checkbox is left empty upon submission
 * @author Prabhdeep Singh
 */
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
        
        // Does nothing if checkbox is checked
        if (isValid) {
            return null;
        }
 
        // Shows error message if checkbox is not checked
        return (
            <div style={style}>
                {this.getErrorMessage()}
            </div>
        );
    }
}
 
export default CheckboxValidatorElement;