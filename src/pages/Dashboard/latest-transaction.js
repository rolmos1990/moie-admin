import React from "react"
import { Card, CardBody, Table, CardTitle, Label ,Input ,Row, Col, Button} from "reactstrap"
import { Link } from "react-router-dom"

const LatestTransaction = () => {
    return (
        <Row>
            <Col lg={12}>
                <Card>
                    <CardBody>
                        <CardTitle className="h4 mb-4">Pedidos Retrazados</CardTitle>
                        <div className="table-responsive">
                            <Table className="table-centered table-nowrap mb-0">
                                <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>Estado</th>
                                    <th>Metodo de Envio</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><Link to="#" className="text-body fw-bold">#MB2540</Link> </td>
                                    <td>Ramon Olmos</td>
                                    <td>
                                        16 Mar, 2021
                                    </td>
                                    <td>
                                        $400
                                    </td>
                                    <td>
                                        <span className="badge rounded-pill bg-soft-danger font-size-12">Reservado</span>
                                    </td>
                                    <td>
                                        Interrapidismo
                                    </td>
                                    <td>

                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                            <i className={"mdi mdi-magnify"}></i>
                                        </Button>
                                    </td>
                                </tr>

                                <tr>
                                    <td><Link to="#" className="text-body fw-bold">#MB2541</Link> </td>
                                    <td>Ramon Olmos</td>
                                    <td>
                                        16 Mar, 2021
                                    </td>
                                    <td>
                                        $380
                                    </td>
                                    <td>
                                        <span className="badge rounded-pill bg-soft-danger font-size-12">Reservado</span>
                                    </td>
                                    <td>
                                       Interrapidismo
                                    </td>
                                    <td>

                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                            <i className={"mdi mdi-magnify"}></i>
                                        </Button>
                                    </td>
                                </tr>

                                <tr>
                                    <td><Link to="#" className="text-body fw-bold">#MB2542</Link> </td>
                                    <td>Ramon Olmos</td>
                                    <td>
                                        16 Mar, 2021
                                    </td>
                                    <td>
                                        $384
                                    </td>
                                    <td>
                                        <span className="badge rounded-pill bg-soft-danger font-size-12">Reservado</span>
                                    </td>
                                    <td>
                                        Interrapidismo
                                    </td>
                                    <td>
                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                            <i className={"mdi mdi-magnify"}></i>
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><Link to="#" className="text-body fw-bold">#MB2543</Link> </td>
                                    <td>Ramon Olmos</td>
                                    <td>
                                        16 Mar, 2021
                                    </td>
                                    <td>
                                        $412
                                    </td>
                                    <td>
                                        <span className="badge rounded-pill bg-soft-danger font-size-12">Reservado</span>
                                    </td>
                                    <td>
                                        Interrapidismo
                                    </td>
                                    <td>
                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                            <i className={"mdi mdi-magnify"}></i>
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><Link to="#" className="text-body fw-bold">#MB2544</Link> </td>
                                    <td>Ramon Olmos</td>
                                    <td>
                                        16 Mar, 2021
                                    </td>
                                    <td>
                                        $404
                                    </td>
                                    <td>
                                        <span className="badge rounded-pill bg-soft-danger font-size-12">Reservado</span>
                                    </td>
                                    <td>
                                        Interrapidismo
                                    </td>
                                    <td>
                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                            <i className={"mdi mdi-magnify"}></i>
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><Link to="#" className="text-body fw-bold">#MB2545</Link> </td>
                                    <td>Ramon Olmos</td>
                                    <td>
                                        16 Mar, 2021
                                    </td>
                                    <td>
                                        $392
                                    </td>
                                    <td>
                                        <span className="badge rounded-pill bg-soft-warning font-size-12">Impresa</span>
                                    </td>
                                    <td>
                                        Interrapidismo
                                    </td>
                                    <td>
                                        <Button type="button" color="primary" className="btn-sm btn-rounded waves-effect waves-light">
                                            <i className={"mdi mdi-magnify"}></i>
                                        </Button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default LatestTransaction
