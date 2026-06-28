/**
 * ==========================================================================
 * Arbitrum Learn - Blockchain Ledger & Consensus Engine (Web Crypto API)
 * ==========================================================================
 */

// Block 1 Elements Reference Model
const dataB1 = document.getElementById('dataBlock1');
const prevHashB1 = document.getElementById('prevHashBlock1');
const nonceB1 = document.getElementById('nonceBlock1');
const hashB1 = document.getElementById('hashBlock1');
const mineBtnB1 = document.getElementById('mineBtnBlock1');
const resetBtnB1 = document.getElementById('resetBtnBlock1');
const cardB1 = document.getElementById('cardBlock1');
const badgeB1 = document.getElementById('badgeBlock1');
const visualN1 = document.getElementById('visualNode1');

// Block 2 Elements Reference Model
const dataB2 = document.getElementById('dataBlock2');
const prevHashB2 = document.getElementById('prevHashBlock2');
const nonceB2 = document.getElementById('nonceBlock2');
const hashB2 = document.getElementById('hashBlock2');
const mineBtnB2 = document.getElementById('mineBtnBlock2');
const resetBtnB2 = document.getElementById('resetBtnBlock2');
const cardB2 = document.getElementById('cardBlock2');
const badgeB2 = document.getElementById('badgeBlock2');
const visualN2 = document.getElementById('visualNode2');

// Global Chain Indicators
const visualLink = document.getElementById('visualLink');
const warningBanner = document.getElementById('chainWarningBanner');

// Track verification flags across nodes
let isBlock1Valid = false;
let isBlock2Valid = false;

/**
 * Encrypts raw parameters using native SHA-256 interface asynchronously
 * @param {string} payload - Combined text stream sequence
 * @returns {Promise<string>} Hexadecimal output format representation
 */
async function generateSHA256(payload) {
    const encoder = new TextEncoder();
    const data = encoder.encode(payload);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Handles the recursive cryptographic iteration sequence for verification
 * @param {number} blockNum - Identity flag pointer
 */
async function mineBlock(blockNum) {
    if (blockNum === 1) {
        setMiningUIState(mineBtnB1, badgeB1, cardB1);
        let nonce = 0;
        let calculatedHash = "";
        
        while (true) {
            calculatedHash = await generateSHA256(dataB1.value + prevHashB1.value + nonce);
            if (calculatedHash.startsWith("00")) break;
            nonce++;
            if (nonce % 500 === 0) { // Keep thread responsive
                nonceB1.value = nonce;
                hashB1.value = calculatedHash;
                await new Promise(r => setTimeout(r, 1));
            }
        }
        
        nonceB1.value = nonce;
        hashB1.value = calculatedHash;
        isBlock1Valid = true;
        
        setValidUIState(mineBtnB1, badgeB1, cardB1, visualN1, "Block successfully mined.");
        
        // Pass parent link updates downwards onto Block #2 input channel
        prevHashB2.value = calculatedHash;
        mineBtnB2.disabled = false;
        
        evaluateChainIntegrity();
    } else {
        setMiningUIState(mineBtnB2, badgeB2, cardB2);
        let nonce = 0;
        let calculatedHash = "";
        
        while (true) {
            calculatedHash = await generateSHA256(dataB2.value + prevHashB2.value + nonce);
            if (calculatedHash.startsWith("00")) break;
            nonce++;
            if (nonce % 500 === 0) {
                nonceB2.value = nonce;
                hashB2.value = calculatedHash;
                await new Promise(r => setTimeout(r, 1));
            }
        }
        
        nonceB2.value = nonce;
        hashB2.value = calculatedHash;
        isBlock2Valid = true;
        
        setValidUIState(mineBtnB2, badgeB2, cardB2, visualN2, "Block successfully mined.");
        evaluateChainIntegrity();
    }
}

/**
 * Live evaluation mapping tracking validation conditions
 */
async function evaluateChainIntegrity() {
    // Recalculate Block 1 real-time checksum matches
    const currentB1Hash = await generateSHA256(dataB1.value + prevHashB1.value + nonceB1.value);
    
    if (!currentB1Hash.startsWith("00") || !isBlock1Valid) {
        isBlock1Valid = false;
        setInvalidUIState(badgeB1, cardB1, visualN1);
    } else {
        setValidUIState(mineBtnB1, badgeB1, cardB1, visualN1, "Block Valid");
    }

    // Dynamic state matching for cryptographic dependency constraints
    if (prevHashB2.value !== hashB1.value || !isBlock1Valid) {
        isBlock2Valid = false;
        setInvalidUIState(badgeB2, cardB2, visualN2);
        mineBtnB2.disabled = true;
        warningBanner.style.display = "block";
    } else {
        warningBanner.style.display = "none";
        if (mineBtnB1.disabled === false) mineBtnB2.disabled = false;
    }

    // Verify final operational layer validation status updates
    const currentB2Hash = await generateSHA256(dataB2.value + prevHashB2.value + nonceB2.value);
    if (!currentB2Hash.startsWith("00") || !isBlock2Valid) {
        isBlock2Valid = false;
        setInvalidUIState(badgeB2, cardB2, visualN2);
    } else {
        setValidUIState(mineBtnB2, badgeB2, cardB2, visualN2, "Block Valid");
    }

    // Toggle linkage path metrics color mappings cleanly
    if (isBlock1Valid && isBlock2Valid) {
        visualLink.className.baseVal = "chain-arrow valid";
    } else {
        visualLink.className.baseVal = "chain-arrow invalid";
    }
}

// UI State Mutators Configuration Matrix
function setMiningUIState(button, badge, card) {
    button.disabled = true;
    badge.className = "status-badge mining";
    badge.textContent = "Mining in progress...";
}

function setValidUIState(button, badge, card, node, message) {
    button.disabled = false;
    badge.className = "status-badge valid";
    badge.textContent = message;
    card.className = "glass-card block-card valid";
    node.className = "node-box valid";
}

function setInvalidUIState(badge, card, node) {
    badge.className = "status-badge invalid";
    badge.textContent = "Block Invalid";
    card.className = "glass-card block-card invalid";
    node.className = "node-box invalid";
}

// Interactivity Handlers Integration
dataB1.addEventListener('input', () => { isBlock1Valid = false; evaluateChainIntegrity(); });
dataB2.addEventListener('input', () => { isBlock2Valid = false; evaluateChainIntegrity(); });

mineBtnB1.addEventListener('click', () => mineBlock(1));
mineBtnB2.addEventListener('click', () => mineBlock(2));

resetBtnB1.addEventListener('click', () => {
    dataB1.value = "Arbitrum Builder Lab Project Data";
    nonceB1.value = "0";
    hashB1.value = "--";
    isBlock1Valid = false;
    prevHashB2.value = "--";
    evaluateChainIntegrity();
});

resetBtnB2.addEventListener('click', () => {
    dataB2.value = "Secure Layer 2 Transaction Payload";
    nonceB2.value = "0";
    hashB2.value = "--";
    isBlock2Valid = false;
    evaluateChainIntegrity();
});

// Runtime Launch Evaluation Parameters Initialization Sequence
evaluateChainIntegrity();