import {STATUS} from "./constants";

export const ConverterStatus = (status) => {
    switch (status) {
        case STATUS.ACTIVE:
            return 'Activo';
        default:
            return 'Inactivo';
    }
}

export const statesToOptions = (states) => {
    return states.map(item => ({
        label: item.name,
        value: item.id
    }));
}
export const arrayToOptions = (array) => {
    return array.map(item => ({
        label: item.name,
        value: item.id
    }));
}
export const getEmptyOptions = () => {
    return {label: '-', value: null};
}
export const normalizeColumnsList = (columns) => {
    return columns.filter(r => !r.hidden).map(r =>({text: r.text, dataField: r.dataField, sort: r.sort, formatter: r.formatter}));
}