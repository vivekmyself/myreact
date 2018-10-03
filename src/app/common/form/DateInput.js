import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateInput = ({
  placeholder,
  input: { value, onChange, onBlur, ...restOfInput },
  width,
  meta: { touched, error },
  ...restData
}) => {
  if(value){
    value = moment(value, 'X')
  }
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...restData}
        placeholder={placeholder}
        selected={value ? moment(value) : null}
        onChange={onChange}
        onBlur={() => onBlur()}
        {...restOfInput}
      />
      {touched &&
        error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
    </Form.Field>
  );
};

export default DateInput;
