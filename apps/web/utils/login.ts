import axios from 'axios';
import { z } from 'zod';
import { config } from './config';

type LoginRequest = {
  email: string;
  password: string;
};

// Zod is very similar to Yup, but I believe it's a bit more powerful. Normally I would go with Yup
// since I saw you are already using it in another place (for react-hook-form), but we can have a nice
// comparison between the two :)
const LoginResponse = z.object({
  data: z.object({
    token: z.string(),
  }),
});

const login = async (req: LoginRequest) => {
  const res = await axios.post(`${config.apiUrl}/api/auth/login`, req);
  const parsedResponse = LoginResponse.parse(res);
  return parsedResponse.data;
};

export default login;
