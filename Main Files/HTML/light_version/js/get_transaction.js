// Get a reference to the table body
const tableBody = document.querySelector('.myTable tbody');

// Make a GET request to fetch the transaction records
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const transactions = JSON.parse(this.responseText);

        // Loop through the transactions and create table rows
        transactions.forEach((transaction) => {
            const row = document.createElement('tr');

            // Create table cells and add transaction data to them
            const idCell = document.createElement('td');
            idCell.textContent = transaction.id;
            row.appendChild(idCell);

            const amountCell = document.createElement('td');
            amountCell.textContent = transaction.amount;
            row.appendChild(amountCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = transaction.description;
            row.appendChild(descriptionCell);

            const paymentModeCell = document.createElement('td');
            paymentModeCell.textContent = transaction.payment_mode;
            row.appendChild(paymentModeCell);

            const dateCell = document.createElement('td');
            dateCell.textContent = transaction.payment_date;
            row.appendChild(dateCell);

            const optionsCell = document.createElement('td');
            const editLink = document.createElement('a');
            editLink.href = `edit_transaction.php?id=${transaction.id}`;
            editLink.textContent = 'Edit';
            optionsCell.appendChild(editLink);

            const deleteLink = document.createElement('a');
            deleteLink.href = `delete_transaction.php?id=${transaction.id}`;
            deleteLink.textContent = 'Delete';
            optionsCell.appendChild(deleteLink);

            row.appendChild(optionsCell);

            // Add the row to the table body
            tableBody.appendChild(row);
        });
    }
};
xhttp.open('GET', '/get_transactions.php', true);
xhttp.send();
