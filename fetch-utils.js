const SUPABASE_URL = 'https://xflvvifvtiottijjafxv.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbHZ2aWZ2dGlvdHRpamphZnh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyOTQ3NTIsImV4cCI6MTk3OTg3MDc1Mn0.idta3hjAHwlVQERgKkABojh4PQz1XKeehESdU7w1QJ8';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createBulletin(bulletin) {
    return await client.from('bulletin_board').insert(bulletin).single();
}

export async function getCategories() {
    const response = await client.from('category').select('*');

    if (response.error) {
        return null;
    }
}

export async function getBulletins() {
    return await client.from('bulletin_board').select('*').order('created_at').limit(50);
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);
    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}
