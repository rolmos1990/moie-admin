export const BOOLEAN_STRING = {
    YES: 'Si',
    NO: 'No'
}

export const STATUS = {
    ACTIVE: true,
    INACTIVE: false
};


//FIELD OPTIONS GROUPS
export const GROUPS = {
    REFERENCE_KEY: 'REFERENCE_KEY',
    MATERIALS: 'MATERIALS',
    PROVIDERS: 'PROVIDERS',
    ORDERS_ORIGIN: 'ORDERS_ORIGIN',
    MAYORISTA_DISC: 'MAYORISTA_DISC',
};
//FIELD OPTIONS NAMES
export const NAMES = {
    PRODUCT: 'PRODUCT',
};

export const DELIVERY_TYPES = [
    {id: 1, name: "PREVIOUS_PAYMENT", label: "PREVIO PAGO"},
    {id: 2, name: "PAY_ONLY_DELIVERY", label: "PREVIO PAGO COD"},
    {id: 3, name: "CHARGE_ON_DELIVERY", label: "CONTRA ENTREGA"}
]

export const DELIVERY_METHODS_PAYMENT_TYPES = ['MENSAJERO'];

export const PAYMENT_TYPES = {
    CASH: 'EFECTIVO',
    TRANSFER: 'TRANSFERENCIA',
};

export const ORDER_STATUS = {
    1: {name: 'Pendiente', color:'danger'},
    2: {name: 'Confirmado', color:'success'},
    3: {name: 'impreso', color:'warning'},
    4: {name: 'enviado', color:'warning'},
    5: {name: 'conciliado', color:'blue'},//conciliado no se permiten cambios
    6: {name: 'anulado', color:'blue'},
};
