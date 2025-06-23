$(document).ready(function() {
  const letters = Object.keys(departments).sort();
  let currentLetter = letters[0];
  let currentDept = null;

  function renderLetters() {
    $('#letters').empty();
    letters.forEach(letter => {
      const btn = $(`
        <button class="letter-btn flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-medium 
        ${letter === currentLetter ? 'active text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}">
          ${letter}
        </button>
      `);
      btn.on('click', () => {
        currentLetter = letter;
        renderLetters();
        renderDeptList();
        showPlaceholder();
      });
      $('#letters').append(btn);
    });
    $('#letterIndicator').text(`(${currentLetter})`);
  }

  function renderDeptList() {
    $('#deptList').empty();
    const deptGroup = departments[currentLetter];
    
    if (!deptGroup) {
      $('#deptList').append(`
        <div class="p-8 text-center text-gray-500">
          <i class="fas fa-folder-open text-3xl mb-3 text-gray-300"></i>
          <p>No departments found for this letter</p>
        </div>
      `);
      return;
    }
    
    Object.keys(deptGroup).forEach(key => {
      const displayName = key.replace(/([a-z])([A-Z])/g, '$1 $2');
      const item = $(`
        <button class="dept-card w-full px-5 py-4 text-left hover:bg-gray-50 
        ${currentDept === key ? 'active' : ''}">
          <h4 class="font-medium text-gray-900">${displayName}</h4>
          <p class="text-sm text-gray-500 mt-1 truncate">${deptGroup[key].description.substring(0, 60)}...</p>
        </button>
      `);
      item.on('click', () => {
        currentDept = key;
        renderDeptList();
        showDeptDetails(deptGroup[key], displayName);
      });
      $('#deptList').append(item);
    });
  }

  function showDeptDetails(data, displayName) {
    $('#detailsPlaceholder').addClass('hidden');
    $('#deptDetails').removeClass('hidden');
    
    $('#deptHeading').text(data.heading);
    $('#deptCategory').text(displayName);
    $('#deptDesc').text(data.description);
    
    $('#deptPoints').empty();
    data.points.forEach(point => {
      $('#deptPoints').append(`
        <li class="flex items-start">
          <i class="fas fa-check text-emerald-500 mt-1 mr-2 text-xs"></i>
          <span class="text-gray-700">${point}</span>
        </li>
      `);
    });
  }

  function showPlaceholder() {
    currentDept = null;
    renderDeptList();
    $('#detailsPlaceholder').removeClass('hidden');
    $('#deptDetails').addClass('hidden');
  }

  // Scroll controls for alphabet tabs
  $('#prevBtn').on('click', function() {
    $('.alphabet-scroll').animate({ scrollLeft: '-=100' }, 200);
  });
  
  $('#nextBtn').on('click', function() {
    $('.alphabet-scroll').animate({ scrollLeft: '+=100' }, 200);
  });

  // Close details button
  $('#closeDetails').on('click', showPlaceholder);

  // Initial Render
  renderLetters();
  renderDeptList();
});