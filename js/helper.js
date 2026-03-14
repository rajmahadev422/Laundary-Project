function generateOrderId() {
    const timestamp = new Date().getTime().toString().slice(-6);
    return `LM-${timestamp}`;
}

async function sendOrderConfirmation(orderData) {
  let status;
  const serviceID = "service_84scgnb";
  const templateID = "template_xa1xa7u";
  const templateParams = {
    my_html: emailContent(orderData),
    email: orderData.email,
    order_id: generateOrderId(),
  }
  // Send email using Email.js
  await emailjs.send(serviceID, templateID, templateParams)
  .then((res) => {
    console.log('Email sent success', res);
    status = true;
    })
  .catch((err) => {
    alert(err.message);
    status = false;
  });
  return status;
}

