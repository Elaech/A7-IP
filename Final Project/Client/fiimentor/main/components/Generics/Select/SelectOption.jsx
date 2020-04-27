export class SelectOption {
    static create(partial: Partial<SelectOption> = {}) {
        return new SelectOption(partial);
    }

    static find(name: string, options: SelectOption[]): SelectOption | undefined {
        return options.find((t: SelectOption) => t.name === name);
    }
    static parents(options: SelectOption[] = []): SelectOption[] {
        return options.filter((t: SelectOption) => !t.parentName);
    }

    static children(
        option: SelectOption,
        options: SelectOption[],
    ): SelectOption[] {
        return options.filter((c: SelectOption) => c.parentName === option.name);
    }

    static hasChildren(option: SelectOption, options: SelectOption[]): boolean {
        const children = SelectOption.children(option, options);
        return children.length > 0;
    }

    name: string;
    label: string;
    parentName: ?string;
    value: ?any;

    constructor(partial: Partial<SelectOption>) {
        const { label, name, parentName } = partial;

        this.name = name || '';
        this.label = label || '';
        this.parentName = parentName;
    }
}
