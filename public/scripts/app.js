$(document).ready(function() {
  console.log('app.js loaded!');


  $.ajax({
    method: 'GET',
    url: '/api/vehicles',
    success: onSuccess,
    error: function getError (data) {
      console.log("error getting vehicles" + data);
    }
  })

  function onSuccess (vehicles) {
    console.log(vehicles);
    vehicles.forEach(function(vehicle) {
      renderVehicle(vehicle);
    });
  }



  function renderVehicle (vehicle) {
    
    var newValues = vehicle.categories.map(function (obj) {
	    return obj.name;
	});
    newValues = newValues.join(', ');
	    
    let carHTML = 
    `<div id="vehicle-card" class="card" id="${vehicle._id}" style="width: 20rem;">
      <img id="vehicle.image" class="card-img-top vehicle-image" src=${vehicle.image}> 
        <h3 id="vehicle.make" class="card-title">${vehicle.make}</h3>
        <h4 id="vehicle.model" class="card-text">${vehicle.model}</h4>
        <h5 id="vehicle.year" class="card-text">${vehicle.year}</h5> 
        <h5 id="vehicle.color" class="card-text">${vehicle.color}</h5>
        <p id="vehicle.newValues" class="card-text">${newValues}</p>
        <button class="edit-vehicle btn btn-primary" data-id=${vehicle._id}>Edit</button>
        <button class="save-vehicle btn btn-success" data-id=${vehicle._id}>Save</button>
        <button class="delete-vehicle btn btn-danger" data-id=${vehicle._id}>Delete</button>
      </div>
    </div>`

  $('.all-vehicles').prepend(carHTML);
  }
  


  $('#add-new-vehicle-form').on('submit', function(e) {
  	e.preventDefault();
  	console.log ('new vehicle ' , $(this).serialize());
  	$.ajax({
  		method: 'POST',
  		url: '/api/vehicles',
  		data: $('#add-new-vehicle-form').serialize(),
  		success: postNewVehicle,
  		error: addNewVehicleError
  	})
  })

  function postNewVehicle(newVehicle) {
  	console.log(newVehicle);
  	renderVehicle(newVehicle);
  }
  function addNewVehicleError(err) {
  	console.log ('Error: ' + err);
  }


  $('.all-vehicles').on('click', '.delete-vehicle', function(e) {
  	console.log('delete button clicked');
	$.ajax({
		method: 'DELETE',
		url: '/api/vehicles/' + $('.delete-vehicle').attr('data-id'),
		success: deleteVehicleSuccess,
		error: deleteVehicleError
	});
  });

  function deleteVehicleSuccess (deletedVehicle) {
  	console.log (deletedVehicle);
  	var deletedVehicleId = deletedVehicle._id;
  	$(`#${deletedVehicleId}`).remove();
  }

  function deleteVehicleError (err) {
  	console.log(err);
  }

  $('.all-vehicles').on('click', '.edit-vehicle', handleVehicleEditClick);

  	function handleVehicleEditClick(e) {
  		console.log ('edit button clicked');
  		// $('.save-vehicle').toggleClass('show');
  		// $('.edit-vehicle').toggleClass('hidden');
  		var data = {
  			 		image: $('#vehicle.image').serialize(),
					make: $('#vehicle.make').serialize(),
					model: $('#vehicle.model').serialize(),
					year: $('#vehicle.year').serialize(),
					color: $('#vehicle.color').serialize(),
					categories: $('#vehicle.newValues').serialize()
  		}
 
	  

	  $('.all-vehicles').on('click', '.save-vehicle', handleVehicleSaveClick);

	  function handleVehicleSaveClick(e) {
	  	$.ajax({
	  		method: 'PUT',
	  		url: '/api/vehicles/' + $('#vehicle-card').attr('data-id'),
	  		data: data,
	  		success: editVehicleSuccess,
	  		error: editVehicleError
	  	});
	  }

	}


  function editVehicleSuccess (editedVehicle) {
  	console.log (editedVehicle);
  	//$('#vehicle-card').attr('data-id').remove();
  	renderVehicle(editedVehicle);
  }



  function editVehicleError (err) {
  	console.log ('Error: ' + err);
  }


});