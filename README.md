# YM AI Solutions - Yehuda Mizrachi

A modern, bilingual (Hebrew/English) website showcasing AI solutions and services by Yehuda Mizrachi.

## 🚀 Features

- **Bilingual Support**: Toggle between Hebrew (RTL) and English (LTR)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Dark theme with gradient accents and smooth animations
- **Interactive Elements**: Dynamic content and smooth scrolling navigation

## 🛠️ Development Setup

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) (recommended)
- Modern web browser (Chrome, Edge, Firefox, or Safari)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/eidomi/ym-ai-solutions.git
   cd ym-ai-solutions
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Install Recommended Extensions**
   
   When you open the project in VS Code, you'll see a prompt to install recommended extensions. Click "Install" to set up your development environment with:
   
   - **Live Server** - Launch a local development server with live reload
   - **HTML CSS Support** - Enhanced HTML and CSS IntelliSense
   - **Auto Rename Tag** - Automatically rename paired HTML tags
   - **Prettier** - Code formatter for consistent styling
   - **HTMLHint** - HTML linting for code quality
   - **ESLint** - JavaScript linting
   
   Alternatively, you can install them manually:
   - Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Type "Extensions: Show Recommended Extensions"
   - Install all workspace recommendations

4. **Start Development Server**
   
   Using Live Server extension:
   - Right-click on `yehuda-mizrachi-ai-solutions.html`
   - Select "Open with Live Server"
   - Your default browser will open at `http://localhost:5500`
   
   The page will automatically reload when you save changes!

### 🐛 Debugging

The project includes pre-configured debug settings for both Chrome and Edge browsers.

#### Debug with Chrome:
1. Start Live Server (right-click HTML file → "Open with Live Server")
2. Go to Debug panel (`Ctrl+Shift+D` / `Cmd+Shift+D`)
3. Select "Launch Chrome" from dropdown
4. Press F5 or click the green play button

#### Debug with Edge:
1. Start Live Server
2. Go to Debug panel
3. Select "Launch Edge" from dropdown
4. Press F5 or click the green play button

#### Attach to Running Browser:
If you already have Chrome or Edge running with remote debugging:
- Use "Attach to Chrome" or "Attach to Edge" configuration
- Make sure the browser was launched with `--remote-debugging-port=9222`

### 📝 VS Code Settings

The workspace is pre-configured with:

- ✅ **Format on Save** - Code automatically formats when you save
- ✅ **Auto Save** - Changes save automatically after 1 second
- ✅ **Tab Size**: 4 spaces
- ✅ **Word Wrap** - Long lines wrap for better readability
- ✅ **HTML/CSS/JS Formatting** - Consistent code style across the project

You can customize these settings in `.vscode/settings.json`.

## 📁 Project Structure

```
ym-ai-solutions/
├── .vscode/                      # VS Code workspace configuration
│   ├── settings.json            # Editor and formatter settings
│   ├── extensions.json          # Recommended extensions
│   └── launch.json              # Debug configurations
├── yehuda-mizrachi-ai-solutions.html  # Main website file
└── README.md                    # This file
```

## 🌐 Website Structure

The website is a single-page application with the following sections:

- **Hero Section** - Introduction and language toggle
- **About** - Background and expertise
- **Services** - AI solutions offered
- **Why Choose Me** - Key differentiators
- **Process** - Work methodology
- **Portfolio** - Project showcase
- **Testimonials** - Client reviews
- **Contact** - Get in touch form

## 💡 Development Tips

### Working with Bilingual Content

The website supports both Hebrew and English:
- Hebrew is the default language (RTL layout)
- Language toggle button switches between languages
- Different fonts are used for each language (Heebo for Hebrew, Space Grotesk for English)

### Modifying Styles

All CSS is embedded in the `<style>` section of the HTML file. The design uses:
- CSS Variables for consistent theming (see `:root` section)
- Modern CSS features (Grid, Flexbox, CSS animations)
- Responsive design with media queries

### Testing Responsive Design

1. Open DevTools (`F12`)
2. Toggle Device Toolbar (`Ctrl+Shift+M` / `Cmd+Shift+M`)
3. Test different device sizes

## 🔧 Customization

### Changing Colors

Edit the CSS variables in the `:root` section:
```css
:root {
    --bg-primary: #0a0a0f;
    --bg-secondary: #12121a;
    --accent-primary: #00d4aa;
    --accent-secondary: #0099ff;
    /* ... more variables */
}
```

### Adding New Sections

1. Add HTML structure following the existing pattern
2. Style with CSS classes consistent with current design
3. Update navigation links if needed
4. Test in both languages

## 📞 Contact

For questions or support, please contact Yehuda Mizrachi through the website's contact form.

## 📄 License

All rights reserved © Yehuda Mizrachi AI Solutions
