import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import AddDepartmentModal from './AddDepartmentModal';
import EditDepartmentModal from './EditDepartmentModal';

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      modalOpen: false,
      editModalOpen: false,
      id: '',
      name: ''
    };
  }

  closeModal = () => {
    this.setState({ modalOpen: false, editModalOpen: false });
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

  componentDidUpdate() {
    this.getDepartments();
  }

  deleteDepartment = id => {
    const request = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (window.confirm('Are you sure?')) {
      fetch(
        process.env.REACT_APP_API + 'departments/' + id,
        request
      ).catch(err => console.log(err));
    }
  };

  render() {
    const { departments, modalOpen, editModalOpen, id, name } = this.state;
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(({ departmentId, departmentName }) => (
              <tr key={departmentId}>
                <td>{departmentId}</td>
                <td>{departmentName}</td>
                <td className="d-flex justify-content-center">
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalOpen: true,
                          id: departmentId,
                          name: departmentName
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteDepartment(departmentId)}
                    >
                      Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ modalOpen: true })}
          >
            Add Department
          </Button>
        </ButtonToolbar>
        <AddDepartmentModal show={modalOpen} onHide={this.closeModal} />
        <EditDepartmentModal
          show={editModalOpen}
          onHide={this.closeModal}
          id={id}
          name={name}
        />
      </div>
    );
  }
}

export default Department;
