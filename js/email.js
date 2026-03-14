const bookElement = document.getElementById("book");

const confirmation = `
        <div class="confirmation-message">
            <div class="checkmark animated">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Thank You For Your Order!</h2>
            <p>Your laundry order has been received and is being processed. We'll notify you when it's ready for pickup.</p>
        </div>`;

bookElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  loading(true);
  const formData = new FormData(bookElement);
  const bookData = Object.fromEntries(formData.entries());
  try {
    const orderData = {
      ...bookData,
      services: cartItems,
      amount,
    };
    const status = await sendOrderConfirmation(orderData);
    if(!status) return console.log('Failed to send mail');
    e.target.reset();
    cartItems = [];
    cartId = [];
    showCart();
    showSerivces();
    loading(false);
    alert('Thank you for ordering.')
  } catch (err) {
    alert(err.message);
  } finally {
    loading(false);
  }
});

//Newsletter
const newsletterElement = document.getElementById("newsletter");
newsletterElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(newsletterElement);
  const userData = Object.fromEntries(formData.entries());
  console.log(userData);
  e.target.reset();
});

const emailContent = (orderData) => {

  return `
  <div style="font-family: 'Segoe UI', sans-serif; background:#f4f6f9; margin:0; padding:5%;">
  
  <div class="order-card" style="width:100%; max-width:420px; margin:auto; background:linear-gradient(135deg,#41e794,#8cd2dc); border-radius:16px; box-shadow:0 6px 15px rgba(0,0,0,0.1); padding:6%;">
    
    <h2 style="text-align:center; color:#2c3e50; margin-bottom:5%; border-bottom:2px solid #eee; padding-bottom:3%; font-size:1.5em;">
      ✅ Order Confirmed
    </h2>
    
    <p style="margin:3% 0; font-size:1em; color:#444;">
      <strong>Name:</strong> ${orderData.name}
    </p>
    <p style="margin:3% 0; font-size:1em; color:#444;">
      <strong>Email:</strong> lm@123gmail.com
    </p>
    <p style="margin:3% 0; font-size:1em; color:#444;">
      <strong>Phone:</strong> ${orderData.phone || 'Not Provided'}
    </p>
    
    <h3 style="margin-top:6%; color:#34495e; font-size:1.1em; border-bottom:1px solid #ddd; padding-bottom:3%;">
      Services
    </h3>
    
    <ul style="list-style:none; padding:0; margin:5% 0;">
      ${orderData.services.map((item) => `<li style="padding:3%; margin-bottom:4%; border-radius:10px; background:#ffffff; display:flex; justify-content:space-between; font-size:1em; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
        <span>${item.service}</span>
        <span style="font-weight:bold; color:#27ae60;">₹${item.price}</span>
      </li>`).join('')}
    </ul>
    
    <div style="margin-top:6%; padding:4%; background:#27ae60; color:white; border-radius:12px; font-weight:bold; text-align:center; font-size:1.1em; box-shadow:0 3px 6px rgba(0,0,0,0.15);">
      Total Amount: ₹${orderData.amount}
    </div>
    
    <div style="margin-top:8%; text-align:center; border-top:1px solid #ddd; padding-top:4%; font-size:0.9em; color:#555;">
      <p style="margin:2% 0; font-weight:bold; color:#2c3e50;">🙏 Thank you for choosing Laundry Mart!</p>
      <p style="margin:2% 0;">We’ll notify you once your clothes are ready for delivery.</p>
      <p style="margin:2% 0; font-size:0.85em; color:#777;">For queries, contact support at <span style="color:#27ae60; font-weight:bold;">support@laundrymart.com</span></p>
      <p style="margin:2% 0; font-size:0.75em; color:#999;">Your trusted laundry partner 🧺</p>
    </div>
    
  </div>
  
  <div style="text-align:center; margin-top:20px;">
    <button class="print-btn" onclick="window.print()" style="padding:10px 20px; font-size:1em; background:#2c3e50; color:white; border:none; border-radius:8px; cursor:pointer; box-shadow:0 3px 6px rgba(0,0,0,0.2);">
      🖨️ Print Invoice
    </button>
  </div>
  
</div> `
}