// ;(function () {
//
//         window.filterValues = {};
//         var self = filterValues;
//
//         self.init = function () {
//             initFilters();
//         };
//
//         function initFilters() {
//
//             var head = $("[data-atr=ddHead]");
//
//             head.each(function () {
//                 var valuesSet = [];
//                 var a = $(this);
//                 var h = a.attr('data-atr1');
//                 var body = $("[data-atr=ddBody][data-atr1=" + h + "]");
//                 body.each(function () {
//                     var value = $(this).text();
//                     if (valuesSet.indexOf(value) >= 0) return;
//                     valuesSet.push(value);
//                 });
//                 var dropdownHtml = Mustache.to_html($("#ddPattern").html(), {data: valuesSet});
//                 a.find(".dropdown-menu").html(dropdownHtml);
//
//             });
//
//             $("#tourTable .dropdown-menu label input").on("click", getCheckBoxVal);
//
//
//             $("[data-atr2=selectAll]").on("click",
//                 function () {
//                     var selectAllButton = this;
//                     var currDropDown = $(this).closest(".dropdown");
//                     currDropDown.find("input").each(
//                         function () {
//                             var currButton = $(this);
//                             if (currButton.attr('data-atr2') === 'selectAll') return;
//                             var t = $('[data-atr=ddBody]').closest("tr");
//                             if ($(selectAllButton).is(":checked")) {
//                                 currButton.prop('checked', true);
//                                 t.show();
//                             } else {
//                                 currButton.prop('checked', false);
//                                 t.hide();
//                             }
//                         }
//                     );
//                 });
//         }
//
//         function getCheckBoxVal() {
//             var t = $('[data-atr=ddBody]').closest("tr").hide();
//             var a = $("#tourTable").find("input:checked");
//             a.each(function () {
//                 var boxVal = $(this).attr('data-atr2');
//                 var boxColumn = $(this).closest(".dropdown");
//                 var cell = boxColumn.attr('data-atr1');
//                 var c = $("[data-atr1=" + cell + "][data-atr2=" + boxVal + "][data-atr=ddBody]").closest("tr");
//                 c.show();
//             });
//         }
//
//         $(document).ready(self.init);
//     }
//
// )();
