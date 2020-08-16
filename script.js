

/* Common Needed Dom Elements */
const cartNum = document.querySelector('.checkout-number-items');
const buyButtons = document.querySelectorAll('.buy');
const downButton = document.querySelector('#down-check');
const hiddenCheckout = document.querySelector('.hidden-checkout');
const checkoutBtn = document.querySelector('.checkoutBtn');
const animationDiv = document.querySelector('.checkoutAnimation');
const slideshowBtn = document.querySelectorAll('.slideshowBtn');
const slideshowLeft = document.querySelector('.btn-left');
const slideshowRight = document.querySelector('.btn-right');
const slideshowImg = document.querySelector('.change-img');
const slideshowOverlay = document.querySelector('.slideshow-overlay')
const slideshowContainer = document.querySelector('.slideshow-container')
const body = document.querySelector("body > *:not(.slideshow-container)")
const exitBtn = document.querySelector('.exit-btn');
const slideshowText = document.querySelector('.slideshow-text');
const signUpBtn = document.querySelector('.signup-btn');



/* Listen For Cart Buttons */
for(let button of buyButtons){
    let listen = button.addEventListener('click', addChange);

}


/*Function To open the Cart Menu */

downButton.addEventListener('click', openDropdown);

function openDropdown (){
   if(hiddenCheckout.style.display ==='none'){
        hiddenCheckout.style.display = 'grid'
    } else {
        hiddenCheckout.style.display = 'none'
    }
}


/* Styles Cart Number Display & creates Cart Object and Send to add to Cart Function*/
function addChange (e){
    cartNum.innerText = parseInt(cartNum.innerText) +1;
    if(parseInt(cartNum.innerText) > 0){
        cartNum.style.backgroundColor = 'rgb(66, 220, 255)';
        cartNum.style.width = '1.6rem';
        cartNum.style.border = '1px solid black';
        cartNum.style.borderRadius = '3px';
        cartNum.style.textAlign = 'center';
        downButton.style.display = 'inline';
    }

    let price = e.path[1].querySelector('.product-price').innerText
    let name = e.path[1].querySelector('.product-name').innerText
    let outerdiv = e.path[2]
    let img_src = outerdiv.querySelector('img').src;
    let clean_img = img_src.replace("http://127.0.0.1:5500", "" );
    let exportCartObject = {price : price, name : name, imgref : clean_img};

    addToCart(exportCartObject);
}



function addToCart(object){
    let addElement = document.createElement('div');
    addElement.classList.add('cartProduct')
    addElement.innerHTML = `<img src = ${object.imgref} alt = ''/> <h3>${object.name}:</h3> <p>${object.price}</p> <button type = 'button' class = "btn deleteBtn">Delete</button>`
    document.querySelector('.addContainer').appendChild(addElement);
    updatePrice()
    checkForButton()
}

/* Function To Update Price, Called From Many Other Functions */

function updatePrice(){
    let valueArray = []
    let total = document.querySelector('.final-total');
    let products = document.querySelectorAll('.cartProduct');
    let subtotal = document.querySelector('.subTotal')

    products.forEach((product) =>{
        let ptag = product.querySelector('p');
        valueArray.push(ptag.innerHTML)        
    })

    const ret_val = valueArray.map((num) =>{
            let newNum = num.substring(1, num.length);
            return parseFloat(newNum)
    })

    if(valueArray.length === 0){
        total.textContent = 0;
        subtotal.textContent = 0;
        hiddenCheckout.style.display = 'none';
        cartNum.style.backgroundColor = "#f08d24";
        cartNum.style.border = 'none'
    }else{
        let fullreturn = ret_val.reduce( (a,b) =>{
        return a + b
        })
        total.textContent = "$" + fullreturn.toFixed(2) + ' CAD'
        subtotal.textContent = "$" + (fullreturn * 1.15).toFixed(2) + ' CAD' }
}
  

/* Add Listener To Delete Cart Item */

function checkForButton(){
    let myDeleteButtons = document.querySelectorAll('.deleteBtn')
    for(let btn of myDeleteButtons){
        btn.addEventListener('click', removeBtn)
    }
}

function removeBtn(e){
    e.path[1].remove()
    cartNum.innerText = parseInt(cartNum.innerText) -1

    updatePrice()
}


/* Add Listener on Checkout Button */
checkoutBtn.addEventListener('click', checkout);

function checkout() {
    //localStorage.setItem('cart-items', JSON.stringify(document.querySelector('.addContainer')))
    document.querySelector('.addContainer').innerHTML = '';
    cartNum.innerText = 0;
    downButton.style.display = 'none';
    updatePrice()
    hiddenCheckout.style.display = "none";
    animationDiv.style.display = 'grid';
    animationDiv.innerHTML = '<h3>Thank You For Your Purchase</h3><img src = photos/enjoy_nav_pic.png  alt = ""/> <button class = "resumeShopping">Shop More</button>'

    checkForShopMoreButton()

}

function checkForShopMoreButton(){
    let shopMore = document.querySelector('.resumeShopping')
    shopMore.addEventListener('click', resetShopping)
}

function resetShopping(){
    downButton.style.display = 'inline';
    animationDiv.style.display = 'none';
    hiddenCheckout.style.display = 'none';
}



/* Functionality For SlideShow */

slideshowLeft.addEventListener('click', pictureLeft);
slideshowRight.addEventListener('click', pictureRight);


function pictureRight(){
    let current = Number(slideshowImg.src.slice(-5, -4));
    let replace = current > 7 ? 1 : current + 1;
    slideshowImg.src = `ads/image_${replace}.jpg`
}

function pictureLeft(){
    let current = Number(slideshowImg.src.slice(-5, -4));
    let replace = current <= 1 ? 8 : current - 1;
    slideshowImg.src = `ads/image_${replace}.jpg`
}


// Slideshow OnClick

slideshowOverlay.addEventListener('click', enhanceSlideshow);


 function enhanceSlideshow() {
     slideshowOverlay.classList.add('hide');
     slideshowText.innerText = '';
     slideshowContainer.style.transition = 'ease-in 1s';
     exitBtn.style.display = 'block'
     slideshowLeft.style.display = 'inline'
     slideshowRight.style.display = 'inline'
 }

// Sideshow Close

exitBtn.addEventListener('click', closeSlideshow);

function closeSlideshow(){
    slideshowOverlay.classList.remove('hide')
    slideshowText.innerText = 'Click to Take a look at some of our Recent Ads'
     exitBtn.classList.add('hide')
     exitBtn.style.display = 'none'
     slideshowLeft.style.display = 'none'
     slideshowRight.style.display = 'none'

}

signUpBtn.addEventListener('click', cleanSignup);

function cleanSignup(e){
    const input = document.querySelector('.signup-input')
    input.value = ''
}


