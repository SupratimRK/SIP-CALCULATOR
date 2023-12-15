// Declare chart variable outside the displayChart function to keep track of the chart instance
let myChart;

function calculateSIP() {
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const investmentYears = parseInt(document.getElementById('investmentYears').value) || 0;
    const investmentMonths = parseInt(document.getElementById('investmentMonths').value) || 0;
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value);

    if (isNaN(monthlyInvestment) || isNaN(annualInterestRate) || (investmentYears === 0 && investmentMonths === 0)) {
        alert('Please enter valid input values.');
        return;
    }

    const totalMonths = investmentYears * 12 + investmentMonths;
    const monthlyRateOfReturn = (annualInterestRate / 100) / 12;

    const maturityAmount = monthlyInvestment * ((Math.pow(1 + monthlyRateOfReturn, totalMonths) - 1) / monthlyRateOfReturn) * (1 + monthlyRateOfReturn);
    const totalInvestment = monthlyInvestment * totalMonths;
    const roiPercentage = ((maturityAmount - totalInvestment) / totalInvestment) * 100;

    displayResult(maturityAmount.toFixed(2), totalInvestment.toFixed(2), roiPercentage.toFixed(2));
    displayChart(maturityAmount, totalInvestment);
}

function displayResult(maturityAmount, totalInvestment, roiPercentage) {
    const resultContainer = document.getElementById('result');
    const formattedMaturityAmount = formatCurrency(maturityAmount);
    const formattedTotalInvestment = formatCurrency(totalInvestment);

    const resultText = `
        <p>Maturity Amount: <b>₹${formattedMaturityAmount}</b></p>
        <p>Invested Amount: <b>₹${formattedTotalInvestment}</b></p>
        <p>Return on Investment: <b>${roiPercentage}%</b></p>
        <p>Made with 💙 by Supratim</p>
    `;

    resultContainer.innerHTML = resultText;
    resultContainer.style.display = 'block';
}

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayChart(maturityAmount, totalInvestment) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // Destroy the previous chart instance if it exists
    if (myChart) {
        myChart.destroy();
    }

    // Create a new chart instance
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Invested Amount', 'Returns'],
            datasets: [{
                data: [totalInvestment, maturityAmount - totalInvestment],
                backgroundColor: ['#00aeff', '#b1f202'],
            }],
        },
    });
}
