import axios from 'axios';

const apiBaseUrl = 'http://202.157.176.100:3000';

export const useActions = (state) => ({
  async getCountries() {
    try {
      // API CALL
      const res = await axios.get(`${apiBaseUrl}/negaras`);

      // SET TO STATE   
      if(Array.isArray(res.data)) {
        state.countries = res.data
      } else {
        state.countries = []
      }
      
      // WRAPPER
      console.debug("[Action Get Countries]", res);

      return res
    } catch (err) {
      // SET EMPTY
      state.countries = [];

      // ERROR MESSAGE
      console.error('Error: ', err.message);
    }
  },
  async getPorts(countryId) {
    try {
      // API CALL
      const res = await axios.get(`${apiBaseUrl}/pelabuhans`, {
        params: {
          filter: JSON.stringify({ where: { id_negara: countryId } })
        }
      });

      // SET TO STATE   
      if(Array.isArray(res.data)) {
        state.ports = res.data
      } else {
        state.ports = []
      }
      
      // WRAPPER
      console.debug("[Action Get Ports by Id]", res);

      return res
    } catch (err) {
      // SET EMPTY
      state.ports = [];

      // ERROR MESSAGE
      console.error('Error: ', err.message);
    }
  },
  async getProducts(portId) {
    try {
      // API CALL
      const res = await axios.get(`${apiBaseUrl}/barangs`, {
        params: {
          filter: JSON.stringify({ where: { id_pelabuhan: portId } })
        }
      });

      // SET TO STATE   
      if(Array.isArray(res.data)) {
        state.products = res.data
      } else {
        state.products = []
      }
      
      // WRAPPER
      console.debug("[Action Get Products by Id]", res);

      return res
    } catch (err) {
      // SET EMPTY
      state.products = [];

      // ERROR MESSAGE
      console.error('Error: ', err.message);
    }
  }
})