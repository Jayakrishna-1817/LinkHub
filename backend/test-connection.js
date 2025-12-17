const mongoose = require('mongoose');

// Test MongoDB connection
const testConnection = async () => {
  const uri = 'mongodb+srv://jksmart1817_db_user:jk@link.vcng8o0.mongodb.net/linkfind?retryWrites=true&w=majority&appName=link';
  
  console.log('Testing MongoDB connection...');
  console.log('URI:', uri.replace(/:[^:@]+@/, ':****@')); // Hide password
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ MongoDB connection successful!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Check your MongoDB Atlas cluster is active');
    console.error('2. Verify your IP address is whitelisted in MongoDB Atlas');
    console.error('3. Check username and password are correct');
    console.error('4. Ensure your internet connection is stable');
    console.error('5. Try whitelisting all IPs (0.0.0.0/0) in MongoDB Atlas Network Access');
    process.exit(1);
  }
};

testConnection();
