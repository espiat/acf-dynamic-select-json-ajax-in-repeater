# acf-dynamic-select-json-ajax-in-repeater
ACf Dynamic AJAX Field Example with select in repeater field

Working example for an select field in a repeater. 

I think somebody needs this example for ajax autocomplete in your own project as suggestion  

**Working with ACF > 5.7**

Like WooCommerce:
Order -> has repeater field for products

When selecting a product the prices automatically taken from the Product CPT to fill the price field in the repeater row.

Template from:
https://github.com/Hube2/acf-dynamic-ajax-select-example

Files !important -> only the functions for the example:  
class-gastrobbq-orders-cpt.php -> CPT Orders - ACF with repeater field for products  
class-gastrobbq-products-cpt.php -> CPT Products - loads the query for getting the single product details  
gastrobbq-admin-change-order-product.js -> js file to load the json data - has some console.log to see where your code stops ;-)     
