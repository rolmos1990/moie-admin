export const CUSTOMER_STATUS = {
    ACTIVE: true,
    INACTIVE: false
};

export const ConverterCustomerStatus = (status) => {
    switch(status) {
        case CUSTOMER_STATUS.ACTIVE:
            return 'Activo';
            break;
        default:
            return 'Inactivo';
    }
}
