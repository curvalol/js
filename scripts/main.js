(function() {
  const 
    list = new Collection(users),
    items = list.getList(),
    headers = ['first_name', 'last_name', 'age', 'email', 'skill', 'city'],
    table = document.getElementById('table'),
    noResult = document.querySelector('.result'),
    tHead = table.querySelector('thead'),
    tBody = table.querySelector('tbody'),
    select = document.getElementById('field'),
    filter = document.getElementById('filter'),
    tHeadHTML = '<tr><th>' + headers.join('</th><th>') + '</th></tr>',
    options = '<option>' + headers.join('</option><option>') + '</option>';

  const
    sortedClass = 'sorted',
    noResultClass = 'result',
    filteredClass = 'filtered';

  tHead.innerHTML = tHeadHTML.replace(/_/g, ' ');
  select.innerHTML = options.replace(/_/g, ' ');
  createTBody(items);

  tHead.addEventListener('click', headerClickHandler);
  filter.addEventListener('input', filterInputHandler);
  select.addEventListener('change', selectHandler);

  function headerClickHandler(e) {
  	const target = e.target;
  	let newItems = items;

  	if (target.tagName === 'TH') {
  	  if (!target.classList.contains(sortedClass)) {
  	  	removeSortedClass();

        newItems = list.sortBy(target.textContent.replace(/\s/g, '_'));

      }

      createTBody(newItems);
      target.classList.toggle(sortedClass);
  	}
  }

  function filterInputHandler(e) {
  	const text = e.target.value,
          selectValue = select.value.replace(/\s/g, '_');

    if (text.length < 3) {
      createTBody(items);
    } else {
      const filteredList = list.findByValue(selectValue, text);
      let filterCol;

      headers.forEach((el, i) => {
        if (el === selectValue) {
          filterCol = i + 1;
        }
      })

      createTBody(filteredList);

      tBody.querySelectorAll('tr td:nth-child(' + filterCol + ')').forEach(el => {
        el.classList.add(filteredClass);
      })
    }

  	removeSortedClass();
  }

  function selectHandler() {
  	filter.value = '';
  	createTBody(items);
  	removeSortedClass();
  }

  function createTR(user) {
    if (user) {
      addNoResult();
      return '<tr>' + headers.map(el => '<td>' + user[el] + '</td>').join('') + '</tr>';
    } else {
      removeNoResult();
      return '';
    }
  } 

  function createTBody(array) {
    const      
      tBodyHTML = array
        .slice(1)
        .reduce((prev, next) => prev + createTR(next), createTR(array[0]));

    tBody.innerHTML = tBodyHTML;
  }

  function removeSortedClass() {
    const anotherSorted = table.querySelector('.' + sortedClass);

      if (anotherSorted) {
        anotherSorted.classList.remove(sortedClass);
      }
  }

  function addNoResult() {
    if (!noResult.classList.contains(noResultClass)) {
      noResult.classList.add('result');
    }
  }

  function removeNoResult() {
    if (noResult.classList.contains(noResultClass)) {
      noResult.classList.remove('result');
    }
  }

})();