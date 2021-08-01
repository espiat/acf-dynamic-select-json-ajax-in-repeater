  <?php 
  /*
  IMPORTANT: Only the important functions from the class are in this file
  */
  
  public function ajax_load_single_product_query()
        {
            // this funtion is called by AJAX to load cities
            // based on state selecteion

            // we can use the acf nonce to verify
            if (!wp_verify_nonce($_POST['nonce'], 'acf_nonce')) {
                die();
            }

            if (isset($_POST['product_id'])) {
                $product_id = intval($_POST['product_id']);
            }

            if (isset($_POST['client_id'])) {
                $client_id = intval($_POST['client_id']);
            }

            $data = $this->get_single_product_query($product_id, $client_id);

            /*$choices = array();
            foreach ($cities as $value => $label) {
                $choices[] = array('value' => $value, 'label' => $label);
            }*/
            echo json_encode($data);
            exit;
        } // end public function ajax_load_city_field_choices


        public function get_single_product_query($product_id, $client_id)
        {

            $args = array(
                'post_type' => 'product',
                'post_status' => 'publish',
                'posts_per_page' => -1,
                'p' => $product_id
            );
            // global $post;
            $query = new WP_Query($args);
            $data = array();
            if ($query->have_posts()) {
                while ($query->have_posts()) {
                    $query->the_post();
                    // if client has special price
                    if (get_field('product_extra_gvpreis_repeater')) :
                        while (the_repeater_field('product_extra_gvpreis_repeater')) :


                            if (get_sub_field('product_repeater_kunde')['ID'] == $client_id) :
                                $product_kv  = get_sub_field('product_repeater_gvpreis');
                                // echo 'gefunden';
                                break;
                            else :
                                $product_kv =  get_post_meta(get_the_ID(), "product_preis_brutto", true);
                            // echo 'NO1';
                            endif;


                        endwhile;
                    else :
                        $product_kv =  get_post_meta(get_the_ID(), "product_preis_brutto", true);

                    endif;

                    $data = array(
                        'id'            => get_the_ID(),
                        'title'         => get_the_title(),
                        'product_nr'    => get_post_meta(get_the_ID(), "product_artikelnummer", true),
                        'product_gv'    => get_post_meta(get_the_ID(), "product_gv_preis", true),
                        'product_kv'    => $product_kv,

                    );
                }
            } else {
            }

            return $data;
        }
