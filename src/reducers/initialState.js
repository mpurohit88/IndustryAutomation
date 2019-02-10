export default {
  company: {
    list: []
  },
  customer: {
    list: []
  },
  product: {
    list: []
  },
  quote: {
    list: [],
    details: {}
  },
  user: {
    list: []
  },
  fuelSavings: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  }
};
