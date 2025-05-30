document.getElementById('receiptForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const product = document.getElementById('product').value;
  const size = document.getElementById('size').value;
  const orderNum = document.getElementById('orderNum').value;
  const price = parseFloat(document.getElementById('price').value);
  const processing = parseFloat(document.getElementById('processing').value);
  const shipping = parseFloat(document.getElementById('shipping').value);
  const orderDate = new Date(document.getElementById('orderDate').value);

  const arrivalStart = new Date(orderDate);
  const arrivalEnd = new Date(orderDate);
  arrivalEnd.setDate(arrivalEnd.getDate() + 21);

  const dateRange = `${arrivalStart.toLocaleDateString()} - ${arrivalEnd.toLocaleDateString()}`;

  // Fetch product image from StockX search
  const searchUrl = `https://stockx.com/api/browse?_search=${encodeURIComponent(product)}`;
  let imageUrl = "";

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    imageUrl = data.Products?.[0]?.media?.imageUrl || "";
  } catch (err) {
    imageUrl = ""; // fallback
  }

  const total = (price + processing + shipping).toFixed(2);

  document.getElementById('receipt').style.display = 'block';
  document.getElementById('receipt').innerHTML = `
    <div class="status">
      <span>✅ Ordered</span>
      <span>🚚 Shipped to StockX</span>
      <span>📦 Arrived at StockX</span>
      <span>🔍 Verified + Shipped</span>
      <span>📬 Delivered</span>
    </div>
    <h2>Order Confirmation</h2>
    <p>Estimated Arrival: <strong>${dateRange}</strong></p>
    <hr />
    <h3>${product}</h3>
    <p><strong>Size:</strong> ${size}</p>
    <p><strong>Style ID:</strong> auto-generated</p>
    <p><strong>Order Number:</strong> ${orderNum}</p>
    <img class="product-image" src="${imageUrl}" alt="${product}" />
    <div class="summary">
      <p>Purchase Price: £${price.toFixed(2)}</p>
      <p>Processing Fee: £${processing.toFixed(2)}</p>
      <p>Shipping Fee: £${shipping.toFixed(2)}</p>
      <p><strong>TOTAL PAYMENT: £${total}</strong></p>
    </div>
  `;
});
