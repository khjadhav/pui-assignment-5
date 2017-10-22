// create a Bun constructor
function Bun(name, cost, quant, amount, flava1, flava2, img){
    this.name=name;
    this.cost=cost;
    this.quant=quant;
    this.amount=amount;
    this.flava1=flava1;
    this.flava2=flava2;
    this.img=img;
}

$(document).ready(function() {
// -----------------------------------------Cart Array------------------------------------------

// Create an array from the data stored in local storage
var cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
// Change the number of items in the shopping cart
$("#numForCart").text(cartArray.length);

// loop through the cartArray
for (var i=0; i<cartArray.length; i++){
    var desiredBun = cartArray[i];
    //Dynamically create a div (checkout-product-div) in which all the new divs will go into
    var container = $("<div></div>",{id:i, class:'checkout-product-div'});
    // Add the previously created divs to the div called checkout-cart on the checkout page
    container.appendTo($(".checkout-cart"));

    // create divs for all the product values to be displayed and add them to checkout-product-div
    $("<img/>",{class:'checkout-image-super',src:desiredBun.img}).appendTo(container);
    console.log($('.checkout-image-super').length);


    $("<div id=product-cost>"+"$ "+desiredBun.cost*desiredBun.amount+"</div>").appendTo(container);
    $("<h1 id=product-name>"+desiredBun.name+"</h1>").appendTo(container);

    $("<div id=product-quant>"+"Chosen Pack: "+desiredBun.quant+"</div>").appendTo(container);
    $("<div id=product-amount>"+"Quantity: "+desiredBun.amount+"</div>").appendTo(container);

    //Create the flavour divs only when the flavours are selected
    if (desiredBun.flava1!=null){
    $("<div id=additionalFlavours>"+"Additional Flavours"+"</div>").appendTo(container);
    }
    if (desiredBun.flava1!=null){
    $("<div id=product-flava1>"+"  1. "+desiredBun.flava1+"     "+"</div>").appendTo(container);
    }
    if (desiredBun.flava2==null){
    $("<div id=product-flava2>"+"  "+"</div>").appendTo(container);
    }
    if (desiredBun.flava2!=null){
    $("<div id=product-flava2>"+"  2. "+desiredBun.flava2+"</div>").appendTo(container);
    }

    // dynamically create a delete button and append it to the container
    var deleteButton = $("<button id=" +i+ " class='del-button'>Remove Item</button>");
    deleteButton.appendTo(container);

    // Create a function to delete items from the cart
    $(".del-button").click(function(){
        //remove the product item
        $(this).parent().remove();
        // identify the position of the object in the Array
        var position=$(this).attr('id');
        //remove the item from the Array
        cartArray.splice(position,1);
        //Reupdate the length of the array in localStorage
        localStorage.setItem("cartArray", JSON.stringify(cartArray));
        //display the update information as the cart number
        $("#numForCart").text(cartArray.length);
        //refresh the page
        location.reload();
    });
    $(".checkout-cart").append(container);
}

//hide the flavour dropdowns when the page loads first
$("#select-text").hide();
$("#flavour1").hide();
$("#flavour2").hide();

// Assign variables for all the product values
var price=1.00,location="assets/original(gluten-free).png", number=1, amountOfProduct=1;
$("#packs").change(function(){
        if (this.value == "Pack of 1"){
            $("#singlepack").attr("src", "assets/original(gluten-free).png");
            $("#price").text("$ 1.00");
            price=1.00;
            location="assets/original(gluten-free).png";

            $('#select-text').hide();
            $("#flavour1").hide();
            $("#flavour2").hide();
        }
        else if (this.value == "Pack of 6"){
            $("#singlepack").attr("src", "assets/Pack_of_6.jpg");
            $("#price").text("$ 6.00");
            price=6.00;
            location="assets/Pack_of_6.jpg";
            $('#select-text').show();
            $("#flavour1").show();
            $("#flavour2").show();
        }
        else{
            $("#singlepack").attr("src", "assets/Pack_of_12.jpg");
            $("#price").text("$ 12.00");
            price=12.00;
            location="assets/Pack_of_12.jpg";

            $('#select-text').show();
            $("#flavour1").show();
            $("#flavour2").show();
            }
        })

//Create function to add items to the cart
$(".add-to-cart-button").click(function(){
    //get values of the input items and store them as variables
    var packs= $("#packs").val();
    var flav1= $("#flavour1").val();
    var flav2= $("#flavour2").val();
    var amountOfProduct=$("#number-input").val();

    // Create a new BunBun using the newly extracted information from the page
    var BunBun=new Bun("Original (Gluten-Free)", price, packs, amountOfProduct, flav1, flav2, location);
    console.log(location);

    // Add items to the local storage
    var existingCartItems=JSON.parse(localStorage.getItem("cartArray")) || [];
    existingCartItems.push(BunBun);
    localStorage.setItem("cartArray", JSON.stringify(existingCartItems));
    console.log(JSON.parse(localStorage.getItem("cartArray")));

    //Display the number of items in the cart near the cart icon
    var numForCart = parseInt($("#numForCart").text());
    console.log(numForCart);
    numForCart+= parseInt($("#number-input").val());
    $("#numForCart").text(numForCart);
})

})

