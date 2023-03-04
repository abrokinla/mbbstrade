function showCopperPopup(event) {
    event.preventDefault();
    const popup = document.getElementById('copperPopup');
    popup.style.display = 'flex';
  }
  
  function hideCopperPopup(event) {
    event.preventDefault();
    const popup = document.getElementById('copperPopup');
    popup.style.display = 'none';
  }
  
function showBronzePopup(event) {
    event.preventDefault();
    const popup = document.getElementById('bronzePopup');
    popup.style.display = 'flex';
  }
  
  function hideBronzePopup(event) {
    event.preventDefault();
    const popup = document.getElementById('bronzePopup');
    popup.style.display = 'none';
  }
    
function showSilverPopup(event) {
    event.preventDefault();
    const popup = document.getElementById('silverPopup');
    popup.style.display = 'flex';
  }
  
function hideSilverPopup(event) {
event.preventDefault();
const popup = document.getElementById('silverPopup');
popup.style.display = 'none';
  }
  
    
function showGoldPopup(event) {
    event.preventDefault();
    const popup = document.getElementById('goldPopup');
    popup.style.display = 'flex';
  }
  
function hideGoldPopup(event) {
event.preventDefault();
const popup = document.getElementById('goldPopup');
popup.style.display = 'none';
  }

  const copperForm = document.getElementById('copperForm');
  const copperPaystackRadio = document.getElementById('copperPaystack');
  
  copperForm.addEventListener('submit', (event) => {    
      event.preventDefault();
      if (copperPaystackRadio.checked) {
        copperPayWithPaystack();
      }
  });
  
  const bronzeForm = document.getElementById('bronzeForm');
  const bronzePaystackRadio = document.getElementById('bronzePaystack');
  
  bronzeForm.addEventListener('submit', (event) => {    
      event.preventDefault();
      if (bronzePaystackRadio.checked) {
        bronzePayWithPaystack();
      }
  });
  
  
  const silverForm = document.getElementById('silverForm');
  const silverPaystackRadio = document.getElementById('silverPaystack');
  
  silverForm.addEventListener('submit', (event) => {    
      event.preventDefault();
      if (silverPaystackRadio.checked) {
        silverPayWithPaystack();
      }
  });
  
  const goldForm = document.getElementById('goldForm');
  const goldPaystackRadio = document.getElementById('goldPaystack');
  
  goldForm.addEventListener('submit', (event) => {    
      event.preventDefault();
      if (goldPaystackRadio.checked) {
        goldPayWithPaystack();        
      }
  });
  
  function goldPayWithPaystack() {
    if (confirm("Do you want to continue with this transaction?")) {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      const user_id = userData.userId;
      const inv_plan = document.getElementById('goldPlan').textContent.trim();
      const amount = document.querySelector('label[for="amount"]').innerText.trim();
      const today = new Date();
      const startDate = today.toISOString().split('T')[0];
  
      // end date begin
      const durationLabel = document.getElementById('goldDuration');
      const durationInMonths = parseInt(durationLabel.innerText.match(/\d+/)[0]);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + durationInMonths);
      const endDateString = endDate.toISOString().split('T')[0];
      // end date end
  
      // payment mode start
      const paymentRadios = document.getElementsByName('goldPayment');
      let paymentMode = '';
  
      for (let i = 0; i < paymentRadios.length; i++) {
        if (paymentRadios[i].checked) {
          paymentMode = paymentRadios[i].value;
          break;
        }
      }
      // payment mode end
  
      const approved = 0;
      const description = "Deposit made";
  
      const amountLabel = document.getElementById('goldAmount');
      const invAmount = amountLabel.innerText.replace(/\D/g, '');
      fetch('get_exchange_rate.php')
        .then(response => response.text())
        .then(exchangeRate => {
          const convertedAmount = invAmount * parseFloat(exchangeRate);
          console.log(`Converted amount: ${convertedAmount}`);
  
          const handler = PaystackPop.setup({
            key: 'pk_live_8605bc54820740698f4bb7d1caa77b9c7bb7b6a9',
            email: 'busayomanuwa@gmail.com',
            amount: convertedAmount * 100, // amount in kobo (Paystack's smallest currency unit)
            currency: 'NGN',
            ref: 'MMBS' + Math.floor((Math.random() * 1000000000) + 1),
            callback: function(response) {
              // Send a request to your server-side script to save the details
              const xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  console.log(this.responseText);
                }
              };
              xhttp.open('POST', '/investment.php', true);
              xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
              xhttp.send("user_id=" + user_id + "&inv_plan=" + inv_plan + "&amount=" + amount + "&start_date=" + startDate +
                "&end_date=" + endDateString + "&payment_method=" + paymentMode + "&approved=" + approved);
  
              // Transaction data added
              const xhttp2 = new XMLHttpRequest();
              xhttp2.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  console.log(this.responseText);
                }
              };
              xhttp2.open('POST', '/transaction.php', true);
              xhttp2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
              xhttp2.send("user_id=" + user_id + "&amount=" + amount + "&description=" + description +
                "&payment_date=" + startDate + "&payment_mode=" + paymentMode + "&transaction_ref=" + response.reference);
              alert('success. transaction ref is ' + response.reference);
              hideGoldPopup();
            },
            onClose: function() {
              alert('Transaction was not completed, window closed.');
            }
         
            });
            handler.openIframe();
            })
            .catch(error => {
              console.error('Error fetching exchange rate:', error);
            });
    } else { 
        return;
    }
    }

  
