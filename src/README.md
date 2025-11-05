# Brand Assets - Design System Management Tool

A modern, desktop-focused web application for managing and sharing design system assets with an elegant animated interface. Built with React, TypeScript, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

### Core Functionality
- **Asset Management**: Add, store, edit, and delete design assets across multiple categories
- **Six Asset Categories**:
  - Typography (fonts, text styles, headings)
  - Colors (brand colors, palette management)
  - Gradients (custom gradient combinations)
  - Logos (brand logos and variations)
  - Icons (icon library management)
  - Components (reusable UI components)

### Sharing & Collaboration
- **Individual Asset Sharing**: Generate shareable links for specific assets
- **Bulk Export**: Share your entire design system with a single link
- **URL-based Import**: Receive and import assets from shared links automatically
- **Local Storage**: All assets persist locally in the browser

### User Experience
- **Dark/Light Mode**: Fully functional theme toggle with system preferences
- **Animated Background**: Floating gradient blobs with grid dot overlay
- **Clean UI**: Minimal, monotype design using Helvetica Neue
- **Desktop Optimized**: Designed specifically for desktop workflows

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/Brand-assets.git
cd Brand-assets
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### Adding Assets

1. Navigate to any asset category tab (Typography, Colors, etc.)
2. Click the "Add [Asset Type]" button
3. Fill in the required fields in the dialog
4. Click "Add" to save the asset

### Sharing Assets

**Individual Asset:**
1. Click the share icon (🔗) on any asset card
2. Copy the generated shareable link from the dialog
3. Share the link with team members
4. Recipients can open the link to import the asset

**Entire Design System:**
1. Click "Share All" in the top navigation
2. Copy the comprehensive link containing all assets
3. Share with your team for complete design system sync

### Importing Shared Assets

Simply open a shared link in your browser. The app will automatically:
- Detect the asset data in the URL
- Display a confirmation toast
- Import the assets into your local collection

### Downloading Assets

Click the download icon (⬇️) on any asset card to export it as a JSON file.

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Storage**: Browser LocalStorage
- **Build Tool**: Vite

## 📁 Project Structure

```
├── App.tsx                      # Main application component
├── components/
│   ├── AssetCard.tsx           # Reusable asset card component
│   ├── BackgroundAnimation.tsx # Animated gradient blobs background
│   ├── ShareDialog.tsx         # Share link dialog component
│   ├── [Asset]Assets.tsx       # Category-specific components
│   └── ui/                     # shadcn/ui components
├── styles/
│   └── globals.css             # Global styles and design tokens
└── guidelines/
    └── Guidelines.md           # Design system guidelines
```

## 🎨 Customization

### Changing the Color Scheme

Edit the CSS variables in `/styles/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* Modify other tokens as needed */
}
```

### Modifying Animation

The background animation can be customized in `/components/BackgroundAnimation.tsx`:
- Adjust blob count, sizes, and colors
- Modify animation speeds and patterns
- Change grid dot density and opacity

## 🔒 Privacy & Security

- All data is stored locally in your browser
- No server-side storage or authentication
- Shared links contain encoded asset data in the URL
- No tracking or analytics

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📮 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ for designers and developers
