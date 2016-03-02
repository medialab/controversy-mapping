var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1hnp3GYtdxWdCtOLu_TrwWYlF9iTEgU5Ef4csmo_3i-Y/pubhtml';

$(document).ready( function() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   parseNumbers: true } );
});

function showInfo(data, tabletop) {

  var templates = getTemplates();
  $('#search').html(templates.list( {elements:data.list.elements} ));
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
