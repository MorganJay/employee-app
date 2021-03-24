import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import dateFormat from 'dateformat';

import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      addModalOpen: false,
      editModalOpen: false,
      id: '',
      name: '',
      department: '',
      photoFileName: '',
      dateEmployed: ''
    };
  }

  closeModal = () => {
    this.setState({ addModalOpen: false, editModalOpen: false });
  };

  formatDate = date => {
    return dateFormat(date, 'dd/mm/yyyy');
  };

  getEmployees = () => {
    fetch(process.env.REACT_APP_API + 'Employees')
      .then(res => res.json())
      .then(data => this.setState({ employees: data }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getEmployees();
  }

  deleteEmployee = id => {
    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'Employees/' + id, request).catch(err =>
        console.log(err)
      );
    }
  };

  render() {
    const {
      employees,
      addModalOpen,
      editModalOpen,
      id,
      name,
      department,
      photoFileName,
      dateEmployed
    } = this.state;
    //const date = Date.toString()
    // console.log(date);
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Date Employed</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(
              ({
                employeeId,
                employeeName,
                department,
                dateEmployed,
                photoFileName
              }) => (
                <tr key={employeeId}>
                  <td>{employeeId}</td>
                  <td>{employeeName}</td>
                  <td>{department}</td>
                  <td>{this.formatDate(dateEmployed)}</td>
                  <td className="d-flex justify-content-center">
                    <ButtonToolbar>
                      <Button
                        className="mr-2"
                        variant="info"
                        onClick={() =>
                          this.setState({
                            editModalOpen: true,
                            id: employeeId,
                            name: employeeName,
                            department,
                            dateEmployed,
                            photoFileName
                          })
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={() => this.deleteEmployee(employeeId)}
                      >
                        Delete
                      </Button>
                    </ButtonToolbar>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalOpen: true })}
          >
            Add Employee
          </Button>
        </ButtonToolbar>

        <AddEmployeeModal show={addModalOpen} onHide={this.closeModal} />

        <EditEmployeeModal
          show={editModalOpen}
          onHide={this.closeModal}
          id={id}
          name={name}
          department={department}
          date_employed={dateEmployed.slice(0, 10)}
          photo_file_name={photoFileName}
        />
      </div>
    );
  }
}

export default Employee;
