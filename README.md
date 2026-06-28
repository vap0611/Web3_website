# 🚀 Arbitrum Learn – Web3 Educational Website

A modern, responsive educational website built to explain the fundamentals of **Web3**, **Blockchain**, **Ethereum**, and **Arbitrum Layer 2** through interactive and beginner-friendly pages.

This project was developed as part of the **Arbitrum Builder Lab Assignment**.

---

# 📖 Project Overview

**Arbitrum Learn** is a four-page educational website that helps beginners understand the core concepts of Web3. Along with theoretical explanations, it includes real-time cryptocurrency prices and an interactive blockchain mining simulator to demonstrate how blockchain technology works.

---

# ✨ Features

* 🌐 Responsive Multi-Page Website
* 🎨 Modern Web3 UI Design
* 📚 Beginner-Friendly Learning Content
* 📊 Live Cryptocurrency Price Dashboard
* 🔄 Real-Time Data from CoinGecko API
* ⛓️ Interactive Blockchain Mining Simulator
* 📱 Mobile-Friendly Layout
* ⚡ Smooth Animations and Hover Effects

---

# 📄 Website Pages

## 🏠 Page 1 – Home

The landing page introduces Web3 and Arbitrum Layer 2 with a modern hero section, feature cards, and an explanation of why Ethereum needed Layer 2 solutions.

### Includes:

* Hero Section
* Features
* Why Ethereum Needed Layer 2
* What is Arbitrum?
* Real-World Benefits
* Footer

---

## 📚 Page 2 – Core Web3 Concepts

A visual comparison page explaining important blockchain concepts using comparison cards.

### Concepts Covered:

* Web2 vs Web3
* Ethereum vs Bitcoin
* Public Key vs Private Key
* Blockchain vs Traditional Database

---

## 💰 Page 3 – Live Cryptocurrency Prices

A real-time cryptocurrency dashboard that fetches market data using the CoinGecko API.

### Features:

* Bitcoin (BTC) Price
* Ethereum (ETH) Price
* Current USD Price
* 24-Hour Price Change
* Green/Red Market Indicators
* Refresh Button
* Loading Animation
* Error Handling
* Last Updated Timestamp

---

## ⛓️ Page 4 – Blockchain Mining Simulator

An interactive simulator demonstrating how blockchain works using Proof of Work.

### Features:

* Two Connected Blocks
* SHA-256 Hash Generation
* Nonce-Based Mining
* Previous Hash Linking
* Blockchain Validation
* Chain Immutability Demonstration

Changing the data in Block 1 automatically invalidates Block 2, demonstrating how blockchain maintains data integrity.

---

# 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla)
* Web Crypto API (SHA-256)
* CoinGecko Public API

---

# 📂 Project Structure

```
Arbitrum-Learn/
│
├── index.html
├── concepts.html
├── prices.html
├── simulator.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── prices.js
│   └── simulator.js
│
├── images/
│
└── README.md
```

---

# 🚀 How to Run the Project

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension (recommended).
4. Right-click on **index.html** and select **Open with Live Server**.
5. Navigate through all four pages using the navigation bar.

---

# 🌐 API Used

**CoinGecko Public API**

API Endpoint:

https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true

The API is used to fetch:

* Bitcoin (BTC) Price
* Ethereum (ETH) Price
* 24-Hour Price Change

No API key is required.

---

# 📸 Screenshots

Add one screenshot of each page:

* 🏠 Home
* 📚 Core Web3 Concepts
* 💰 Live Cryptocurrency Prices
* ⛓️ Blockchain Mining Simulator

---

# 🚀 Future Improvements

* Support additional cryptocurrencies
* Wallet connection using MetaMask
* Live gas fee tracker
* Interactive blockchain animations
* Dark/Light mode toggle
* Advanced blockchain visualization

---

# 👩‍💻 Developed By

**Vidhi Patel**

Computer Engineering Student

Arbitrum Builder Lab

---

# 📄 License

This project is developed for educational purposes as part of the **Arbitrum Builder Lab Assignment**.
