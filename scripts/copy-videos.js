const fs = require('fs');
const path = require('path');

// 비디오 파일 복사
const sourceDir = path.join(__dirname, '../public/home');
const destDir = path.join(__dirname, '../out/home');

// out/home 디렉토리가 없으면 생성
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// bg.mp4 파일 복사
const videoFile = 'bg.mp4';
const sourceFile = path.join(sourceDir, videoFile);
const destFile = path.join(destDir, videoFile);

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, destFile);
  console.log(`✓ Copied ${videoFile} to out/home/`);
} else {
  console.error(`✗ File not found: ${sourceFile}`);
  process.exit(1);
}

console.log('Video files copied successfully!');

