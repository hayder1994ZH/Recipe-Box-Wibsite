<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <!-- edit product -->
        <b-modal id="update" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span>Recipe</label>
            <b-form-input
              v-model="formEdit.recipe"
              placeholder="Enter Recipe"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red"></span>Ingredients</label>
            <b-form-textarea
              id="textarea"
              placeholder="Enter The Directions ..."
              v-model="formEdit.ingredients"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
          <div class="mb-3">
            <label><span style="color: red"></span>Directions</label>
            <b-form-textarea
              id="textarea"
              placeholder="Enter The Directions ..."
              v-model="formEdit.directions"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
          <div class="form-group submit-form">
            <button
              class="btn btn-primary submit-button"
              type="submit"
              @click="update"
            >
              Submit
            </button>
          </div>
        </b-modal>
        
        <button
        type="button"
        style="margin-top:1rem"
        class="btn btn-primary add"
        @click="$bvModal.show('update')"
        >
        Edit Product
        </button>
        <!-- end of edit product -->
      </b-col>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Product Details</h4>
          </template>
          <template v-slot:headerAction>
            <a
              class="text-primary float-right"
              v-b-toggle.collapse-10
              role="button"
            >
              <i class="ri-code-s-slash-line" />
            </a>
          </template>
            <h3 style="
            margin-top: 3rem;
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 2rem;"
            >
            {{ formEdit.recipe }}
            </h3 >
            <h3 style="
            margin-left: 3rem;
            font-size: 1.5rem;"
            >
            Ingredients
            </h3 >
          <br>
           <div style="padding: 0 3rem 0 3rem;" v-for="(ing, b) in ingredients" :key="b">
            <b-alert variant="success"  style="color: #333;"  show><span style="color: #333;">{{ ing }}</span></b-alert>
           </div>
           
          <h3 style="margin-left: 3rem;font-size: 1.5rem;" >Directions</h3 >
          <br>
           <div style="padding: 0 3rem 0 3rem;" v-for="(dir, i) in directions" :key="i">
            <b-alert variant="success" show><span style="color: #333;">{{ dir }}</span>
            </b-alert>
           </div>
          <br>
        </iq-card>
      </b-col>
    </b-row>
    <loader v-if="loader" />
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import Loader from '../../components/core/loader/NewLoader.vue'
export default {
  name: 'Products',
  components: { Loader },
  created () {
    this.getProducts()
},
  mounted () {
    core.index()
  },
  watch: {
    currentPage: {
      handler: function () {
        this.getProducts()
      }
    }
  },
  data () {
    return {
      ingredients: '',
      recipe: '',
      directions: '',
      loader: false,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      formAdd:[],
      formEdit: [],
      formEditRestaurant: [],
      // directions: [],
    }
  },
  methods: {
    editPopup (item) {
      this.formEdit = item
      this.$bvModal.show('update')
    },
    async update () {
      this.loader = true
      let products = JSON.parse(localStorage.getItem('products'))
      //Find index of specific object using findIndex method.    
      let objIndex = products.findIndex((obj => obj.productId == this.$route.params.id));
      // //Update object's name property.
      products[objIndex].recipe = this.formEdit.recipe
      products[objIndex].ingredients = this.formEdit.ingredients
      products[objIndex].directions = this.formEdit.directions
      localStorage.setItem('products', JSON.stringify(products))
      this.getProducts()
      this.$bvModal.hide('update')
      this.loader = false
    },
    getProducts () {
      let products = JSON.parse(localStorage.getItem('products'))
      products.forEach(element => {
        if(element.productId == this.$route.params.id){
            if(element.ingredients){
                this.ingredients = element.ingredients.split('\\');
            }
            if(element.directions){
                this.directions = element.directions.split('\\');
            }
            this.formEdit = element
          this.loader = false 
        }
      });
    }
  }
}
</script>
<style>
.custom-btn mr-2 {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-url {
  width: 4rem !important;
  height: 4rem !important;
}
.add {
  margin-bottom: 1rem !important;
}
.submit-button {
  margin: 0.5rem !important;
}
.submit-form {
  float: right;
}
.delete-btn {
  margin-left: 1rem !important;
}
.form-delete {
  margin-left: 11rem;
}
.li-text{
        width: 90%;
        margin: auto;
        height: 3vw;
        padding: 1rem;
        background: red;
        color: #ffff;
}
.iq-sidebar{
  display: none !important;
}
#content-page{
  margin-left: 5rem;
}
.iq-top-navbar{
  display: none !important;
}
</style>
