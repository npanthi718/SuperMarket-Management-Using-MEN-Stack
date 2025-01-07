document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/sorted');
        const sortedProducts = await response.json();

        const sortedProductList = document.getElementById('sorted-product-list');
        sortedProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
            `;
            sortedProductList.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching low stock products:', error);
    }
});
