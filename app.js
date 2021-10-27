const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.cart-cart');
// const cartBtn = document.querySelector('.cart-btn');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
//
let cart = [];
// buttons 
let buttonsDOM =[];
//getting the products 



let sliderImages = document.querySelectorAll(".slide"),
  arrowLeft = document.querySelector("#arrow-left"),
  arrowRight = document.querySelector("#arrow-right"),
  current = 0;

// Clear all images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = "none";
  }
}

// Init slider
function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}

// Show prev
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

// Show next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function() {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();













class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 300;
  
      if(this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // If word is complete
      if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  
  // Init On DOM Load
  document.addEventListener('DOMContentLoaded', init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }

















class Products{
async getProducts(){
    try{
         let result = await fetch('products.json');
         let data = await result.json();
         let products = data.items;
         products = products.map(item => {
             const {title, price} = item.fields;
             const {id} = item.sys
             const image = item.fields.image.fields.file.url;
             return {title,price,id,image}
         })
         return products
    }
catch(error){
    console.log(error);
}
  
}

}
//Display products
class UI{
displayProducts(products){
    let result = '';
    products.forEach(product => {
        result +=`
          <!-- single product -->
              <article class="product">
                  <div class="img-container">
                      <img src=${product.image} alt="product" class="product-img">
                      <button class="bag-btn" data-id=${product.id}>
                          <i class="fas fa-shopping-cart"></i>
                          add to bag
                      </button>
                  </div>
                  <h3>${product.title}</h3>
                  <h4>${product.price}</h4>
              </article>
            <!-- end of single product -->
        `;


    });
    productsDOM.innerHTML = result;
}
getBagButtons(){
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM=buttons;
    buttons.forEach(button =>{
        let id = button.dataset.id;
        let inCart = cart.find(item => item.id === id);
        if(inCart){
             button.innerText = "In Cart";
             button.disabled = true;
        }else{
              button.addEventListener('click', (event) =>{
               event.target.innerText = "In Cart";
               event.target.disabled = true;
              // get product from product
              let cartItem={...Storage.getProduct(id),amount:1};
              console.log(cartItem);
              // add product to the cart
              // save cart in localstorage
               // set cart values 
              // display cart item 
              //show the cart 
            })
        }

    })

}

}

//local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
   static getProduct (id){
     let products =JSON.parse(localStorage.getItem('products'));
     return products.find(product => product.id===id);
   }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const ui = new UI();
    const products = new Products();

    //get all products
    products.getProducts().then(products  => {
        ui.displayProducts(products)
        Storage.saveProducts(products);

    }).then(() => {
        ui.getBagButtons();
    });

    
});