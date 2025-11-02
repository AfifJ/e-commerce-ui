// Test database connection and basic CRUD operations
import { db, schema } from '@/db';
import { eq } from 'drizzle-orm';

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');

    // Test basic connection
    const result = await db.select().from(schema.users).limit(1);
    console.log('✅ Database connection successful');
    console.log('📊 Found users table with sample data:', result.length > 0 ? 'Yes' : 'No');

    // Test user count
    const userCount = await db.select().from(schema.users);
    console.log(`👥 Total users in database: ${userCount.length}`);

    // Show sample user data
    if (userCount.length > 0) {
      console.log('\n📝 Sample user data:');
      const sampleUser = userCount[0];
      console.log({
        id: sampleUser.id,
        username: sampleUser.username,
        name: sampleUser.name,
        email: sampleUser.email,
        role: sampleUser.role,
        isActive: sampleUser.isActive,
        emailVerified: sampleUser.emailVerified,
        phoneVerified: sampleUser.phoneVerified,
        createdAt: sampleUser.createdAt
      });
    }

    return { success: true, count: userCount.length };
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return { success: false, error: error.message };
  }
}

// Run the test
if (require.main === module) {
  testDatabaseConnection();
}

export { testDatabaseConnection };