document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        const productList = document.getElementById('product-list');
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity} ${product.quantity <= 20 ? '<span class="low-stock">Low Stock!' : ''}</td>
                <td>${product.buyingPrice}</td>
                <td>${product.sellingPrice}</td>
            `;
            productList.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
