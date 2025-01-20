// Obtenir des références aux elements modaux et de formulaire
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const contactForm = document.getElementById('contactForm');
const contactsList = document.getElementById('contacts-list');

// Fonction pour rendre les contacts
function renderContacts() {
    contactsList.innerHTML = ''; // Effacer la liste
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    savedContacts.forEach((contact, index) => {
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
                <button 
                    class="bg-[#7F939C] text-black px-4 py-2 rounded-md hover:bg-slate-200"
                    onclick="deleteContact(${index})">
                    Delete
                </button>
            </div>
        `;
        contactsList.appendChild(contactCard);
    });
}

// Fonction pour supprimer un contact
function deleteContact(index) {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    if (index >= 0 && index < savedContacts.length) {
        savedContacts.splice(index, 1); // Supprimer le contact à l'index donné
        localStorage.setItem('contacts', JSON.stringify(savedContacts)); // Mettre à jour le localStorage
        renderContacts(); // Rafraîchir l'affichage des contacts
    }
}

// Gérer la soumission du formulaire
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêcher la soumission classique

    // Récupérer les valeurs du formulaire
    const name = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const genre = document.querySelector('input[name="genre"]:checked')?.value || '';
    const ville = document.getElementById('ville').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];
    const image = imageFile ? URL.createObjectURL(imageFile) : "https://via.placeholder.com/150"; // Image par défaut

    // Récupérer les contacts enregistrés dans le localStorage (ou un tableau vide si aucun)
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Ajouter le nouveau contact au tableau de contacts
    savedContacts.push({
        name: `${name} ${prenom}`,
        email,
        telephone,
        genre,
        ville,
        image
    });

    // Sauvegarder le tableau de contacts mis à jour dans le localStorage
    localStorage.setItem('contacts', JSON.stringify(savedContacts));

    // Réinitialiser le formulaire et fermer la modale
    contactForm.reset();
    modal.classList.add('hidden');

    // Afficher la liste des contacts mise à jour
    renderContacts();
});

// Ouvrir la modale
openModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
});

// Fermer la modale
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Fermer la modale si un clic est fait en dehors
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Afficher les contacts lorsque la page se charge
document.addEventListener('DOMContentLoaded', () => {
    renderContacts();
});