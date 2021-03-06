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
    newValues = newValues.join(', '); // 'Luxury, Sport'
	    
    let carHTML = 

    `<div class="card whole-vehicle-card" id="${vehicle._id}" style="width: 20rem;">
      <img class="card-img-top vehicle-image" src=${vehicle.image}> 
      <h3 class="card-title">${vehicle.make}</h3>
      <h4 class="card-text">${vehicle.model}</h4>
      <h5 id="vehicle.year" class="card-text">${vehicle.year}, ${vehicle.color}</h5> 
      <p class="card-text">${newValues}</p>
      
      <button type="button" class="edit-btn btn-primary" data-toggle="modal" data-target="#modal-${vehicle._id}" data-id=${vehicle._id}>Edit</button>
      <button class="delete-btn btn-danger" data-id=${vehicle._id}>Delete</button>
			
			<!-- Modal Start -->
      <div class="modal fade" id="modal-${vehicle._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        
        <div class="modal-dialog" role="document">
          
          <div class="modal-content">
            
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Vehicle Details</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form data-id="${vehicle._id}">
                <div class="row">
                  <div class="col-md-6">
                    <label class="edit-modal-field-labels" for="make">Make</label>
                    <input class="edit-modal-fields" name="make" type="text" id="make" value="${vehicle.make}">
                  
                    <label class="edit-modal-field-labels" for="model">Model</label>
                    <input class="edit-modal-fields" name="model" type="text" id="model" value="${vehicle.model}">
                  </div>
                  <div class="col-md-6">
                    <label class="edit-modal-field-labels" for="year">Year</label>
                    <input class="edit-modal-fields" name="year" type="text" id="year" value="${vehicle.year}">

                    <label class="edit-modal-field-labels" for="color">Color</label>
                    <input class="edit-modal-fields" name="color" type="text" id="color" value="${vehicle.color}">
                  </div>
                </div>
                <div class="row edit-modal-image-field-row">
                  <div class="col-md-12 text-center">
                    <label class="edit-modal-field-labels" for="image">Image URL</label>
                    <input class="edit-modal-fields" name="image" type="text" id="image" value="${vehicle.image}">
                  </div>
                </div>

                <!-- Category selections -->
                <div class="row">
                  <div class="col-md-12 text">
                    <h4>Add vehicle categories</h4>

                    <div class="form-check form-check-inline">
                      <label class="form-check-label">
                      <input ${ newValues.includes('Luxury') ? 'checked' : '' } name="categories[0][name]"  class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Luxury">Luxury
                      </label>
                    </div>

                    <div class="form-check form-check-inline">
                      <label class="form-check-label">
                      <input ${ newValues.includes('Sport') ? 'checked' : '' } name="categories[1][name]" class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Sport">Sport
                      </label>
                    </div>

                    <div class="form-check form-check-inline">
                      <label class="form-check-label">
                      <input ${ newValues.includes('Muscle') ? 'checked' : '' } name="categories[2][name]" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="Muscle">Muscle
                      </label>
                    </div>

                    <div class="form-check form-check-inline">
                      <label class="form-check-label">
                      <input ${ newValues.includes('Exotic') ? 'checked' : '' } name="categories[3][name]" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="Exotic">Exotic
                      </label>
                    </div>

                    <div class="form-check form-check-inline">
                      <label class="form-check-label">
                      <input ${ newValues.includes('SUV') ? 'checked' : '' } name="categories[3][name]" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="SUV">SUV
                      </label>
                    </div>

                    <div class="form-check form-check-inline">
                      <label class="form-check-label">
                      <input ${ newValues.includes('Pick-up') ? 'checked' : '' } name="categories[5][name]" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="Pick-up">Pick-up
                      </label>
                    </div>

                    <div class="form-check form-check-inline">
                      <label class="form-check-label">
                      <input ${ newValues.includes('Sedan') ? 'checked' : '' } name="categories[6][name]" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="Sedan">Sedan
                      </label>
                    </div>
                  </div> 
                </div>  
              </form>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="save-btn-modal" data-id=${vehicle._id}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- End of Modal -->

    </div>`

  $('.all-vehicles').prepend(carHTML);
  }
  
  $('#add-new-vehicle-form').on('submit', function(e) {
  	e.preventDefault();
  	console.log ('new vehicle ', $(this).serialize());

  	$.ajax({
  		method: 'POST',
  		url: '/api/vehicles',
  		data: $('#add-new-vehicle-form').serialize(),
  		success: postNewVehicle,
  		error: addNewVehicleError
  	})
  })

  function postNewVehicle(newVehicle) {
  	renderVehicle(newVehicle);
  }

  function addNewVehicleError(err) {
  	console.log ('Error adding vehicle: ' + err);
  }


// Vehicle Delete
  $('.all-vehicles').on('click', '.delete-btn', function(e) {
  	console.log('delete button clicked');
	$.ajax({
		method: 'DELETE',
		url: '/api/vehicles/' + $(this).attr('data-id'),
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
  	console.log("Error deleting vehicle: " + err);
  }


// Vehicle Edit
  $('.all-vehicles').on('click', '.edit-btn', function handleVehicleEditClick(e) {
		console.log ('edit button clicked');
	});

  $('.all-vehicles').on('click', '#save-btn-modal', function handleVehicleSaveClick(e) {
  	console.log('save button clicked');
  	console.log($(`form[data-id="${$(this).attr('data-id')}"]`).serialize());
   
  	$.ajax({
  		method: 'PUT',
  		url: '/api/vehicles/' + $(this).attr('data-id'), // the data-id on the button you just clicked
  		data: $(`form[data-id="${$(this).attr('data-id')}"]`).serialize(), // {make: 'bmw!!!!', model: 2001}
  		success: editVehicleSuccess,
  		error: editVehicleError
  	});
	});
	
  function editVehicleSuccess (editedVehicle) {
  	$('.all-vehicles').empty();

  	$.ajax({
    method: 'GET',
    url: '/api/vehicles',
    success: onSuccess,
    error: function getError (data) {
      console.log("error getting vehicles" + data);
    	}
  	});

	  function onSuccess (vehicles) {
	    console.log(vehicles);
	    vehicles.forEach(function (vehicle) {
	      renderVehicle(vehicle);
	    });
	  }
  }

  function editVehicleError (err) {
  	console.log ('Error edit vehicle: ' + err);
  }


// Filter by vehicle category
  $(".categories-nav-btn").on("click", function () {
    // console.log($(this).attr("value"));
    let category = $(this).attr("value");

    $.ajax({
      method: "GET",
      url: "/api/vehicles_by_category/" + category,
      success: categoryFilterSuccess,
      error: function categoryFilterError (data) {
        console.log("Error filtering for category: " + data);
      }
    });
  });

function categoryFilterSuccess (newCatCars) {
      $(".all-vehicles").empty();
      newCatCars.forEach(renderVehicle);
    }

// All vehicles from filter nav bar
  $("#all-categories-btn").on("click", function() {
      $.ajax({
      method: 'GET',
      url: '/api/vehicles',
      success: categoryFilterSuccess,
      error: function getError (data) {
        console.log("error getting vehicles" + data);
      }
    });
  });

});