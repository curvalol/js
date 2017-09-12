//Конструктор объекта.
    //Массив передается в объект и сохраниется в переменной list путем замыкания в методе getList(), 
    //который является единственный способом получения значения этого совйства
function Collection(list) {
  if (list instanceof Array === false) {
  	throw 'inputed list is not an array'
  }

  this.getList = function () { return list; };
};

//возвращает длину массива пользователей
Collection.prototype.getLength = function () {
  return this.getList().length;
};

//возвращает конкретного поля массива list
Collection.prototype.getElement = function (index) {
  return this.getList()[index];
};

//сортировка по полю arg элементов-массиваов в массиве list
  //возвращает отсортированный массив
Collection.prototype.sortBy = function (arg) {
  
  return this.getList().slice().sort(function(a, b) {
  	if (a[arg] > b[arg]) {
  	  return 1;
  	}

  	if (a[arg] < b[arg]) {
  	  return -1;
  	}

  	return 0
  });
};

//возвращает отфильтрованный массив
Collection.prototype.filterBy = function (arg1, arg2, arg3) {
  let result = this.getList();

  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
  	result = result.filter(function (el) {
  	  return el[arg1] === arg2;
  	});

  	if (typeof arg3 === 'string') {
      result = result.sort(function(a, b) {
      	if (a[arg3] > b[arg3]) {
          return 1;
      	}

      	if (a[arg3] < b[arg3]) {
          return -1;
      	}

      	return 0;
      });
  	}
  }

  if (arg1 instanceof Array && arg1.every(function (el) {return el instanceof Object})) {
    for (let i = 0; i < arg1.length; i++) {
      const arg1key = Object.keys(arg1[i])[0];

      result = result.filter(function(el) {
      	return el[arg1key] === arg1[i][arg1key];
      });      
    }

  	if (typeof arg2 === 'string') {
      result = result.sort(function(a, b) {
      	if (a[arg2] > b[arg2]) {
          return 1;
      	}

      	if (a[arg2] < b[arg2]) {
          return -1;
      	}

      	return 0;
      });
  	}
  }

  return result;
};

//фильтр значений по частичному совпадению
Collection.prototype.findByValue = function(valName, val) {
  if (val.length < 2) {
  	throw 'The search string should have at least two characters';
  }

  let reg = new RegExp(val, 'i');
  
  return this.getList().slice().filter(function(el) {
    return reg.test(el[valName]);
  });  
}

//2)f)
Collection.prototype.getDeepCopy = function() {
  let deepCopy = [];

  this.getList().forEach(function(el, i) {
  	deepCopy.push({});
    for (let key in el) {
      deepCopy[i][key] = el[key];
    }
  });

  return deepCopy;
};

Collection.checkFieldInCollection = function(array, field) {
  return array.every(function(el) {
  	return !!el[field];
  });
};

Collection.getCreator = function(arg) {
  if (arg instanceof Collection) {
  	return 'Collection';
  }
  if (arg instanceof Array) {
  	return 'Array';
  }
};

Collection.createCollection = function(arg) {
  return new Collection(arg);
};