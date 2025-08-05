import axios from 'axios';
import FormData from 'form-data';

const testEndpoint = async () => {
  try {
    console.log('🧪 Testing admin creation endpoint...');
    
    // Test data
    const testData = new FormData();
    testData.append('name', 'Test Admin');
    testData.append('email', 'testadmin@library.com');
    testData.append('password', 'test123456');
    
    console.log('📤 Sending request to server...');
    
    const response = await axios.post('http://localhost:4000/api/v1/auth/create-admin', testData, {
      headers: {
        ...testData.getHeaders(),
      },
    });
    
    console.log('✅ Admin creation endpoint is working');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Error testing endpoint:');
    console.log('Status:', error.response?.status);
    console.log('Message:', error.response?.data?.message);
    console.log('Full error:', error.response?.data);
    
    if (error.response?.status === 401) {
      console.log('✅ Endpoint is reachable - Authentication required (expected)');
    } else if (error.response?.status === 403) {
      console.log('✅ Endpoint is reachable - Admin access required (expected)');
    } else if (error.response?.status === 500) {
      console.log('❌ Server error - Check server logs for details');
    } else {
      console.log('❌ Unexpected error');
    }
  }
};

// Wait a bit for server to start
setTimeout(() => {
  testEndpoint();
}, 2000); 