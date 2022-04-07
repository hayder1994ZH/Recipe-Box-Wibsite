<template>
  <b-container fluid>
    <b-row>
     <div class="d-flex justify-content-between" style="width: 100%;">
        <button
          type="button"
          style="margin-top:2rem"
          class="btn btn-primary add"
          @click="$bvModal.show('add')"
        >
          Add Product
        </button>
      </div>
        <!-- add product -->
        <b-modal id="add" hide-footer>
          <div class="mb-3">
            <label><span style="color: red"></span>Recipe</label>
            <b-form-input
              v-model="formAdd.recipe"
              placeholder="Enter Recipe"
            ></b-form-input>
          </div>
          <!-- <div class="mb-3">
            <label><span style="color: red"> </span>Ingredients</label>
            <b-form-input
              v-model="formAdd.ingredients"
              placeholder="Enter Ingredients"
            ></b-form-input>
          </div> -->
          <!-- <div class="mb-3">
            <label><span style="color: red">* </span>Directions</label>
            <b-form-input
              v-model="formAdd.directions"
              placeholder="Enter Directions"
            ></b-form-input>
            
          </div> -->
            <div class="mb-3">
            <label><span style="color: red"></span>Ingredients</label>
            <b-form-textarea
              id="textarea"
              placeholder="Enter The Directions ..."
              v-model="formAdd.ingredients"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
          <div class="mb-3">
            <label><span style="color: red"></span>Directions</label>
            <b-form-textarea
              id="textarea"
              placeholder="Enter The Directions ..."
              v-model="formAdd.directions"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
          <div class="form-group submit-form">
            <button
              class="btn btn-primary submit-button"
              type="submit"
              @click="create"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- add product -->
        <!-- delete modal -->
        <div
          class="modal fade"
          style="margin-top: 15rem"
          id="deleteModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  id="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>
                <h3 style="text-align: center; margin-bottom: 2rem;font-size: 2rem;">
                  Are you sure you want to delete this item?
                </h3>
                <div class="form-group form-delete">
                   <button
                    type="button"
                    class="btn btn-secondary"
                    id="close-delete"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <b-button
                    variant="outline-danger"
                    class="delete-btn"
                    v-on:click="deleteItem"
                    >delete</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end delete modal -->
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Products List</h4>
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
          <template v-slot:body>
            <b-collapse id="collapse-10" class="mb-2">
              <div class="card">
                <kbd class="bg-dark"></kbd>
              </div>
            </b-collapse>
            <b-table-simple responsive>
              <b-thead>
                <b-th>recipe</b-th>
                <b-th>details</b-th>
                <b-th>created at</b-th>
                <b-th>updated at</b-th>
                <b-th>Action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.recipe }}</b-td>
                    <b-td>
                    <router-link
                      :to="{ name: 'dashboard.client.product', params: { id: item.productId } }"
                    >
                      details
                    </router-link>
                  </b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>{{ item.updated_at }}</b-td>
                  <b-td>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-danger"
                        data-toggle="modal"
                        data-target="#deleteModal"
                        v-on:click="deletePopup(item.productId)"
                        data-whatever="@getbootstrap"
                        size="sm"
                      >
                        <i class="ri-delete-bin-line m-0"></i>
                      </b-button>
                    </template>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </template>
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
    this.getAllItems()
},
  mounted () {
    core.index()
  },
  watch: {
    currentPage: {
      handler: function () {
        this.getAllItems()
      }
    }
  },
  data () {
    return {
      deleteId: null,
      logo: '',
      recipe: '',
      directions: '',
      loader: false,
      perPage: 100,
      currentPage: 1,
      rows: 0,
      formAdd:{
        user_uuid: '',
        directions: '',
        ingredients: '',
        productId: '',
        recipe: '',
        create_at: '',
        updated_at: '',
      },
      formEdit: [],
      items: [],
    }
  },
  methods: {
    deletePopup (id) {
      this.deleteId = id
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    deleteItem(){
      this.loader = true
      let products = JSON.parse(localStorage.getItem('products'))
      products.splice( products.findIndex(a => a.productId === this.deleteId) , 1);
      localStorage.setItem('products', JSON.stringify(products))
      this.getAllItems()
      this.closeDeleteModal()
      this.loader = false
    },
    async create () {
      this.loader = true
      if (this.addValidater().status === 400) {
        this.loader = false
        this.$swal('worrning', this.addValidater().message, 'error')
      } else {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        let products = JSON.parse(localStorage.getItem('products'))
        this.formAdd.productId = Math.floor(Math.random() * 10000);
        this.formAdd.user_uuid = Math.floor(Math.random() * 10000);
        this.formAdd.created_at = dateTime;
        this.formAdd.updated_at = dateTime;
        products.push(this.formAdd);
        localStorage.setItem('products', JSON.stringify(products))
        this.getAllItems()
        this.$bvModal.hide('add')
        this.loader = false
      }
    },
    getAllItems () {
      this.loader = true
      let localProduct = JSON.parse(localStorage.getItem('products'))
      if(localProduct){
        this.items = localProduct
        this.loader = false
      }else{
        this.getLocalItems()
      }
    },
    getLocalItems () {
      let localProduct = localStorage.getItem('products')
      this.axios
        .get(
          `product?take=10000`
        )
        .then((res) => {
           this.items = res.data.items
            let localProduct = JSON.parse(localStorage.getItem('products'))
          if(!localProduct){
            localStorage.setItem('products', JSON.stringify(this.items))
          }
          this.loader = false 
        })
        .catch(() => {
          this.loader = false 
        })
    },
    addValidater () {
      let dataError = {
        status: null,
        message: ''
      }
      if (!this.formAdd.recipe) {
        dataError.status = 400
        dataError.message = 'the recipe field is required'
        return dataError
      }
      if (!this.formAdd.ingredients) {
        dataError.status = 400
        dataError.message = 'the ingredients field is required'
        return dataError
      }
      if (!this.formAdd.directions) {
        dataError.status = 400
        dataError.message = 'the directions field is required'
        return dataError
      }
      dataError.status = 200
      dataError.message = 'success'
      return dataError
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
