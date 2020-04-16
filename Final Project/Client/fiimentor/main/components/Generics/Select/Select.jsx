import { FormikProps } from 'formik';
import * as _ from 'lodash';
import React, { FC, FormEvent } from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

import { SelectOption } from './SelectOption';
import {labelStyle} from '../../RegisterFormComponents/RegisterFormStyles';

const inputStyles = {
  backgroundColor: `rgba(255, 255, 255, 0)`,
  border: `1px solid #000000`,
  width: `100%`,
  height: `2.5rem`,
    display: 'block',
    padding: '1rem',
    marginBottom: '1rem',

};

interface Props {
    index: number;
    label: string;
    name: string;
    value: SelectOption;
    options: SelectOption[];
    placeholder?: string;
    formikProps: FormikProps<any>;
    groupClassName?: string;
    inputClassName?: string;

    onChange(selectedCategory: SelectOption, selectedIndex: number): void;
}

export const Select: FC<Props> = (props: Props) => {
    const {
        index,
        label,
        name,
        value,
        options,
        groupClassName,
        inputClassName,
        formikProps: {
            setFieldValue,
            setFieldTouched,
            handleBlur,
            errors,
            touched,
            initialValues,
        },
        onChange,
        placeholder,
    } = props;

    const invalid = !!(
        _.get(errors, `contacts.[${index}]`) &&
        _.get(touched, `contacts.[${index}]`)
    );

    const errorMessage = _.get(errors, `contacts.[${index}].name`) || '';

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const emptyOption = SelectOption.create({
            parentName: value.parentName,
        });
        const option =
            options.find((o: SelectOption) => o.name === e.currentTarget.value) ||
            emptyOption;

        setFieldTouched(name, true);
        setFieldValue(name, option);

        onChange(option, index);
    };

    return (
        <FormGroup className={groupClassName}>
            <Label style={labelStyle}>{label}</Label>
            <Input
                type="select"
                id={name}
                name={name}
                style={inputStyles}
                invalid={invalid}
                value={value.name}
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={initialValues[name]}
            >
                <option value="">{placeholder || 'Please select'}</option>
                {options.map((o: SelectOption) => (
                    <option key={o.name} value={o.name}>
                        {o.label}
                    </option>
                ))}
            </Input>
            {invalid && <FormFeedback>{errorMessage}</FormFeedback>}
        </FormGroup>
    );
};
