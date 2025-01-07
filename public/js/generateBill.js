document.getElementById('add-product').addEventListener('click', () => {
    const productSection = document.getElementById('products-section');
    const newRow = document.createElement('div');
    newRow.classList.add('product-row');
    newRow.innerHTML = `
        <label>Product Name:</label>
        <input type="text" class="product-name" required>
        <label>Quantity:</label>
        <input type="number" class="product-quantity" required>
    `;
    productSection.appendChild(newRow);
});

document.getElementById('generate-bill-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const productRows = document.querySelectorAll('.product-row');
    const products = Array.from(productRows).map(row => {
        const name = row.querySelector('.product-name').value;
        const quantity = parseInt(row.querySelector('.product-quantity').value, 10);
        return { name, quantity };
    });

    try {
        const response = await fetch('/api/bills/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerName, phone, address, products }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(`Bill generated successfully. Total: ${result.totalAmount}`);
            document.getElementById('generate-bill-form').reset();
            document.getElementById('products-section').innerHTML = `
                <div class="product-row">
                    <label>Product Name:</label>
                    <input type="text" class="product-name" required>
                    <label>Quantity:</label>
                    <input type="number" class="product-quantity" required>
                </div>
            `;
        } else {
            alert(result.error || 'Failed to generate bill');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }
});
