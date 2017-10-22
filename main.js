
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
var cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
    $("#numForCart").text(cartArray.length);

for (var i=0; i<cartArray.length; i++){
    var desiredBun = cartArray[i];
    var container = $("<div></div>",{class:'checkout-product-div'});
    container.appendTo($(".checkout-cart"));


    $("<img/>",{class:'checkout-image-super',src:desiredBun.img}).appendTo(container);
    console.log($('.checkout-image-super').length);

    $("<div id=product-cost>"+"$ "+desiredBun.cost*desiredBun.amount+"</div>").appendTo(container);
    $("<h1 id=product-name>"+desiredBun.name+"</h1>").appendTo(container);

    $("<div id=product-quant>"+"Chosen Pack: "+desiredBun.quant+"</div>").appendTo(container);
    $("<div id=product-amount>"+"Quantity: "+desiredBun.amount+"</div>").appendTo(container);
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


    var deleteButton = $("<button id=" +i+ ">Remove Item</button>");
    deleteButton.appendTo(container);

    deleteButton.click(function(){
        console.log("clicked!");
        $(this).parent().remove();
        var cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
        cartArray.splice(i,1)
        $("#numForCart").text(cartArray.length);
    });

    $(".checkout-cart").append(container);
}

$("#select-text").hide();
$("#flavour1").hide();
$("#flavour2").hide();


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

$(".add-to-cart-button").click(function(){
    var packs= $("#packs").val();
    var flav1= $("#flavour1").val();
    var flav2= $("#flavour2").val();
    var amountOfProduct=$("#number-input").val();
    var BunBun=new Bun("Original (Gluten-Free)", price, packs, amountOfProduct, flav1, flav2, location);
    console.log(location);

    // || means put the things in an Array
    var existingCartItems=JSON.parse(localStorage.getItem("cartArray")) || [];
    existingCartItems.push(BunBun);
    localStorage.setItem("cartArray", JSON.stringify(existingCartItems));
    console.log(JSON.parse(localStorage.getItem("cartArray")));

    var numForCart = parseInt($("#numForCart").text());
    console.log(numForCart);
    numForCart+= parseInt($("#number-input").val());
    $("#numForCart").text(numForCart);
})

$(".add-to-wishlist-button").click(function(){
    var packs= $("#packs").val();
    var flav1= $("#flavour1").val();
    var flav2= $("#flavour2").val();
    var amountOfProduct=$("#number-input").val();
    var BunBun=new Bun("Original (Gluten-Free)", price, packs, amountOfProduct, flav1, flav2, location);
    console.log(location);

    // || means put the things in an Array
    var existingCartItems=JSON.parse(localStorage.getItem("wishArray")) || [];
    existingCartItems.push(BunBun);
    localStorage.setItem("wishArray", JSON.stringify(existingCartItems));
    console.log(JSON.parse(localStorage.getItem("wishArray")));
})

})

