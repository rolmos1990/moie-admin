import {BOOLEAN_STRING} from "./constants";
import React from "react";
import moment from "moment";
import {baseImagePath, baseImagePathNew} from "../helpers/api_helper";

export const BOOLEAN_STRING_OPTIONS = [
    {label: '-', value: null},
    {label: BOOLEAN_STRING.YES, value: true},
    {label: BOOLEAN_STRING.NO, value: false}
];

export const YES_NO_OPTIONS = [
    {label: '-', value: null},
    {label: 'Si', value: true},
    {label: 'No', value: false}
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

export const formatDate =(date) =>{
    try {
        return moment(date, moment.ISO_8601).format('DD-MM-YYYY HH:mm:ss');
    }catch (e){
        console.log(e)
    }
    return "";
}
export const formatDateToServer =(date) =>{
    try {
        return moment(date).format("YYYY-MM-DD[T]HH:mm:ss");
    }catch (e){
        console.log(e)
    }
    return "";
}

export const getImageByQuality = (imgData, quality) => {
    if(!imgData) return null;

    const path = imgData.path && imgData.path.includes('uploads') ? baseImagePathNew : baseImagePath;

    let result = imgData.path;
    if (!imgData.thumbs) {
        return `${path}${result}`;
    }
    try {
        const thumbs = JSON.parse(imgData.thumbs);
        if (thumbs[quality]) {
            result = thumbs[quality];
        }
    } catch (e) {
        console.log(e);
    }
    return `${path}${result}`;
}

export const getErrorMessage = (error) => {
    if (error.response) {
        return error.response.data?.error || "Se ha producido un error";
    } else {
        return "Se ha producido un error";
    }
}
export const parseJson = (data) => {
    let result = null;
    try {
        return JSON.parse(data)
    }catch (e){
        console.error('parseJson', e);
    }
    return result;
}
