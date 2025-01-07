document.getElementById('add-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const buyingPrice = parseFloat(document.getElementById('buyingPrice').value);
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);

    try {
        const response = await fetch('/api/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, quantity, buyingPrice, sellingPrice }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            document.getElementById('add-product-form').reset();
        } else {
            alert(result.error || 'Failed to add product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }
});
