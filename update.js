const fs = require('fs');

const filesToUpdate = ['blog.html', 'artikel-1.html', 'artikel-2.html', 'artikel-3.html'];

const fabCss = `
        /* FAB / Fixed Buttons */
        .fab-wrap { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 50; display: flex; flex-direction: column; gap: 1rem; }
        .fab-scroll { display: flex; height: 3rem; width: 3rem; align-items: center; justify-content: center; border-radius: 9999px; background-color: var(--forest); color: white; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); border: none; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .fab-scroll:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); }
        .fab-wa { display: flex; height: 3.5rem; width: 3.5rem; align-items: center; justify-content: center; border-radius: 9999px; background-color: #25D366; color: white; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); text-decoration: none; transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s; }
        .fab-wa:hover { transform: translateY(-4px); background-color: #128C7E; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); }
        .fab-wa i { font-size: 1.875rem; }

        .footer-brand { display: flex; flex-direction: column; gap: 1rem; }
        .footer-brand p { font-size: 0.875rem; line-height: 1.7; color: var(--white-70); }
        .footer-contact { display: flex; flex-direction: column; gap: 0.75rem; }
        .footer-contact li { display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.875rem; color: var(--white-70); list-style: none; }
        .footer-contact li .material-symbols-outlined { color: var(--primary); flex-shrink: 0; }
        .footer-links { display: flex; flex-direction: column; gap: 0.5rem; list-style: none; }
        .social-icon:hover { background-color: var(--primary); color: var(--forest); }
`;

const footerAndFabHtml = `    <!-- FAB -->
    <div class="fab-wrap">
        <button class="fab-scroll" aria-label="Scroll to top" onclick="window.scrollTo({top:0,behavior:'smooth'})">
            <span class="material-symbols-outlined">arrow_upward</span>
        </button>
        <a class="fab-wa" href="https://wa.me/6281234567890" target="_blank" aria-label="Contact WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
    </div>

    <!-- Footer -->
    <footer id="contact">
        <div class="max-w-7xl" style="max-width: 80rem; margin: 0 auto;">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-brand-top">
                        <div class="icon-wrap">
                            <span class="material-symbols-outlined">hiking</span>
                        </div>
                        <h2>Outbond Malang</h2>
                    </div>
                    <p>Partner terbaik untuk kegiatan outbound, gathering, dan team building perusahaan Anda di Malang Raya.</p>
                </div>
                <div class="footer-col">
                    <h3>Contact Us</h3>
                    <ul class="footer-contact">
                        <li>
                            <span class="material-symbols-outlined">location_on</span>
                            <span>Jl. Raya Tlogomas No. 246,<br />Malang, Jawa Timur 65144</span>
                        </li>
                        <li>
                            <span class="material-symbols-outlined">phone</span>
                            <span>+62 812 3456 7890</span>
                        </li>
                        <li>
                            <span class="material-symbols-outlined">mail</span>
                            <span>hello@outbondmalang.id</span>
                        </li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul class="footer-links" style="padding:0;">
                        <li><a href="index.html">About Us</a></li>
                        <li><a href="index.html#packages">Our Packages</a></li>
                        <li><a href="index.html#gallery">Gallery</a></li>
                        <li><a href="#">Terms &amp; Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Follow Us</h3>
                    <div class="social-icons">
                        <a class="social-icon" href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a class="social-icon" href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                        <a class="social-icon" href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2023 Outbond Malang. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

['index.html', ...filesToUpdate].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace header logo with a link
    content = content.replace(
        /<div class="header-brand">\s*<div class="header-icon-wrap">\s*<span class="material-symbols-outlined".*?>hiking<\/span>\s*<\/div>\s*<h2>Outbond Malang<\/h2>\s*<\/div>/,
        '<a href="index.html" class="header-brand" style="text-decoration: none;">\n            <div class="header-icon-wrap"><span class="material-symbols-outlined">hiking</span></div>\n            <h2>Outbond Malang</h2>\n        </a>'
    );

    if (filesToUpdate.includes(file)) {
        // Append missing CSS
        if (!content.includes('.fab-wrap { position: fixed;')) {
            content = content.replace('</style>', fabCss + '</style>');
        }

        // Replace footer and append FAB
        content = content.replace(/<\/main>[\s\S]*<\/html>/ig, '</main>\n\n' + footerAndFabHtml);
    }

    fs.writeFileSync(file, content);
});
console.log("Updated files!");
