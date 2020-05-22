<template>
  <div>
    <b-container fluid style="margin-top: 10px; width: 60%">     
      <div class="card">
        <div class="row no-gutters">
            <div class="col-auto">
                <b-card-img
                  :src="'http://localhost:9001/api/v1/instrumentos/getImage/' + this.instrumentoEncontrado.imagen"
                  alt="Image"
                  style="min-height:475px; max-height:500px"                  
                ></b-card-img>
            </div>
            <div class="col">
                <div class="card-block px-2" style="margin-top: 20px; text-align: left">
                    <b-card-text style="text-align: left">
                    {{ this.instrumentoEncontrado.cantidadVendida }} vendidos
                    </b-card-text>
                    <b-card-title :title="this.instrumentoEncontrado.instrumento" style="font-size:45px"></b-card-title>
                    <b-card-text style="text-align: left">
                      <h1 style="font-size:80px">$ {{ this.instrumentoEncontrado.precio }}</h1>
                    </b-card-text>
                    <b-card-text style="text-align: left; margin-top:6%">
                      <h5>Marca: {{ this.instrumentoEncontrado.marca }}</h5>
                      <h5>Modelo: {{ this.instrumentoEncontrado.modelo }}</h5>
                    </b-card-text>
                    <b-card-text style="text-align: left; margin-top:6%">
                        <span>Costo envio:</span><br>
                        <b-img src='/img/camion.png' style="color:green" v-if="this.instrumentoEncontrado.costoEnvio == 'G'"></b-img>
                        <span style="color:green" v-if="this.instrumentoEncontrado.costoEnvio == 'G'"> Envió gratis a todo el país</span>
                        <span style="color:orange" v-if="this.instrumentoEncontrado.costoEnvio != 'G'">Costo de Envio Interior de Argentina ${{this.instrumentoEncontrado.costoEnvio}}</span>
                    </b-card-text> 
                </div>
            </div>
        </div>
      </div>
    </b-container>
    <b-container fluid style="border: 1px solid grey; width: 60%; min-height:150px">
        <div class="row no-gutters">
            <div class="col-sm-5" style="text-align:left">
                <span style="text-align: left">Descripcion:</span><br>
                <span> {{this.instrumentoEncontrado.descripcion}}</span>
            </div>
            <div class="col-sm-7" style="margin-top: 50px;">
                <b-button variant="outline-primary" @click="showMsgBoxTwo">Agregar al carrito</b-button>
            </div>
        </div> 
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Detalle",
  components: {},
  mounted() {
    this.getInstrumento();
  },
  data() {
    return {
      instrumentoEncontrado: [],
      imagen:[],
      form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
        boxTwo:''
    };
  },
  methods: {
    async getInstrumento() {
      const parametroId = this.$route.params.id;
      axios.get("http://localhost:9001/api/v1/instrumentos/"+parametroId)
        .then(res => {
          console.log(res);
          this.instrumentoEncontrado = res.data;
          console.log(this.instrumentoEncontrado);
        })
      console.log(this.$route.params)
    }
  }

};
</script>