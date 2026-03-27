// Script to create an admin user in SQLite database
// Run with: bun run scripts/create-admin.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simple password hash (matching the auth.ts implementation)
function hashPassword(password: string): string {
  return Buffer.from(password + '_toefl_salt').toString('base64');
}

async function createAdmin() {
  console.log('Creating admin user...');
  console.log('');

  try {
    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: 'admin' }
    });

    if (existingUser) {
      console.log('Admin user already exists!');
      console.log('Updating password...');
      
      await prisma.user.update({
        where: { username: 'admin' },
        data: { 
          password: hashPassword('admin123'), 
          status: 'active',
          role: 'admin'
        }
      });

      console.log('✓ Admin password updated successfully!');
      console.log('');
      console.log('Login credentials:');
      console.log('  Username: admin');
      console.log('  Password: admin123');
      return;
    }

    // Create new admin user
    await prisma.user.create({
      data: {
        username: 'admin',
        password: hashPassword('admin123'),
        name: 'Administrator',
        role: 'admin',
        status: 'active',
      }
    });

    console.log('✓ Admin user created successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('');
    console.log('You can now login at /admin/login');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
