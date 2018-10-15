<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>

<html>
<head>
    <link rel="stylesheet" href="<spring:url value='/static/css/bootstrap.css'/>" type="text/css"/>
    <link rel="stylesheet" href="<spring:url value='/static/css/bootstrap-table.css'/>" type="text/css"/>
    <link rel="stylesheet" href="<spring:url value='/static/css/main.css'/>" type="text/css"/>
    <link rel="stylesheet" href="<spring:url value='/static/css/custom.css'/>" type="text/css"/>

</head>
<body>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
<script type="text/javascript" src="<spring:url value='/static/filter.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/static/filter2.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/static/mustache/mustache.min.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/static/jquery/jquery-3.1.1.min.js'/>"></script>
<script type="text/javascript" src="<spring:url value='/static/libs/bootstrap-table.min.js'/>"></script>



<table id = "tourTable" border="1" align="center">
    <tr>
        <th>
            <div id="headerId" class="dropdown">
                <button class = "ddButton" type="button" data-toggle="dropdown" data-columnName="id">
                    ID
                </button>
                <div class="dropdown-menu"></div>
            </div>
        </th>
        <th data-sortable="true">
            <div  id="headerName" class="dropdown" data-columnName="name">
                <button class = "ddButton" type="button" data-toggle="dropdown" data-columnName="name">
                    Название тура
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                </div>
            </div>
        </th>
        <th>
            <div id="headerDesc" class="dropdown" data-columnName="desc">
                <button class = "ddButton" type="button" data-toggle="dropdown" data-columnName="desc">
                    Описание
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                </div>
            </div>
        </th>
    </tr>
    <c:forEach var="tour" items="${tours}">
        <tr>
            <td data-columnName="id" data-value="${tour.tourId}">${tour.tourId}</td>
            <td data-columnName="name" data-value="${tour.name}">${tour.name}</td>
            <td data-columnName="desc" data-value="${tour.description}">${tour.description}</td>
        </tr>
    </c:forEach>
</table>


<script type="text/template" id="ddPattern">
    <div class="list-group-item">
            <%--<input type="checkbox">Выделить все<br>--%>
            {{#data}}
            <input type="checkbox" checked="checked" data-columnName="{{column}}" data-value="{{.}}">{{.}}<br>
            {{/data}}
    </div>
    <button type = "button" class = "okButton">ok</button>
</script>

<script type="text/template" id="ddPattern2">
        <%--<input type="checkbox">Выделить все<br>--%>
        {{#data}}
        <input type="checkbox" data-columnName="{{column}}" data-value="{{.}}">{{.}}<br>
        {{/data}}
</script>

<script type="text/javascript">

    //$(document).on('click', ".ddButton", Filter.createDD);

    $(".ddButton").on("click", Filter.createDD);
    //$(".okButton").on("click" , Filter.getFilterResult);
    $(document).on('click', ".okButton", Filter.getFilterResult);
    //$(document).on('click', "input", Filter.getFilterResult);


</script>

</body>
</html>