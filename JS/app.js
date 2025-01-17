// app.js
/*

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const contactsTable = document.getElementById('contacts-list');

    // Fonction de validation des données
    function validateForm() {
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;
        
        // Validation de l'email avec une expression régulière
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            alert('Email invalide');
            return false;
        }

        // Validation du téléphone (doit contenir 10 chiffres)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(telephone)) {
            alert('Numéro de téléphone invalide (doit contenir 10 chiffres)');
            return false;
        }

        return true;
    }

    // Fonction pour ajouter un contact à la table
    function addContact(contact) {
        const row = document.createElement('tr');
        row.classList.add('border-b');
        row.innerHTML = `
            <td class="py-2 px-4">${contact.nom}</td>
            <td class="py-2 px-4">${contact.prenom}</td>
            <td class="py-2 px-4">${contact.email}</td>
            <td class="py-2 px-4">${contact.genre}</td>
            <td class="py-2 px-4">${contact.ville}</td>
            <td class="py-2 px-4">${contact.telephone}</td>
        `;
        contactsTable.appendChild(row);
    }

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {
            const contact = {
                nom: document.getElementById('nom').value,
                prenom: document.getElementById('prenom').value,
                email: document.getElementById('email').value,
                genre: document.querySelector('input[name="genre"]:checked').value,
                ville: document.getElementById('ville').value,
                telephone: document.getElementById('telephone').value,
            };

            // Ajouter le contact à la table
            addContact(contact);

            // Réinitialiser le formulaire
            form.reset();
        }
    });
});

/*
  