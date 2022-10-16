import React from "react"
import {Col, Row} from "reactstrap"
import FooterUsers from "./FooterUsers";
import CountUsers from "./CountUsers";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <CountUsers />
                {/*<Container fluid={true}>*/}
                <Row>
                    {/*<Col md={4} style={{display: 'flex', alignItems: 'center'}}> {new Date().getFullYear()} © Moie - <small>v2.0.1</small> </Col>*/}
                    <Col md={12} className='top-users-sales'>
                        <FooterUsers/>
                    </Col>
                </Row>
                {/*</Container>*/}
      </footer>
    </React.Fragment>
  )
}
export default Footer
