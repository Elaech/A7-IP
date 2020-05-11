import {FieldProps} from 'formik';
import React, {FC} from 'react';
import {FormGroup, FormHelperText, InputLabel, TextareaAutosize} from '@material-ui/core';

import {labelStyle} from '../RegisterFormComponents/RegisterFormStyles';

const textAreaStyle = {
    background: 'none',
};

interface Props extends FieldProps {
    name: string;
    label: string;
    placeholder?: string;
    groupClassName?: string;
    inputClassName?: string;
    disabled?: boolean;
    helperText?:string;
}

export const TextAreaInput: FC<Props> = (props: Props) => {
    const {
        label,
        placeholder,
        field,
        groupClassName,
        helperText,
        form: {errors},
    } = props;

    const {name} = field;

    return (
        <FormGroup className={groupClassName}>
            <InputLabel style={labelStyle}>{label}</InputLabel>
            <TextareaAutosize
                {...field}
                id={name}
                style={textAreaStyle}
                placeholder={placeholder}
                variant="filled"
                rowsMin={6}
            />
             <FormHelperText >
              {helperText}
            </FormHelperText>
            <FormHelperText error>
                {errors[name]}
            </FormHelperText>
        </FormGroup>
    );
};
