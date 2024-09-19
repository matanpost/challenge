import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

const token = "f367504ef2fffa79a37801440abbfebcba58490996746d040ac679ce1cf31b8fd31a97e79dcddcd9f81b930c95ddf7248b533004c610f52de6d63a6ea17aa580875582ef8ad8897a0220cc9fbed43f2d62bbe56f618dcb13a8e82c68057dcd7c4e6d8bf3934ff12fd10ae1cfe135ca265ce0c0b8dcc2d1bfdb8dd6b35f43174c"

export const fetchPrograms = async () => {
  const response = await axios.get(`${API_URL}/programs?populate=*`);
  return response.data.data;
};

export const fetchProgramById = async (id: string) => {
  const response = await axios.get(`${API_URL}/programs/${id}?populate=*`);
  return response.data.data;
};

export const fetchModules = async () => {
  const response = await axios.get(`${API_URL}/modules`);
  return response.data.data;
};

export const createProgram = async (data: any) => {
  return axios.post(`${API_URL}/programs`, { data });
};
