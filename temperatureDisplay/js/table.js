$(document).ready( function() {
  $('.sortable').DataTable( {
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.childRow,
        type: 'inline'
      }
    }
  });
});
