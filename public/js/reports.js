document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/reports');
        const report = await response.json();

        const reportSummary = document.getElementById('report-summary');
        reportSummary.innerHTML = `
            <h2>Today's Summary</h2>
            <p><strong>List of Products Added Today:</strong> ${report.productsAdded}</p>
            <p><strong>Quantity of Products Sold Today:</strong> ${report.productsSold}</p>
            <p><strong>Today's Total Revenue:</strong> ${report.totalRevenue}</p>
            <p><strong>Today's Total Expenses:</strong> ${report.totalExpenses}</p>
            <p><strong>Profit:</strong> ${report.profit}</p>
            <h2>Overall Summary</h2>
            <p><strong>Total Revenue:</strong> ${report.overallRevenue}</p>
            <p><strong>Total Expenses:</strong> ${report.overallExpenses}</p>
        `;
    } catch (error) {
        console.error('Error fetching report:', error);
    }
});
