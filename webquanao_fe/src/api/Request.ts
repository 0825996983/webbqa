export async function my_request(endpoint: string) {
    // Truy vấn đến đường dẫn
    const response = await fetch(endpoint);

    // Nếu trả về lỗi
    if (!response.ok) {
        throw new Error(`Không thể truy cập ${endpoint}`);
    }
    // Nếu trả về OK
    return response.json();
}