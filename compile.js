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
                <div class="grid grid-2 scroll-reveal fade-up" style="margin-bottom: 60px;">
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
        
        if (nameWithoutExt.includes('-')) {
            const parts = nameWithoutExt.split('-');
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
        
        const photoPath = `images/team/${dirName}/${file}`;
        
        html += `                    <div class="team-card ${cardClass}">
                        <div class="team-image">
                            <img src="${photoPath}" alt="${name}" class="team-photo">
                        </div>
                        <div class="team-info">
                            <h3 class="team-name">${name}</h3>\n`;
        if (category === 'leading') {
            html += `                            <p class="team-designation">${designation}</p>
                            <p class="team-spec">${degree}</p>\n`;
        }
        html += `                        </div>
                    </div>\n`;
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
