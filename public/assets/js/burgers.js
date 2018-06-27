$(function() {

  const $burgers = $('#burgers #notDevoured ul')

  // Selector is wrong
  // Event handler might be better to be a submit listener if using a complete html form
  // Don't forget to prevent default and then manually submit form after handling data
  
  // If we used $("#notDevoured form") - the event listener would already be registered
  // So we have to add the event listener to the entire document, and bind to the form in order to 
  // register event listeners on newly created DOM elements
  $(document).on('submit', '#notDevoured form', function(event) {
    event.preventDefault();
    const $form = $(event.target);
    const $burger = $form.parent().parent().parent();
    const $burgerName = $burger.find(".lead").text();

    console.log($burgerName);
    // return;

    // Get form action to use in ajax
    const formAction = $(this)[0].action;

    // The ID of the burger to be devoured is already passed through the HTML form action
    // var id = $(this).data('id');

    // We already know that item should be devoured - no need to dynamically set this
    // We can just hard code "true"
    // var newDevour = $(this).data('newDevour'); 

    const newDevourState = {
      devoured: true
    };

    $.ajax({
      url: formAction,
      type: 'PUT',
      data: newDevourState,
    }).then(
      function(data) {
        // Here is where we would want to move to burger to the devoured section on the website
        console.log('changed devour to');
        console.log(data);

        var burgerhtml = `
        <li class="list-group-item">
          <p class="lead">${$burgerName}</p>
        </li>
        `
        $burger.remove();
        $(".devoured-list-group").append(burgerhtml);

        // location.reload();
      }
    );
  });
  
  /**
   * Previously
   *  - Submit handler was attached to the wrong DOM element: $(".create-form")
   *  - This entire submit handler was on the scoped outside of DOM ready function: $(function() { ... });
   * 
   * Solution
   *  - Change selector to correct DOM element
   *  - Moved inside of DOM ready function
   */
  $('.create-update-form').on('submit', function(event) {
    event.preventDefault();
  
    var burgerNameInput = $('#burgerNameInput')
    var newBurger = burgerNameInput.val().trim()
    
    $.ajax({
      url: '/api/burgers',
      type: 'POST',
      data: {
        burger_name: newBurger
      }
    }).then(function(data) {
        var burgerHtml = `
        <li class="list-group-item">
              <div class="input-group">
                <p class="lead">${data.burger_name}</p>
                <span class="input-group-btn">
                  <form action="burgers/update/${data.id}?_method=PUT" method="POST">
                    <input type="hidden" name="devoured" value="true">
                    <button class="btn btn-default btn-lg" type="submit"> EAT IT! </button>
                  </form>
                </span>
              </div>
            </li>
      `; 
  
      $burgers.append(burgerHtml)
      burgerNameInput.val('')
        console.log('Created new burger');
        // location.reload();
    })
  })
});

