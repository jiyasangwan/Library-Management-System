import fs from 'fs';
import path from 'path';

const ensureUploadsDirectory = () => {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  const avatarsDir = path.join(uploadsDir, 'avatars');

  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Created uploads directory');
  }

  // Create avatars directory if it doesn't exist
  if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true });
    console.log('✅ Created avatars directory');
  }

  console.log('✅ Uploads directories are ready');
};

export default ensureUploadsDirectory; 