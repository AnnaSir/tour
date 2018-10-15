var unchecked = [];

var Filter = {


    createDD: function () {
        var content = this;
        //event.stopPropagation();
        var a = $(content).css('text-decoration');
        var isColumnFiltered = $(content).css('text-decoration') === 'underline solid rgb(0, 0, 0)';
        var currHead = $(content).attr('data-atr1');
        var listForDD = $('[data-atr1 =' + currHead + '][data-atr=ddBody]');
        var finList = [];
        listForDD.each(function () {
                var cellValue = $(this).attr('data-atr2');
                var row = $('td[data-atr2=' + cellValue + ']').parent();
                if (finList.indexOf(cellValue) >= 0 || (!row.is(':visible') && !isColumnFiltered)) return;

                finList.push(cellValue);
            }
        );

        var dDHtml = Mustache.to_html($("#ddPattern").html(), {data: finList, column: currHead});

        var menu = $(content).siblings(".dropdown-menu");
        menu.html(dDHtml);
        menu.find("input").each(
            function () {
                if (unchecked.indexOf($(this).attr("data-atr2")) >= 0)
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
                var cell = $("#tourTable").find("td[data-atr1=" + $(this).attr("data-atr1") + "][data-atr2=" + $(this).attr("data-atr2") + "]");
                var row = $(cell).parent();
                if ($(this).prop('checked')&&!row.is(':visible')) {
                    row.show();
                    var r = $(this).attr("data-atr2");
                    var v = unchecked.indexOf($(this).attr("data-atr2"));
                    var c = unchecked.splice(unchecked.indexOf($(this).attr("data-atr2")),1);
                }
                if (!$(this).prop('checked')&&row.is(':visible')) {
                    row.hide();
                    unchecked.push($(this).attr('data-atr2'));
                }

            }
        );
        var c = menu.parent();
        menu.parent().find('button').css("text-decoration", "underline");


    }
};