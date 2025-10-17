# UBC BOLT Website

The official website for UBC BOLT - UBC's Largest Data Club.

## 🚀 Features

- **Interactive Space Animation**: Click to create star explosions, watch comets streak by, and experience meteor showers
- **Responsive Design**: Fully mobile-compatible with Tailwind CSS v4
- **Glassmorphism UI**: Modern frosted glass effects throughout
- **Smooth Animations**: Carousel components with auto-scroll and manual control
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📋 Tech Stack

- **React** + **TypeScript**
- **Vite** - Fast build tool
- **Tailwind CSS v4** - Utility-first CSS framework
- **HTML5 Canvas** - Interactive space background

## 🛠️ Installation

```bash
# Navigate to project directory
cd new-bolt-website

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Button/           # Reusable button component
│   ├── EmailBanner/      # Newsletter subscription
│   ├── Footer/           # Footer with land acknowledgement
│   ├── Navbar/           # Navigation with sliding indicator
│   ├── PartnersBanner/   # Partner carousel
│   └── SpaceScene/       # Interactive space animation
├── sections/
│   ├── Hero/             # Landing section with space background
│   ├── About/            # About UBC BOLT
│   ├── Events/           # Event cards with descriptions
│   ├── Team/             # Team member carousel
│   └── Sponsors/         # Sponsor section
├── assets/
│   ├── images/           # Image assets
│   ├── fonts/            # Custom fonts
│   ├── events.json       # Event data
│   └── team.json         # Team member data
├── config/               # Site configuration
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🎨 Interactive Features

### Space Scene
- **Click Explosions**: Click anywhere on the hero section to create colorful particle bursts
- **Comets**: Randomly spawning comets with glowing trails
- **Meteor Showers**: Rare timed events with increased comet activity
- **Nebula Clouds**: Animated fog effects drifting across the background
- **Mouse Parallax**: Stars respond to cursor movement

### Carousels
- **Auto-Scroll**: Partners and Team sections auto-scroll
- **Manual Control**: Swipe/scroll with trackpad or touch
- **Hover Effects**: Elements lift on hover

## 🌐 Deployment

This project is configured for Vercel deployment with `vercel.json`.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Configuration

### Environment Variables
Update `src/config/site.ts` with your:
- Social media links
- Contact email
- Membership URL
- Sponsor email

### Content Updates
- **Events**: Edit `src/assets/events.json`
- **Team**: Edit `src/assets/team.json`
- **Colors**: Customize in `tailwind.config.js`

## 🤝 Land Acknowledgement

UBC BOLT respectfully acknowledges that we are located on the traditional, ancestral, and unceded territory of the xʷməθkʷəy̓əm (Musqueam) people.

## 📄 License

© 2025 UBC BOLT. All rights reserved.
