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
  disabled?: boolean;
}

export const TextAreaInput: FC<Props> = (props: Props) => {
  const {
    label,
    placeholder,
    field,
    groupClassName,
    disabled,
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
        type="text"
        className={inputClassName}
        placeholder={placeholder}
        variant="filled"
      />
      <FormHelperText error>
        {errors[name]}
      </FormHelperText>
    </FormGroup>
  );
};