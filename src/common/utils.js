import {BOOLEAN_STRING} from "./constants";
import React from "react";
import moment from "moment";
import {baseImagePath, baseImagePathNew} from "../helpers/api_helper";
import {showMessage} from "../components/MessageToast/ShowToastMessages";

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

export const buildNumericOptions = (qty, sk=1, start=0) => {
    const valueList = [];
    for (let i = start; i <= qty;) {
        valueList.push({label: i, value: i});
        i+= sk;
    }
    return valueList;
}

//REF: https://komsciguy.com/js/a-better-way-to-copy-text-to-clipboard-in-javascript/
export const  copyToClipboard =(text)=> {
    const listener = function(ev) {
        ev.preventDefault();
        ev.clipboardData.setData('text/plain', text);
        showMessage.success("Copiado");
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
}

export const printPartOfPage=(htmlToPrint) => {
    const iframeId = new Date().getTime();
    let pri
    if (document.getElementById(iframeId)) {
        pri = document.getElementById(iframeId).contentWindow
    } else {
        const iframe = document.createElement('iframe')
        iframe.setAttribute('title', iframeId)
        iframe.setAttribute('id', iframeId)
        iframe.setAttribute('style', 'height: 0px; width: 0px; position: absolute;')
        document.body.appendChild(iframe)
        pri = iframe.contentWindow
    }
    pri.document.open()
    pri.document.write(htmlToPrint)
    pri.document.close()
    pri.focus()
    pri.print()
}

export const threeDots = (text, length) => {
    if (text.trim().length > length) {
        return text.trim().substr(0, length).trim() + "...";
    }
    return text;
}
export const sortArray = (a,b, asc) => {
    if(a === b){
        return 0;
    }
    if(asc){
        return a.id < b.id ? -1:1
    }
    return a.id > b.id ? 1:-1
}