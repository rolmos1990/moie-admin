import InputSearchField from "./InputSearchField";
import InputSwitchField from "./InputSwitchField";
import {EmailField, NumberField, TextField} from './InputTextField';
import InputDate from "./InputDate";
import InputPhoneField from "./InputPhoneField";
import InputAsyncSearchField from "./InputAsyncSearchField";

const FieldAsyncSelect = InputAsyncSearchField;
const FieldSelect = InputSearchField;
const FieldSwitch = InputSwitchField;
const FieldText = TextField;
const FieldNumber = NumberField;
const FieldEmail = EmailField;
const FieldDate = InputDate;
const FieldPhone = InputPhoneField;

export {
    FieldSwitch,
    FieldAsyncSelect,
    FieldSelect,
    FieldText,
    FieldNumber,
    FieldEmail,
    FieldDate,
    FieldPhone
};
