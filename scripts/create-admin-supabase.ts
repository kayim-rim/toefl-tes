// Script to create admin user in Supabase
// Run with: bun run scripts/create-admin-supabase.ts

// Supabase credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Error: Missing Supabase URL or Anon Key environment variables');
  process.exit(1);
}

// Simple password hash (matching the auth.ts implementation)
function hashPassword(password: string): string {
  return Buffer.from(password + '_toefl_salt').toString('base64');
}

async function createAdmin() {
  console.log('Creating admin user in Supabase...');
  console.log('');

  const adminUser = {
    username: 'admin',
    password: hashPassword('admin123'),
    name: 'Administrator',
    role: 'admin',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  try {
    // First, check if admin exists
    console.log('Checking if admin exists...');
    const checkResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/users?username=eq.admin&select=*`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        }
      }
    );

    const existingUsers = await checkResponse.json();
    console.log('Existing users check:', existingUsers);

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      console.log('Admin already exists, updating...');
      
      const updateResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/users?username=eq.admin`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            password: adminUser.password,
            role: 'admin',
            status: 'active'
          })
        }
      );

      const result = await updateResponse.json();
      console.log('Update result:', result);
      
      if (updateResponse.ok) {
        console.log('✓ Admin password updated in Supabase!');
      } else {
        console.log('Update failed. Trying to insert new...');
      }
      return;
    }

    // Insert new admin
    console.log('Inserting new admin...');
    const insertResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/users`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(adminUser)
      }
    );

    const result = await insertResponse.json();
    console.log('Insert response status:', insertResponse.status);
    console.log('Insert result:', result);

    if (insertResponse.ok) {
      console.log('');
      console.log('✓ Admin user created in Supabase!');
      console.log('');
      console.log('Login credentials:');
      console.log('  Username: admin');
      console.log('  Password: admin123');
    } else {
      console.log('Insert failed:', result);
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

createAdmin();
