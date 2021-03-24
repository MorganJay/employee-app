import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class EditDepartmentModal extends Component {
  state = {
    name: this.props.name
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const department = {
      departmentId: this.props.id,
      departmentName: this.state.name
    };

    const request = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(department)
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_API + 'departments/' + this.props.id,
        request
      );
      if (!response.ok) {
        alert('Error. See the log for details');
        const responseBody = await response.json();
        console.log(responseBody);
      } else {
        alert('Updated Department Successfully');
      }
    } catch (error) {
      alert('Error. See the log for details');
      console.log(error);
    }
  };

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Department
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DepartmentId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentId"
                      required
                      disabled
                      defaultValue={this.props.id}
                    />
                  </Form.Group>

                  <Form.Group controlId="DepartmentName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      required
                      placeholder="Name of Department"
                      defaultValue={this.props.name}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditDepartmentModal;
