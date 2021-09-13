
let deleteConfirm = document.getElementById('delete')
let buttonOk = document.getElementById('confirmDelete')
let orderbtn = document.getElementById('orderbtn')
let errMessage = document.getElementById('errMessage')


function loadFile(event) {
    let image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};

let orderan = []


function order(item){
    orderan.push(item)
    orderbtn.text = `Lihat Orderan (${orderan.length})`
}


function listOrder(id){
    let btnOrder = document.getElementById('orderbtn')
    btnOrder.setAttribute('href', `/resto/${id}/menu/order?orderan=${orderan}`)
}


deleteConfirm.addEventListener('show.bs.modal', (e) =>{
    buttonOk.setAttribute('href', e.relatedTarget)
})


