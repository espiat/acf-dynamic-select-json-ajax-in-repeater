
jQuery(document).ready(function ($) {
    // make sure acf is loaded, it should be, but just in case

    if (typeof acf == 'undefined') { return; }
    // field key for Product select field inside repeater field

    $(document).on('change', '[data-key="field_60d5ce5d892c8"] .acf-input select', function (e) {
        // we are not going to do anyting in this anonymous function
        // the reason is explained below
        // call function, we need to pass the event and jQuery object

        update_fields_on_change(e, $);


    });
    $('[data-key="field_60d5ce5d892c8"] .acf-input select').trigger('ready');

    function update_fields_on_change(e, $) {
        if (this.request) {
            // if a recent request has been made abort it
            this.request.abort();
        }
        // set target
        var target = $(e.target);
        var product_id = target.val();
        if (!product_id) {
            // no value - nothing to do
            // don't need to do anything else
            return;
        }

        // I don't know exactly what it does
        // acf does it so I copied it
        var self = this,
            data = this.o;


        // other product vars:
        var prod_number = 'field_60d6b7febf74d';
        var prod_gv_price = 'field_60d6b71177e04';
        var product_kv_price = 'field_60d6b81cbf74e';
        var product_menge = 'field_60d6b878bf74f';
        var product_notiz = 'field_60d6b8a7bf751';
        // get client id for special kv Preise
        var client = acf.getField('field_60d5cdf9b00c5');
        var client_id = client.val();

        // get the row
        var row = target.closest('.acf-row');

        // empty fields
        row.find('[data-key="' + prod_number + '"] input').val('');
        row.find('[data-key="' + prod_gv_price + '"] input').val('');
        row.find('[data-key="' + product_kv_price + '"] input').val('');
        row.find('[data-key="' + product_menge + '"] input').val('');
        row.find('[data-key="' + product_notiz + '"] input').val('');
        console.log('1');
        // execute ajax request
        // value is product ID
        var data = {
            action: 'load_single_product_query',
            product_id: product_id,
            client_id: client_id
        }
        // this is another bit I'm not sure about
        // copied from ACF

        console.log('2');
        data = acf.prepareForAjax(data);
        // data.exists = [];
        console.log('3');
        // make ajax request
        this.request = $.ajax({
            url: acf.get('ajaxurl'), // acf stored value
            data: data,
            type: 'post',
            dataType: 'json',
            success: function (json) {
                if (!json) {
                    console.log('no json');
                    // return;
                }
                // fill the new values for the product fields in the repeater field
                console.log(json['product_nr']);
                row.find('[data-key="' + prod_number + '"] input').val(json['product_nr']);
                row.find('[data-key="' + prod_gv_price + '"] input').val(json['product_gv']);
                row.find('[data-key="' + product_kv_price + '"] input').val(json['product_kv']);


                //city_select.append(city_item);
            },
            error: function (request, status, error) {
                console.log(request.responseText);
                alert('Error' + request.responseText);
            }
        });
        console.log('what');


        alert('Preise und Produktnummer wurden nun angepasst an die neue Auswahl. Menge entfernt.');
     
    };

    function no_confirm_old_data(e, $) {
        console.log('val before' + value);
        if (this.request) {
            // if a recent request has been made abort it
            this.request.abort();
        }
        var target = $(e.target);
        var value = target.val();


        if (!value) {
            // no state selected
            // don't need to do anything else
            return;
        }
        // set old value
        console.log('no confirm. value:' + value);
        e.preventDefault();
        target.val(value);
    };


});
