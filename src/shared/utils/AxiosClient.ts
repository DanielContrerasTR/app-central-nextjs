import axios, { type Axios } from 'axios';

export const client: Axios = axios.create({ baseURL: process.env.NEXT_PUBLIC_APP_STORE_BASE_URL });

export const eloquaClient: Axios = axios.create({ baseURL: process.env.ELOQUA_BASE_URL });
