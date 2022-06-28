import React from "react"
import Conditionals from "../../../common/conditionals";

const getDeliveryType = (_type = "") => {
    if(_type == 1){
        return "Contado";
    } else if(_type == 2){
        return "Contado - AlCobro";
    } else if(_type == 3){
        return "AlCobro";
    }

    return _type;
}
const localityColumns = (onDelete = false) => {
    const cols = [
        {
            text: "Nombre",
            dataField: "name",
            sort: true,
            filter: true,
            filterType: "text",
            filterCondition: Conditionals.OPERATORS.LIKE,
        },
        {
            text: "Forma de Pago",
            dataField: "deliveryType",
            sort: true,
            filter: true,
            filterType: "text",
            formatter: (cellContent, item) => (
                <div>
                    {getDeliveryType(item.deliveryType)}
                </div>
            ),
        },
        {
            text: "Tiempo de Entrega",
            dataField: "timeInDays",
            sort: true,
            filter: true,
            filterType: "text"
        },
        {
            text: "Primer Kilo",
            dataField: "priceFirstKilo",
            sort: true,
            filter: true,
            filterType: "text"
        },
        {
            text: "Kilo Adicional",
            dataField: "priceAdditionalKilo",
            sort: true,
            filter: true,
            filterType: "text"
        },
    ]

    return cols;
}

export default localityColumns;
