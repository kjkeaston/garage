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
    `<div class="card whole-vehicle-card" style="width: 20rem;">
      <img class="card-img-top vehicle-image" src=${vehicle.image}> 
        <h3 class="card-title">${vehicle.make}</h3>
        <h4 class="card-text">${vehicle.model}</h4>
        <h5 class="card-text">${vehicle.year}, ${vehicle.color}</h5>
        <p class="card-text new-cats">${newValues}</p>
        <button class="edit-btn btn-outline-info">Edit</button>
        <button class="delete-btn btn-outline-danger">Delete</button>
      </div>
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
  	console.log(newVehicle);
  	renderVehicle(newVehicle);
  }
  function addNewVehicleError(err) {
  	console.log ('Error: ' + err);
  }

// let newCats = [];
//     for (let i = 1; i < 8; i++) {
//       if ($(`#checkbox${i}`).is(`:checked`) === true) {
//       newCats.push($(`#checkbox${i}`).val());
//       }
//     }
//     console.log(newCats); // array works fine in console
//     $(".new-cats").html(newCats.join(", "));
    // console.log($(`#checkbox${i}`).val());





});