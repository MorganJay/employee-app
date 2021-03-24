import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

class AddEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      EmployeeName: '',
      Department: '',
      DateEmployed: ''
    };
  }
  
  PhotoFileName= 'anonymous.png';
  imageSrc= process.env.REACT_APP_PHOTO_PATH + this.PhotoFileName;
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getDepartments = () => {
    fetch(process.env.REACT_APP_API + 'departments')
      .then(res => res.json())
      .then(data => this.setState({ departments: data }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getDepartments();
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { EmployeeName, Department, DateEmployed } = this.state;

    const employeeDetails = {
      EmployeeName: EmployeeName,
      Department: Department,
      DateEmployed: DateEmployed,
      PhotoFileName: this.state.PhotoFileName
    };

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employeeDetails)
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_API + 'Employees',
        request
      );
      if (!response.ok) {
        alert('Error. See the log for details');
        const responseBody = await response.json();
        console.log(responseBody);
      } else {
        alert('Added Employee Successfully');
        // this.PhotoFileName = 'anonymous.png';
      }
    } catch (error) {
      alert('Error. See the log for details');
      console.log(error);
    }
  };

  handleFileUpload = async event => {
    event.preventDefault();
    this.PhotoFileName = event.target.files[0].name;
    const formData = new FormData();
    formData.append(
      'myFile',
      event.target.files[0],
      event.target.files[0].name
    );

    const request = {
      method: 'POST',
      body: formData
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_API + 'Employees/SaveFile',
        request
      );
      const responseBody = await response.json();
      if (!response.ok) {
        alert('Error. See the log for details');
      } else {
        this.imageSrc = process.env.REACT_APP_PHOTO_PATH + responseBody;
      }
    } catch (error) {
      console.log(error);
    }
    this.PhotoFileName = 'anonymous.png';
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
              Add Employee
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="EmployeeName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeName"
                      required
                      placeholder="Name of Employee"
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="Department"
                      onChange={this.handleChange}
                    >
                      <option>Select Department</option>
                      {this.state.departments.map(
                        ({ departmentName, departmentId }) => (
                          <option value={departmentName} key={departmentId}>
                            {departmentName}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="DateEmployed">
                    <Form.Label>Date Employed</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateEmployed"
                      required
                      placeholder="Employment Date"
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

              <Col sm={6} className="mt-3">
                <div
                  className="container"
                  style={{ maxHeight: '200px', maxWidth: '200px' }}
                >
                  <Image
                    width="100%"
                    height="auto"
                    className="mb-4"
                    src={this.imageSrc}
                  />
                </div>
                <input type="file" onChange={this.handleFileUpload} />
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

export default AddEmployeeModal;
