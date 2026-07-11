const fs = require('fs');
const path = require('path');

const projectDir = '/Users/mac/Documents/work/lex-totum';
const indexPath = path.join(projectDir, 'index.html');
const cssPath = path.join(projectDir, 'style.css');
const jsPath = path.join(projectDir, 'script.js');

let indexHtml = fs.readFileSync(indexPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// SEO Meta Tags & Schema to Inject
const seoTags = `
    <!-- SEO Optimization Meta Tags -->
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://lextotum.com/">
    <meta name="keywords" content="Lex Totum, legal consultancy, corporate law, civil litigation, family law, criminal law, property law, labour law, tax law, intellectual property, Kozhikode lawyers">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://lextotum.com/">
    <meta property="og:title" content="Lex Totum | Premium Corporate Legal Consultancy">
    <meta property="og:description" content="Trusted legal experts providing premium consultancy for businesses and individuals. Corporate law, litigation, intellectual property, and more.">
    <meta property="og:image" content="https://lextotum.com/hero_background.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://lextotum.com/">
    <meta property="twitter:title" content="Lex Totum | Premium Corporate Legal Consultancy">
    <meta property="twitter:description" content="Trusted legal experts providing premium consultancy for businesses and individuals. Corporate law, litigation, intellectual property, and more.">
    <meta property="twitter:image" content="https://lextotum.com/hero_background.png">

    <!-- JSON-LD Structured Data Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Lex Totum",
      "image": "https://lextotum.com/hero_background.png",
      "description": "Trusted legal experts providing premium consultancy for businesses and individuals. Corporate law, litigation, intellectual property, and more.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ground Floor, Court View Arcade, Opp. District Court Complex, Court Road",
        "addressLocality": "Kozhikode",
        "addressRegion": "Kerala",
        "postalCode": "673001",
        "addressCountry": "IN"
      },
      "telephone": "+919496470069",
      "email": "contact@lextotum.com",
      "url": "https://lextotum.com",
      "priceRange": "$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:30",
          "closes": "20:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "10:00",
          "closes": "14:00"
        }
      ],
      "employee": [
        {
          "@type": "Person",
          "name": "Adv. Zameel K. T",
          "jobTitle": "Legal Consultant"
        },
        {
          "@type": "Person",
          "name": "Adv. T Abdulla",
          "jobTitle": "Legal Consultant"
        }
      ]
    }
    </script>
`;

// Default HTML fallbacks for empty team folders
const defaultLeadingHtml = `
                <div class="grid grid-2  scroll-reveal fade-up" style="margin-bottom: 60px;">
                    <!-- Team 1 -->
                    <div class="team-card scroll-reveal fade-up">
                        <div class="team-image">
                            <img src="zameel_kt.jpg" alt="Adv. Zameel K. T" class="team-photo">
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Adv. Zameel K. T</h3>
                            <p class="team-designation">Legal Consultant</p>
                            <p class="team-spec">B.B.A, L.L.B</p>
                        </div>
                        <a href="https://wa.me/918606875979?text=Hello%20Adv.%20Zameel%20K.%20T,%20I%20would%20like%20to%20consult%20regarding..." target="_blank" class="card-whatsapp-link" aria-label="Chat on WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                        </a>
                    </div>
                    <!-- Team 2 -->
                    <div class="team-card scroll-reveal fade-up">
                        <div class="team-image">
                            <!-- Premium initial avatar for consistent, fast-loading visual design -->
                            <div class="avatar-fallback">
                                <span>T.A</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Adv. T Abdulla</h3>
                            <p class="team-designation">Legal Consultant</p>
                            <p class="team-spec">BA, BEd., LLB</p>
                        </div>
                        <a href="https://wa.me/919496470069?text=Hello%20Adv.%20T%20Abdulla,%20I%20would%20like%20to%20consult%20regarding..." target="_blank" class="card-whatsapp-link" aria-label="Chat on WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                        </a>
                    </div>
                </div>
`;

const defaultAssociatesHtml = `
                <div class="grid grid-3 grid-center scroll-reveal fade-up" style="margin-bottom: 60px;">
                    <div class="team-card team-card-small">
                        <div class="team-image">
                            <div class="avatar-fallback">
                                <span>J.D</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Adv. Jane Doe</h3>
                        </div>
                    </div>
                    <div class="team-card team-card-small">
                        <div class="team-image">
                            <div class="avatar-fallback">
                                <span>J.S</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Adv. John Smith</h3>
                        </div>
                    </div>
                    <div class="team-card team-card-small">
                        <div class="team-image">
                            <div class="avatar-fallback">
                                <span>P.N</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Adv. Priya Nair</h3>
                        </div>
                    </div>
                </div>
`;

const defaultInternsHtml = `
                <div class="grid grid-6 grid-center scroll-reveal fade-up">
                    <div class="team-card team-card-mini">
                        <div class="team-image">
                            <div class="avatar-fallback">
                                <span>S.J</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Sarah Jenkins</h3>
                        </div>
                    </div>
                    <div class="team-card team-card-mini">
                        <div class="team-image">
                            <div class="avatar-fallback">
                                <span>M.C</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Michael Chang</h3>
                        </div>
                    </div>
                    <div class="team-card team-card-mini">
                        <div class="team-image">
                            <div class="avatar-fallback">
                                <span>A.P</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Amit Patel</h3>
                        </div>
                    </div>
                    <div class="team-card team-card-mini">
                        <div class="team-image">
                            <div class="avatar-fallback">
                                <span>E.R</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Elena Rostova</h3>
                        </div>
                    </div>
                    <div class="team-card team-card-mini">
                        <div class="team-image">
                            <div class="avatar-fallback">
                                <span>D.K</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">David Kim</h3>
                        </div>
                    </div>
                    <div class="team-card team-card-mini">
                        <div class="team-image">
                            <div class="avatar-fallback">
                                <span>F.S</span>
                            </div>
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">Fatima Al-Sayed</h3>
                        </div>
                    </div>
                </div>
`;

function getTeamHtml(dirName, cardClass, defaultHtml, category) {
    const dirPath = path.join(projectDir, 'images', 'team', dirName);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        return defaultHtml;
    }
    
    const files = fs.readdirSync(dirPath).filter(file => {
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase());
    });
    
    if (files.length === 0) {
        return defaultHtml;
    }
    
    // Sort files to keep stable ordering
    files.sort();
    
    let gridClass = 'grid-2';
    if (category === 'associates') gridClass = 'grid-3';
    if (category === 'interns') gridClass = 'grid-6';
    let gridCenterClass = (category === 'associates' || category === 'interns') ? 'grid-center' : '';
    let html = `\n                <div class="grid ${gridClass} ${gridCenterClass} scroll-reveal fade-up" style="${category !== 'interns' ? 'margin-bottom: 60px;' : ''}">\n`;
    
    files.forEach(file => {
        const ext = path.extname(file);
        const nameWithoutExt = path.basename(file, ext);
        
        let name = nameWithoutExt;
        let degree = '';
        let extra = '';
        
        const parts = nameWithoutExt.split('-');
        if (parts.length > 2) {
            name = parts[0];
            degree = parts[1].replace(/_/g, ' ');
            extra = parts.slice(2).join('-').replace(/_/g, ' ');
        } else if (parts.length === 2) {
            name = parts[0];
            degree = parts[1].replace(/_/g, ' ');
        } else {
            if (category === 'leading') degree = 'BA, BEd., LLB';
            if (category === 'associates') degree = 'B.A., L.L.B';
            if (category === 'interns') degree = 'Student Intern';
        }
        
        // Strip sorting prefix (e.g., "01_" or "1-") from the displayed name
        name = name.replace(/^\d+[-_]/, '');
        // Replace remaining underscores with spaces
        name = name.replace(/_/g, ' ');
        
        let designation = 'Legal Consultant';
        if (category === 'associates') designation = 'Junior Advocate';
        if (category === 'interns') designation = 'Legal Intern';
        
        let waLinkHtml = '';
        if (category === 'leading') {
            let nameClean = name.replace(/\./g, '').trim();
            let phone = '';
            if (nameClean.includes('Zameel')) phone = '918606875979';
            if (nameClean.includes('Abdulla')) phone = '919496470069';
            
            if (phone) {
                const encodedMsg = encodeURIComponent(`Hello ${name}, I would like to consult regarding...`);
                waLinkHtml = `                        <a href="https://wa.me/${phone}?text=${encodedMsg}" target="_blank" class="card-whatsapp-link" aria-label="Chat on WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                        </a>\n`;
            }
        }
        
        const photoPath = `images/team/${dirName}/${file}`;
        
        html += `                    <div class="team-card ${cardClass}">
                        <div class="team-image">
                            <img src="${photoPath}" alt="${name}" class="team-photo">
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">${name}</h3>\n`;
        if (extra) {
            html += `                            <p class="team-extra-info">${extra}</p>\n`;
        }
        if (category === 'leading') {
            html += `                            <p class="team-designation">${designation}</p>
                            <p class="team-spec">${degree}</p>\n`;
        }
        html += `                        </div>\n${waLinkHtml}                    </div>\n`;
    });
    
    html += '                </div>\n';
    return html;
}

// Generate team components dynamically
const leadingHtml = getTeamHtml('leading', '', defaultLeadingHtml, 'leading');
const associatesHtml = getTeamHtml('associates', 'team-card-small', defaultAssociatesHtml, 'associates');
const internsHtml = getTeamHtml('interns', 'team-card-mini', defaultInternsHtml, 'interns');

// Replace team section contents inside indexHtml
indexHtml = indexHtml.replace(
    /(<!-- START_LEADING_COUNSEL -->)[\s\S]*?(<!-- END_LEADING_COUNSEL -->)/,
    `$1${leadingHtml}$2`
);
indexHtml = indexHtml.replace(
    /(<!-- START_ASSOCIATE_ADVOCATES -->)[\s\S]*?(<!-- END_ASSOCIATE_ADVOCATES -->)/,
    `$1${associatesHtml}$2`
);
indexHtml = indexHtml.replace(
    /(<!-- START_LEGAL_INTERNS -->)[\s\S]*?(<!-- END_LEGAL_INTERNS -->)/,
    `$1${internsHtml}$2`
);

// Inline/update the stylesheet
const cssReplacement = `<style id="inlined-style">\n${cssContent}\n</style>`;
if (indexHtml.includes('<style id="inlined-style">')) {
    indexHtml = indexHtml.replace(/<style id="inlined-style">[\s\S]*?<\/style>/, cssReplacement);
} else if (indexHtml.includes('<style>')) {
    indexHtml = indexHtml.replace(/<style>[\s\S]*?<\/style>/, cssReplacement);
} else {
    indexHtml = indexHtml.replace(/<link rel=["']stylesheet["'] href=["']style\.css["']>/, cssReplacement);
}

// Inline/update the script
const jsReplacement = `<script id="inlined-script">\n${jsContent}\n</script>`;
if (indexHtml.includes('<script id="inlined-script">')) {
    indexHtml = indexHtml.replace(/<script id="inlined-script">[\s\S]*?<\/script>/, jsReplacement);
} else {
    indexHtml = indexHtml.replace(/<script src=["']script\.js["']><\/script>/, jsReplacement);
}

// Inject SEO tags right before </head> if they aren't already there
if (!indexHtml.includes('<!-- SEO Optimization Meta Tags -->')) {
    indexHtml = indexHtml.replace('</head>', `${seoTags}\n</head>`);
}

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Compilation, SEO integration, and Team auto-generation completed successfully.');
