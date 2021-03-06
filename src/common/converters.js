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
export const arrayToOptionsByFieldName = (array, fieldName) => {
    return array.filter(item => item[fieldName] && item[fieldName] !== '').map(item => ({
        label: item[fieldName],
        value: item.id
    }));
}
export const getEmptyOptions = () => {
    return {label: '-', value: null};
}
export const normalizeColumnsList = (columns) => {
    return columns.filter(r => !r.hidden).map(r =>({text: r.text, dataField: r.dataField, sort: r.sort, formatter: r.formatter}));
}

export const buildOptions =(options)=>{
    let opts = [...options];
    opts.unshift(getEmptyOptions());
    opts = opts.reduce((acc,item)=>{
        if(!acc.some(i => i.value === item.value)){
            acc.push(item);
        }
        return acc;
    },[])
    return opts;
}