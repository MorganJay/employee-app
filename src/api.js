import axios from 'axios';

export const departmentApi = axios.create({
  baseURL: process.env.REACT_APP_API + 'departments'
});

export const employeeApi = axios.create({
  baseURL: process.env.REACT_APP_API + 'employees'
});
