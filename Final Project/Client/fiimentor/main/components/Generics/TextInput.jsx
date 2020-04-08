import { FieldProps } from 'formik';
import React, { FC, CSSProperties } from 'react';
import {
  TextField,
  FormGroup,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import styled from 'styled-components';


interface Props extends FieldProps {
  name: string;
  label: string;
  placeholder?: string;
  groupClassName?: string;
  inputClassName?: string;
  disabled?:boolean;
}

 const TextInputStyle: CSSProperties = {
  backgroundColor:'#F3F9FB',
  marginTop:'1.5%',  
};



export const TextInput: FC<Props> = (props: Props) => {
  const {
    label,
    placeholder,
    field,
    disabled,
    groupClassName,
    inputClassName,
    form: { errors },
  } = props;

  const { name } = field;

  return (
    <FormGroup className={groupClassName}>
      <InputLabel> {label}</InputLabel>
      <TextField 
        {...field}
        id={name}
        type="text"
        style={TextInputStyle}
        className={inputClassName}
        placeholder={placeholder}
        variant="outlined"
        disabled={disabled}
      />
      <FormHelperText error>
        {errors[name]}
      </FormHelperText>
    </FormGroup>
  );
};