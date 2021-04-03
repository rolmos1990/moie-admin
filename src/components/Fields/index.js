import InputSearchField from "./InputSearchField";
import InputSwitchField from "./InputSwitchField";
import {TextField, EmailField, NumberField} from './InputTextField';
import InputDate from "./InputDate";
import InputPhoneField from "./InputPhoneField";

const FieldSelect = InputSearchField;
const FieldSwitch = InputSwitchField;
const FieldText = TextField;
const FieldNumber = NumberField;
const FieldEmail = EmailField;
const FieldDate = InputDate;
const FieldPhone = InputPhoneField;

export {
    FieldSwitch,
    FieldSelect,
    FieldText,
    FieldNumber,
    FieldEmail,
    FieldDate,
    FieldPhone
};
