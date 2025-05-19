// import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
// const KEYCLOAK_BASE_URL = 'http://localhost:8180'; 
// const CLIENT_ID = 'frontend-client';
// // Helper function to add JWT token to headers (if available)
// const getAuthHeaders = (token) => {
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const userApi = {
// // Login API (Keycloak)
// login: async (username, password) => {
//   try {
//     const formData = new URLSearchParams();
//     formData.append('grant_type', 'password');
//     formData.append('client_id', CLIENT_ID);
//     formData.append('username', username);
//     formData.append('password', password);

//     const response = await axios.post(
//       `${KEYCLOAK_BASE_URL}/realms/${REALM}/protocol/openid-connect/token`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );
//     return response.data; // { access_token, refresh_token, ... }
//   } catch (error) {
//     console.error('Error during login:', error);
//     throw error;
//   }
// },

// // Lấy thông tin người dùng hiện tại
// getCurrentUser: async (token) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
//       headers: getAuthHeaders(token),
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching current user:', error);
//     throw error;
//   }
// },

// // Kiểm tra vendor
// getVendorById: async (id, token) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/users/vendors/${id}`, {
//       headers: getAuthHeaders(token),
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching vendor with id ${id}:`, error);
//     throw error;
//   }
// },


//   // UserController APIs
//   getUserById: async (id, token) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/users/${id}`, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching user with id ${id}:`, error);
//       throw error;
//     }
//   },

//   updateUser: async (id, userData, token) => {
//     try {
//       const formData = new FormData();
//       Object.keys(userData).forEach((key) => {
//         formData.append(key, userData[key]);
//       });
//       const response = await axios.put(`${API_BASE_URL}/api/users/${id}`, formData, {
//         headers: {
//           ...getAuthHeaders(token),
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating user with id ${id}:`, error);
//       throw error;
//     }
//   },

//   getAllUsers: async (page = 0, size = 10, token) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/users`, {
//         params: { page, size },
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching all users:', error);
//       throw error;
//     }
//   },

//   // getCurrentUser: async (token) => {
//   //   try {
//   //     const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
//   //       headers: getAuthHeaders(token),
//   //     });
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('Error fetching current user:', error);
//   //     throw error;
//   //   }
//   // },

//   // CustomerController APIs
//   createCustomer: async (customerData, token) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/customers`, customerData, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error creating customer:', error);
//       throw error;
//     }
//   },

//   getAllCustomers: async (token) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/users/customers`, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching all customers:', error);
//       throw error;
//     }
//   },

//   getCustomerById: async (id, token) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/users/customers/${id}`, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching customer with id ${id}:`, error);
//       throw error;
//     }
//   },

//   addBankAccount: async (id, bankAccountData, token) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/customers/${id}/bank-account`, bankAccountData, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error adding bank account for customer ${id}:`, error);
//       throw error;
//     }
//   },

//   createAddress: async (id, addressData, token) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/customers/${id}/address`, addressData, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error creating address for customer ${id}:`, error);
//       throw error;
//     }
//   },

//   updateAddress: async (id, addressId, addressData, token) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/api/users/customers/${id}/address/${addressId}`, addressData, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating address for customer ${id}:`, error);
//       throw error;
//     }
//   },

//   deleteAddress: async (id, addressId, token) => {
//     try {
//       const response = await axios.delete(`${API_BASE_URL}/api/users/customers/${id}/address/${addressId}`, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting address for customer ${id}:`, error);
//       throw error;
//     }
//   },

//   // VendorController APIs
//   getAllVendors: async (token) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/users/vendors`, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching all vendors:', error);
//       throw error;
//     }
//   },

//   becomeVendor: async (id, token) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/vendors/${id}/become-vendor`, null, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error becoming vendor for id ${id}:`, error);
//       throw error;
//     }
//   },

//   updateShop: async (id, vendorData, token) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/api/users/vendors/${id}/shop-update`, vendorData, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating shop for vendor ${id}:`, error);
//       throw error;
//     }
//   },

//   getVendorById: async (id, token) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/users/vendors/${id}`, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching vendor with id ${id}:`, error);
//       throw error;
//     }
//   },

//   createVendor: async (vendorData, token) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/api/users/vendors`, vendorData, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error creating vendor:', error);
//       throw error;
//     }
//   },

//   updateVendor: async (id, vendorData, token) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/api/users/vendors/${id}`, vendorData, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating vendor with id ${id}:`, error);
//       throw error;
//     }
//   },

//   deleteVendor: async (id, token) => {
//     try {
//       const response = await axios.delete(`${API_BASE_URL}/api/users/vendors/${id}`, {
//         headers: getAuthHeaders(token),
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting vendor with id ${id}:`, error);
//       throw error;
//     }
//   },
// };

// export default userApi;

// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
// const KEYCLOAK_BASE_URL = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL || 'http://localhost:8180';
// const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET || 'your_frontend_client_secret_here';
// const KEYCLOAK_ADMIN_CLIENT_SECRET = process.env.KEYCLOAK_ADMIN_CLIENT_SECRET || 'your_admin_cli_client_secret_here';
// const KEYCLOAK_ADMIN_USERNAME = process.env.KEYCLOAK_ADMIN_USERNAME || 'admin';
// const KEYCLOAK_ADMIN_PASSWORD = process.env.KEYCLOAK_ADMIN_PASSWORD || 'admin';

// const userApi = {
//   async login({ username, password }) {
//     try {
//       const response = await axios.post(
//         `${KEYCLOAK_BASE_URL}/realms/demo/protocol/openid-connect/token`,
//         new URLSearchParams({
//           grant_type: 'password',
//           client_id: 'new-frontend-client',
//           client_secret: KEYCLOAK_CLIENT_SECRET,
//           username,
//           password,
//         }),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   async getAdminToken() {
//     try {
//       const response = await axios.post(
//         `${KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/token`,
//         new URLSearchParams({
//           grant_type: 'client_credentials',
//           client_id: 'admin-cli',
//           client_secret: KEYCLOAK_ADMIN_CLIENT_SECRET,
//         }),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );
//       return response.data.access_token;
//     } catch (error) {
//       console.error('Lỗi lấy admin token:', error);
//       throw error;
//     }
//   },

//   async register({ username, email, firstName, lastName, role, password }) {
//     try {
//       const adminToken = await this.getAdminToken();

//       // Tạo user trong Keycloak
//       await axios.post(
//         `${KEYCLOAK_BASE_URL}/admin/realms/demo/users`,
//         {
//           username,
//           email,
//           firstName,
//           lastName,
//           enabled: true,
//           credentials: [
//             {
//               type: 'password',
//               value: password,
//               temporary: false,
//             },
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       // Lấy user ID
//       const usersResponse = await axios.get(
//         `${KEYCLOAK_BASE_URL}/admin/realms/demo/users?username=${username}`,
//         {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         }
//       );
//       const userId = usersResponse.data[0]?.id;

//       if (!userId) {
//         throw new Error('Không tìm thấy user vừa tạo.');
//       }

//       // Gán vai trò
//       const rolesToAssign = role === 'USER' ? ['CUSTOMER', 'VENDOR', 'USER'] : [role];
//       const roleMappings = rolesToAssign.map((r) => ({
//         id: r, // Giả định role ID khớp với tên
//         name: r,
//       }));

//       await axios.post(
//         `${KEYCLOAK_BASE_URL}/admin/realms/demo/users/${userId}/role-mappings/realm`,
//         roleMappings,
//         {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//     } catch (error) {
//       console.error('Lỗi đăng ký:', error);
//       throw error;
//     }
//   },
// };

// export default userApi;

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const KEYCLOAK_BASE_URL = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL || 'http://localhost:8180';
const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET || 'd8zCopMHIRbK4lEHHTZu61UCQPMbjerM';
const KEYCLOAK_ADMIN_CLIENT_SECRET = process.env.KEYCLOAK_ADMIN_CLIENT_SECRET || '43VESlnGW1IA5sC7sJ8yL5ldQ7lHwnFq';
const KEYCLOAK_ADMIN_USERNAME = process.env.KEYCLOAK_ADMIN_USERNAME || 'admin';
const KEYCLOAK_ADMIN_PASSWORD = process.env.KEYCLOAK_ADMIN_PASSWORD || 'admin';

const userApi = {
  async login({ username, password }) {
    try {
      const response = await axios.post(
        `${KEYCLOAK_BASE_URL}/realms/demo/protocol/openid-connect/token`,
        new URLSearchParams({
          grant_type: 'password',
          client_id: 'new-frontend-client',
          client_secret: KEYCLOAK_CLIENT_SECRET,
          username,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi đăng nhập:', error.response?.data || error.message);
      throw error;
    }
  },

  async getAdminToken() {
    try {
      const response = await axios.post(
        `${KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/token`,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'admin-cli',
          client_secret: KEYCLOAK_ADMIN_CLIENT_SECRET,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Lỗi lấy admin token:', error.response?.data || error.message);
      throw error;
    }
  },

  async register({ username, email, firstName, lastName, role, password }) {
    try {
      const adminToken = await this.getAdminToken();

      // Tạo user
      await axios.post(
        `${KEYCLOAK_BASE_URL}/admin/realms/demo/users`,
        {
          username,
          email,
          firstName,
          lastName,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: password,
              temporary: false,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Lấy user ID
      const usersResponse = await axios.get(
        `${KEYCLOAK_BASE_URL}/admin/realms/demo/users?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const userId = usersResponse.data?.[0]?.id;
      if (!userId) throw new Error('Không tìm thấy user vừa tạo.');

      // Lấy danh sách roles
      const realmRolesResponse = await axios.get(
        `${KEYCLOAK_BASE_URL}/admin/realms/demo/roles`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const allRoles = realmRolesResponse.data;
      const rolesToAssign = role === 'USER' ? ['CUSTOMER', 'VENDOR', 'USER'] : [role];
      const roleMappings = allRoles.filter((r) => rolesToAssign.includes(r.name));

      if (roleMappings.length === 0) throw new Error('Không tìm thấy role phù hợp.');

      // Gán role
      await axios.post(
        `${KEYCLOAK_BASE_URL}/admin/realms/demo/users/${userId}/role-mappings/realm`,
        roleMappings,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Lỗi đăng ký:', error.response?.data || error.message);
      throw error;
    }
  },
};

export default userApi;
