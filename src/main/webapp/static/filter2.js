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
        var currHead = $(content).attr('data-columnName');
        if (currHead === currFilter) return; //если был применен фильтр, то не изменяем содержимое окна

        var finList = [];
        var menu = $(content).siblings(".dropdown-menu");

        if (currHead === prevFilters[prevFilters.length - 1]) {

            var currObj = prevDD[currHead];
            finList = Object.keys(currObj);

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


    getFilterResult: function () {

        var content = this;
        var menu = $(content).closest(".dropdown-menu");
        var columnName = menu.parent().find('button').attr('data-columnName');
        var allInputs = menu.find("input");
        var ckeckedInputs = menu.find("input:checked");
        var isAllChecked = allInputs.length === ckeckedInputs.length;

        currFilter = columnName;
        if (prevFilters.indexOf(currFilter) === -1) {
            prevFilters.push(currFilter);
        }
        var columnProp = {};

        allInputs.each(
            function () {
                if (!isAllChecked) {
                    columnProp[$(this).attr('data-value')] = $(this).prop('checked');
                }

                currFilter = $(this).attr('data-columnName');

                var cell = $("#tourTable").find("td[data-columnName=" + $(this).attr("data-columnName") + "][data-value=" + $(this).attr("data-value") + "]");
                var row = $(cell).parent();
                if ($(this).prop('checked')) {
                    row.show();
                }
                if (!$(this).prop('checked')) {
                    row.hide();
                }

            }
        );


        if (isAllChecked) { //если нет пустых checkbox
            var a = prevFilters.splice(-1, 1);
            menu.parent().find('button').css("text-decoration", "none");
            return;
        }

        prevDD[columnName] = columnProp;
        menu.parent().find('button').css("text-decoration", "underline");


    }
};
