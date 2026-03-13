import { Network, Account } from "@aptos-labs/ts-sdk";
import { ShelbyNodeClient } from "@shelby-protocol/sdk/node";
import fs from "fs/promises";
import path from "path";

// Tham số giả lập dự đoán (Simulated Prediction Model)
function generatePredictionData(assets: string[]) {
  const predictions: any = {};
  const now = new Date();
  
  assets.forEach(asset => {
    // Giả lập giá hiện tại (Randomized baseline)
    const basePrice = Math.random() * 1000 + 50; 
    
    // Dự đoán xu hướng giá (Volatility +- 5%)
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
  console.log("🚀 Bắt đầu quá trình tạo và lưu trữ dự đoán giá lên Shelby Protocol...\n");

  const assets = ["APT", "BTC", "ETH", "SOL", "SUI"];
  const predictionData = generatePredictionData(assets);
  
  // 1. Tạo file dự đoán cục bộ
  const dataDir = path.join(__dirname, "../data");
  await fs.mkdir(dataDir, { recursive: true });
  
  const fileName = `predictions-${Date.now()}.json`;
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(predictionData, null, 2));
  
  console.log(`✅ Đã tạo file dự đoán tại: ${filePath}`);
  console.log("Xem trước dữ liệu:");
  console.log(predictionData);
  console.log("\n-----------------------------------------------\n");

  // 2. Thiết lập cấu hình Shelby Client
  // LƯU Ý: ĐÂY QUAN TRỌNG
  console.log("⚠️ CHÚ Ý QUAN TRỌNG ĐỂ UPLOAD LÊN MẠNG SHELBY:");
  console.log("Để thực sự lưu trữ cục dữ liệu JSON này lên Shelby Network, bạn cần:");
  console.log("  1) Một ví Aptos Testnet Account có chứa Testnet APT (gas fee).");
  console.log("  2) Ví đó phải có Testnet ShelbyUSD (upload fee).");
  console.log("  3) Một API Key hợp lệ từ Aptos/Shelby Protocol.");
  console.log("\nVì đây là dự án demo (Quickstart/Template), chức năng upload đang được đóng gói sẵn dưới dạng comment (vô hiệu hóa tạm thời) để tránh lỗi thi hành khi bạn chưa cung cấp token.\n");

  /*
  // --- BỎ COMMENT PHẦN DƯỚI ĐÂY KHI BẠN ĐÃ SẴN SÀNG ---
  
  // Tạo tài khoản hoặc nạp tài khoản đã có (import private key)
  const account = Account.generate(); 
  // const account = new Ed25519Account({ privateKey: new Ed25519PrivateKey("YOUR_PRIVATE_KEY") });
  
  console.log("Generated Account Address:", account.accountAddress.toString());

  const config = {
    network: Network.TESTNET,
    apiKey: "YOUR_API_KEY_HERE", 
  };

  const shelbyClient = new ShelbyNodeClient(config);
  const blobData = await fs.readFile(filePath);

  console.log("⏳ Đang tải dữ liệu dự đoán lên Shelby...");
  await shelbyClient.upload({
    account,
    blobData,
    blobName: `price-predictions/${fileName}`,
    expirationMicros: (1000 * 60 * 60 * 24 * 30 + Date.now()) * 1000, // Gia hạn lưu trữ 30 ngày
  });

  console.log("🎉 Upload thành công lên hạ tầng Decentralized Storage của Shelby!");
  */
  
  console.log("Chương trình chạy hoàn tất. \nHãy cung cấp API KEY và mở phần upload code để đưa cục dữ liệu JSON này vĩnh viễn (hoặc theo kỳ hạn) lên Shelby Protocol nhé!");
}

main().catch(console.error);
