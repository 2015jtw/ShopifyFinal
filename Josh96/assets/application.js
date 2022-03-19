
if( document.getElementById('sort_by') != null ){
    // Put your application javascript here
    document.querySelector("#sort_by").addEventListener('change', function(e){
        var url = new URL(window.location.href);
        url.searchParams.set('sort_by', e.currentTarget.value);

        window.location = url.href;
    });
}

// turn all of a country's provinces into an array that we use in addresses.liquid form
if( document.getElementById('AddressCountryNew') != null ){
    document.getElementById('AddressCountryNew').addEventListener('change', function(e){
        var provinces = this.options[this.selectedIndex].getAttribute('data-provinces');
        var provinceSelector = document.getElementById('AddressProvinceNew');
        var provinceArray = JSON.parse(provinces);

        // console.log(provinceArray)

        if(provinceArray.length < 1){
            provinceSelector.setAttribute('disabled', 'disabled')
        } else{
            provinceSelector.removeAttribute('disabled')
        }

        provinceSelector.innerHTML = "";
        var options = "";
        for(var i = 0; i < provinceArray.length; i++){
            options += '<option value="' + provinceArray[i][0] + '">' + provinceArray[i][0] + '</option>';
        }

        provinceSelector.innerHTML = options;
    })
}


if(document.getElementById('forgotPassword') != null){
    document.getElementById('forgotPassword').addEventListener('click', function(e){
        console.log("I clicked");
        const element = document.querySelector("#forgot_password_form");
        if(element.classList.contains("d-none")){
            element.classList.remove('d-none');
            element.classList.add('d-block');
        }

    });
}

var localeItems = document.querySelectorAll('#localeItem');
if(localeItems.length > 0){
    localeItems.forEach(item => {
        item.addEventListener('click', event => {
            document.getElementById('localeCode').value = item.getAttribute("lang");
            document.getElementById('localization_form_tag').submit();
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    update_card();
});

function update_card(){
    fetch('/cart.js')
    .then((resp) => resp.json())
    .then((data) => document.getElementById("NumberOfCartItems").innerHTML = data.items.length)
    .catch((err) => console.log(err))
}

var predictiveSearchInput = document.getElementById('searchInputField');
var timer;
var offCanvasSearch = document.getElementById('offcanvasSearchResult');
var bsOffCanvas = new bootstrap.offCanvas(offCanvasSearch);

if(predictiveSearchInput != null){
    predictiveSearchInput.addEventListener('input', function(e) {
        console.log(predictiveSearchInput.value);

        clearTimeout(timer);
        if(predictiveSearchInput.value){
            timer = setTimeout(fetchPredictiveSearch, 3000);
        }

        
    });
}

function fetchPredictiveSearch(){
    fetch(`/search/suggest.json?q=${predictiveSearchInput.value}&resources[type]=product,article`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        bsOffCanvas.show();
    });
}