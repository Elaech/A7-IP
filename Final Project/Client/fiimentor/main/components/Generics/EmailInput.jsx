import { FieldProps } from 'formik';
import React, { FC } from 'react';
import {
  FormGroup,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import styled from 'styled-components';

import { TextStyle, labelStyle } from '../RegisterFormComponents/RegisterFormStyles';

interface Props extends FieldProps {
  name: string;
  label: string;
  placeholder?: string;
  groupClassName?: string;
  inputClassName?: string;
}

const EmailInputStyle: CSSProperties = {
  backgroundColor:'#F3F9FB',
  marginTop:'1.5%',
  
};

export const EmailInput: FC<Props> = (props: Props) => {
  const {
    label,
    placeholder,
    field,
    groupClassName,
    inputClassName,
    form: { errors },
  } = props;

  const { name } = field;

  return (
    <FormGroup className={groupClassName}>
      <InputLabel style={labelStyle}>{label}</InputLabel>
      <TextStyle
        {...field}
        id={name}
        style={EmailInputStyle}
        type="email"
        className={inputClassName}
        placeholder={placeholder}
        variant="outlined"
      />
      <FormHelperText error>
        {errors[name]}
      </FormHelperText>
    </FormGroup>
  );
};