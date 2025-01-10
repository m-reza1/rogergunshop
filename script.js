// data produk
let productList = [
    { name: 'AK-47', price: 150000 },
    { name: 'M4a1', price: 120000 },
    { name: 'Revolver', price: 70000 },
];

let editIndex = null;
let deleteIndex = null;

// tambah dan edit produk
    document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);

    if (editIndex !== null) {
        // jika editIndex tidak null, berarti mengupdate produk
        productList[editIndex] = { name, price };
        editIndex = null; // reset editIndex setelah pembaruan
        document.getElementById('submitButton').textContent = 'tambah produk'; // ubah tombol kembali ke "tambah produk"
    } else {
        // jika tidak ada editIndex, berarti menambah produk baru
        productList.push({ name, price });
    }

    // reset form dan tampilkan ulang daftar produk setelah pengiriman
    document.getElementById('productForm').reset();
    renderProducts();
});

// menampilkan daftar produk
function renderProducts() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = ''; // mengosongkan isi tabel sebelum diisi ulang

    productList.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>Rp ${product.price.toLocaleString()}</td>
            <td>
                <button class="edit" onclick="editProduct(${index})">edit</button>
                <button class="delete" onclick="openDeleteModal(${index})">hapus</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// fungsi untuk mengedit produk
function editProduct(index) {
    const product = productList[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    editIndex = index; // menyimpan index produk yang sedang diedit

    // mengubah tombol 'tambah produk' menjadi 'edit produk'
    document.getElementById('submitButton').textContent = 'edit produk';
}

// fungsi untuk membuka modal konfirmasi hapus produk
function openDeleteModal(index) {
    deleteIndex = index;
    document.getElementById('deleteModal').style.display = 'flex'; // menampilkan modal konfirmasi
}

// fungsi untuk menghapus produk
function deleteProduct() {
    if (deleteIndex !== null) {
        productList.splice(deleteIndex, 1); // menghapus produk dari array berdasarkan index
        renderProducts(); // tampilkan ulang daftar produk
    }
    closeDeleteModal(); // tutup modal setelah penghapusan
}

// fungsi untuk menutup modal
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
}

// event listener untuk konfirmasi hapus produk
document.getElementById('confirmDelete').addEventListener('click', deleteProduct);

// event listener untuk batal hapus produk
document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);

// memanggil renderProducts saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', renderProducts);
