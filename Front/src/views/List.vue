<template>
  <div>
    <b-table 
    show-empty
      small
      stacked="md" 
      :items="instrumentosData"
      :fields="fields"> <!--Armo la tabla-->

      <template v-slot:cell(actions)="row"><!--Esto hace una columna que se llama accion que tiene modificar y eliminar-->
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Esconder' : 'Mostrar' }} Opciones
        </b-button>
      </template>

      <template v-slot:row-details="row"><!--row seria todos los datos the la fila selecionada-->
        <b-button @click="activar(row)">Modificar</b-button><!--el click activar activa el modal-->

        <!-- Modal -->

        <b-modal v-model="showModal" scrollable title="Modificar">
            <div>
              <b-form v-if="showForm">
                <b-form-group id="input-group-1" label="Instrumento:" label-for="input-1" description="Ingrese el nombre del instrumento">
                  <b-form-input
                    id="input-1"
                    v-model="form.instrumento"
                    placeholder="instrumento"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Marca:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="form.marca"
                    placeholder="marca"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Modelo:" label-for="input-3">
                  <b-form-input
                    id="input-3"
                    v-model="form.modelo"
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
                    placeholder="precio"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-6" label="Costo Envio:" label-for="input-6">
                  <b-form-input
                    id="input-6"
                    v-model="form.costoEnvio"
                    placeholder="costo envio"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-7" label="Cantidad Vendidas:" label-for="input-7">
                  <b-form-input
                    id="input-7"
                    v-model="form.cantidadVendida"
                    placeholder="cantidad vendida"
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-8" label="Descripcion:" label-for="input-8">
                  <b-form-input
                    id="input-8"
                    v-model="form.descripcion"
                    placeholder="descripcion"
                  ></b-form-input>
                </b-form-group>

                <b-button @click="modificar(row)" variant="primary">Modificar</b-button>
                <b-button @click="reset(row)" variant="danger">Reset</b-button>
              </b-form>
            </div>
          </b-modal>

          <!-- Fin modal -->
        
        <b-button variant="danger" style="margin-left: 10px" @click="eliminar(row)">Eliminar</b-button>
      </template>
      
    </b-table>
    
  </div>
  
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: "Productos",
  components: {
  },
  mounted() {
    this.getInstrumentos();
  },
  data() {
    return {
        instrumentosData: [],
        imagen:[], //Guarda la imagen que se sube 
        showModal:false, //Variable para mostrar el modal
        showForm:true,
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
        fields: [// Arma las columnas para la tabla
          { key: 'id', label: 'Id'},
          { key: 'instrumento', label: 'Instrumentos'},
          { key: 'marca', label: 'Marca'},
          { key: 'modelo', label: 'Modelo'},
          { key: 'imagen', label: 'Imagen'},
          { key: 'precio', label: 'Precio'},
          { key: 'costoEnvio', label: 'Costo de Envio'},
          { key: 'cantidadVendida', label: 'Cantidad vendidas'},
          { key: 'descripcion', label: 'Descripcion'},
          { key: 'actions', label: 'Opciones' }
        ],
    };
  },
  methods: {
    async getInstrumentos() { // trae los instrumentos
      axios.get("http://localhost:9001/api/v1/instrumentos/").then(res => {
                console.log(res);
                this.instrumentosData = res.data;
                console.log(this.instrumentosData);
            })
         
   
    },

    modificar(row) { 
      const empty = [] //para comparar si el usuario subio una imagen nueva

      if(JSON.stringify(this.imagen) != JSON.stringify(empty)){// Esto es para ver si el usuario subio una imagen nueva, si no sube una no hace nada
        this.form.imagen = this.imagen.name;

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
      }
        
      axios.put(`http://localhost:9001/api/v1/instrumentos/`+row.item.id,{
            "instrumento":this.form.instrumento,
            "marca": this.form.marca,
            "modelo": this.form.modelo,
            "imagen": this.form.imagen,
            "precio": this.form.precio,
            "costoEnvio": this.form.costoEnvio,
            "cantidadVendida": this.form.cantidadVendida,
            "descripcion": this.form.descripcion
        }).then(res => {
          console.log(res.data);
          const msg = 'Los datos se subieron exitosamente';
          this.success(msg);
          
        })
      console.log(this.instrumentosData);
    },

    reset(row) { // Hace un reset al formulario a sus valores iniciales
      // Reset our form values
      this.form.instrumento = row.item.instrumento;      
      this.form.marca = row.item.marca;
      this.form.modelo = row.item.modelo;        
      this.form.imagen = row.item.imagen;        
      this.form.precio = row.item.precio;        
      this.form.costoEnvio = row.item.costoEnvio;        
      this.form.cantidadVendida = row.item.cantidadVendida;        
      this.form.descripcion = row.item.descripcion;  
      // Trick to reset/clear native browser form validation state
      this.showForm = false
      this.$nextTick(() => {
        this.showForm = true
      })
    },

    success(msg) { // pop up de que se subio exitosamente
      this.boxTwo = ''
      this.$bvModal.msgBoxOk(msg, {
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

      setForm(row){ // inicializa el formulario 
        this.form.instrumento = row.item.instrumento;      
        this.form.marca = row.item.marca;
        this.form.modelo = row.item.modelo;        
        this.form.imagen = row.item.imagen;        
        this.form.precio = row.item.precio;        
        this.form.costoEnvio = row.item.costoEnvio;        
        this.form.cantidadVendida = row.item.cantidadVendida;        
        this.form.descripcion = row.item.descripcion;        
      },

      eliminar(row){ 
        this.confirmar = ''
        this.$bvModal.msgBoxConfirm('Estas seguro que quieres eliminar este producto?', {
          title: 'Confirmar',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'SI',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.confirmar = value
            console.log(this.confirmar)
            if(this.confirmar){
              axios.delete(`http://localhost:9001/api/v1/instrumentos/`+row.item.id)
            }
            const msg = 'Se borro exitosamente';
            this.success(msg);
          })
          .catch(err => {
            console.log(err)
            console.log(row)// An error occurred
          })
          
          this.$forceUpdate();
      },

      activar(row){
        this.showModal=true;
        this.setForm(row);
      }
      
  }
};
</script>