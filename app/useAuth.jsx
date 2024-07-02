// useAuth.js
import { useContext } from 'react';
import { AuthContext } from './Ctx'; // Adjust the path as per your project structure

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
console.log(authContext);
  return authContext;
};
