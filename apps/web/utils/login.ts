import axios from 'axios';

type LoginRequest = {
  email: string;
  password: string;
};

const login = async (req: LoginRequest) => {
  const res = await axios.post('http://localhost:3000/api/auth/login', req);
  return res.data;
};

export default login;
