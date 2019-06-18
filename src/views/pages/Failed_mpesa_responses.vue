 <template>
     <div class="page-table scrollable">
         <h1 class="animated fadeInDown" >Failed M-Pesa responses</h1>

         <div id="space"></div>
         <failedmpesaresponses_index></failedmpesaresponses_index>

     </div>
 </template>


 <script>

     import Failedmpesaresponses_index from "../../components/failed_mpesa_responses/failed_mpesa_index";
     export default {
         name: "Failed_mpesa_responses",
         data(){
             return {

             }
         },
         methods: {

         },
         components: {
             Failedmpesaresponses_index
         }
     }
 </script>
 <style scoped>
     #space{
         padding-bottom: 10px;
     }
 </style>

