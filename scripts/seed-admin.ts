import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Must match the hashPassword function in src/lib/auth.ts
function hashPassword(password: string): string {
  return Buffer.from(password + '_toefl_salt').toString('base64');
}

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { username: 'admin' }
  });
  
  if (existingAdmin) {
    // Update the password to use correct hash
    const hashedPassword = hashPassword('admin123');
    await prisma.user.update({
      where: { username: 'admin' },
      data: { password: hashedPassword }
    });
    console.log('Admin password updated!');
    console.log('Username: admin');
    console.log('Password: admin123');
    return;
  }
  
  // Create admin user with correct password hash
  const hashedPassword = hashPassword('admin123');
  
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin',
      status: 'active'
    }
  });
  
  console.log('Admin user created successfully!');
  console.log('Username: admin');
  console.log('Password: admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
