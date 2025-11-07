import data from './data.json' with { type: 'json' };

const productList = document.querySelector('#productlist');
data.forEach(item => productList.appendChild(createProductFromTemplate(item)));

document.querySelector('#copybutton').addEventListener('click', () => copyItemsToClipBoard());

/**
 * Creates a new product row element from a template
 * @param {Object} item - The product item object
 * @param {string} item.name - The name of the product
 * @param {string} item.category - The category of the product 
 * @param {number} item.count - The quantity of the product
 * @returns {DocumentFragment} A document fragment containing the cloned template
 */
function createProductFromTemplate(item) {
    const template = document.querySelector('#productrow');

    // Clone the new row and insert it into the table
    const clone = template.content.cloneNode(true);

    clone.querySelector('.product-name').textContent = item.name;
    clone.querySelector('.product-category').textContent = item.category;
    
    const input = clone.querySelector('.count');
    input.value = item.count;

    const updateInputCount = () => item.count = parseInt(input.value, 10);
    input.addEventListener('change', () => updateInputCount());

    clone.querySelector('.decrement').addEventListener('click', () => {
        input.stepDown();
        updateInputCount(); // Trigger change event to update item.count
    });
    clone.querySelector('.increment').addEventListener('click', () => {
        input.stepUp();
        updateInputCount(); // Trigger change event to update item.count
    });
    
    return clone;
}

function copyItemsToClipBoard() {
    const textToCopy = data.filter(item => item.count > 0).map(item => `${item.name}\t${item.category}\t${item.count}`).join('\n');

    navigator.clipboard.writeText(textToCopy)
        .then(() => console.log('Copied to clipboard'))
        .catch(err => console.error('Failed to copy: ', err));
}