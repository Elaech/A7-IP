import { FieldProps } from 'formik';
import React, { FC } from 'react';
import {
  TextField,
  FormGroup,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import styled from 'styled-components';
import { FormGroupContainer, labelStyle, TextInput } from '../LoginFormComponents/LoginFormStyles';

interface Props extends FieldProps {
  name: string;
  label: string;
  placeholder?: string;
  groupClassName?: string;
  inputClassName?: string;
  helperText?:string;
}

export const EmailInput: FC<Props> = (props: Props) => {
  const {
    label,
    placeholder,
    field,
    groupClassName,
    inputClassName,
    helperText,
    form: { errors },
  } = props;

  const { name } = field;

  return (
    <FormGroupContainer className = {groupClassName}>
      <InputLabel style={labelStyle}>{label}</InputLabel>
      <TextInput
        {...field}
        id = {name}
        type = "email"
        className = {inputClassName}
        placeholder = {placeholder}
        variant = "outlined"
      />
       <FormHelperText >
        {helperText}
      </FormHelperText>
      <FormHelperText error>
        {errors[name]}
      </FormHelperText>
    </FormGroupContainer>
  );
};
