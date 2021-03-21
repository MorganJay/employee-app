import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class EditDepartmentModal extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const body = {
      "DepartmentId": event.target.DepartmentId.value,
      "DepartmentName": JSON.stringify(event.target.DepartmentName.value)
    };

    console.log(body);

    fetch(process.env.REACT_APP_API + 'departments/' + this.props.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        "DepartmentId": event.target.DepartmentId.value,
        "DepartmentName": JSON.stringify(event.target.DepartmentName.value)
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.errors) {
          alert('See the log for details');
          console.log(result);
        } else {
          alert('Updated Department Successfully');
          event.target.DepartmentName.value = '';
        }
      })
      .catch(err => alert('Failed. See the log for details' + err));
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
