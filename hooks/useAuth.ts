import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
}

export default useAuth;