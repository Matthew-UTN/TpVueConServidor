<template>
  <div class="productos">
    <b-container fluid >
      <div style="margin-top:15px">
        <b-button v-b-modal.modal-1>Agregar nuevo producto</b-button>

        <!-- Modal -->

        <b-modal id="modal-1" scrollable title="Agregar nuevo producto">
          <div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="showForm">
              <b-form-group id="input-group-1" label="Instrumento:" label-for="input-1" description="Ingrese el nombre del instrumento">
                <b-form-input
                  id="input-1"
                  v-model="form.instrumento"
                  required
                  placeholder="instrumento"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Marca:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.marca"
                  required
                  placeholder="marca"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3" label="Modelo:" label-for="input-3">
                <b-form-input
                  id="input-3"
                  v-model="form.modelo"
                  required
                  placeholder="modelo"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-4" label="Imagen:" label-for="input-4">
                <b-form-file v-model="imagen" class="mt-3"  plain></b-form-file>
                <div class="mt-3">Selected file: {{ imagen ? imagen.name : '' }}</div>
              </b-form-group>

              <b-form-group id="input-group-5" label="Precio:" label-for="input-5">
                <b-form-input
                  id="input-5"
                  v-model="form.precio"
                  required
                  placeholder="precio"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-6" label="Costo Envio:" label-for="input-6">
                <b-form-input
                  id="input-6"
                  v-model="form.costoEnvio"
                  required
                  placeholder="costo envio"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-7" label="Cantidad Vendidas:" label-for="input-7">
                <b-form-input
                  id="input-7"
                  v-model="form.cantidadVendida"
                  required
                  placeholder="cantidad vendida"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-8" label="Descripcion:" label-for="input-8">
                <b-form-input
                  id="input-8"
                  v-model="form.descripcion"
                  required
                  placeholder="descripcion"
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </div>
        </b-modal>

        <!-- Fin modal -->

      </div>
    
      <b-card-group deck style="margin-left: 20px">
        <div
          v-for="instrumento in instrumentosData"
          :key="instrumento.id"
          style="margin-top:15px"
        >
          <instrumento-item :instrumentoParam="instrumento"></instrumento-item>
        </div>
      </b-card-group>
    </b-container>
  </div>
</template> 

<script>
// @ is an alias to /src
import Instrumento from "@/components/Instrumento.vue";
import axios from "axios";

export default {
  name: "Productos",
  components: {
    "instrumento-item": Instrumento
  },
  mounted() {
    this.getInstrumentos();
  },
  data() {
    return {
      instrumentosData: [],  
      imagen:[], //Guarda la imagen que se sube
      form: {
          instrumento: '',
          marca: '',
          modelo: '',
          imagen: '',
          precio: '',
          costoEnvio: '',
          cantidadVendida: '',
          descripcion: '',
        },
        showForm: true,
    };
  },
  methods: {
    async getInstrumentos() {
      axios.get("http://localhost:9001/api/v1/instrumentos/")
        .then(res => {
          console.log(res);
          this.instrumentosData = res.data;
          console.log(this.instrumentosData);
        })
    },
    async onSubmit(evt) {
      evt.preventDefault()
      this.form.imagen = this.imagen.name;
      console.log(this.form);

      const formData = new FormData();

      formData.append('imagen', this.imagen);

      console.log(formData.get('imagen'))

      axios.post("http://localhost:9001/api/v1/instrumentos/uploadImg",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function(){
        
      })
      .catch(function(){
        alert("Selecciona otra imagen")
      });
      
      axios.post(`http://localhost:9001/api/v1/instrumentos/`,{
            "instrumento":this.form.instrumento,
            "marca": this.form.marca,
            "modelo": this.form.modelo,
            "imagen": this.form.imagen,
            "precio": this.form.precio,
            "costoEnvio": this.form.costoEnvio,
            "cantidadVendida": this.form.cantidadVendida,
            "descripcion": this.form.descripcion
        }).then(res => {
          console.log(res);
          this.success();
        })
      
      console.log(this.instrumentosData);

    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.instrumento = ''
      this.form.marca = ''
      this.form.modelo = ''
      this.form.imagen = ''
      this.form.precio = ''
      this.form.costoEnvio = ''
      this.form.cantidadVendida = ''
      this.form.descripcion = ''
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
      })
    },
    success() { // pop up de que se subio exitosamente
      this.boxTwo = ''
      this.$bvModal.msgBoxOk('Los datos se subieron exitosamente', {
        title: 'Confirmacion',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      })
      .then(value => {
          this.boxTwo = value
        })
        .catch(err => {
          console.log(err)// An error occurred
        })
      },
  }
};
</script>
