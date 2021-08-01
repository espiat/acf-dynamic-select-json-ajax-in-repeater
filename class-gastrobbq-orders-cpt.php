   <?php 
  /*
  IMPORTANT: Only the important functions from the class are in this file
  */
  
  
  // load JS file
        public function orders_enqueue_scripts()
        {
            global $post;
            if (
                !$post ||
                !isset($post->ID) ||
                get_post_type($post->ID) !=  $this->cpt_slug
            ) {
                return;
            }
            // source
            $src = plugin_dir_url(__FILE__) . 'js/gastrobbq-admin-change-order-product.js';

            // dependencies
            $depends = array('acf-input');

            // load all together
            wp_enqueue_script($this->plugin_name . 'orders_js', $src, $depends, $this->version);
        }
