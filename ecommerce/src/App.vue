<template>
              <VCardText
                class="pa-8"
                :class="smAndDown.value ? 'pb-5' : 'pe-5'"
              >
                <!-- HEADER -->
                <div>
                  <h4 class="text-h4 mb-2">
                    Checkout
                  </h4>
                  <div class="text-body-1">
                    Choose the best products to fit your needs.
                  </div>
                </div>
                <!-- HEADER END -->

                <VDivider class="my-4" />

                <!-- FORMS -->
                <div class="mb-7">
                  <VRow class="my-0">
                    <!-- COUNTRIES -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSelect
                        label="Country"
                        :items="countries"
                        @focus="fetchCountries"
                        @update:modelValue="(val) => setPickedCountry(val)"
                      />
                    </VCol>
                    <!-- COUNTRIES -->

                    <!-- PORTS -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                    <VSelect
                        label="Ports"
                        :items="ports"
                        @focus="fetchPorts"
                        @update:modelValue="setPickedPort"
                      />
                    </VCol>
                    <!-- PORTS END -->
                  </VRow>

                  <!-- PRODUCTS -->
                  <VRow class="my-0">
                    <VSelect
                        label="Products"
                        :items="products"
                        @focus="fetchProducts"
                        @update:modelValue="setPickedProduct"
                      />
                  </VRow>
                  <!-- PRODUCTS END -->

                  <!-- PRODUCT DESCRIPTION -->
                  <VRow class="my-0">
                    <VTextField
                        disabled
                        :label=" !selectedProduct?.description ? 'Description' : ''"
                        type="text"
                        color="black"
                    > 
                    {{ selectedProduct ? selectedProduct.description : '' }}
                    </VTextField>
                  </VRow>
                  <!-- PRODUCT DESCRIPTION END -->
                </div>
                <!-- FORMS END -->
              </VCardText>

              <VCardText
                class="pa-8"
                :class="smAndDown.value ? '' : 'ps-5'"
              >
                <!-- HEADER -->
                <div class="mb-8">
                  <h4 class="text-h4 mb-2">
                    Order Summary
                  </h4>
                  <div class="text-body-1">
                    Please check before placing order
                  </div>
                </div>
                <!-- HEADER END -->

                <VDivider class="my-4" />

                <!-- PRICE SECTION -->
                <div class="my-5">
                  <!-- PRICE -->
                  <div class="d-flex justify-space-between mb-2">
                    <div class="text-body-1">
                      Price
                    </div>
                    <div class="text-body-1 font-weight-medium text-high-emphasis">
                      {{ selectedProduct.harga ? `Rp. ${formatter.nominal(selectedProduct.harga)}` : '' }}
                    </div>
                  </div>
                  <!-- PRICE END -->

                  <!-- DISCOUNT -->
                  <div class="d-flex justify-space-between">
                    <div class="text-body-1">
                      Discount
                    </div>
                    <div class="text-body-1 font-weight-medium text-high-emphasis">
                      {{ discountedPrice ? `Rp. ${formatter.nominal(discountedPrice)}` : '' }} {{ selectedProduct.diskon ? `(${selectedProduct.diskon}%)` : '' }}
                    </div>
                  </div>
                  <!-- DISCOUNT END -->

                  <VDivider class="my-4" />

                  <!-- TOTAL -->
                  <div class="d-flex justify-space-between">
                    <div class="text-body-1">
                      Total
                    </div>
                    <div class="text-body-1 font-weight-medium text-high-emphasis">
                      {{ totalPrice ? `Rp. ${formatter.nominal(totalPrice)}` : '' }}
                    </div>
                  </div>
                  <!-- TOTAL END -->
                </div>
                <!-- PRICE SECTION END -->

                <!-- BUTTON -->
                <VBtn
                  :append-icon="$vuetify.locale.isRtl ? 'ri-arrow-left-line' : 'ri-arrow-right-line'"
                  block
                  color="success"
                  class="mb-8"
                >
                  Proceed With Payment
                </VBtn>
                <!-- BUTTON END -->

                <div class="text-body-1">
                  By continuing, you accept to our Terms of Services and Privacy Policy. Please note that payments are non-refundable.
                </div>
              </VCardText>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useStore } from '../src/stores'
import formatter from '../src/utils'

const { smAndDown } = useDisplay()
const store = useStore()

const selectedCountryId = ref(null)
const selectedPortId = ref(null)
const selectedProduct = ref({})

const discountedPrice = computed(() => {
  if (selectedProduct.value) {
    return (selectedProduct.value.harga * selectedProduct.value.diskon / 100)
  }
  return 0
})

const totalPrice = computed(() => {
  if (selectedProduct.value) {
    return selectedProduct.value.harga - discountedPrice.value
  }
  return 0
})

// COUNTRIES STORE
const countries = computed(() => {
  if (Array.isArray(store.countries)) {
    return store.countries.map(country => country.nama_negara)
  }
  return []
})

// FETCH COUNTRIES
const fetchCountries = async () => {
  try {
    await store.getCountries()
  } catch (err){
    console.error("Error Fetch Countries: ", err)
  }
};

const setPickedCountry = (val) => {
  const selectedCountry = store.countries.find(country => country.nama_negara === val)
  if (selectedCountry) {
    selectedCountryId.value = selectedCountry.id_negara
  }
}

// PORTS STORE
const ports = computed(() => {
  if (Array.isArray(store.ports)) {
    return store.ports.map(port => port.nama_pelabuhan)
  }
  return []
})

// FETCH PORTS
const fetchPorts = async () => {
  try {
    await store.getPorts(selectedCountryId.value)
  } catch (err){
    console.error("Error Fetch Ports: ", err)
  }
}

const setPickedPort = () => {
  const selectedPort = store.ports.find(port => Number(port.id_negara) === selectedCountryId.value)
  if (selectedPort) {
    selectedPortId.value = selectedPort.id_pelabuhan
  }
}

// PRODUCTS STORE
const products = computed(() => {
  if (Array.isArray(store.products)) {
    return store.products.map(product => product.nama_barang)
  }
  return []
})

// FETCH PRODUCTS
const fetchProducts = async () => {
  try {
    await store.getProducts(selectedPortId.value)
  } catch (err){
    console.error("Error Fetch Ports: ", err)
  }
}

const setPickedProduct = () => {
  const pickedProduct = store.products.find(product => product.id_pelabuhan === Number(selectedPortId.value))
  if (pickedProduct) {
    selectedProduct.value = pickedProduct
  }
}
</script>