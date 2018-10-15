var prevDD = {
    id: 'anyproperty',
    name: 'anyproperty',
    desc: 'anyproperty'

};
var currFilter;
var prevFilters = [];


var Filter = {


    createDD: function () {
        var content = this;
        // //event.stopPropagation();
        // var a = $(content).css('text-decoration');
        // var isColumnFiltered = $(content).css('text-decoration') === 'underline solid rgb(0, 0, 0)';


        var currHead = $(content).attr('data-columnName');

        // var breakHere = false;
        //
        // prevDD.forEach(function (item, i, arr) {
        //     if (item.ddHeader===currHead) {
        //         //getLastDropDown(currHead);
        //         breakHere=true;
        //     }
        // });
        //
        // if (breakHere) return;

        if (currHead === currFilter) return; //если был применен фильтр, то не изменяем содержимое окна


        var finList = [];
        var menu = $(content).siblings(".dropdown-menu");

        if (currHead === prevFilters[prevFilters.length - 1]) {

            var currObj = prevDD[currHead];
            finList = Object.keys(currObj);

            // menu.find("input").each(
            //     function () {
            //         if (currObj.indexOf($(this).attr("data-value")) >= 0)
            //             $(this).prop('checked', false);
            //     }
            // )

        } else {

            var listForDD = $("#tourTable").find('td[data-columnName =' + currHead + ']');
            listForDD.each(function () {
                var cellValue = $(this).attr('data-value');
                var row = $('td[data-value=' + cellValue + ']').parent();
                if (finList.indexOf(cellValue) >= 0 || (!row.is(':visible'))) return;
                finList.push(cellValue);
            });
        }

        var dDHtml = Mustache.to_html($("#ddPattern").html(), {data: finList, column: currHead});

        menu.html(dDHtml);

        if (currHead === prevFilters[prevFilters.length - 1]) {
            menu.find("input").each(
                function () {
                    if (currObj[$(this).attr("data-value")] === false)
                        $(this).prop('checked', false);
                }
            )
        }


    },


    getLastDropDown: function (currHead) {

        // var currObj = prevDD[currHead];
        //
        // return Mustache.to_html($("#ddPattern").html(), {data: currObj, column: currHead});

    },


    getFilterResult: function () {
        // var ddButton = $('.dropdown').find('.ddButton');
        // ddButton.each(
        //     function () {
        //         ddButton.css('text-decoration', 'none');
        //         var g = ddButton.css('text-decoration');
        //     });


        var content = this;
        var menu = $(content).closest(".dropdown-menu");
        var columnName = menu.parent().find('button').attr('data-columnName')

        //var a = menu.find("input:checkbox:not(:checked)");
        var allInputs = menu.find("input");
        var ckeckedInputs = menu.find("input:checked");
        var isAllChecked = allInputs.length === ckeckedInputs.length;


        //columnProp[currColumn]= menu.parent().find('button').attr('data-columnName');
        currFilter = columnName;
        if (prevFilters.indexOf(currFilter) === -1) {
            prevFilters.push(currFilter);
        }
        var columnProp = {};

        allInputs.each(
            function () {
                // var filteredList = {
                //     ddHeader: $(this).attr('data-columnName'),
                //     value: $(this).attr('data-value'),
                //     checked: $(this).prop('checked')
                // };
                if (!isAllChecked) {
                    columnProp[$(this).attr('data-value')] = $(this).prop('checked');
                }

                currFilter = $(this).attr('data-columnName');

                var cell = $("#tourTable").find("td[data-columnName=" + $(this).attr("data-columnName") + "][data-value=" + $(this).attr("data-value") + "]");
                var row = $(cell).parent();
                if ($(this).prop('checked')) {
                    row.show();
                    //prevDD.splice(prevDD.indexOf($(this).attr("data-value")), 1);
                }
                if (!$(this).prop('checked')) {
                    row.hide();
                    //prevDD.push($(this).attr('data-value'));
                }

            }
        );


        if (isAllChecked) { //если нет пустых checkbox
            var a = prevFilters.splice(-1, 1);
            //currFilter = prevFilters[prevFilters.length - 1];
            return;
        }

        prevDD[columnName] = columnProp;
        menu.parent().find('button').css("text-decoration", "underline");


    }
};


/*var prevDD = [];


var Filter = {


    createDD: function () {
        var content = this;
        //event.stopPropagation();
        var a = $(content).css('text-decoration');
        var isColumnFiltered = $(content).css('text-decoration') === 'underline solid rgb(0, 0, 0)';
        var currHead = $(content).attr('data-columnName');
        var listForDD = $('[data-columnName =' + currHead + '][data-atr=ddBody]');
        var finList = [];
        listForDD.each(function () {
                var cellValue = $(this).attr('data-value');
                var row = $('td[data-value=' + cellValue + ']').parent();
                if (finList.indexOf(cellValue) >= 0 || (!row.is(':visible') && !isColumnFiltered)) return;

                finList.push(cellValue);
            }
        );

        var dDHtml = Mustache.to_html($("#ddPattern").html(), {data: finList, column: currHead});

        var menu = $(content).siblings(".dropdown-menu");
        menu.html(dDHtml);
        menu.find("input").each(
            function () {
                if (prevDD.indexOf($(this).attr("data-value")) >= 0)
                    $(this).prop('checked', false);
            }
        )


    },


    getFilterResult: function () {
        var r = $('.dropdown').find('.ddButton');
        r.each(
            function () {
                r.css('text-decoration','none');
                var g = r.css('text-decoration');
            });


        var content = this;
        var menu = $(content).closest(".dropdown-menu");

        //var a = menu.find("input:checkbox:not(:checked)");
        var a = menu.find("input");
        a.each(
            function () {
                // if ($(this).text()==="Выделить все"){
                //     a.each(function () {
                //         $(this).prop('checked',true)
                //     })
                // }
                var cell = $("#tourTable").find("td[data-columnName=" + $(this).attr("data-columnName") + "][data-value=" + $(this).attr("data-value") + "]");
                var row = $(cell).parent();
                if ($(this).prop('checked')&&!row.is(':visible')) {
                    row.show();
                    var r = $(this).attr("data-value");
                    var v = prevDD.indexOf($(this).attr("data-value"));
                    var c = prevDD.splice(prevDD.indexOf($(this).attr("data-value")),1);
                }
                if (!$(this).prop('checked')&&row.is(':visible')) {
                    row.hide();
                    prevDD.push($(this).attr('data-value'));
                }

            }
        );
        var c = menu.parent();
        menu.parent().find('button').css("text-decoration", "underline");


    }
};*/
