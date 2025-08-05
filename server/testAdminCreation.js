import axios from 'axios';
import FormData from 'form-data';

const testAdminCreation = async () => {
  try {
    console.log('🧪 Testing admin creation endpoint...');
    
    // Test data
    const testData = new FormData();
    testData.append('name', 'Test Admin');
    testData.append('email', 'testadmin@library.com');
    testData.append('password', 'test123456');
    
    // Note: This will fail because we're not authenticated, but it will show us the endpoint is reachable
    const response = await axios.post('http://localhost:4000/api/v1/auth/create-admin', testData, {
      headers: {
        ...testData.getHeaders(),
      },
    });
    
    console.log('✅ Admin creation endpoint is working');
    console.log('Response:', response.data);
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Endpoint is reachable - Authentication required (expected)');
      console.log('Response:', error.response.data);
    } else if (error.response?.status === 403) {
      console.log('✅ Endpoint is reachable - Admin access required (expected)');
      console.log('Response:', error.response.data);
    } else {
      console.log('❌ Error testing endpoint:', error.message);
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
      }
    }
  }
};

// Wait a bit for server to start
setTimeout(() => {
  testAdminCreation();
}, 2000); 