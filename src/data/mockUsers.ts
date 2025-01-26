import { User } from '../types/auth';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'teste@example.com',
    name: 'Usuário Teste',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Felix'
  }
];

// Mock credentials for easy testing
export const testCredentials = {
  email: 'teste@example.com',
  password: '123456'
};
