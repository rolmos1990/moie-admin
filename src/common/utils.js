import {BOOLEAN_STRING} from "./constants";
import React from "react";

export const BOOLEAN_STRING_OPTIONS = [
    {label: '-', value: null},
    {label: BOOLEAN_STRING.YES, value: true},
    {label: BOOLEAN_STRING.NO, value: false}
];

export const STATUS_OPTIONS = [
    {label: '-', value: null},
    {label: "Activo", value: true},
    {label: "Inactive", value: false}
];

export const isValidOption = (options, option) => {
    return options.filter(o => o.value !== null).map(o => o.value).includes(option);
};

export const isValidObject = (object) => {
    return undefined !== object && null !== object;
};

export const isValidString = (str) => {
    return isValidObject(str) && "" !== str;
};

export const priceFormat = (amount = 0, currency = "", decimalWithCommas = true) => {

    if (amount === 0 || amount === "" || amount === undefined) {
        return "0.00";
    }

    let amountRender = (parseFloat(amount).toFixed(2));
    if (decimalWithCommas) {
        amountRender = numberWithCommas(amountRender);
        amountRender = `${currency} ${amountRender}`;
    }
    return amountRender;
}

const numberWithCommas =(x) =>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}