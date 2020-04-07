import { FieldProps } from 'formik';
import React, { FC } from 'react';
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
}

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
      <InputLabel>{label}</InputLabel>
      <TextField
        {...field}
        id={name}
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
