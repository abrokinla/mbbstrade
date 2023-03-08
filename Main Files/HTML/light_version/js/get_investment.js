$(document).ready(function() {  
  function investmentDays(){
    const investmentData = JSON.parse(localStorage.getItem("investmentData"));
    if (!investmentData) {
      return;
    } else {
      const start_date = new Date(investmentData[0].start_date);
      const end_date = new Date(investmentData[0].end_date);
      const today_date = new Date();
      const todayDate = today_date.toISOString().split('T')[0];
      // check if there is an active investment
      if (todayDate > end_date) {
        console.log("No active investment");
        return;
      } else {
        // calculate number of days
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // number of milliseconds in a day
        const daysRemaining = Math.round((today_date.getTime() - start_date.getTime()) / millisecondsPerDay);
        console.log(`Active investment: ${daysRemaining} days remaining`);
        return daysRemaining;
      }
    }
  }

  function calculateInterest() {
    const investmentData = JSON.parse(localStorage.getItem("investmentData"));
    const days = investmentDays();
    let amount = parseFloat(investmentData[0].amount.replace("$", ""));
    const plan = investmentData[0].inv_plan;
    let rate = 0;
    let interest = 0;

    if(plan == "Gold Plan") {
      rate = 0.314 / 100;
    } 
    else if(plan == "Silver Plan") {
      rate = 0.295 / 100;
    }
    else {
      rate = 0.292 / 100;
    }
    for(let i = 1; i<=days; i++) {
      interest += rate * amount
      amount += interest
      
    }
    finalAmount = amount;
    $('#interest-accrued').text(`: $${finalAmount.toFixed(2)}`);
    console.log(finalAmount);
    return finalAmount;
  }
    // Get the user ID from session storage
    const userData = JSON.parse(sessionStorage.getItem('userData'));         
    const user_id = userData.userId;
    
    // Fetch investment data from fetchInvestment.php using the user ID
    const fetchInvestmentDataURL = `fetchInvestment.php?user_id=${user_id}`;
    
    $.ajax({
      url: fetchInvestmentDataURL,
      type: "GET",
      success: function(data) {
        localStorage.setItem('investmentData', JSON.stringify(data));
        const investmentData = JSON.parse(localStorage.getItem('investmentData'));         
        console.log(investmentData)
        const amount = investmentData[0].amount;
        console.log(amount);
        // Update the HTML to display the amount value
        $('#invested-amount').text(`: ${amount}`); 
        
      },
      error: function(error) {
        console.log("Error fetching data: ", error);
      }        
    });
    calculateInterest();
  });
  