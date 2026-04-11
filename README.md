# Aditya Gupta - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Smooth scrolling, hover effects, and form validation
- **Sections Include**:
  - Hero/Landing section
  - About me with stats
  - Skills & Technologies
  - Featured Projects
  - Experience & Education timeline
  - Contact form with social links

## Customization Guide

### 1. Personal Information
Update the following in `index.html`:

- **Name**: Replace "Aditya Gupta" throughout the file
- **Title**: Change "Software Developer & Problem Solver" in the hero section
- **Description**: Update the hero description and about section
- **Contact Info**: Update email, phone, and location in the contact section

### 2. Skills Section
In the skills section, update the skill categories and items:
```html
<div class="skill-category">
    <h3>Your Category</h3>
    <div class="skill-items">
        <span class="skill-item">Your Skill</span>
        <!-- Add more skills -->
    </div>
</div>
```

### 3. Projects Section
Replace the placeholder projects with your actual projects:
- Update project titles, descriptions, and technologies used
- Replace placeholder images with actual project screenshots
- Add real links to live demos and GitHub repositories

### 4. Experience & Education
Update the timeline section with your actual experience:
```html
<div class="timeline-item">
    <div class="timeline-date">Year Range</div>
    <div class="timeline-content">
        <h3>Position/Degree</h3>
        <h4>Company/Institution</h4>
        <p>Description of your role and achievements</p>
    </div>
</div>
```

### 5. Images
Replace placeholder images:
- **Profile Image**: Replace `https://via.placeholder.com/400x400` with your photo
- **Project Images**: Replace project placeholder images with actual screenshots
- Store images in an `images/` folder and update the src attributes

### 6. Social Links
Update social media links in the contact section:
```html
<div class="social-links">
    <a href="your-linkedin-url"><i class="fab fa-linkedin"></i></a>
    <a href="your-github-url"><i class="fab fa-github"></i></a>
    <a href="your-twitter-url"><i class="fab fa-twitter"></i></a>
</div>
```

### 7. Colors & Styling
Customize colors in `styles.css`:
- **Primary Color**: Change `#3498db` to your preferred color
- **Secondary Color**: Change `#2c3e50` for headings
- **Accent Color**: Change `#f39c12` for highlights

### 8. Contact Form
The contact form currently shows an alert. To make it functional:
- Set up a backend service (Node.js, PHP, etc.)
- Use a service like Formspree, Netlify Forms, or EmailJS
- Update the form action and method attributes

## File Structure
```
Portfolio-/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── Aditya_Gupta_.Resume....pdf  # Your resume
```

## Getting Started

1. **Clone or download** this repository
2. **Customize** the content according to the guide above
3. **Add your images** to an `images/` folder
4. **Test locally** by opening `index.html` in a browser
5. **Deploy** to GitHub Pages, Netlify, or your preferred hosting service

## Deployment Options

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to Netlify
2. Or connect your GitHub repository
3. Your site will be deployed automatically

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
This project is open source and available under the [MIT License](LICENSE).

---

**Note**: Remember to update all placeholder content with your actual information before deploying!