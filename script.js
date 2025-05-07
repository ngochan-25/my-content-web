async function generateContent() {
  const topic = document.getElementById("topic").value.trim();
  const style = document.getElementById("style").value.trim();
  const details = document.getElementById("details").value.trim();
  const output = document.getElementById("output");

  // Kiểm tra xem người dùng đã nhập đủ thông tin chưa
  if (!topic || !style || !details) {
    output.textContent = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  output.textContent = "⏳ Đang tạo nội dung...";

  // Tạo prompt cho ChatGPT từ dữ liệu người dùng nhập vào
  const prompt = `Viết một nội dung về chủ đề "${topic}", phong cách "${style}", với những chi tiết bổ sung sau: "${details}"`;

  try {
    // Gửi yêu cầu đến OpenAI API
    const response = await fetch("https://chat.openai.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"  // Thay YOUR_API_KEY bằng API Key của bạn
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",  // Bạn có thể chọn các model khác như gpt-4, tùy theo yêu cầu
        messages: [
          { role: "system", content: "Bạn là một chuyên gia tạo nội dung." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,  // Độ sáng tạo của AI (0.7 là mức độ sáng tạo trung bình)
        max_tokens: 500  // Giới hạn số lượng từ trong kết quả trả về
      })
    });

    // Nhận kết quả từ API và hiển thị trên giao diện
    const data = await response.json();
    if (data.choices && data.choices[0]) {
      output.textContent = data.choices[0].message.content;
    } else {
      output.textContent = "Không nhận được phản hồi hợp lệ từ AI.";
    }
  } catch (error) {
    output.textContent = "❌ Lỗi khi gọi API: " + error.message;
  }
}
