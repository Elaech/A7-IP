import { FieldProps } from 'formik';
import React, { CSSProperties, FC } from 'react';
import {
  FormGroup,
  FormControlLabel,
  FormHelperText
} from '@material-ui/core';

import { CheckBox } from '@material-ui/icons';

interface Props extends FieldProps {
  label: string;
  groupClassName?: string;
  inputClassName?: string;
}


const checkBoxStyles: CSSProperties = {
  marginLeft:' 0.5rem',
};

export const Checkbox: FC<Props> = (props: Props) => {
  const {
    field,
    form: { touched, errors },
    label,
    groupClassName,
    inputClassName,
  } = props;

  return (
    <FormGroup className={groupClassName}>
      <FormControlLabel
        {...field}
        control={<CheckBox color="primary" style={checkBoxStyles}/>}
        label={label}
        labelPlacement="end"
        className={inputClassName}
        id={field.name}
        checked={field.value}
      />
      <FormHelperText>
        {errors[field.name]}
      </FormHelperText>
    </FormGroup>
  );
};