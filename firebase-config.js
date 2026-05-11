/**
 * ╔══════════════════════════════════════════════════════╗
 * ║          FIREBASE CONFIGURATION — EDIT THIS          ║
 * ╠══════════════════════════════════════════════════════╣
 * ║  1. Go to https://console.firebase.google.com        ║
 * ║  2. Create a new project (or use existing)           ║
 * ║  3. Click "Web" (</>)  → Register app                ║
 * ║  4. Copy your config values below                    ║
 * ║  5. Enable Firestore Database (test mode is fine)    ║
 * ║  6. Enable Storage (test mode is fine)               ║
 * ╚══════════════════════════════════════════════════════╝
 */

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBiGRzflgZkPvC7H28hqv38hYwlNbKBX8U",
  authDomain:        "aarya21birthday.firebaseapp.com",
  projectId:         "aarya21birthday",
  storageBucket:     "aarya21birthday.firebasestorage.app",
  messagingSenderId: "668636594561",
  appId:             "1:668636594561:web:fdc550d47d36398996e880"
};

// Cloudinary config for file uploads (free, no credit card)
// This will be filled in automatically after Cloudinary setup
const CLOUDINARY_CLOUD_NAME = "dwoau4g1j";
const CLOUDINARY_UPLOAD_PRESET = "birthday_uploads";

/**
 * ╔══════════════════════════════════════════════════════╗
 * ║              PRIVATE ZONE PASSWORD                   ║
 * ╚══════════════════════════════════════════════════════╝
 */
const SECRET = "aarya21";

/**
 * ╔══════════════════════════════════════════════════════╗
 * ║         FIREBASE SECURITY RULES (paste in console)  ║
 * ╠══════════════════════════════════════════════════════╣
 * ║  Firestore Rules:                                    ║
 * ║    rules_version = '2';                              ║
 * ║    service cloud.firestore {                         ║
 * ║      match /databases/{db}/documents {               ║
 * ║        match /{doc=**} {                             ║
 * ║          allow read, write: if true;                 ║
 * ║        }                                             ║
 * ║      }                                               ║
 * ║    }                                                 ║
 * ║                                                      ║
 * ║  Storage Rules:                                      ║
 * ║    rules_version = '2';                              ║
 * ║    service firebase.storage {                        ║
 * ║      match /b/{bucket}/o {                           ║
 * ║        match /{allPaths=**} {                        ║
 * ║          allow read, write: if true;                 ║
 * ║        }                                             ║
 * ║      }                                               ║
 * ║    }                                                 ║
 * ╚══════════════════════════════════════════════════════╝
 */
