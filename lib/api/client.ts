import axios from 'axios';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
