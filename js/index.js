var serialElement = document.getElementById('inputSerial');

function kiemTraSerial() {
    var valueSerial = serialElement.value;
    var messageElement = serialElement.parentElement.querySelector('.message');
    if(valueSerial.length === 0 || valueSerial.length < 6){
        messageElement.innerHTML = 'Số Serial phải từ 6 ký tự trở lên'
        messageElement.style.display = 'block'
        messageElement.classList.add('error')
        return false;
    }

    var regex = /^[A-Z0-9_-]+$/
    if(!regex.test(valueSerial)){
        messageElement.innerHTML = 'Số Serial là các chữu in hoa va các chữ số, có thể có chứa -'
        messageElement.style.display = 'block'
        messageElement.classList.add('error')
        return false;
    }

    messageElement.style.display = 'none'
    return true;
}

serialElement.onblur = function(){
    kiemTraSerial();
}

var motaElement = document.getElementById('inputMota');

function kiemTraMoTa() {
    var valueMoTa = motaElement.value;
    var messageElement = motaElement.parentElement.querySelector('.message');
    if(valueMoTa.length === 0){
        messageElement.innerHTML = 'Mô tả không được rỗng'
        messageElement.style.display = 'block'
        messageElement.classList.add('error')
        return false;
    }

    messageElement.style.display = 'none'
    return true;
}

motaElement.onblur = function(){
    kiemTraMoTa();
}

var hinhAnhElement = document.getElementById('inputFile');
function kiemTraHinhAnh() {
    var valueHinhAnh = hinhAnhElement.value;
    var messageElement = hinhAnhElement.parentElement.querySelector('.message');
    if(valueHinhAnh.length === 0){
        messageElement.innerHTML = 'Vui lòng chọn hình ảnh sản phẩm'
        messageElement.style.display = 'block'
        messageElement.classList.add('error')
        return false;
    }
    messageElement.style.display = 'none'
    return true;
}
hinhAnhElement.onblur = function (){
    kiemTraHinhAnh();
}

var kilogramElement = document.getElementById('inputKilogam');
function kiemTraKilogam() {
    var valueKilogram = kilogramElement.value;
    var messageElement = kilogramElement.parentElement.querySelector('.message');
    if(valueKilogram.length === 0){
        messageElement.innerHTML = 'Trọng lượng không được rỗng'
        messageElement.style.display = 'block'
        messageElement.classList.add('error')
        return false;
    }

    regex = /[a-zA-Z]+/
    if(regex.test(valueKilogram)){
        messageElement.innerHTML = 'Trọng lượng phải là số'
        messageElement.style.display = 'block'
        messageElement.classList.add('error')
        return false;
    }
    messageElement.style.display = 'none'
    return true;
}


var donGiaElement = document.getElementById('inputChiPhi');
kilogramElement.onblur = function(){
    kiemTraKilogam();
    var valueKilogram = parseFloat(kilogramElement.value);
    var price = 0;
    if(valueKilogram >= 1 && valueKilogram <= 20){
        price = valueKilogram * 35000;
    }else if(valueKilogram <= 50){
        price = 35000 * 20 + (valueKilogram - 20) * 30000;
    }else{
        price = 35000 * 20 + 30000 * 30 + (valueKilogram - 50) * 15000;
    }

    donGiaElement.innerHTML = price;
    donGiaElement.value = price;
}

var xacNhanVButton = document.getElementById('buttonXacNhan');
xacNhanVButton.onclick = function () {
    if(!kiemTraHinhAnh() || !kiemTraKilogam() || !kiemTraMoTa() || !kiemTraSerial()){
        return false;
    }

    
    var dataTableElement = document.querySelector('#dataTable');
    var stt = dataTableElement.querySelectorAll('tr').length + 1;
    var trElement = document.createElement('tr');
    var content = `
                    <td>${stt}</td>
                    <td>${serialElement.value}</td>
                    <td>${motaElement.value}</td>
                    <td>${hinhAnhElement.value}</td>
                    <td>${kilogramElement.value}</td>
                    <td>${donGiaElement.value}</td>
                `
    trElement.innerHTML = content;
    dataTableElement.appendChild(trElement);

    // dong modal
    
    $('.modal').modal('hide');
}