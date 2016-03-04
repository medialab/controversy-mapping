var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1hnp3GYtdxWdCtOLu_TrwWYlF9iTEgU5Ef4csmo_3i-Y/pubhtml';

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, parseNumbers: true } );
});

function showInfo(data, tabletop) {

  var templates = getTemplates();
  var elements = data.list.elements;


  listUpdate();

  $("input[type='text']").on('input', listUpdate);

  function listUpdate(){
    var searchInput = $( "#search" ).val();
    var s = _.deburr(searchInput.toLowerCase())
    var matches = {};

    var filtered = _.filter(elements, function (obj) {
      return _.values(obj).some(function (el) {

        var rawTxt = _.toString(el);

        var t = _.deburr(rawTxt.toLowerCase());
        var index = t.indexOf(s);

        var match = rawTxt.substring(index, index + searchInput.length);

        if(!!~index) matches[match] = true;
        return !!~index;

      });
    });

    $('#results').html(templates.list( { elements:filtered } ));

    _.forEach(matches, function(d, key){
      $('#results').highlight(key); console.log(key)
    })

  }

}

function getTemplates(){
  var t = [];
  $('script[type*=handlebars-template]').each(function(){
    t[$(this).attr('id')] = Handlebars.compile($(this).html());
  })
  return t;
}

Handlebars.registerHelper('debug', function(optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});
