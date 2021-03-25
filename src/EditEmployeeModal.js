import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

class EditEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      EmployeeName: this.props.name,
      Department: this.props.department,
      DateEmployed: this.props.date_employed
    };
  }

  PhotoFileName = this.props.photo_file_name
    ? this.props.photo_file_name
    : 'anonymous.png';
  imageSrc = process.env.REACT_APP_PHOTO_PATH + this.PhotoFileName;

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value)
    this.setState({ [name]: value });
  };

  handleFileChange = event => {
    this.imageSrc =
      process.env.REACT_APP_PHOTO_PATH + event.target.files[0].name;

    console.log(this.imageSrc);
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
    console.log(this.state, 'state');
    const employee = {
      EmployeeId: this.props.id,
      EmployeeName: this.state.EmployeeName,
      Department: this.state.Department,
      DateEmployed: this.state.DateEmployed,
      PhotoFileName: this.props.photoFileName ? this.props.photoFileName : this.PhotoFileName
    };
    console.log(employee, 'employee');
    const request = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    };

    try {
      const response = await fetch(
        process.env.REACT_APP_API + 'employees/' + this.props.id,
        request
      );
      if (!response.ok) {
        alert('Error. See the log for details');
        const responseBody = await response.json();
        console.log(responseBody);
      } else {
        alert('Updated Employee Successfully');
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
    const { id, name, date_employed, department, onHide, show } = this.props;
    if (show) {
      console.log(this.props);
    }

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
              Edit Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="EmployeeId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeId"
                      disabled
                      defaultValue={id}
                    />
                  </Form.Group>

                  <Form.Group controlId="employeeName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeName"
                      required
                      placeholder="Name of employee"
                      defaultValue={name}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      as="select"
                      name="Department"
                      required
                      defaultValue={department}
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
                      defaultValue={date_employed}
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
                    className="mb-5"
                    src={this.imageSrc}
                    alt="Employee Picture"
                  />
                </div>
                <input
                  type="file"
                  onChange={this.handleFileChange}
                  //  value={photo_file_name}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditEmployeeModal;
