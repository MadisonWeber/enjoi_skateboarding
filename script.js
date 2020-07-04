// Make Function To Change Cart //

const cartNum = document.querySelector('.checkout-number-items');
const buyButtons = document.querySelectorAll('.buy');
const downButton = document.querySelector('#down-check');
const hiddenCheckout = document.querySelector('.hidden-checkout');

downButton.addEventListener('click', openDropdown);

function openDropdown (){
   if(hiddenCheckout.style.opacity ==='0'){
        hiddenCheckout.style.opacity = '100'

    } else {
        hiddenCheckout.style.opacity = '0'

    }

}



for(let button of buyButtons){
    let listen = button.addEventListener('click', addChange);

}

function addChange (e){
    cartNum.innerText = parseInt(cartNum.innerText) +1;
    if(parseInt(cartNum.innerText) > 0){
        cartNum.style.backgroundColor = 'rgb(66, 220, 255)';
        cartNum.style.width = '1.6rem';
        cartNum.style.border = '1px solid black';
        cartNum.style.borderRadius = '3px';
        cartNum.style.textAlign = 'center';
        document.getElementById('down-check').style.opacity = '100';
    }

    let price = e.path[1].querySelector('.product-price').innerText
    let name = e.path[1].querySelector('.product-name').innerText
    
    let exportCartObject = {price : price, name : name}

    addToCart(exportCartObject)

}

function addToCart(object){
    let parent = document.querySelector('.hidden-inside');
    let addElement = document.createElement('div');
    addElement.classList.add('cartProduct')
    addElement.innerHTML = `<h3>${object.name}:</h3> <p>${object.price}</p> <button class = "btn deleteBtn">Delete</button>`
    parent.parentNode.insertBefore(addElement, parent);

    updatePrice()
}


function updatePrice(){
    let valueArray = []
    let total = document.querySelector('.final-total');
    let products = document.querySelectorAll('.cartProduct');
    products.forEach((product) =>{
        let ptag = product.querySelector('p');
        valueArray.push(ptag.innerHTML)
        
    })

    const ret_val = valueArray.map((num) =>{
            let newNum = num.substring(1, num.length);
            return parseFloat(newNum)
    })

    total.textContent = ret_val.reduce( (a,b) =>{
        return a + b
    })

}


