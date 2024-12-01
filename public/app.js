document.addEventListener('DOMContentLoaded', () => {
    loadItems();

    // Add item form submission
    document.getElementById('addForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value;
        const category = document.getElementById('categoryInput').value;

        try {
            const response = await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, category }),
            });

            if (response.ok) {
                document.getElementById('addForm').reset();
                loadItems();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Save edit button click
    document.getElementById('saveEdit').addEventListener('click', async () => {
        const id = document.getElementById('editId').value;
        const name = document.getElementById('editName').value;
        const category = document.getElementById('editCategory').value;

        try {
            const response = await fetch(`http://localhost:3000/api/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, category }),
            });

            if (response.ok) {
                const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
                modal.hide();
                loadItems();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

// Load items from server
async function loadItems() {
    try {
        const response = await fetch('http://localhost:3000/api/items');
        const items = await response.json();
        displayItems(items);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display items in table
function displayItems(items) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editItem(${item.id}, '${item.name}', '${item.category}')">
                    Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})">
                    Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Edit item
function editItem(id, name, category) {
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editCategory').value = category;

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
}

// Delete item
async function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/items/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                loadItems();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
