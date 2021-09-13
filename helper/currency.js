function currency(value){
    return `Rp. ${value.toLocaleString('id-ID')},-`;
}

module.exports = currency;