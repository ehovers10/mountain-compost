$(document).ready( function() {
  $('.data').DataTable( {
    responsive: {

    },
    columnDefs: [
      {
        className: 'expand',
        orderable: false,
        targets:   0
    }
    ],
    searching: false,
    paging: false,
    //scrollX: true,
    info: false
  });
});
