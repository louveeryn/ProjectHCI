function cariMerek(kata) {
    kata = kata.toLowerCase();
    var semua = document.querySelectorAll("#daftarMerek label");

    for (var i = 0; i < semua.length; i++) {
        var teks = semua[i].innerText.toLowerCase();
        if (teks.indexOf(kata) !== -1) {
            semua[i].style.display = "flex";
        } else {
            semua[i].style.display = "none";
        }
    }
}

function ubahHarga() {
    var nilai = parseInt(document.getElementById("sliderHarga").value);
    var teks = "Rp 0 - Rp " + nilai.toLocaleString("id-ID");
    document.getElementById("hargaText").innerText = teks;
    saringProduk();
}


function saringProduk() {
    
    var merekDipilih = [];
    var cb = document.querySelectorAll(".cbMerek:checked");
    for (var i = 0; i < cb.length; i++) {
        merekDipilih.push(cb[i].value);
    }

    var batasHarga = parseInt(document.getElementById("sliderHarga").value);
    var minRating = parseFloat(document.querySelector('input[name="rating"]:checked').value);

    var kartu = document.querySelectorAll(".kartu");
    var jumlah = 0;

    for (var j = 0; j < kartu.length; j++) {
        var merek = kartu[j].getAttribute("data-merek");
        var harga = parseInt(kartu[j].getAttribute("data-harga"));
        var rating = parseFloat(kartu[j].getAttribute("data-rating"));

        var tampil = true;

        if (merekDipilih.length > 0 && merekDipilih.indexOf(merek) === -1) {
            tampil = false;
        }
        if (harga > batasHarga) {
            tampil = false;
        }
        if (rating < minRating) {
            tampil = false;
        }
        if (tampil) {
            kartu[j].style.display = "flex";
            jumlah++;
        } else {
            kartu[j].style.display = "none";
        }
    }

    document.getElementById("jumlahProduk").innerText = jumlah;
}

function urutkanProduk() {
    var pilihan = document.getElementById("sortSelect").value;
    var grid = document.getElementById("produkGrid");
    var kartu = document.querySelectorAll(".kartu");

    var daftar = [];
    for (var i = 0; i < kartu.length; i++) {
        daftar.push(kartu[i]);
    }

    daftar.sort(function(a, b) {
        var hargaA = parseInt(a.getAttribute("data-harga"));
        var hargaB = parseInt(b.getAttribute("data-harga"));
        var ratingA = parseFloat(a.getAttribute("data-rating"));
        var ratingB = parseFloat(b.getAttribute("data-rating"));

        var namaA = a.querySelector(".kartuNama").innerText.toLowerCase();
        var namaB = b.querySelector(".kartuNama").innerText.toLowerCase();

        if (pilihan === "murah") {
            return hargaA - hargaB;
        } else if (pilihan === "mahal") {
            return hargaB - hargaA;
        } else if (pilihan === "rating") {
            return ratingB - ratingA;
        } else if (pilihan === "az") {
            return namaA.localeCompare(namaB);
        } else if (pilihan === "za") {
            return namaB.localeCompare(namaA);
        }
        return 0;
    });

    for (var k = 0; k < daftar.length; k++) {
        grid.appendChild(daftar[k]);
    }
}

function resetFilter() {
    var cb = document.querySelectorAll(".cbMerek");
    for (var i = 0; i < cb.length; i++) {
        cb[i].checked = false;
    }

    document.getElementById("sliderHarga").value = 50000000;
    document.getElementById("hargaText").innerText = "Rp 0 - Rp 50.000.000";

    document.querySelector('input[name="rating"][value="0"]').checked = true;

    var label = document.querySelectorAll("#daftarMerek label");
    for (var j = 0; j < label.length; j++) {
        label[j].style.display = "flex";
    }
    document.querySelector(".merekSearch").value = "";

    saringProduk();
}

function tambahKeranjang() {
    var badge = document.querySelector(".cartBadge");
    var jumlah = parseInt(badge.innerText);
    badge.innerText = jumlah + 1;
    alert("Produk ditambahkan ke keranjang!");
}
