'use strict';

/* Controllers */

var boxControllers = angular.module('boxControllers', []);

boxControllers.controller('betaContoller', ['$scope', '$rootScope', '$location', 'Category',
  function ($scope, $rootScope, $location, Category) {
      $rootScope.showHeader = true;
      $rootScope.isValidLogin = false;
      $scope.validateAccount = function () {
          var isValidAccount = false;
          if ($scope.myName === 'a9israni' && $scope.myPassword === 'akash#97') {
              $rootScope.isValidLogin = true;
              $location.path('/category');
          }
          else {
              window.alert('Incorrect Credentials!');
          }

      };	
  } ]);

boxControllers.controller('categoryCtrl', ['$scope', '$route', '$rootScope', '$routeParams', '$location', '$timeout', '$filter', '$http', 'uiGridConstants', 'dataA', 'Category', 'dataBaseA', 'dataBaseE', 'dataABCD', 'dataEFGH',
  function ($scope, $route, $rootScope, $routeParams, $location, $timeout, $filter, $http, uiGridConstants, dataA, Category, dataBaseA, dataBaseE, dataABCD, dataEFGH) {

      if ($rootScope.isValidLogin === false) {
          $location.path('/login');
      }

      function initController() {
          $scope.viewStack = false;
          $scope.categories = Category.query();
          $scope.isABCD = ($routeParams.drawABCD);
          $scope.isEFGH = ($routeParams.drawEFGH);
		  resetFormABCD();
		  resetFormEFGH();
          toggleHeader(false); 

		  $scope.$on('$locationChangeSuccess', function (event) {
			  console.log('loc', $route.current);
			  $scope.viewStack = false;
			  if ($route.current !== null && $route.current !== undefined) {
				  $scope.isABCD = ($route.current.params.drawABCD);
				  $scope.isEFGH = ($route.current.params.drawEFGH);
				  initDate();
			  }
			  else {
				  $location.path('/category');
			  }
		  });

          initDate();
		  initGrids();
		  
		dataABCD.get().success(function(data) {
				$scope.dataABCD = angular.copy(data);
				$scope.gridABCDOptions.data = angular.copy($scope.dataABCD);
			});
		dataEFGH.get().success(function(data) {
				$scope.dataEFGH = angular.copy(data);
				$scope.gridEFGHOptions.data = angular.copy($scope.dataEFGH);
			});
      }
	  
	  function setDrawData(data) {						
				if ($scope.isABCD) {
					$scope.dataABCD = [];
					$scope.dataABCD = angular.copy(data);
					$scope.gridABCDOptions.data = angular.copy($scope.dataABCD);
				}
				else {
					$scope.dataEFGH = [];
					$scope.dataEFGH = angular.copy(data);
					$scope.gridEFGHOptions.data = angular.copy($scope.dataEFGH);					
				}			
				
				$scope.drawData = angular.copy(data);
				$scope.auditGridOptions.data = angular.copy(data);
	  }
	  
	  function resetFormData() {
		   $scope.formData = {
			  name: '',
			  nameCopy: '',
			  
			  hasDrawABCD: true,
			  drawA: $scope.drawTypes.A[0],
			  drawB: $scope.drawTypes.B[0],
			  drawC: $scope.drawTypes.C[0],
			  drawD: $scope.drawTypes.D[0],

			  hasDrawEFGH: true,
			  drawE: $scope.drawTypes.E[0],
			  drawF: $scope.drawTypes.F[0],
			  drawG: $scope.drawTypes.G[0],
			  drawH: $scope.drawTypes.H[0]			  
		  };
		  
		    $scope.selected = {
			  ABCD: {
				  name: '',
				  nameCopy: '',
				  drawA: $scope.drawTypes.A[0],
				  drawB: $scope.drawTypes.B[0],
				  drawC: $scope.drawTypes.C[0],
				  drawD: $scope.drawTypes.D[0]
			  },
			  EFGH: {
				  name: '',
				  nameCopy: '',
				  drawA: $scope.drawTypes.E[0],
				  drawB: $scope.drawTypes.F[0],
				  drawC: $scope.drawTypes.G[0],
				  drawD: $scope.drawTypes.H[0]
			  }
		  };
	  }
	  
	  function resetFormABCD() {	  
		  $scope.selected = {
			  ABCD: {
				  name: '',
				  nameCopy: '',
				  drawA: $scope.drawTypes.A[0],
				  drawB: $scope.drawTypes.B[0],
				  drawC: $scope.drawTypes.C[0],
				  drawD: $scope.drawTypes.D[0]
			  }
		  };
	  
		  $scope.formDataABCD = {
			  name: '',
			  nameCopy: '',
			  drawA: $scope.drawTypes.A[0],
			  drawB: $scope.drawTypes.B[0],
			  drawC: $scope.drawTypes.C[0],
			  drawD: $scope.drawTypes.D[0]	
		  };
	  }
	  
	  function resetFormEFGH() {	  
		  $scope.selected = {
			  EFGH: {
				  name: '',
				  nameCopy: '',
				  drawA: $scope.drawTypes.E[0],
				  drawB: $scope.drawTypes.F[0],
				  drawC: $scope.drawTypes.G[0],
				  drawD: $scope.drawTypes.H[0]
			  }
		  };
	  
		  $scope.formDataEFGH = {
			  name: '',
			  nameCopy: '',
			  drawE: $scope.drawTypes.E[0],
			  drawF: $scope.drawTypes.F[0],
			  drawG: $scope.drawTypes.G[0],
			  drawH: $scope.drawTypes.H[0]	
		  };
	  }
	  
	  $scope.drawTypes = {
		A: [ { type: 'A', active: true }, { type: 'A+', active: true }, { type: 'A++', active: true }, { type: 'A1/2', active: true }, { type: 'X', active: false } ],
		B: [ { type: 'B', active: true }, { type: 'B+', active: true }, { type: 'B++', active: true }, { type: 'B1/2', active: true }, { type: 'X', active: false } ],
		C: [ { type: 'C', active: true }, { type: 'C+', active: true }, { type: 'C++', active: true }, { type: 'C1/2', active: true }, { type: 'X', active: false } ],
		D: [ { type: 'D', active: true }, { type: 'D+', active: true }, { type: 'D++', active: true }, { type: 'D1/2', active: true }, { type: 'X', active: false } ],
		E: [ { type: 'E', active: true }, { type: 'E+', active: true }, { type: 'E++', active: true }, { type: 'E1/2', active: true }, { type: 'X', active: false } ],
		F: [ { type: 'F', active: true }, { type: 'F+', active: true }, { type: 'F++', active: true }, { type: 'F1/2', active: true }, { type: 'X', active: false } ],
		G: [ { type: 'G', active: true }, { type: 'G+', active: true }, { type: 'G++', active: true }, { type: 'G1/2', active: true }, { type: 'X', active: false } ],
		H: [ { type: 'H', active: true }, { type: 'H+', active: true }, { type: 'H++', active: true }, { type: 'H1/2', active: true }, { type: 'X', active: false } ]		
	  };
	  
	  	$scope.loading = true;
		$scope.dataABCD = [];
		$scope.dataEFGH = [];
	
      $scope.isActive = function (viewLocation) {
          var active = (viewLocation === $location.url());
          return active;
      };

      var sideBar = 'calc';
      $scope.setSide = function (side) {
          sideBar = side;
          $scope.viewStack = false;
		  $scope.saveDisabled = true;
		  
		  resetFormData();
		  resetFormABCD();
		  resetFormEFGH();
		  
		  window.setTimeout(function(){
				$(window).resize();
			}, 200);
      };

      $scope.isActiveSide = function (side) {
          var active = (side === sideBar);
          return active;
      };

      $scope.validateAccount = function () {
          var isValidAccount = false;
          if ($scope.myName === 'a9israni' && $scope.myPassword === 'akash#97') {
              $location.path('/category');
          }
          else {
              window.alert('Incorrect Credentials!');
          }
      };

      $scope.validateName = function () {
          var re = /[^\x00-\x7f]/;
          var invalid = re.test($scope.myName);
          console.log($scope.myName, invalid);
      };

      function initDate() {
          $scope.input = { today: new Date(), isInvalidDate: false, isValidForm: true };
		  var dayOfMonth = $scope.input.today.getDate();
		  var setToDate = 5;
		  var divideBy5 = (parseInt(dayOfMonth)/5);
		  
          if ($scope.isABCD) {
			  if (divideBy5 > 2 && divideBy5 <= 4) {
				  setToDate = 15;
			  }
			  else if (divideBy5 > 4) {
				  setToDate = 25;
			  }
          }
          else if ($scope.isEFGH) {
			  setToDate = 10;
			  if (divideBy5 > 3 && divideBy5 <=5) {
				  setToDate = 20;
			  }
			  else if (divideBy5 > 5) {
				  setToDate = 30;
			  }
          }		  
          $scope.input.today.setDate(setToDate);
      }
	  
	  function getPrevDate() {
		  var currentDate = new Date($scope.input.today);
		  var dayOfMonth = currentDate.getDate();
		  var monthOfYear = currentDate.getMonth();
		  var setToDate = dayOfMonth - 10;
		  
		  if (setToDate <= 0) {
			var prevMonth = currentDate.getMonth() - 1;
			var lastDay = dayOfMonth + 20;
			if (monthOfYear === 2 && $scope.isEFGH && dayOfMonth === 10) {
				var lastDayOfFeb = isLeapYear(currentDate.getFullYear()) ? 29 : 28;
				lastDay = lastDayOfFeb;
			}
			currentDate.setMonth(prevMonth, lastDay);
		  }
		  else {
			if (monthOfYear === 1 && $scope.isEFGH && (dayOfMonth === 28 || dayOfMonth === 29)) {
				setToDate = 20;
			}
			currentDate.setDate(setToDate);  
		  }
		  
		  $scope.input.today = new Date(currentDate);
	  }
	  
	  $scope.getPrevDate = getPrevDate;
	  
	  function getNextDate() {
		  var currentDate = new Date($scope.input.today);
		  var dayOfMonth = currentDate.getDate();
		  var monthOfYear = currentDate.getMonth();
		  var setToDate = dayOfMonth + 10;
		  
		  if (setToDate > 30) {
			var nextMonth = monthOfYear + 1;
			var startDate = $scope.isABCD ? 5 : 10;
			currentDate.setMonth(nextMonth, startDate);
		  }
		  else {
			if (monthOfYear === 1 && $scope.isEFGH && dayOfMonth === 20) {
				var lastDayOfFeb = isLeapYear(currentDate.getFullYear()) ? 29 : 28;
				setToDate = lastDayOfFeb;
			}
			currentDate.setDate(setToDate);  
		  }
		  
		  $scope.input.today = new Date(currentDate);	  
	  }
	  
	  $scope.getNextDate = getNextDate;
	  
	  function isLeapYear(year) {
		  var d = new Date();
		  d.setYear(year);
		  d.setMonth(1);
		  d.setDate(29);
		  return d.getDate() == 29;
		}
	  
	  $scope.dateOptions = {
		dateDisabled: disabled,
		formatYear: 'yy',
		startingDay: 1
	  };

	  // Disable weekend selection
	  function disabled(data) {
		var date = data.date,
		  mode = data.mode;
		var isInvalidDate = true;		
		var day = date.getDate();
		var month = date.getMonth();
        
		if ($scope.isABCD) {
            isInvalidDate = !(day === 5 || day === 15 || day === 25);
        }
        else if ($scope.isEFGH) {
            isInvalidDate = !(day === 10 || day === 20 || day === 30);
			var lastDayOfFeb = isLeapYear(date.getFullYear()) ? 29 : 28;
			if (month === 1) {
				if (day === lastDayOfFeb) {
					isInvalidDate = false;					
				}
			}
        }  
		return mode === 'day' && isInvalidDate;
	  }	

	  var rowABCDtpl='<div ng-class="{\'disabledRow\':row.entity.hasDrawABCD==false }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';
	  var rowEFGHtpl='<div ng-class="{\'disabledRow\':row.entity.hasDrawEFGH==false }"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';	 
	  
       var gridABCDColDefs = [
			{
				field: 'hasDrawABCD', visible: false,
				sort: {
				  direction: uiGridConstants.DESC,
				  priority: 0
				}
			},
          { name: 'Name', field: 'name', width: '20%', 
			 cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
					  if (grid.getCellValue(row,col) === $scope.selectedRow.name) {
						return 'success';
					  }
					}},
          { name: 'Draw A', field: 'drawA.type', width: '15%' },
          { name: 'Draw B', field: 'drawB.type', width: '15%' },
          { name: 'Draw C', field: 'drawC.type', width: '15%' },
          { name: 'Draw D', field: 'drawD.type', width: '15%' },
		  { name: 'action', field: 'action', width: '20%', 
			cellTemplate: '<div style="text-align: center; padding: 2px;">' + 
			'<button class="btn btn-xs btn-default" style="width: 65px;border-radius: 5px !important;" ng-click="grid.appScope.editSelectedA(grid, row)"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>' + 
			'<button class="btn btn-xs btn-danger" style="width: 65px;border-radius: 5px !important;margin-left: 5px;" ng-click="grid.appScope.confirmDelete(grid, row)" data-toggle="modal" data-target="#deleteModal"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>' +
			'</div>' }
      ];
    
      var gridEFGHColDefs = [
			{
				field: 'hasDrawEFGH', visible: false,
				sort: {
				  direction: uiGridConstants.DESC,
				  priority: 0
				}
			},
          { name: 'Name', field: 'name', width: '20%', 
			 cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
					  if (grid.getCellValue(row,col) === $scope.selectedRow.name) {
						return 'success';
					  }
					}},
          { name: 'Draw E', field: 'drawE.type', width: '15%' },
          { name: 'Draw F', field: 'drawF.type', width: '15%' },
          { name: 'Draw G', field: 'drawG.type', width: '15%' },
          { name: 'Draw H', field: 'drawH.type', width: '15%' },
		  { name: 'action', field: 'action', width: '20%', 
			cellTemplate: '<div style="text-align: center; padding: 2px;">' + 
			'<button class="btn btn-xs btn-default" style="width: 65px;border-radius: 5px !important;" ng-click="grid.appScope.editSelectedE(grid, row)"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>' + 
			'<button class="btn btn-xs btn-danger" style="width: 65px;border-radius: 5px !important;margin-left: 5px;" ng-click="grid.appScope.confirmDelete(grid, row)" data-toggle="modal" data-target="#deleteModal"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>' +
			'</div>' }
      ];
    
      var auditGridColDefs = [
          { name: 'Name', field: 'name', width: '20%'},
			{
				name: 'ABCD', 
				field: 'hasDrawABCD', visible: true, width: '7%',
				sort: {
				  direction: uiGridConstants.DESC,
				  priority: 0
				}
			},
          { name: 'Draw A', field: 'drawA.type', width: '7%' },
          { name: 'Draw B', field: 'drawB.type', width: '7%' },
          { name: 'Draw C', field: 'drawC.type', width: '7%' },
          { name: 'Draw D', field: 'drawD.type', width: '7%' },	
		  {
			  name: 'EFGH', 
				field: 'hasDrawEFGH', visible: true, width: '7%',
				sort: {
				  direction: uiGridConstants.DESC,
				  priority: 1
				}
			},
          { name: 'Draw E', field: 'drawE.type', width: '7%' },
          { name: 'Draw F', field: 'drawF.type', width: '7%' },
          { name: 'Draw G', field: 'drawG.type', width: '7%' },
          { name: 'Draw H', field: 'drawH.type', width: '7%' }
      ];
	  
	  function initGrids() {
		  $scope.gridABCDOptions = {
			  data: [],
			  rowTemplate: rowABCDtpl,
			  columnDefs: gridABCDColDefs,
			  enableSorting: true,
			  enableRowSelection: true,
			  enableRowHeaderSelection: false,
			  enableSelectAll: false,
			  multiSelect: false,
				onRegisterApi: function( gridApi ) {
				  $scope.gridABCDApi = gridApi;
				}
		  };

		  $scope.gridEFGHOptions = {
			  data: [],
			  rowTemplate: rowEFGHtpl,
			  columnDefs: gridEFGHColDefs,
			  enableSorting: true,
			  enableRowSelection: true,
			  enableRowHeaderSelection: false,
			  enableSelectAll: false,
			  multiSelect: false,
				onRegisterApi: function( gridApi ) {
				  $scope.gridEFGHApi = gridApi;
				}
		  };

		  $scope.auditGridOptions = {
			  data: [],
			  columnDefs: auditGridColDefs,
			  enableSorting: true,
			  enableRowSelection: true,
			  enableRowHeaderSelection: false,
			  enableSelectAll: false,
			  multiSelect: false,
				onRegisterApi: function( gridApi ) {
				  $scope.auditGridApi = gridApi;
				}
		  };		  
	  }

      $scope.generateStack = function () {
          console.log($scope.input);
          if ($scope.isABCD) {
			  if ($scope.input.today && $scope.input.valueA && $scope.input.valueB && $scope.input.valueC && $scope.input.valueD) {
				  $scope.input.isValidForm = true;
				  $scope.viewStack = true;
				  //createABCDValuesForDate();
				  calculateStackABCD();
			  }
              else {
				  $scope.input.isValidForm = false;
			  }
          }
          else if ($scope.isEFGH) {
			  if ($scope.input.today && $scope.input.valueE && $scope.input.valueF && $scope.input.valueG && $scope.input.valueH) {
				  $scope.input.isValidForm = true;
				  $scope.viewStack = true;
				  saveEFGHValuesForDate();
				  calculateStackEFGH();
			  }
              else {
				  $scope.input.isValidForm = false;
			  }
          }
      };

      $scope.closePrint = function () {
          $scope.viewStack = false;
          toggleHeader(false);
      };

      function toggleHeader(generateStack) {
          if (generateStack === true) {
              $rootScope.showHeader = false;
          }
          else {
              $rootScope.showHeader = true;
          }
      }

      //Modify to point to current Financial Year
      function configureStartDate(day, month) {
          var today = new Date($scope.input.today);
          var currentYear = today.getFullYear();

          var startDate = new Date();
          startDate.setFullYear(currentYear);
          startDate.setMonth(month - 1);
          startDate.setDate(day);

          today.setMilliseconds(0);
          today.setSeconds(0);
          today.setMinutes(0);

          startDate.setMilliseconds(0);
          startDate.setSeconds(0);
          startDate.setMinutes(0);

          if (today.getTime() < startDate.getTime()) {
              startDate.setFullYear(currentYear - 1);
          }

          return startDate;
      }

      function configureDrawNo(source, scope, diffDraw) {
         /*  var diffDays = parseFloat((source - scope) / (1000 * 60 * 60 * 24));
          var diffMonths = parseInt(diffDays / 30); */
		  var sourceMonth = source.getMonth();
		  var scopeMonth = scope.getMonth();		  
		  var diffMonths = sourceMonth - scopeMonth;
		  if (diffMonths < 0) {
			  diffMonths = diffMonths + 12;
		  }
          var drawNo = parseInt((diffMonths * 3) + diffDraw);
          return drawNo;
      }

      function calculateStackABCD() {
          var today = new Date($scope.input.today);
          var day = $filter('date')(today, 'd');
          var drawDiff = Math.round((parseInt(day) / 10)); //draw diff in date '30 - 10, 25 - 5 =>> 3' (3 draws per month);

          //          var a = new Date('1/5/2016');
          //          var b = new Date('3/5/2015');
          //          var c = new Date('4/5/2015');
          //          var d = new Date('6/5/2015');

          var a = configureStartDate(5, 1);
          var b = configureStartDate(5, 3);
          var c = configureStartDate(5, 4);
          var d = configureStartDate(5, 6);

          console.log(a, b, c, d);

          drawNoA = configureDrawNo(today, a, drawDiff);

          drawNoB = configureDrawNo(today, b, drawDiff);

          drawNoC = configureDrawNo(today, c, drawDiff);

          drawNoD = configureDrawNo(today, d, drawDiff);

          var valueA = angular.copy($scope.input.valueA);
          var valueB = angular.copy($scope.input.valueB);
          var valueC = angular.copy($scope.input.valueC);
          var valueD = angular.copy($scope.input.valueD);

          currentDraw = {
              valueA: parseFloat(valueA),
              valueB: parseFloat(valueB),
              valueC: parseFloat(valueC),
              valueD: parseFloat(valueD)
          };

          dataABCD.get().success(function (data) {
              $scope.entriesABCD = angular.copy(data);
			 /*  angular.forEach(data, function(obj) {
				  if (obj.hasDrawABCD) {
					  $scope.entriesABCD.push(obj);
				  }
			  }); */

              angular.forEach($scope.entriesABCD, function (entry) {
                  entry.drawA.number = $scope.getDrawNo('a', entry.drawA.active);
                  entry.drawA.amount = $scope.getAmount('a', entry.drawA.type, entry.drawA.active);
                  entry.drawB.number = $scope.getDrawNo('b', entry.drawB.active);
                  entry.drawB.amount = $scope.getAmount('b', entry.drawB.type, entry.drawB.active);
                  entry.drawC.number = $scope.getDrawNo('c', entry.drawC.active);
                  entry.drawC.amount = $scope.getAmount('c', entry.drawC.type, entry.drawC.active);
                  entry.drawD.number = $scope.getDrawNo('d', entry.drawD.active);
                  entry.drawD.amount = $scope.getAmount('d', entry.drawD.type, entry.drawD.active);

                  entry.totalAmount = $scope.getTotalAmount(entry.drawA.amount, entry.drawB.amount, entry.drawC.amount, entry.drawD.amount);
              });
              console.log('abcd', $scope.entriesABCD);
          });
      }

      function calculateStackEFGH() {
          var today = new Date($scope.input.today);
          var day = $filter('date')(today, 'd');
          var drawDiff = Math.round((parseInt(day) / 10)); //draw diff in date '30 - 10 = 3' (3 draws per month);

          //          var e = new Date('8/10/2015');
          //          var f = new Date('9/10/2015');
          //          var g = new Date('10/10/2015');
          //          var h = new Date('11/10/2015');

          var e = configureStartDate(10, 8);
          var f = configureStartDate(10, 9);
          var g = configureStartDate(10, 10);
          var h = configureStartDate(10, 11);
          console.log(e, f, g, h);

          drawNoE = configureDrawNo(today, e, drawDiff);

          drawNoF = configureDrawNo(today, f, drawDiff);

          drawNoG = configureDrawNo(today, g, drawDiff);

          drawNoH = configureDrawNo(today, h, drawDiff);

          var valueE = angular.copy($scope.input.valueE);
          var valueF = angular.copy($scope.input.valueF);
          var valueG = angular.copy($scope.input.valueG);
          var valueH = angular.copy($scope.input.valueH);

          currentDraw = {
              valueE: parseFloat(valueE),
              valueF: parseFloat(valueF),
              valueG: parseFloat(valueG),
              valueH: parseFloat(valueH)
          };

          dataEFGH.get().success(function (data) {
              $scope.entriesEFGH = angular.copy(data);
			  /* angular.forEach(data, function(obj) {
				  if (obj.hasDrawEFGH) {
					  $scope.entriesEFGH.push(obj);
				  }
			  }); */

              angular.forEach($scope.entriesEFGH, function (entry) {
                  entry.drawE.number = $scope.getDrawNo('e', entry.drawE.active);
                  entry.drawE.amount = $scope.getAmount('e', entry.drawE.type, entry.drawE.active);
                  entry.drawF.number = $scope.getDrawNo('f', entry.drawF.active);
                  entry.drawF.amount = $scope.getAmount('f', entry.drawF.type, entry.drawF.active);
                  entry.drawG.number = $scope.getDrawNo('g', entry.drawG.active);
                  entry.drawG.amount = $scope.getAmount('g', entry.drawG.type, entry.drawG.active);
                  entry.drawH.number = $scope.getDrawNo('h', entry.drawH.active);
                  entry.drawH.amount = $scope.getAmount('h', entry.drawH.type, entry.drawH.active);

                  entry.totalAmount = $scope.getTotalAmount(entry.drawE.amount, entry.drawF.amount, entry.drawG.amount, entry.drawH.amount);
              });
              console.log('efgh', $scope.entriesEFGH);
          });
      }

      $scope.getAmount = function (draw, type, isActive) {
          var amount = null;

          if (isActive) {
              switch (draw) {
                  case 'a':
                      amount = getAmountFor(type, currentDraw.valueA);
                      $scope.amountA = amount;
                      break;
                  case 'b':
                      amount = getAmountFor(type, currentDraw.valueB);
                      $scope.amountB = amount;
                      break;
                  case 'c':
                      amount = getAmountFor(type, currentDraw.valueC);
                      $scope.amountC = amount;
                      break;
                  case 'd':
                      amount = getAmountFor(type, currentDraw.valueD);
                      $scope.amountD = amount;
                      break;
                  case 'e':
                      amount = getAmountFor(type, currentDraw.valueE);
                      $scope.amountE = amount;
                      break;
                  case 'f':
                      amount = getAmountFor(type, currentDraw.valueF);
                      $scope.amountF = amount;
                      break;
                  case 'g':
                      amount = getAmountFor(type, currentDraw.valueG);
                      $scope.amountG = amount;
                      break;
                  case 'h':
                      amount = getAmountFor(type, currentDraw.valueH);
                      $scope.amountH = amount;
                      break;
              }
          }
          else {
              amount = 'X';
          }

          return amount;
      };

      function getAmountFor(type, value) {
          var amount = null;
          var category = null;
          var drawType = angular.copy(type);
          category = drawType.substring(1);

          if (category === '') {
              amount = value;
          }
          else if (category === '+') {
              amount = value * 2;
          }
          else if (category === '++') {
              amount = value * 3;
          }
          else if (category === '1/2') {
              amount = value * 0.5;
          }

          return amount;
      }

      $scope.getDrawNo = function (draw, isActive) {
          var drawNo = null;
          if (isActive) {
              switch (draw) {
                  case 'a':
                      drawNo = drawNoA;
                      break;
                  case 'b':
                      drawNo = drawNoB;
                      break;
                  case 'c':
                      drawNo = drawNoC;
                      break;
                  case 'd':
                      drawNo = drawNoD;
                      break;
                  case 'e':
                      drawNo = drawNoE;
                      break;
                  case 'f':
                      drawNo = drawNoF;
                      break;
                  case 'g':
                      drawNo = drawNoG;
                      break;
                  case 'h':
                      drawNo = drawNoH;
                      break;
              }
          }
          else {
              drawNo = 'X';
          }
          return drawNo;
      };

      $scope.getTotalAmount = function (t1, t2, t3, t4) {
          if (isNaN(t1)) {
              t1 = 0;
          }
          if (isNaN(t2)) {
              t2 = 0;
          }
          if (isNaN(t3)) {
              t3 = 0;
          }
          if (isNaN(t4)) {
              t4 = 0;
          }

          var totalAmount = t1 + t2 + t3 + t4;
          return totalAmount;
      };
	  
	  // CRUD Operations //
	  
	  $scope.showAddModal = false;	  	  
	  $scope.showConfirmModal = false;		  
	  $scope.showDeleteModal = false;
		
	  var rowEntity = null;	  
	  $scope.selectedRow = { name: '' };
	  $scope.saveDisabled = true;
	  
	  $scope.confirmAdd = function() {
		  $scope.showAddModal = true;
	  }
	  
	  $scope.confirmSave = function() {
		  $scope.showConfirmModal = true;
	  }
	  
	  $scope.confirmDelete = function(grid, row) {
		  $scope.selectedRow = angular.copy(row.entity);
		  $scope.showDeleteModal = true;
	  };
	  
	  $scope.deleteSelected = function() {			
			$scope.deleteDraw($scope.selectedRow._id);		  
	  };
	  
	  $scope.deactivateSelected = function() {		  
		  if ($scope.isABCD) {
			  $scope.selectedRow.hasDrawABCD = false;
		  }
		  else {
			  $scope.selectedRow.hasDrawEFGH = false;
		  }	  
		  setDrawForSelected($scope.selectedRow);
		  $scope.saveSelectedDraw();
	  }
	  
	  function setDrawForSelected(rowEntity) {
		  //var rowEntity = angular.copy($scope.selectedABCD);
		  if ($scope.isABCD) {
			  var indexOfA = $scope.drawTypes.A.map(function(a) { return a.type; }).indexOf(rowEntity.drawA.type);
			  var indexOfB = $scope.drawTypes.B.map(function(b) { return b.type; }).indexOf(rowEntity.drawB.type);
			  var indexOfC = $scope.drawTypes.C.map(function(c) { return c.type; }).indexOf(rowEntity.drawC.type);
			  var indexOfD = $scope.drawTypes.D.map(function(d) { return d.type; }).indexOf(rowEntity.drawD.type);
			  
			  $scope.formData = {
			  _id: rowEntity._id,
			  name: rowEntity.name,
			  nameCopy: rowEntity.name,
			  drawA: $scope.drawTypes.A[indexOfA],
			  drawB: $scope.drawTypes.B[indexOfB],
			  drawC: $scope.drawTypes.C[indexOfC],
			  drawD: $scope.drawTypes.D[indexOfD],
			  order: rowEntity.order			  
		  }; 		  
		  
		  $scope.selected = {
			  ABCD: {
				  name: rowEntity.name,
				  nameCopy: rowEntity.name,
				  drawA: $scope.drawTypes.A[indexOfA],
				  drawB: $scope.drawTypes.B[indexOfB],
				  drawC: $scope.drawTypes.C[indexOfC],
				  drawD: $scope.drawTypes.D[indexOfD],
				  order: rowEntity.order
			  },
			    EFGH: {
								
			  }
		  };
		  }
		  else {
			  var indexOfE = $scope.drawTypes.E.map(function(e) { return e.type; }).indexOf(rowEntity.drawE.type);
			  var indexOfF = $scope.drawTypes.F.map(function(f) { return f.type; }).indexOf(rowEntity.drawF.type);
			  var indexOfG = $scope.drawTypes.G.map(function(g) { return g.type; }).indexOf(rowEntity.drawG.type);
			  var indexOfH = $scope.drawTypes.H.map(function(h) { return h.type; }).indexOf(rowEntity.drawH.type);
			  $scope.formData = {
				  _id: rowEntity._id,
				  name: rowEntity.name,
				  nameCopy: rowEntity.name,
				  drawE: $scope.drawTypes.E[indexOfE],
				  drawF: $scope.drawTypes.F[indexOfF],
				  drawG: $scope.drawTypes.G[indexOfG],
				  drawH: $scope.drawTypes.H[indexOfH],
				  order: rowEntity.order	
			  }; 		  
			  
			  $scope.selected = {
				  ABCD: {
					  
				  },
					EFGH: {
					 name: rowEntity.name,
					  nameCopy: rowEntity.name,
					  drawE: $scope.drawTypes.E[indexOfE],
					  drawF: $scope.drawTypes.F[indexOfF],
					  drawG: $scope.drawTypes.G[indexOfG],
					  drawH: $scope.drawTypes.H[indexOfH],
					  order: rowEntity.order
				  }
			  };
		  }
	  }
	  
	  function setDrawABCDForSelected(rowEntity) {
		  //var rowEntity = angular.copy($scope.selectedABCD);
		  var indexOfA = $scope.drawTypes.A.map(function(a) { return a.type; }).indexOf(rowEntity.drawA.type);
		  var indexOfB = $scope.drawTypes.B.map(function(b) { return b.type; }).indexOf(rowEntity.drawB.type);
		  var indexOfC = $scope.drawTypes.C.map(function(c) { return c.type; }).indexOf(rowEntity.drawC.type);
		  var indexOfD = $scope.drawTypes.D.map(function(d) { return d.type; }).indexOf(rowEntity.drawD.type);
		  
		  $scope.formDataABCD = {
			  _id: rowEntity._id,
			  name: rowEntity.name,
			  nameCopy: rowEntity.name,
			  drawA: $scope.drawTypes.A[indexOfA],
			  drawB: $scope.drawTypes.B[indexOfB],
			  drawC: $scope.drawTypes.C[indexOfC],
			  drawD: $scope.drawTypes.D[indexOfD]	,
			  order: rowEntity.order
		  }; 		  
		  
		  $scope.selected = {
			  ABCD: {
				  name: rowEntity.name,
				  nameCopy: rowEntity.name,
				  drawA: $scope.drawTypes.A[indexOfA],
				  drawB: $scope.drawTypes.B[indexOfB],
				  drawC: $scope.drawTypes.C[indexOfC],
				  drawD: $scope.drawTypes.D[indexOfD],
				  order: rowEntity.order
			  }
		  };
	  }
	  
	  function setDrawEFGHForSelected(rowEntity) {
		  var indexOfE = $scope.drawTypes.E.map(function(e) { return e.type; }).indexOf(rowEntity.drawE.type);
		  var indexOfF = $scope.drawTypes.F.map(function(f) { return f.type; }).indexOf(rowEntity.drawF.type);
		  var indexOfG = $scope.drawTypes.G.map(function(g) { return g.type; }).indexOf(rowEntity.drawG.type);
		  var indexOfH = $scope.drawTypes.H.map(function(h) { return h.type; }).indexOf(rowEntity.drawH.type);
		  
		  $scope.formDataEFGH = {
			  _id: rowEntity._id,
			  name: rowEntity.name,
			  nameCopy: rowEntity.name,
			  drawE: $scope.drawTypes.E[indexOfE],
			  drawF: $scope.drawTypes.F[indexOfF],
			  drawG: $scope.drawTypes.G[indexOfG],
			  drawH: $scope.drawTypes.H[indexOfH]	,
			  order: rowEntity.order
		  };  
		  
		  $scope.selected = {
			  EFGH: {
				 name: rowEntity.name,
				  nameCopy: rowEntity.name,
				  drawE: $scope.drawTypes.E[indexOfE],
				  drawF: $scope.drawTypes.F[indexOfF],
				  drawG: $scope.drawTypes.G[indexOfG],
				  drawH: $scope.drawTypes.H[indexOfH],
				  order: rowEntity.order
			  }
		  };
	  };
	  
	  $scope.editSelectedA = function(grid, row, index) {
		  $scope.selected.ABCD = { name: '' };	
		  $scope.setSide('edit');	
		  //$scope.saveDisabled = false;
		  $scope.selectedRow = row.entity;
		  /* setDrawABCDForSelected(row.entity);  */
		  setDrawForSelected(row.entity); 
	  };
	  
	  $scope.setSelectedABCD = function(scope, b, c, d) {
		  /* setDrawABCDForSelected(scope); */
		  setDrawForSelected(scope);
	  };
	  
	  $scope.editSelectedE = function(grid, row) {
		  console.log(row);	
		  $scope.selected.EFGH = { name: '' };	
		  $scope.setSide('edit');	
		  //$scope.saveDisabled = false;
		  $scope.selectedRow = angular.copy(row.entity);
		  /* setDrawEFGHForSelected(row.entity);	 */
		  setDrawForSelected(row.entity);	  		
	  };    
	  
	  $scope.setSelectedEFGH = function(scope, b, c, d) {
		  /* setDrawEFGHForSelected(scope); */
		  setDrawForSelected(scope);
	  };
	  
	  // EDIT ==============================================================================
	  //
	  function saveABCDValuesForDate() {
		  var drawABCDValues = {
			drawDate: $scope.input.today,
			drawA: parseFloat($scope.input.valueA),
			drawB: parseFloat($scope.input.valueB),
			drawC: parseFloat($scope.input.valueC),
			drawD: parseFloat($scope.input.valueD)
		  }
		  // call the save function from our service (returns a promise object)
				dataABCD.save($scope.drawABCDForDate._id, drawABCDValues)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
										
				})
				.error(function() {
					alert('There was an error while saving the values!');
				});
	  }
	  
	  $scope.saveSelectedDraw = function() {
		  console.log($scope.formData);
		  if ($scope.formData.name != undefined) {	
				$scope.loading = true;

				// call the save function from our service (returns a promise object)
				if ($scope.isABCD) {
					dataABCD.save($scope.formData._id, $scope.formData)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						var selectedRowId = angular.copy($scope.formData._id);
							/* $scope.gridABCDOptions.data = data; // assign our new list of todos */
							setDrawData(data);
					
							$scope.setSide('view');
								angular.forEach($scope.gridABCDOptions.data, function(data) {
									if (data._id === selectedRowId) {
										$scope.selectedRow = data;
									}
								});
								$scope.gridABCDApi.selection.selectRow($scope.selectedRow);					
					})
					.error(function() {
						alert('There was an error while saving the details!');
					});
				}
				else {
					dataEFGH.save($scope.formData._id, $scope.formData)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						var selectedRowId = angular.copy($scope.formData._id);
							setDrawData(data);
					
							$scope.setSide('view');
								angular.forEach($scope.gridEFGHOptions.data, function(data) {
									if (data._id === selectedRowId) {
										$scope.selectedRow = data;
									}
								});
								$scope.gridEFGHApi.selection.selectRow($scope.selectedRow);					
					})
					.error(function() {
						alert('There was an error while saving the details!');
					});
				}
			} 
			else {
				alert('Please check the Name field.');
				//$scope.saveDisabled = true;
			}
			
	  };

	  $scope.drawCreatedSuccessfuly = false;
		// CREATE ==================================================================
		// 
		
		 function createABCDValuesForDate() {
		  var drawABCDValues = {
			drawDate: $scope.input.today,
			drawA: parseFloat($scope.input.valueA),
			drawB: parseFloat($scope.input.valueB),
			drawC: parseFloat($scope.input.valueC),
			drawD: parseFloat($scope.input.valueD)
		  }
		  // call the create function from our service (returns a promise object)
				dataABCD.create(drawABCDValues)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					console.log(data)					
				})
				.error(function() {
					alert('There was an error while saving the values!');
				});
	    }
	  
		$scope.createDraw = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined) {	
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				if ($scope.isABCD) {
					$scope.formData.order = $scope.dataABCD.length + 1;
					dataABCD.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						resetFormData(); 
						// clear the form so our user is ready to enter another
						/* $scope.gridABCDOptions.data = data; // assign our new list of todos */
						setDrawData(data);
						$scope.drawCreatedSuccessfuly = true;
						$timeout(function () {
							$scope.drawCreatedSuccessfuly = false;
						}, 8000);
						console.log($scope.dataABCD);
					})
					.error(function() {
						alert('There was an error while adding the details!');
					});
				}
				else {
					$scope.formData.order = $scope.dataEFGH.length + 1;
					dataEFGH.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						resetFormData(); 
						// clear the form so our user is ready to enter another
						/* $scope.gridABCDOptions.data = data; // assign our new list of todos */
						setDrawData(data);
						$scope.drawCreatedSuccessfuly = true;
						$timeout(function () {
							$scope.drawCreatedSuccessfuly = false;
						}, 8000);
						console.log($scope.dataEFGH);
					})
					.error(function() {
						alert('There was an error while adding the details!');
					});
				}
			} 
			else {
				alert('Please check the Name field.');
			}
		};

		// DELETE ==================================================================
		// 
		
		function deleteABCDValuesForDate(id) {
		  // call the delete function from our service (returns a promise object)
				dataABCD.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					console.log(data)					
				})
				.error(function() {
					alert('There was an error while deleting the values!');
				});
	    }
		
		$scope.deleteDraw = function(id) {
			$scope.loading = true;

			if ($scope.isABCD) {
				dataABCD.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					/* $scope.gridABCDOptions.data = data; // assign our new list */
					setDrawData(data);
				})
				.error(function() {
					alert('There was an error while deleting the details!');
				});
			}
			else {
				dataEFGH.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					/* $scope.gridABCDOptions.data = data; // assign our new list */
					setDrawData(data);
				})
				.error(function() {
					alert('There was an error while deleting the details!');
				});
			}
		};
	  
	  $scope.printPage = function() {
		  window.print();
	  }

      $scope.$watch('input.today', function () {
          if ($scope.input.today) {
              var day = $scope.input.today.getDate();
			  var month = $scope.input.today.getMonth();
              if ($scope.isABCD) {
                  $scope.input.isInvalidDate = !(day === 5 || day === 15 || day === 25);
              }
              else if ($scope.isEFGH) {
                  $scope.input.isInvalidDate = !(day === 10 || day === 20 || day === 30);
				  if (month === 1 && (day === 28 || day === 29)) {
					  $scope.input.isInvalidDate = false;
				  }
              }
			  console.log($scope.input.today, $scope.dt);
          }
		  else {
			  $scope.input.isInvalidDate = true;
		  }
      });

      //Variable Initiation//	  
      $scope.isABCD = true;
      $scope.isEFGH = false;
		  
      var drawNoA = null;
      var drawNoB = null;
      var drawNoC = null;
      var drawNoD = null;
      var drawNoE = null;
      var drawNoF = null;
      var drawNoG = null;
      var drawNoH = null;
      var currentDraw = [];
      $scope.input = { today: new Date(), isInvalidDate: false };

      initController();
  } ]);
