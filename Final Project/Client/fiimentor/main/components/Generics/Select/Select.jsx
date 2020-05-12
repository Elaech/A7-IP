import { FieldProps } from 'formik';
import React, { CSSProperties, FC } from 'react';
import { default as ReactSelect } from 'react-select/';
import { FormFeedback, FormGroup, Label } from 'reactstrap';


import { SelectOption } from './SelectOption';

interface Props extends FieldProps {
    index: number;
    label: string;
    groupOptions: boolean;
    parentOptions: boolean;
    isMulti: boolean;
    closeMenuOnSelect: boolean;
    errorMessage: string;
    options: SelectOption[];
    onChange?: any;
    groupClassName?: string;
    inputClassName?: string;
    placeholder?: string;
}


export const Select: FC<Props> = (props: Props) => {
    const {
        options,
        label,
        groupOptions,
        parentOptions,
        isMulti,
        closeMenuOnSelect,
        errorMessage,
        groupClassName,
        inputClassName,
        field: { name, onBlur, value },
        form: { touched, errors, setFieldValue, initialValues, values },
        placeholder,
    } = props;

    const customStyles = {
        control: (provided: CSSProperties, state: any) => {
            const red = '#dc3545';
            const blue = '#80bdff';
            const grey = '#ced4da';
            const shadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';

            const isInvalid: boolean = !!(touched[name] && errors[name]);

            const borderColor = isInvalid ? red : state.isFocused ? blue : grey;

            const borderColorHover = isInvalid ? red : state.isFocused ? blue : grey;

            const boxShadow = isInvalid
                ? 'none'
                : state.isFocused
                    ? shadow
                    : provided.boxShadow;

            return {
                ...provided,
                borderColor,
                boxShadow,
                '&:hover': {
                    borderColor: borderColorHover,
                },
            };
        },
    };

    const toOption = (o: SelectOption): SelectOption => ({
        ...o,
        label: o.label || o.name,
        parentName: o.parentName,
        value: o.name,
    });

    const toGroup = (opts: SelectOption[]) => (o: SelectOption) => {
        return {
            label: o.label || o.name,
            options: SelectOption.children(o, opts).map(toOption),
        };
    };

    const makeOptions = () => {
        if (parentOptions) {
            const parents: SelectOption[] = SelectOption.parents(options);
            if (groupOptions) {
                return [
                    ...parents
                        .filter(parent => !SelectOption.hasChildren(parent, options))
                        .map(toOption),
                    ...parents
                        .filter(parent => SelectOption.hasChildren(parent, options))
                        .map(toGroup(options)),
                ];
            }
            return parents.map(toOption);
        }
        return options.map(toOption);
    };

    const makeDefaultOptions = () => {
        const initialValue = initialValues[name];
        if (isMulti) {
            if (parentOptions) {
                const parents: SelectOption[] = SelectOption.parents(initialValue);
                if (groupOptions) {
                    return [
                        ...parents
                            .filter(parent => !SelectOption.hasChildren(parent, initialValue))
                            .map(toOption),
                        ...parents
                            .filter(parent => SelectOption.hasChildren(parent, initialValue))
                            .map(parent => SelectOption.children(parent, initialValue))
                            .flat()
                            .map(toOption),
                    ];
                }
                return parents.map(toOption);
            }
            return initialValue.map(toOption);
        }
        return initialValue;
    };

    const handleChange = (selectedOptions) => {
        if (selectedOptions) {
            if (isMulti) {
                const newSelectedOptions: SelectOption[] = [];

                selectedOptions.forEach((o: SelectOption) => {
                    newSelectedOptions.push(o);

                    if (o.parentName) {
                        const parent: SelectOption | undefined = SelectOption.find(
                            o.parentName,
                            options,
                        );

                        if (parent && !SelectOption.find(parent.name, newSelectedOptions)) {
                            newSelectedOptions.push(parent);
                        }
                    }
                });
                setFieldValue(name, newSelectedOptions);
            } else {
                setFieldValue(name, selectedOptions);
            }
        } else {
            setFieldValue(name, []);
        }
    };

    const getValue = (): SelectOption | undefined => {
        if (isMulti) {
            return value.map(toOption);
        }
        return value ? toOption(value) : undefined;
    };

    return (
        <FormGroup className={groupClassName}>
            <Label for={name}>{label}</Label>
            <ReactSelect
                value={getValue()}
                className={inputClassName}
                id={name}
                name={name}
                styles={customStyles}
                placeholder={placeholder || 'Selectati'}
                options={makeOptions()}
                onChange={handleChange}
                onBlur={onBlur}
                defaultValue={makeDefaultOptions()}
                isMulti={isMulti}
                closeMenuOnSelect={closeMenuOnSelect || false}
            />
            {touched[name] && errors[name] && (
                <div className={`is-invalid form-control`}>&nbsp;</div>
            )}
            <FormFeedback>{errorMessage ? errorMessage : errors[name]}</FormFeedback>
        </FormGroup>
    );
};
