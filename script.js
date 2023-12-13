document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const userDataDiv = document.getElementById('userData');
    let editingIndex = -1; // To keep track of the index being edited
  
    userForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('amount').value;
      const email = document.getElementById('description').value;
      const phone = document.getElementById('select').value;
  
      const userDetails = {
        name: name,
        email: email,
        phone: phone
      };
  
      const storedUsers = localStorage.getItem('users');
      const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
  
      if (editingIndex > -1) {
        // If editing, update the user details at the editing index
        usersArray[editingIndex] = userDetails;
        editingIndex = -1; // Reset editingIndex after update
      } else {
        // If not editing, add new user details to the array
        usersArray.push(userDetails);
      }
  
      localStorage.setItem('users', JSON.stringify(usersArray));
      renderUsers();
      userForm.reset();
    });
  
    renderUsers();
  
    function renderUsers() {
      userDataDiv.innerHTML = '';
  
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const usersArray = JSON.parse(storedUsers);
        usersArray.forEach((user, index) => {
          const userItem = document.createElement('ul');
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit'; // Corrected setting textContent for editButton
          
          deleteButton.addEventListener('click', function() {
            usersArray.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(usersArray));
            renderUsers();
          });
  
          editButton.addEventListener('click', function() {
            editingIndex = index; // Set the index being edited
            const { name, email, phone } = usersArray[index];
            document.getElementById('amount').value = name;
            document.getElementById('description').value = email;
            document.getElementById('select').value = phone;
          });
  
          userItem.innerHTML = `<li>${user.name} |  ${user.email} |  ${user.phone}</li>`;
          userItem.appendChild(deleteButton);
          userItem.appendChild(editButton); // Append edit button
          userDataDiv.appendChild(userItem);
        });
      }
    }
  });
  