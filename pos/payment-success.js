function showReceiptModal() {
  document.getElementById('successModal').style.display = 'none';
  document.getElementById('receiptModal').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function() {
  const receiptBody = document.getElementById('receiptBody');
  const savedReceipt = localStorage.getItem('posLastReceipt');
  
  if (savedReceipt) {
    receiptBody.innerHTML = savedReceipt;
  } else {
    receiptBody.innerHTML = '<p>Tidak ada data struk yang tersedia.</p>';
  }
  
  setTimeout(function() {
    const successModal = document.getElementById('successModal');
    successModal.style.animation = 'fadeOut 0.5s ease forwards';
    
    setTimeout(function() {
      showReceiptModal();
    }, 500);
  }, 1500);
  
  setTimeout(showReceiptModal, 5000);
  
  document.getElementById('printReceiptBtn').addEventListener('click', function() {
    try {
      const receiptContent = document.getElementById('receiptBody').innerHTML;
      const printWindow = window.open('', 'PRINT', 'height=600,width=800');
      
      const printHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Struk Pembayaran</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
            }
            
            .receipt-header {
              text-align: center;
              margin-bottom: 20px;
            }
            
            .receipt-header h3 {
              margin: 0 0 5px;
              font-size: 20px;
            }
            
            .receipt-header p {
              margin: 5px 0;
              font-size: 14px;
            }
            
            .receipt-info {
              margin-bottom: 20px;
              font-size: 14px;
            }
            
            .receipt-divider {
              border-top: 1px dashed #ccc;
              margin: 15px 0;
            }
            
            .receipt-item {
              margin-bottom: 10px;
            }
            
            .receipt-summary {
              margin-top: 20px;
            }
            
            .summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            
            .total {
              font-weight: bold;
              margin-top: 10px;
              padding-top: 5px;
              border-top: 1px solid #333;
            }
            
            .receipt-footer {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
            }
            
            .item-details {
              display: flex;
              justify-content: space-between;
              margin-bottom: 3px;
            }
            
            .item-price-single {
              font-size: 12px;
              color: #666;
              text-align: right;
            }
          </style>
        </head>
        <body>
          <div class="receipt-print">${receiptContent}</div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 750);
            };
          </script>
        </body>
        </html>
      `;
      printWindow.document.write(printHtml);
      printWindow.document.close();
      printWindow.focus();
    } catch (error) {
      alert('Terjadi kesalahan saat mencetak struk. Silakan coba lagi.');
    }
  });
  
  document.getElementById('returnToPosBtn').addEventListener('click', function() {
    window.location.href = '/pos/pos.html';
  });
  
  document.getElementById('closeReceiptBtn').addEventListener('click', function() {
    window.location.href = '/pos/pos.html';
  });
});