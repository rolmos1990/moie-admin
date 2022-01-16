export const BOOLEAN_STRING = {
    YES: 'Si',
    NO: 'No'
}

export const STATUS = {
    ACTIVE: true,
    INACTIVE: false
};

export const STATUS_LIST = Object.keys(STATUS).map(s => ({label: [s], value: s}))

//FIELD OPTIONS GROUPS
export const GROUPS = {
    REFERENCE_KEY: 'REFERENCE_KEY',
    MATERIALS: 'MATERIALS',
    PROVIDERS: 'PROVIDERS',
    ORDERS_ORIGIN: 'ORDERS_ORIGIN',
    MAYORISTA_DISC: 'MAYORISTA_DISC',
    OP_GROUPS: 'GROUPS',
    CUSTOMER_OBSERVATIONS: 'CUSTOMER_OBSERVATIONS',
    ORDER_OBSERVATIONS: 'ORDER_OBSERVATIONS',
    TEMPLATE_MENTIONS: 'TEMPLATE_MENTIONS',
    BANKS: 'BANKS',
};
//FIELD OPTIONS NAMES
export const NAMES = {
    PRODUCT: 'PRODUCT',
};
export const COMMENT_ENTITIES = {
    CUSTOMER: 'customer',
    ORDER: 'order',
};

export const DELIVERY_TYPES = [
    {id: 1, name: "PREVIOUS_PAYMENT", label: "PREVIO PAGO"},
    {id: 2, name: "PAY_ONLY_DELIVERY", label: "PREVIO PAGO COD"},
    {id: 3, name: "CHARGE_ON_DELIVERY", label: "CONTRA PAGO"}
]

export const DELIVERY_METHODS_PAYMENT_TYPES = ['MENSAJERO'];

export const DELIVERY_METHODS = {
    INTERRAPIDISIMO: 'INTERRAPIDISIMO',
    MENSAJERO: 'MENSAJERO',
};
export const DELIVERY_METHODS_LIST = Object.keys(DELIVERY_METHODS).map((k,i) => ({label: DELIVERY_METHODS[k], value: i+1}));

export const PAYMENT_TYPES = {
    CASH: 'EFECTIVO',
    TRANSFER: 'TRANSFERENCIA',
};

export const PAYMENT_TYPES_LIST = Object.keys(PAYMENT_TYPES).map(k => ({label: PAYMENT_TYPES[k], value: PAYMENT_TYPES[k]}));


export const ORDER_STATUS = {
    1: {name: 'Pendiente', color:'danger', colorCss: "#f44336"},
    2: {name: 'Confirmada', color:'success', colorCss: "#4caf50"},
    3: {name: 'Impresa', color:'warning', colorCss: "#ffeb3b"},
    4: {name: 'Enviada', color:'warning', colorCss: "#ffeb3b"},
    5: {name: 'Conciliada', color:'info', colorCss: "#2196f3"},
    6: {name: 'Anulada', color:'info', colorCss: "#2196f3"},
};

export const OFFICE_STATUS = {
    1: {name: 'Pendiente', color: 'warning', colorCss: "#ffeb3b"},
    2: {name: 'Finalizada', color: 'success', colorCss: "#4caf50"},
    3: {name: 'Cancelada', color: 'danger', colorCss: "#2196f3"}
};

export const ORDER_STATUS_LIST = Object.keys(ORDER_STATUS).map(s => ({label: ORDER_STATUS[s].name, value: s}))
export const OFFICE_STATUS_LIST = Object.keys(OFFICE_STATUS).map(s => ({label: OFFICE_STATUS[s].name, value: s}))

export const DELIVERY_TYPES_LIST = Object.keys(DELIVERY_TYPES).map(s => ({label: DELIVERY_TYPES[s].label, value: s}))

export const REPORT_TYPES = {
    BILLS: 'BILLS',
    CONCILIATION: 'CONCILIATION',
    POST_SALE: 'POST_SALE',
    OFFICE: 'OFFICE',
};

export const BILL_STATUS = {
    PENDING: 'Pendiente',
    SENT: 'Enviada'
};

export const BILL_MEMO_TYPES = {
    INVOICE: 'InvoiceType',
    CREDIT: 'CreditNoteType',
    DEBIT: 'DebitNoteType'
};

export const PAYMENT_FORMS = {
    DEPOSIT: 'Consignación',
    BANK_TRANSFER: 'Transferencia bancaria',
};
export const PAYMENT_FORMS_LIST = Object.keys(PAYMENT_FORMS).map(s => ({label: PAYMENT_FORMS[s], value: PAYMENT_FORMS[s]}))

export const BANKS = {
"Nequi": 'Nequi',
"Daviplata": 'Daviplata',
"Aportes en Linea": 'Aportes en Línea',
"Asopagos": 'Asopagos',
"Banco Agrario de Colombia": 'Banco Agrario de Colombia',
"Banco AV Villas": 'Banco AV Villas',
"Banco BBVA": 'Banco BBVA',
"Banco BCSC": 'Banco BCSC',
"Banco Citibank": 'Banco Citibank',
"Banco Compartir": 'Banco Compartir',
"Banco Coopcentral": 'Banco Coopcentral',
"Banco Credifinanciera S.A.C.F": 'Banco Credifinanciera S.A.C.F',
"Banco Davivienda": 'Banco Davivienda',
"Banco de Bogotá": 'Banco de Bogotá',
"Banco de la República": 'Banco de la República',
"Banco de Occidente": 'Banco de Occidente',
"Banco Falabella": 'Banco Falabella',
"Banco Finandina": 'Banco Finandina',
"Banco GNB Sudameris": 'Banco GNB Sudameris',
"Banco Itaú Corpbanca Colombia S.A.": 'Banco Itaú Corpbanca Colombia S.A.',
"Banco Multibank S.A.": 'Banco Multibank S.A.',
"Banco Mundo mujer": 'Banco Mundo mujer',
"Banco Pichincha": 'Banco Pichincha',
"Banco Popular": 'Banco Popular',
"Banco Santander de Negocios Colombia S.A.": 'Banco Santander de Negocios Colombia S.A.',
"Banco Serfinanza": 'Banco Serfinanza',
"Bancoldex": 'Bancoldex',
"Bancolombia": 'Bancolombia',
"Bancoomeva": 'Bancoomeva',
"BNP Paribas": 'BNP Paribas',
"Coltefinanciera": 'Coltefinanciera',
"Compensar": 'Compensar',
"Confiar Cooperativa Financiera": 'Confiar Cooperativa Financiera',
"Cooperativa Financiera Cotrafa": 'Cooperativa Financiera Cotrafa',
"Cooperativa Financiera de Antioquia": 'Cooperativa Financiera de Antioquia',
"Deceval": 'Deceval',
"Dirección del Tesoro Nacional": 'Dirección del Tesoro Nacional',
"Dirección del Tesoro Nacional- Regalias": 'Dirección del Tesoro Nacional- Regalias',
"Enlace Operativo S.A.": 'Enlace Operativo S.A.',
"Fedecajas": 'Fedecajas',
"Financiera Juriscoop": 'Financiera Juriscoop',
"Jp Morgan": 'Jp Morgan',
"Red Multibanca Colpatria": 'Red Multibanca Colpatria',
"Simple S.A.": 'Simple S.A.',
"Otro": 'Otro'
};
export const BANKS_LIST = Object.keys(BANKS).map(s => ({label: BANKS[s], value: BANKS[s]}))

export const OFFICE_REPORT_TYPES = {
    PREVIO_PAGO: 'PREVIO_PAGO',
    MENSAJERO: 'MENSAJERO',
};
export const OFFICE_REPORT_TYPE_LIST = Object.keys(OFFICE_REPORT_TYPES).map(s => ({label: OFFICE_REPORT_TYPES[s], value: OFFICE_REPORT_TYPES[s]}))
