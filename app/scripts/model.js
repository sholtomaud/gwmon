module.exports = {
  //site : require('./site.json')
  ui : require('./user_interface.json'),
  filters:[
        {
            label: "All",
            filter: 'all'
        },
        {
            label: "Active",
            filter: 'active'
        },
        {
            label: "Completed",
            filter: 'completed'
        }
    ],
   filter: "all",
   fieldsEnabled: "false"
}
