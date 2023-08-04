//BUTTON FUNCTIONS


function btnClick(e) {
  resetStateAll();
  switch (e.currentTarget.id) {
    case 'rectbutton':
      setState(e.currentTarget.id, true);
      e.currentTarget.style.background ='white'
      DRAW_RECT = true;
      break;
    case 'selectbutton':
      setState(e.currentTarget.id, true);
      e.currentTarget.style.background ='white'
      SELECT_ELEM = true;
    case 'linkbutton':
      setState(e.currentTarget.id, true);
      e.currentTarget.style.background ='white'
      LINK_ELEM = true;
      break;
    
    default:
      break;
  }
}

function resetStateAll() {
  $('.btn').each(function () { 
    this.style.background = "grey";
  });
  setState('clearbutton', false);
  setState('unbindbutton', false);
  setState('selectbutton', false);
  setState('rectbutton', false);
  setState('linkbutton', false);
  DRAW_RECT = false;
  SELECT_ELEM = false;
  LINK_ELEM = false;
}

/**
 * Set a button to active or inactive
 *
 * @param {string} buttonId
 * @param {boolean} isActive
 */
function setState(buttonId, isActive) {
  var element = $('#' + buttonId);

  if (isActive) {
    element.removeClass('btn-primary');
    element.addClass('btn-secondary');
  } else {
    element.addClass('btn-primary');
    element.removeClass('btn-secondary');
  }
}

//END BUTTON FUNCTIONS

function getDragArea(dragAreaType, X, Y) {
  var dragAreaPath = [];
  switch (dragAreaType) { //TODO deze weghalen relatief maken en bij onload zetten. 
    case 'C':
    dragAreaPath = [
        "M", X - 1/6 * RECT_WIDTH, Y - 1/6 * RECT_HEIGHT, 
        "L", X + 1/6 * RECT_WIDTH, Y - 1/6 * RECT_HEIGHT,
        "L", X + 1/2 * RECT_WIDTH, Y - 1/2 * RECT_HEIGHT,
        "L", X - 1/2 * RECT_WIDTH, Y - 1/2 * RECT_HEIGHT,	
        "L", X - 1/6 * RECT_WIDTH, Y - 1/6 * RECT_HEIGHT,
      ]; 
      break;			
    case 'I':
    dragAreaPath = [
        "M", X - 1/6 * RECT_WIDTH, Y + 1/6 * RECT_HEIGHT, 
        "L", X - 1/2 * RECT_WIDTH, Y + 1/2 * RECT_HEIGHT,
        "L", X - 1/2 * RECT_WIDTH, Y - 1/2 * RECT_HEIGHT, 
        "L", X - 1/6 * RECT_WIDTH, Y - 1/6 * RECT_HEIGHT,
        "L", X - 1/6 * RECT_WIDTH, Y + 1/6 * RECT_HEIGHT 
      ]; 
      break;
    case 'M':
    dragAreaPath =[
        "M", X - 1/6 * RECT_WIDTH, Y + 1/6 * RECT_HEIGHT, 
        "L", X + 1/6 * RECT_WIDTH, Y + 1/6 * RECT_HEIGHT,
        "L", X + 1/2 * RECT_WIDTH, Y + 1/2 * RECT_HEIGHT,
        "L", X - 1/2 * RECT_WIDTH, Y + 1/2 * RECT_HEIGHT,	
        "L", X - 1/6 * RECT_WIDTH, Y + 1/6 * RECT_HEIGHT,
      ];
      
      break;
    case 'O':
    dragAreaPath = [
        "M", X + 1/6 * RECT_WIDTH, Y + 1/6 * RECT_HEIGHT, 
        "L", X + 1/2 * RECT_WIDTH, Y + 1/2 * RECT_HEIGHT,
        "L", X + 1/2 * RECT_WIDTH, Y - 1/2 * RECT_HEIGHT, 
        "L", X + 1/6 * RECT_WIDTH, Y - 1/6 * RECT_HEIGHT,
        "L", X + 1/6 * RECT_WIDTH, Y + 1/6 * RECT_HEIGHT 
      ];
      break;
  
    default:
    dragAreaPath = [];
      break;
  }
  return dragAreaPath;
}