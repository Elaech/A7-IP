import { ArrayHelpers, FieldArray, FormikProps } from 'formik';
import React, { FC } from 'react';

import {SelectOption} from './SelectOption';
import {Select} from './Select';

interface Props {
    name: string;
    parentLabel?: string;
    childLabel?: string;
    allOptions: SelectOption[];
    options: SelectOption[];
    formikProps: FormikProps<any>;
    placeholder?: string;
}

export const OptionsSelect: FC<Props> = (props: Props) => {
    const { allOptions, options, formikProps, placeholder } = props;

    const parentLabel = props.parentLabel || '';
    const childLabel = props.childLabel || '';

    const handleChange = (helpers: ArrayHelpers) => (
        selectedOption: SelectOption,
        selectedIndex: number,
    ) => {
        let length = options.length;

        while (length > selectedIndex + 1) {
            helpers.remove(length - 1);
            length -= 1;
        }

        if (SelectOption.hasChildren(selectedOption, allOptions)) {
            helpers.push(
                SelectOption.create({
                    parentName: selectedOption.name,
                }),
            );
        }
    };

    const getOptions = (currentOption: SelectOption): SelectOption[] => {
        if (currentOption.parentName) {
            const parent = SelectOption.find(currentOption.parentName, allOptions);
            if (parent) {
                return SelectOption.children(parent, allOptions);
            }
            return [];
        }
        return SelectOption.parents(allOptions);
    };

    return (
        <>
            <FieldArray
                name="categories"
                render={(helpers: ArrayHelpers) => {
                    return options.map((currentOption: SelectOption, index: number) => (
                        <Select
                            key={index}
                            index={index}
                            label={currentOption.parentName ? childLabel : parentLabel}
                            name={`categories.${index}`}
                            value={currentOption}
                            placeholder={placeholder}
                            options={getOptions(currentOption)}
                            formikProps={formikProps}
                            onChange={handleChange(helpers)}
                        />
                    ));
                }}
            />
        </>
    );
};
