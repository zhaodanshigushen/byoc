<%@include file="/WEB-INF/jsp/basicAction/top.jspf" %>
<!-- PAGE -->
<section id="page">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="divide-100"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 not-found text-center">
                <div class="error">
                    404
                </div>
            </div>
            <div class="col-md-4 col-md-offset-4 not-found text-center">
                <div class="content">
                    <h3>Page not Found</h3>
                    <p>
                        Sorry, but the page you're looking for has not been found<br />
                        Try checking the URL for errors, <a href="index.html">goto home</a> or try to search below.
                    </p>
                    <form action="#">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="search here...">
							<span class="input-group-btn">                   
								<button type="submit" class="btn btn-success"><i class="fa fa-search"></i></button>
							</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<%@include file="/WEB-INF/jsp/basicAction/bottom..jspf" %>
