<template>
    <div class="page-table scrollable">
    <h1 class="animated fadeInDown">Countries</h1>
    <div id="space"></div>
<country-index></country-index>
    </div>
</template>

<script>
    import CountryIndex from '@/components/countries/countries_index'
    export default {
        name: "Countries",
        data(){
            return {

            }
        },
        methods: {
            addClicked(){
                this.$router.push('countries/add');
            }


        },
        components: {
            CountryIndex
        }
    }
</script>

<style scoped>
    #space {
        padding-bottom: 15px;
    }
</style>