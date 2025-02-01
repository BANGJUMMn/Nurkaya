function tambahKeKeranjang(namaProduk) {
    alert(namaProduk + " telah ditambahkan ke keranjang!");
}

let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

function tambahKeKeranjang(nama, harga) {
    let produk = keranjang.find(item => item.nama === nama);
    if (produk) {
        produk.jumlah += 1;
    } else {
        keranjang.push({ nama, harga, jumlah: 1 });
    }
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    alert(`${nama} telah ditambahkan ke keranjang.`);
}

function tampilkanKeranjang() {
    let daftarKeranjang = document.getElementById("keranjang-list");
    let totalBelanja = document.getElementById("total-belanja");
    daftarKeranjang.innerHTML = "";
    let total = 0;

    keranjang.forEach((item, index) => {
        let row = daftarKeranjang.insertRow();
        row.innerHTML = `
            <td>${item.nama}</td>
            <td>Rp ${item.harga.toLocaleString()}</td>
            <td>${item.jumlah}</td>
            <td>Rp ${(item.harga * item.jumlah).toLocaleString()}</td>
            <td><button onclick="hapusItem(${index})">Hapus</button></td>
        `;
        total += item.harga * item.jumlah;
    });
    totalBelanja.textContent = total.toLocaleString();
}

function hapusItem(index) {
    keranjang.splice(index, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
}

function kosongkanKeranjang() {
    keranjang = [];
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
}

document.addEventListener("DOMContentLoaded", tampilkanKeranjang);
