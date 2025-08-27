<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Is It Down Right Now - Website Status Checker | BuyLeadData</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/website.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .main-wrapper {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }

        h1 {
            color: #1e3c72;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        .tagline {
            color: #666;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .search-section {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
        }

        .search-label {
            display: block;
            margin-bottom: 15px;
            font-size: 1.1rem;
            color: #333;
        }

        .search-form {
            display: flex;
            gap: 10px;
        }

        .search-input {
            flex: 1;
            padding: 12px 15px;
            font-size: 1rem;
            border: 2px solid #ddd;
            border-radius: 5px;
            transition: border-color 0.3s;
        }

        .search-input:focus {
            outline: none;
            border-color: #2a5298;
        }

        .search-btn {
            background: #2a5298;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .search-btn:hover {
            background: #1e3c72;
        }

        .section-title {
            font-size: 1.5rem;
            color: #1e3c72;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e0e0e0;
        }

        .websites-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 40px;
        }

        .website-item {
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 15px;
            transition: all 0.3s;
        }

        .website-item:hover {
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }

        .website-name {
            font-weight: bold;
            color: #2a5298;
            font-size: 1.1rem;
            margin-bottom: 8px;
        }

        .website-status {
            font-size: 0.9rem;
            color: #666;
        }

        .status-up {
            color: #28a745;
        }

        .status-down {
            color: #dc3545;
        }

        .check-time {
            font-size: 0.85rem;
            color: #999;
            margin-top: 5px;
        }

        .latest-checked {
            margin-top: 40px;
        }

        .latest-list {
            background: #f8f9fa;
            border-radius: 5px;
            padding: 20px;
        }

        .latest-item {
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .latest-item:last-child {
            border-bottom: none;
        }

        .latest-domain {
            font-weight: bold;
            color: #2a5298;
        }

        .latest-status {
            font-size: 0.9rem;
            margin-top: 5px;
        }

        .comments-section {
            margin-top: 40px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
        }

        .comment-item {
            padding: 15px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .comment-item:last-child {
            border-bottom: none;
        }

        .comment-author {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .comment-site {
            color: #2a5298;
            font-size: 0.9rem;
            margin-left: 10px;
        }

        .comment-text {
            color: #666;
            margin-top: 5px;
        }

        .refresh-btn {
            background: #2a5298;
            color: white;
            border: none;
            padding: 10px 25px;
            font-size: 0.95rem;
            border-radius: 5px;
            cursor: pointer;
            margin: 20px auto;
            display: block;
            transition: background 0.3s;
        }

        .refresh-btn:hover {
            background: #1e3c72;
        }

        .loading {
            text-align: center;
            padding: 40px;
            color: #666;
        }

        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #2a5298;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .footer {
            text-align: center;
            padding: 20px;
            color: #999;
            font-size: 0.9rem;
            margin-top: 30px;
        }

        .proxy-notice {
            background: #fff3cd;
            border: 1px solid #ffc107;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            text-align: center;
        }

        @media (max-width: 768px) {
            .websites-grid {
                grid-template-columns: 1fr;
            }

            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
        <!-- Include Header -->

    <?php 

    if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/includes/header.html')) {

        include($_SERVER['DOCUMENT_ROOT'] . '/includes/header.html');

    }

    ?>
    <div class="container">
        <div class="main-wrapper">
            <header>
                <h1>Is It Down Right Now ?</h1>
                <p class="tagline">
                    "Is It Down Right Now" monitors the status of your favorite web sites and checks whether they are down or not. 
                    Check a website status easily by using the below test tool. Just enter the url and a fresh site status test 
                    will be performed on the domain name in real time using our online website checker tool.
                </p>
            </header>

            <div class="proxy-notice">
            </div>

            <div class="search-section">
                <label class="search-label">Enter a domain below to check whether it is down or not...</label>
                <div class="search-form">
                    <input type="text" class="search-input" id="domainInput" placeholder="example.com">
                    <button class="search-btn" onclick="checkWebsite()">Check</button>
                </div>
            </div>

            <section class="top-websites">
                <h2 class="section-title">Top Websites</h2>
                <button class="refresh-btn" onclick="fetchLiveData()">🔄 Refresh Live Data</button>
                <div id="websitesGrid" class="websites-grid">
                    <div class="loading">
                        <div class="spinner"></div>
                        <p>Loading website statuses...</p>
                    </div>
                </div>
            </section>

            <section class="latest-checked">
                <h2 class="section-title">Latest Sites Checked</h2>
                <div id="latestList" class="latest-list">
                    <!-- Latest checked sites will appear here -->
                </div>
            </section>

            <section class="comments-section">
                <h2 class="section-title">Recent Comments</h2>
                <div id="commentsList">
                    <!-- Comments will appear here -->
                </div>
            </section>

            <div class="footer">
                <p>This service helps you find whether the website you are trying to browse is down or not.</p>
                <p>© 2025 BuyLeadData.com - Data sourced from isitdownrightnow.com</p>
            </div>
        </div>
    </div>

    <script>
        // Website status data from isitdownrightnow.com
        const websiteData = [
            { name: 'Netflix', domain: 'Netflix.com', status: 'up', time: '45 mins ago' },
            { name: 'Facebook', domain: 'Facebook.com', status: 'up', time: '0 seconds ago' },
            { name: 'Youtube', domain: 'Youtube.com', status: 'up', time: '1 min ago' },
            { name: 'Yahoo Mail', domain: 'Mail.yahoo.com', status: 'up', time: '13 mins ago' },
            { name: 'Google', domain: 'Google.com', status: 'up', time: '36 mins ago' },
            { name: 'Outlook', domain: 'Outlook.com', status: 'up', time: '13 mins ago' },
            { name: 'Steam Community', domain: 'Steamcommunity.com', status: 'up', time: '2 hours 18 mins ago' },
            { name: 'Yahoo', domain: 'Yahoo.com', status: 'up', time: '26 mins ago' },
            { name: 'WhatsApp', domain: 'Whatsapp.com', status: 'down', time: '3 mins ago' },
            { name: 'Windows Live Hotmail', domain: 'Live.com', status: 'down', time: '16 mins ago' },
            { name: 'Instagram', domain: 'Instagr.am', status: 'up', time: '0 seconds ago' },
            { name: 'Gmail', domain: 'Mail.google.com', status: 'up', time: '42 mins ago' },
            { name: 'Dropbox', domain: 'Dropbox.com', status: 'up', time: '5 mins ago' },
            { name: 'Battle Net US', domain: 'Battle.net', status: 'up', time: '35 mins ago' },
            { name: 'Reddit', domain: 'Reddit.com', status: 'down', time: '34 mins ago' },
            { name: 'FanFiction', domain: 'Fanfiction.net', status: 'up', time: '1 hour 1 min ago' },
            { name: 'Amazon', domain: 'Amazon.com', status: 'up', time: '6 mins ago' },
            { name: 'Pinterest', domain: 'Pinterest.com', status: 'up', time: '4 hours 52 mins ago' },
            { name: 'Twitter', domain: 'Twitter.com', status: 'down', time: '17 mins ago' },
            { name: 'Tumblr', domain: 'Tumblr.com', status: 'up', time: '41 mins ago' },
            { name: 'Xbox', domain: 'Xbox.com', status: 'up', time: '2 hours 15 mins ago' },
            { name: 'AOL', domain: 'Aol.com', status: 'up', time: '12 mins ago' },
            { name: 'Minecraft', domain: 'Minecraft.net', status: 'up', time: '26 mins ago' },
            { name: 'Comcast', domain: 'Comcast.com', status: 'down', time: '28 mins ago' },
            { name: 'POF - Plenty of Fish', domain: 'Pof.com', status: 'up', time: '42 mins ago' },
            { name: 'Pandora', domain: 'Pandora.com', status: 'up', time: '10 hours 27 mins ago' },
            { name: 'Omegle', domain: 'Omegle.com', status: 'up', time: '10 mins ago' },
            { name: 'Paypal', domain: 'Paypal.com', status: 'up', time: '22 mins ago' },
            { name: 'Craigslist', domain: 'Craigslist.org', status: 'up', time: '1 hour 27 mins ago' },
            { name: 'AT&T', domain: 'Att.com', status: 'up', time: '9 mins ago' },
            { name: 'T-Mobile USA', domain: 'T-mobile.com', status: 'up', time: '31 mins ago' },
            { name: 'Google Drive', domain: 'Drive.google.com', status: 'up', time: '2 hours 45 mins ago' },
            { name: 'Steam Store', domain: 'Steampowered.com', status: 'up', time: '24 mins ago' },
            { name: 'Hulu', domain: 'Hulu.com', status: 'up', time: '10 mins ago' },
            { name: 'League Of Legends NA', domain: 'Leagueoflegends.com', status: 'up', time: '6 hours 30 mins ago' },
            { name: 'TwitchTV', domain: 'Twitch.tv', status: 'up', time: '11 mins ago' },
            { name: 'Ubisoft', domain: 'Ubi.com', status: 'up', time: '1 hour 21 mins ago' },
            { name: 'OkCupid', domain: 'Okcupid.com', status: 'up', time: '2 hours 16 mins ago' }
        ];

        const latestChecked = [
            { domain: 'rockauto.com', name: 'Rockauto', status: 'up', time: '0 seconds ago' },
            { domain: 'facebook.com', name: 'Facebook', status: 'up', time: '0 seconds ago' },
            { domain: 'sofifa.com', name: 'Sofifa', status: 'up', time: '2 secs ago' },
            { domain: 'turkcell.com.tr', name: 'Turkcell', status: 'up', time: '6 secs ago' },
            { domain: 'character.ai', name: 'Character', status: 'up', time: '17 secs ago' }
        ];

        const downSites = [
            { domain: 'myvidster.com', name: 'myVidster', status: 'down', time: '21 mins ago' },
            { domain: 'downdetector.com', name: 'Downdetector', status: 'down', time: '37 mins ago' },
            { domain: 'cloudflare.com', name: 'CloudFlare', status: 'down', time: '47 mins ago' },
            { domain: 'archiveofourown.org', name: 'Archive of Our Own', status: 'down', time: '12 mins ago' },
            { domain: 'planetminecraft.com', name: 'Planet Minecraft', status: 'down', time: '1 hour 55 mins ago' }
        ];

        const recentComments = [
            { author: 'Becca Thompson', site: 'regions.com', text: 'Down in Atlanta, GA...' },
            { author: 'Debbie Burton Porter', site: 'ancestry.com', text: 'Down, cannot access....' },
            { author: 'Sheila Merrill Vesciglio', site: 'mail.google.com', text: 'My gmail is down. 12/14/18 9:18 am...' },
            { author: 'Mark Wade', site: 'amazon.com', text: 'Unable to access Amazon.com 6:40p et...' }
        ];

        // Display initial data
        function displayWebsites() {
            const grid = document.getElementById('websitesGrid');
            grid.innerHTML = websiteData.map(site => `
                <div class="website-item">
                    <div class="website-name">${site.name}</div>
                    <div class="website-status ${site.status === 'up' ? 'status-up' : 'status-down'}">
                        ${site.domain} is ${site.status}.
                    </div>
                    <div class="check-time">Checked ${site.time}.</div>
                </div>
            `).join('');
        }

        function displayLatestChecked() {
            const latest = document.getElementById('latestList');
            const allLatest = [...latestChecked, ...downSites];
            
            latest.innerHTML = allLatest.map(site => `
                <div class="latest-item">
                    <span class="latest-domain">${site.domain}</span> - ${site.name}
                    <div class="latest-status ${site.status === 'up' ? 'status-up' : 'status-down'}">
                        Server is ${site.status}. Last checked ${site.time}.
                    </div>
                </div>
            `).join('');
        }

        function displayComments() {
            const comments = document.getElementById('commentsList');
            comments.innerHTML = recentComments.map(comment => `
                <div class="comment-item">
                    <div class="comment-author">
                        ${comment.author}
                        <span class="comment-site">${comment.site}</span>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                </div>
            `).join('');
        }

        async function fetchLiveData() {
            const grid = document.getElementById('websitesGrid');
            grid.innerHTML = `
                <div class="loading" style="grid-column: 1/-1;">
                    <div class="spinner"></div>
                    <p>Fetching live data from isitdownrightnow.com...</p>
                </div>
            `;

            try {
                // IMPORTANT: Replace with your actual backend endpoint
                const response = await fetch('https://www.buyleaddata.com/api/isitdown-proxy');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch live data');
                }

                const data = await response.json();
                
                // Parse and display the fetched data
                if (data && data.websites) {
                    grid.innerHTML = data.websites.map(site => `
                        <div class="website-item">
                            <div class="website-name">${site.name}</div>
                            <div class="website-status ${site.status === 'up' ? 'status-up' : 'status-down'}">
                                ${site.domain} is ${site.status}.
                            </div>
                            <div class="check-time">Checked ${site.time}.</div>
                        </div>
                    `).join('');
                } else {
                    displayWebsites(); // Fall back to sample data
                }
            } catch (error) {
                console.error('Error fetching live data:', error);
                alert('Note: Live data fetching requires a backend proxy server at /api/isitdown-proxy\n\nShowing sample data instead.');
                displayWebsites();
            }
        }

        function checkWebsite() {
            const domain = document.getElementById('domainInput').value.trim();
            if (!domain) {
                alert('Please enter a domain name');
                return;
            }

            // This would typically make an API call to check the website
            alert(`Checking status of ${domain}...\n\nNote: This requires backend implementation to actually check website status.`);
        }

        // Initialize display
        displayWebsites();
        displayLatestChecked();
        displayComments();

        // Backend proxy server example (Node.js/Express)
        const backendExample = `
/* 
Backend API endpoint needed at: /api/isitdown-proxy

Example Node.js/Express implementation:

const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

app.get('/api/isitdown-proxy', async (req, res) => {
    try {
        const response = await fetch('https://www.isitdownrightnow.com/');
        const html = await response.text();
        const $ = cheerio.load(html);
        
        const websites = [];
        
        // Parse the website data
        $('.tabletr').each((i, elem) => {
            const name = $(elem).find('.name').text().trim();
            const domain = $(elem).find('.domain').text().trim();
            const status = $(elem).find('.status').text().includes('up') ? 'up' : 'down';
            const time = $(elem).find('.time').text().trim();
            
            if (name && domain) {
                websites.push({ name, domain, status, time });
            }
        });
        
        res.json({ websites });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
*/
        `;

        console.log('Backend implementation needed:', backendExample);
    </script>
        <!-- Include Footer -->
    <?php 
    if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/includes/footer.html')) {
        include($_SERVER['DOCUMENT_ROOT'] . '/includes/footer.html');
    }
    ?>
    <script src="/js/website.js"></script>
</body>
</html>