# Shelby Price Predictor 🚀📈

Dự án này là một ứng dụng minh họa (Proof of Concept) về cách thức tạo ra dữ liệu dự đoán giá tiền điện tử (Crypto Price Predictions) và đăng tải, lưu trữ dữ liệu JSON đó lên mạng phân tán **Shelby Protocol**.

## 🧐 Ý tưởng dự án
- Mô phỏng một mô hình tính toán định lượng (`Quant Model`) nhằm dự báo xu hướng giá tài sản (APT, BTC, ETH...) trong vòng 24H.
- Gói gọn kết quả trả về của cấu trúc dữ liệu JSON.
- Đóng gói file JSON này thành cục dữ liệu blob, định thời gian hết hạn (expiration time: 30 ngày) và upload trực tiếp lên Storage Providers thông qua hạ tầng [Shelby Network](https://docs.shelby.xyz/protocol).

## 🛠️ Cài đặt & Chạy ứng dụng

1. **Yêu cầu hệ thống:**
   - Node.js version 18+

2. **Cài đặt Dependency:**
   ```bash
   npm install
   ```

3. **Chạy kịch bản sinh dữ liệu (Dry-run mode):**
   Mặc định script chỉ tạo dữ liệu giả lập và lưu vào thư mục `data/` trong máy bạn để bạn hình dung ra kết quả.
   ```bash
   npm start
   ```

## 🌐 Lưu trữ vĩnh viễn dữ liệu trên Shelby
Khi bạn đã sẵn sàng upload dữ liệu thực tế lên Shelby Network Testnet:

1. Đăng ký nhận **[API Key](https://docs.shelby.xyz/sdks/typescript/acquire-api-keys)**.
2. Nạp thêm Aptos (Testnet) làm phí gas qua **[Aptos Faucet](https://aptos.dev/network/faucet)** và ShelbyUSD qua Discord của hệ thống.
3. Mở tệp `src/index.ts`.
4. Điền Token Account hợp lệ và **BỎ COMMENT (Ctrl + /)** đoạn mã gọi hàm `shelbyClient.upload()`.
5. Chạy lại dự án bằng `npm start`. Dữ liệu sẽ chính thức được bất biến (immutable) trên mạng lưới Blockchain phi tập trung của dự án Shelby trong vòng 30 ngày tới.

## Tìm hiểu công nghệ đằng sau
- 📘 [Aptos Blockchain SDK](https://github.com/aptos-labs/aptos-ts-sdk)
- 📘 [Shelby Typescript SDK](https://docs.shelby.xyz/sdks/typescript)
