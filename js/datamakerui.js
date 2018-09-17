Vue.component('tag-list', {
  props: ['taglist'],
  data: function() {
    return {
      newName: '',
      newType: '',
      options: ['', 'airport', 'autoinc', 'boolean', 'cat', 'city', 'company', 'country', 'county', 
                'creditcard', 'currency', 'date', 'date_iso', 'digits', 'dog', 'domainname', 
                'email', 'emojii', 'firstname', 'float', 'integer', 'latitude', 'letters', 
                'longitude', 'name', 'normal', 'oneof', 'postcode', 'price', 'state', 'statecode', 
                'street', 'surname', 'tel', 'time', 'timestamp', 'title', 'tld', 'town', 'url', 
                'uuid', 'website', 'word', 'words', 'zip']
    }
  },
  methods: {
    del: function(i) {
      this.taglist.splice(i, 1)
    },
    add: function() {
      this.taglist.push({
        name: this.newName,
        type: this.newType
      })
      this.newName = ''
      this.newType = ''
    }
  },
  template: `
    <table class="table">
      <tr>
        <th>Column name</th>
        <th>Data Type</th>
      </tr>
      <tr v-for="tag,i in taglist">
        <td>{{ tag.name }}</td>
        <td>{{ tag.type }}</td>
        <td><button type="button" class="btn btn-danger" v-on:click="del(i)">Remove</button></td>
      </tr>
      <tr>
        <td>
          <input class="form-control" type="text" name="name" v-model="newName" placeholder="e.g. name" />
        </td>
        <td>
          <select class="form-control" v-model="newType">
            <option v-for="option in options" >{{ option }}</option>
          </select>
        </td>
        <td>
          <button type="button" v-on:click="add" class="btn btn-primary" :disabled="newName==='' || newType ===''">Add</button>
        </td>
      </tr>
    </table>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    showjumbo: true,
    message: 'Hello Vue!',
    preview: false,
    taglist: [ ],
    csv: ''
  },
  computed: {
    showgenerate: function() {
      return (this.taglist.length > 0)
    }
  },
  created: function() {
    new Clipboard('#copy-button');
  },
  methods: {
    orderTemplate: function() {
      this.taglist = [
        {name: 'id', type: 'autoinc'},
        {name: 'date', type: 'date_iso'},
        {name: 'customerName', type: 'name'},
        {name: 'customerEmail', type: 'email'},
        {name: 'deliveryStreet', type: 'street'},
        {name: 'deliveryCity', type: 'city'},
        {name: 'deliveryState', type: 'state'},
        {name: 'deliveryZip', type: 'zip'},
        {name: 'currencyCode', type: 'currency'},
        {name: 'cost', type: 'price'}
      ]
      this.showjumbo = false
    },
    usersTemplate: function() {
      this.taglist = [
        {name: 'id', type: 'uuid'},
        {name: 'title', type: 'title'},
        {name: 'firstname', type: 'firstname'},
        {name: 'surname', type: 'surname'},
        {name: 'email', type: 'email'},
        {name: 'telphone', type: 'tel'}
      ]
      this.showjumbo = false
    },
    businessTemplate: function() {
      this.taglist = [
        {name: 'uuid', type: 'autoinc'},
        {name: 'companyName', type: 'company'},
        {name: 'street', type: 'street'},
        {name: 'town', type: 'town'},
        {name: 'county', type: 'county'},
        {name: 'postcode', type: 'county'},
        {name: 'email', type: 'email'},
        {name: 'website', type: 'website'},
        {name: 'telphone', type: 'tel'},
        {name: 'description', type: 'words'}
      ]
      this.showjumbo = false
    },
    newTemplate: function() {
      this.taglist = []
      this.showjumbo = false
    },
    startAgain: function() {
      this.taglist = []
      this.showjumbo = true
      this.preview = false
      this.csv = ''
    },
    generate: function() {
      let u = 'https://openwhisk.ng.bluemix.net/api/v1/web/glynnbir%40uk.ibm.com_dev/default/datamaker'
      const params = {
        header: this.taglist.map((k) => { return k.name}).join(','),
        template: this.taglist.map((k) => { return '{{' + k.type + '}}'}).join(',')
      }
      var esc = encodeURIComponent;
      var query = Object.keys(params)
          .map(k => esc(k) + '=' + esc(params[k]))
          .join('&');
      fetch(u + '?' + query).then((data) => {
        return data.text()
      }).then((data) => {
        console.log(data)
        this.csv = data
        this.preview = true
      })
    }
  }
})
