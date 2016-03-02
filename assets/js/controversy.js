var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1hnp3GYtdxWdCtOLu_TrwWYlF9iTEgU5Ef4csmo_3i-Y/pubhtml';

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url, callback: showInfo, parseNumbers: true } );
});

function showInfo(data, tabletop) {

  var templates = getTemplates();
  var elements = data.list.elements;

  $('#results').html(templates.list( {elements:elements} ));

    $("input[type='text']").on("input", function(){
      var searchStr = $( this ).val();
      var filtered = _.filter(elements, function (obj) {
        return _.values(obj).some(function (el) {
          var t = _.toString(el).toLowerCase();
          return t.indexOf(searchStr.toLowerCase()) > -1;
        });
    });

    $('#results').html(templates.list( {elements:filtered} ));

  });
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
