const arithmeticForm = document.getElementById('arithmetic');
const type = document.querySelector('input[name="type"]');
const fieldA = document.querySelector('input[name="field_A"]');
const fieldB = document.querySelector('input[name="field_B"]');
const total = document.getElementById('total');

arithmeticForm.addEventListener('submit', (e) => {
    e.preventDefault();
    total.style.display = 'block';

    switch (type.value) {
        case 'add':
            total.innerHTML = `Total (${fieldA.value} + ${fieldB.value} = ${parseFloat(fieldA.value) + parseFloat(fieldB.value)})`;
            break;
        
        case 'subtract':
            total.innerHTML = `Total (${fieldA.value} - ${fieldB.value} = ${parseFloat(fieldA.value) - parseFloat(fieldB.value)})`;
            break;
        
        case 'multiply':
            total.innerHTML = `Total (${fieldA.value} * ${fieldB.value} = ${parseFloat(fieldA.value) * parseFloat(fieldB.value)})`;
            break;
        
        case 'divide':
            total.innerHTML = `Total (${fieldA.value} / ${fieldB.value} = ${parseFloat(fieldA.value) / parseFloat(fieldB.value)})`;
            break;
        
        case 'percentage':
            total.innerHTML = `Total (${fieldA.value} % ${fieldB.value} = ${parseFloat(fieldA.value) * (parseFloat(fieldB.value) / 100)})`;
            break;
    
        default:
            total.innerHTML = `Arithmetic operation failed!`;
            break;
    }
});