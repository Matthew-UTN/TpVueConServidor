<template>
  <div>
    <div class="card" style="margin-left: auto; width: 600px; height: 220px">
      <div class="row no-gutters">
            <div class="col-auto">
              <b-button variant="outline-light" :href="'/detalle/' + instrumentoParam.id">
                <b-card-img
                  :src="'http://localhost:9001/api/v1/instrumentos/getImage/' + instrumentoParam.imagen"
                  alt="Image"
                  style="min-height:200px; max-height:200px"                  
                ></b-card-img>
              </b-button>
            </div>
            <div class="col">
                <div class="card-block px-2" style="margin-top: 20px; text-align: left">
                    <b-card-title :title="instrumentoParam.instrumento"></b-card-title>
                    <b-card-text style="text-align: left">
                      <h2>$ {{ instrumentoParam.precio }}</h2>
                    </b-card-text>
                    <b-card-text style="text-align: left">
                      <b-img src='http://localhost:9001/api/v1/instrumentos/getImage/camion.png' style="color:green" v-if="instrumentoParam.costoEnvio == 'G'"></b-img>
                      <span style="color:green" v-if="instrumentoParam.costoEnvio == 'G'"> Envió gratis a todo el país</span>
                      <span style="color:orange" v-if="instrumentoParam.costoEnvio != 'G'">Costo de Envio Interior de Argentina ${{instrumentoParam.costoEnvio}}</span>
                    </b-card-text>
                    <b-card-text style="text-align: left">
                    {{ instrumentoParam.cantidadVendida }} vendidos
                    </b-card-text>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>



<script>
export default {

  props: ["instrumentoParam"],
  methods: {
    
  }
};
</script>
<style lang=""></style>