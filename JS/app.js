// Get references to the modal and form elements
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const contactForm = document.getElementById('contactForm');
const contactsList = document.getElementById('contacts-list');

// Function to render contacts
function renderContacts() {
    contactsList.innerHTML = ''; // Clear the list
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    savedContacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');
        contactCard.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${contact.image}" alt="Contact Image" class="w-12 h-12 rounded-full">
                <div>
                    <h3 class="text-lg font-semibold">${contact.name}</h3>
                    <p class="text-sm text-gray-600">${contact.email}</p>
                    <p class="text-sm text-gray-600">${contact.telephone}</p>
                    <p class="text-sm text-gray-600">${contact.ville}</p>
                    <p class="text-sm text-gray-600">${contact.genre}</p>
                </div>
            </div>
        `;
        contactsList.appendChild(contactCard);
    });
}

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting the usual way

    // Get form values
    const name = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const genre = document.querySelector('input[name="genre"]:checked')?.value || '';
    const ville = document.getElementById('ville').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];
    const image = imageFile ? URL.createObjectURL(imageFile) : "https://via.placeholder.com/150"; // Default image

    // Get the saved contacts from localStorage (or an empty array if none exist)
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Add the new contact to the contacts array
    savedContacts.push({
        name: `${name} ${prenom}`,
        email,
        telephone,
        genre,
        ville,
        image
    });

    // Save the updated contacts array back to localStorage
    
    localStorage.setItem('contacts', JSON.stringify(savedContacts));

    // Reset the form and close the modal

    contactForm.reset();
    modal.classList.add('hidden');

    // Render the updated contacts list
    renderContacts();
});

// Open modal
openModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Close modal if clicked outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Render contacts when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderContacts();
});
