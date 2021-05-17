function adder(){
    var num1 = document.getElementsByName('num1')[0].value;
    var num2 = document.getElementsByName('num2')[0].value;
    var sum = parseFloat(num1) + parseFloat(num2);

    document.getElementsByName('output')[0].value= sum;

}

function subtracter(){
    var num1 = document.getElementsByName('num1')[0].value;
    var num2 = document.getElementsByName('num2')[0].value;
    var difference = parseFloat(num1) - parseFloat(num2);

    document.getElementsByName('output')[0].value= difference;

}

function multiplier(){
    var num1 = document.getElementsByName('num1')[0].value;
    var num2 = document.getElementsByName('num2')[0].value;
    var product = parseFloat(num1) * parseFloat(num2);

    document.getElementsByName('output')[0].value= product;

}

function divider(){
    var num1 = document.getElementsByName('num1')[0].value;
    var num2 = document.getElementsByName('num2')[0].value;
    var quotient = parseFloat(num1) / parseFloat(num2);

    document.getElementsByName('output')[0].value= quotient;

}