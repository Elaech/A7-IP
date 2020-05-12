import { FieldProps } from 'formik';
import React, { FC } from 'react';
import {
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

import {labelStyle, TextStyle} from '../RegisterFormComponents/RegisterFormStyles';
import { FormGroupContainer } from '../LoginFormComponents/LoginFormStyles';

interface Props extends FieldProps {
  name: string;
  label: string;
  placeholder?: string;
  groupClassName?: string;
  inputClassName?: string;
  disabled?:boolean;
  helperText?:string;
}


export const TextInput: FC<Props> = (props: Props) => {
  const {
    label,
    placeholder,
    field,
    disabled,
    groupClassName,
    helperText,
    form: { errors },
  } = props;

  const { name } = field;

  return (
    <FormGroupContainer className={groupClassName}>
      <InputLabel style={labelStyle}> {label}</InputLabel>
      <TextStyle
        {...field}
        id={name}
        type="text"
        placeholder={placeholder}
        variant="outlined"
        disabled={disabled}
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
