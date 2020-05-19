import {SelectOption} from '../Generics/Select/SelectOption';

export const options1: SelectOption[] = [
    { name: 'Profesori', label: 'Profesori', value: 'Profesori' },
    { name: 'Grup', label: 'Grup', value: 'Grup' },
    { name: 'Toti utilizatorii', label: 'Toti utilizatorii', value: 'Toti utilizatorii' },
];

export const options21: SelectOption[] = [
    { name: 'Profesor', label: 'Profesor', value: 'Profesor', parentName: 'Profesori' },
    { name: 'Tutore', label: 'Tutore', value: 'Tutore', parentName: 'Profesori' },
    { name: 'Toti profesorii', label: 'Toti profesorii', value: 'Toti profesorii', parentName: 'Profesori' },
];

export const options22: SelectOption[] = [

    { name: 'Grup Mentorat', label: 'Grup Mentorat', value: 'Grup Mentorat', parentName: 'Grup' },
    {name: 'Grup Facultate', label:'Grup Facultate', value: 'Grup Facultate', parentName: 'Grup'},

];

export const options321: SelectOption[] = [
    { name: '1', label: '1', value: '1', parentName: 'An' },
    { name: '2', label: '2', value: '2', parentName: 'An' },
    { name: '3', label: '3', value: '3', parentName: 'An' },
];

export const options322: SelectOption[] = [
    { name: 'A', label: 'A', value: 'A', parentName: 'Litera' },
    { name: 'B', label: 'B', value: 'B', parentName: 'Litera' },
    { name: 'E', label: 'E', value: 'E', parentName: 'Litera' },
];

export const options333: SelectOption[] = [
    { name: '1', label: '1', value: '1', parentName: 'Numar' },
    { name: '2', label: '2', value: '2', parentName: 'Numar' },
    { name: '3', label: '3', value: '3', parentName: 'Numar' },
    { name: '4', label: '4', value: '4', parentName: 'Numar' },
    { name: '5', label: '5', value: '5', parentName: 'Numar' },
    { name: '6', label: '6', value: '6', parentName: 'Numar' },
    { name: '7', label: '7', value: '7', parentName: 'Numar' },

]
