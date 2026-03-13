import { Network, Account } from "@aptos-labs/ts-sdk";
import { ShelbyNodeClient } from "@shelby-protocol/sdk/node";
import fs from "fs/promises";
import path from "path";

// Simulated Prediction Model
function generatePredictionData(assets: string[]) {
  const predictions: any = {};
  const now = new Date();
  
  assets.forEach(asset => {
    // Randomized baseline current price
    const basePrice = Math.random() * 1000 + 50; 
    
    // Forecast price trend (Volatility +- 5%)
    const volatility = (Math.random() - 0.5) * 0.1;
    const predictedPrice = basePrice * (1 + volatility);
    
    predictions[asset] = {
      timestamp: now.toISOString(),
      current_price_usd: basePrice.toFixed(2),
      predicted_price_24h_usd: predictedPrice.toFixed(2),
      trend: volatility > 0 ? "BULLISH" : "BEARISH",
      confidence: (Math.random() * 40 + 60).toFixed(2) + "%" // 60-100% confidence
    };
  });

  return {
    model: "Shelby-Quant-V1",
    generated_at: now.toISOString(),
    data: predictions
  };
}

async function main() {
  console.log("🚀 Starting the process of generating and storing price predictions on the Shelby Protocol...\n");

  const assets = ["APT", "BTC", "ETH", "SOL", "SUI"];
  const predictionData = generatePredictionData(assets);
  
  // 1. Create a local prediction file
  const __dirname = path.resolve();
  const dataDir = path.join(__dirname, "data");
  await fs.mkdir(dataDir, { recursive: true });
  
  const fileName = `predictions-${Date.now()}.json`;
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(predictionData, null, 2));
  
  console.log(`✅ Created prediction file at: ${filePath}`);
  console.log("Data preview:");
  console.log(predictionData);
  console.log("\n-----------------------------------------------\n");

  // 2. Setup Shelby Client Configuration
  // NOTE: THIS IS IMPORTANT
  console.log("⚠️ IMPORTANT NOTICE FOR UPLOADING TO SHELBY NETWORK:");
  console.log("To actually store this JSON data onto the Shelby Network, you need:");
  console.log("  1) An Aptos Testnet Account with Testnet APT (gas fee).");
  console.log("  2) That wallet must also have Testnet ShelbyUSD (upload fee).");
  console.log("  3) A valid API Key from Aptos/Shelby Protocol.");
  console.log("\nSince this is a demo project, make sure these requirements are met before deployment.\n");

  // --- UNCOMMENT THE BELOW SECTION WHEN YOU ARE READY ---
  
  // Create account or load existing account (import private key)
  // [WARNING] DO NOT Hardcode your seed phrase/private key in the codebase for production!
  const mnemonic = "YOUR_SEED_PHRASE_HERE_OR_ENV_VARIABLE"; 
  // const account = Account.fromDerivationPath({ path: "m/44'/637'/0'/0'/0'", mnemonic });
  const account = Account.generate(); // Temporary auto-generate account to avoid crash
  
  console.log("Using account address:", account.accountAddress.toString());

  // Configure Shelby Testnet (Shelbynet) Network
  const config = {
    network: Network.TESTNET,
  };

  const shelbyClient = new ShelbyNodeClient(config);
  const blobData = await fs.readFile(filePath);

  console.log("⏳ Uploading prediction data to Shelby...");
  try {
    await shelbyClient.upload({
      signer: account,
      blobData,
      blobName: `price-predictions/${fileName}`,
      expirationMicros: (Date.now() + 1000 * 60 * 60) * 1000, // 1 hour storage expiration
    });
    console.log("🎉 Successfully uploaded onto Shelby's Decentralized Storage infrastructure!");
  } catch (err: any) {
    console.error("Upload failed:", err.message);
  }
  
  console.log("Execution completed.");
}

main().catch(console.error);
