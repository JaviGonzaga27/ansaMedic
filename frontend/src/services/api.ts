import axios from 'axios';
import { Product, CreateProductInput, UpdateProductInput } from '../types/product';
import { Order, CreateOrderInput } from '../types/order';
import { User, CreateUserInput, LoginCredentials } from '../types/user';
import { ApiResponse, PaginatedResponse } from '../types/api';
import { AuthToken } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Productos
export const getProducts = async (): Promise<PaginatedResponse<Product>> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductById = async (id: string): Promise<ApiResponse<Product>> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: CreateProductInput): Promise<ApiResponse<Product>> => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: string, product: UpdateProductInput): Promise<ApiResponse<Product>> => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Pedidos
export const createOrder = async (order: CreateOrderInput): Promise<ApiResponse<Order>> => {
  const response = await api.post('/orders', order);
  return response.data;
};

export const getOrders = async (): Promise<PaginatedResponse<Order>> => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrderById = async (id: string): Promise<ApiResponse<Order>> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Usuarios
export const registerUser = async (user: CreateUserInput): Promise<ApiResponse<User>> => {
  const response = await api.post('/users/register', user);
  return response.data;
};

export const loginUser = async (credentials: LoginCredentials): Promise<ApiResponse<AuthToken>> => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  const response = await api.get('/users/me');
  return response.data;
};

// Función para manejar errores
export const handleApiError = (error: any): never => {
  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    console.error('API Error:', error.response.data);
    throw new Error(error.response.data.message || 'An error occurred with the API');
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    console.error('No response received:', error.request);
    throw new Error('No response received from the server');
  } else {
    // Algo sucedió en la configuración de la petición que provocó un error
    console.error('Error setting up the request:', error.message);
    throw new Error('Error setting up the request');
  }
};

export default api;