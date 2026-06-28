/**
 * ==========================================================================
 * Arbitrum Learn - Live Price Engine (CoinGecko API Fetch Integration)
 * ==========================================================================
 */

const API_ENDPOINT = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true";

// DOM Element Targets
const loadingArea = document.getElementById('loadingArea');
const cryptoDashboard = document.getElementById('cryptoDashboard');
const refreshBtn = document.getElementById('refreshBtn');
const timestampDisplay = document.getElementById('lastUpdatedTimestamp');

// Price targets
const btcPrice = document.getElementById('btcPrice');
const btcChange = document.getElementById('btcChange');
const btcStatus = document.getElementById('btcStatus');

const ethPrice = document.getElementById('ethPrice');
const ethChange = document.getElementById('ethChange');
const ethStatus = document.getElementById('ethStatus');

/**
 * Asynchronously fetches and updates the cryptocurrency UI cards
 */
async function fetchCryptoPrices() {
    // Show spinner loading UI state
    loadingArea.style.display = "flex";
    cryptoDashboard.style.display = "none";
    refreshBtn.disabled = true;

    try {
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }
        
        const data = await response.json();
        updateMarketUI(data);

    } catch (error) {
        console.error("Failed parsing live asset rates:", error);
        // Render error card replacement safely inline
        loadingArea.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Connection Error</h3>
                <p>Could not fetch real-time token price matrix. CoinGecko API might be rate-limited. Please try again shortly.</p>
                <button onclick="window.location.reload();" class="btn-gradient" style="margin-top:1rem; padding: 0.5rem 1rem; font-size:0.9rem;">Retry Interface</button>
            </div>
        `;
    } finally {
        // Clear global loading flags
        refreshBtn.disabled = false;
    }
}

/**
 * Parses JSON matrix onto HTML UI Node structures
 * @param {Object} data - Clean JSON output from CoinGecko
 */
function updateMarketUI(data) {
    // Extract targets safely
    const bitcoin = data.bitcoin;
    const ethereum = data.ethereum;

    // 1. Process Bitcoin Metrics
    btcPrice.textContent = `$${bitcoin.usd.toLocaleString()}`;
    formatChangeIndicator(btcChange, btcStatus, bitcoin.usd_24h_change);

    // 2. Process Ethereum Metrics
    ethPrice.textContent = `$${ethereum.usd.toLocaleString()}`;
    formatChangeIndicator(ethChange, ethStatus, ethereum.usd_24h_change);

    // 3. Stamp Execution Time
    const currentClock = new Date();
    timestampDisplay.textContent = `Last Updated: ${currentClock.toLocaleTimeString()}`;

    // Swap loading blocks out
    loadingArea.style.display = "none";
    cryptoDashboard.style.display = "grid";
}

/**
 * Dynamically binds color coding properties onto target UI rows
 * @param {HTMLElement} changeEl - Target metric percentage element
 * @param {HTMLElement} statusEl - Target context description block
 * @param {Number} rawPercentageValue - Rate delta from API pipeline
 */
function formatChangeIndicator(changeEl, statusEl, rawPercentageValue) {
    const parsedPercent = rawPercentageValue.toFixed(2);
    
    if (rawPercentageValue >= 0) {
        changeEl.className = "price-change up";
        changeEl.textContent = `▲ ${parsedPercent}%`;
        statusEl.textContent = "Market is gaining";
        statusEl.style.color = "var(--success)";
    } else {
        changeEl.className = "price-change down";
        changeEl.textContent = `▼ ${parsedPercent}%`;
        statusEl.textContent = "Market is declining";
        statusEl.style.color = "var(--danger)";
    }
}

// Attach explicit explicit click listeners to execution button
refreshBtn.addEventListener('click', fetchCryptoPrices);

// Initial Trigger on runtime launch sequence
document.addEventListener('DOMContentLoaded', fetchCryptoPrices);