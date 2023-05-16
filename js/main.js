


var maBenhNhanElement = document.getElementById('txMaBenhNhan');

//kiem tra ma benh nhan
function kiemTraMaBenhNhan() {
    var valueId = maBenhNhanElement.value;
    var messageElement = maBenhNhanElement.parentElement.querySelector('.form-message');

    if(valueId.length === 0){
        messageElement.innerHTML = 'Mã bệnh nhân không được rỗng!';
        messageElement.classList.add('danger');
        messageElement.style.display = 'block';
        return false;
    }

    var regex = /^BN-(\d){6}$/

    if(!regex.test(valueId)){
        messageElement.innerHTML = 'Mã bệnh nhân theo định dạng BN-YYYYYY (BN- là cố định) ký tự Y là các chữ số!';
        messageElement.classList.add('danger');
        messageElement.style.display = 'block';
        return false;
    }
    messageElement.style.display = 'none';
    return true;
}

maBenhNhanElement.onblur = function() {
    kiemTraMaBenhNhan();
}

var matKhauElement = document.getElementById('txPassword')
function kiemTraMatKhau() {
    var valuePass = matKhauElement.value;
    var messageElement = matKhauElement.parentElement.querySelector('.form-message');
    if(valuePass.length === 0){
        messageElement.innerHTML = 'Mật khẩu không được rỗng!';
        messageElement.classList.add('danger');
        messageElement.style.display = 'block'
        return false;
    }

    if(valuePass.length < 6){
        messageElement.innerHTML = 'Mật khẩu từ 6 ký tự trở lên!';
        messageElement.classList.add('danger');
        messageElement.style.display = 'block'
        return false;
    }

    messageElement.style.display = 'none'
    return true;
}

matKhauElement.onblur = function () {
    kiemTraMatKhau();
}

var ngayKhamElement = document.getElementById('txDate');
function kiemTraNgayKham() {
    var valueDate = ngayKhamElement.value;
    var messageElement = ngayKhamElement.parentElement.querySelector('.form-message')
    if(valueDate.length === 0){
        messageElement.innerHTML = 'Ngày khám không được rỗng!';
        messageElement.classList.add('danger');
        messageElement.style.display = 'block'
        return false;
    }

    var ngayKhamDate = new Date(valueDate);
    ngayKhamDate.setHours(0,0,0,0)
    var dateCurrent = new Date();
    dateCurrent.setHours(0,0,0,0)

    if(ngayKhamDate.getTime() <= dateCurrent.getTime()){
        messageElement.innerHTML = 'Ngày khám sau ngày hiện tại!';
        messageElement.classList.add('danger');
        messageElement.style.display = 'block';
        return false;
    }

    messageElement.style.display = 'none';
    return true;
}

ngayKhamElement.onblur = function () {
    kiemTraNgayKham();
}

var phuThuElement = document.querySelectorAll('input[type=checkbox]');

var submitButton = document.getElementById('submit');
submitButton.onclick = function () {
    
    if(!kiemTraMaBenhNhan() || !kiemTraMatKhau() || !kiemTraNgayKham()) {
        return false;
    }
    
    var maBenhNhan = maBenhNhanElement.value;
    var matKhau = matKhauElement.value;
    var ngayKhamDate = ngayKhamElement.value;
    var phuThu = 0;

    phuThuElement.forEach(function(value, index) {
        if(value.checked) {
           phuThu += parseFloat(value.value);
        }
    });
   
    var chuyenKhoa = document.querySelector('#txSelect option:checked').textContent;
    
    var rowCount = document.getElementById('rowCount');
    var stt = rowCount.querySelectorAll('tr').length + 1;
    console.log(stt);
    var content = `
        <td>${stt}</td>
        <td>${maBenhNhan}</td>
        <td>${matKhau}</td>
        <td>${ngayKhamDate}</td>
        <td>${phuThu}</td>
        <td>${chuyenKhoa}</td>
    
    `;
    var nodeTr = document.createElement('tr');
    nodeTr.innerHTML = content;
    rowCount.appendChild(nodeTr);

    // dong modal
    
    $('.modal').modal('hide');
}

