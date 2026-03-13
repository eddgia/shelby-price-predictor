# Shelby Price Predictor 🚀📈

This project is a Proof of Concept (PoC) demonstrating how to generate Crypto Price Predictions and securely upload and store that JSON data onto the decentralized **Shelby Protocol** network.

## 🧐 Project Idea
- Simulates a Quantitative Calculation Model (`Quant Model`) to forecast the price trends for assets (APT, BTC, ETH...) over the next 24H.
- Encapsulates the results within a JSON data structure.
- Packages this JSON file into a data blob, sets an expiration time, and directly uploads it to Storage Providers via the [Shelby Network](https://docs.shelby.xyz/protocol).

## 🛠️ Installation & Execution

1. **System Requirements:**
   - Node.js version 18+

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Data Generation Script:**
   By default, the script generates mock data and saves it in the local `data/` folder so you can visualize the output.
   ```bash
   npm start
   ```

## 🌐 Storing Data Permanently on Shelby
Once you're ready to upload real data to the Shelby Network Testnet:

1. Register and acquire an **[API Key](https://docs.shelby.xyz/sdks/typescript/acquire-api-keys)**.
2. Fund your Aptos (Testnet) wallet with gas via the **[Aptos Faucet](https://aptos.dev/network/faucet)** and acquire ShelbyUSD from the project's Discord channel.
3. Open `src/index.ts`.
4. Run the project with `npm start` utilizing a properly funded account. The data will become immutable on the Shelby Decentralized Storage network.

## Underlying Technologies
- 📘 [Aptos Blockchain SDK](https://github.com/aptos-labs/aptos-ts-sdk)
- 📘 [Shelby Typescript SDK](https://docs.shelby.xyz/sdks/typescript)
