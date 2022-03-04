import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <div>
        <Row className='temp'>
          <Col className='text-cenetr py-3 '>
            <h5>UnitedStates | English(US) | $(USD)</h5>
          </Col>
          <>
            <Col className='text-cenetr py-3 col col-lg-2'>
              Copyright &copy;
            </Col>
            <Col className='text-cenetr py-3 '>Terms of Use</Col>
            <Col className='text-cenetr py-3 '>Privacy</Col>
            <Col className='text-cenetr py-3 '>Internet-based-ads</Col>
          </>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
