API INTEGRATION ARCHITECTURE - ADMIN LOGIN

==================================================
IMPLEMENTATION SUMMARY
==================================================

1. ENVIRONMENT CONFIGURATION
   - File: .env
   - Base URL: VITE_API_BASE_URL=http://localhost:5000/api
   - Accessible via: import.meta.env.VITE_API_BASE_URL

2. API ENDPOINTS MANAGEMENT
   - File: src/constants/apiEndpoints.jsx
   - Centralized route definitions for all API endpoints
   - Organized by feature (AUTH, HERO, SERVICES, etc.)
   - Example: API_ENDPOINTS.AUTH.LOGIN = '/auth/login'
   - Best practice: Single source of truth for all API endpoints

3. AXIOS INSTANCE
   - File: src/config/axiosInstance.jsx
   - Configured with base URL from environment variables
   - Request interceptor: Automatically adds Authorization header with token
   - Response interceptor: Handles 401 errors and redirects to login
   - Token stored as 'authToken' in localStorage

4. REDUX STATE MANAGEMENT
   - Store: src/store/index.jsx
   - Auth Slice: src/store/slices/authSlice.jsx

   State Structure:
   {
   user: null | { \_id, email, role },
   token: null | "jwt_token",
   isLoading: false,
   error: null,
   isAuthenticated: false
   }

   Actions:
   - loginUser(credentials): Async thunk for login
   - logoutUser(): Async thunk for logout
   - initializeAuth(): Initialize auth from localStorage on app start
   - clearError(): Clear error messages

5. TOKEN MANAGEMENT
   - Stored in: localStorage with key 'authToken'
   - User data stored in: localStorage with key 'adminUser'
   - Added to requests: Authorization: Bearer {token}
   - On 401 error: Token cleared, user redirected to login

6. CUSTOM HOOK
   - File: src/hooks/useAuth.jsx
   - Provides convenient access to auth state and actions
   - Exports: user, token, isLoading, error, isAuthenticated, login, logout, removeError

7. LOGIN FLOW
   - File: src/pages/admin/LoginPage.jsx
   - Uses useAuth hook for login
   - Dispatches loginUser action with credentials
   - On success: Token + user data saved, redirect to /admin
   - On error: Display error message from server
   - Auto-redirect if already authenticated

8. ROUTE PROTECTION
   - File: src/routes/ProtectedRoute.jsx
   - Checks isAuthenticated from Redux state
   - Redirects unauthenticated users to /admin/login
   - File: src/routes/AdminRoutes.jsx
   - All admin routes wrapped with ProtectedRoute

9. ADMIN LOGOUT
   - File: src/components/admin/Header/AdminHeader.jsx
   - Logout button calls logout action
   - Clears token and user data
   - Redirects to /admin/login
   - Displays current user email and role

10. APP INITIALIZATION
    - File: src/main.jsx
    - Wrapped with Redux Provider
    - File: src/App.jsx
    - Calls initializeAuth on mount to restore auth state

==================================================
LOGIN ENDPOINT
==================================================

POST /auth/login
Body: {
"email": "admin@qnl.com",
"password": "admin123"
}

Response: {
"success": true,
"message": "User logged in successfully",
"data": {
"\_id": "69aa69441da9943e21fc2e85",
"email": "admin@qnl.com",
"role": "admin",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
}

==================================================
ERROR HANDLING
==================================================

- Network errors: Display to user from server response
- 401 Unauthorized: Clear token, redirect to login
- Validation errors: Display server message
- Generic errors: "An error occurred" fallback
- useAuth hook provides error state for UI display

==================================================
INDUSTRY STANDARDS FOLLOWED
==================================================

✓ Centralized API endpoint management
✓ Axios interceptors for token injection and error handling
✓ Redux Thunk for async API calls
✓ Secure token storage in localStorage
✓ Protected Routes with authorization checks
✓ Proper error handling with user feedback
✓ Clean, modular code structure
✓ Separation of concerns
✓ Reusable custom hooks
✓ Environment-based configuration
✓ Bearer token authentication
✓ Request/response interceptor pattern
