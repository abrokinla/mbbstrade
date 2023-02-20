$(document).ready(function() {
    // Get the user ID from session storage
    const userData = JSON.parse(sessionStorage.getItem('userData'));         
    const user_id = userData.userId;
    console.log(user_id)
  
    // Fetch investment data from fetchInvestment.php using the user ID
    const fetchInvestmentDataURL = `fetchInvestment.php?user_id=${user_id}`;
  
    $.ajax({
      url: fetchInvestmentDataURL,
      type: "GET",
      success: function(data) {
        sessionStorage.setItem('investmentData', JSON.stringify(data));
        const investmentData = JSON.parse(sessionStorage.getItem('investmentData'));         
        console.log(investmentData)
        // Redirect the user to the all_transactions.html page and pass the token and data to the page
        // window.location.href = "all_transactions.html";
      },
      error: function(error) {
        showFlashNotification("Error fetching data: " + error);
      }        
    });
  });
  