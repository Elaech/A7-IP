import { FieldProps } from 'formik';
import React, { FC, CSSProperties } from 'react';
import {
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

import { TextStyle, labelStyle } from '../RegisterFormComponents/RegisterFormStyles';
import { FormGroupContainer } from '../LoginFormComponents/LoginFormStyles';

interface Props extends FieldProps {
  name: string;
  label: string;
  placeholder?: string;
  groupClassName?: string;
  inputClassName?: string;
  disabled?:boolean;
}



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
    <FormGroupContainer className={groupClassName}>
      <InputLabel style={labelStyle}> {label}</InputLabel>
      <TextStyle
        {...field}
        id={name}
        type="text"
        className={inputClassName}
        placeholder={placeholder}
        variant="outlined"
        disabled={disabled}
      />
      <FormHelperText error>
        {errors[name]}
      </FormHelperText>
    </FormGroupContainer>
  );
};
