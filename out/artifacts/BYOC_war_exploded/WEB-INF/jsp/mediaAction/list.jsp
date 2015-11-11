<%-- TOP --%>
<%@include file="/WEB-INF/jsp/basicAction/top.jspf" %>
<p:checkAndOutException url="roleAction_list">
<%@include file="/WEB-INF/jsp/basicAction/left.jspf" %>

<!-- PAGE -->
<section id="page">
<div id="main-content">

    <div class="container">
        <div class="row">
        <div id="content" class="col-lg-12">
        <!-- PAGE HEADER-->
        <div class="row">
            <div class="col-sm-12">
                <div class="page-header">
                    <ul class="breadcrumb">
                        <li>
                            <i class="fa fa-home"></i>
                            <a href="homeAction_list">Home</a>
                        </li>
                        <li>All Files</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
        <div class="col-md-6">
            <!-- BOX -->
            <div class="box border inverse">
                <div class="box-title">
                    <h4><i class="fa fa-cloud-upload"></i>Upload your Files</h4>
                    <div class="tools hidden-xs">
                        <a href="#box-config" data-toggle="modal" class="config">
                            <i class="fa fa-cog"></i>
                        </a>
                        <a href="javascript:;" class="reload">
                            <i class="fa fa-refresh"></i>
                        </a>
                        <a href="javascript:;" class="collapse">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                        <a href="javascript:;" class="remove">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                <div class="box-body">
                    <form id="fileupload" action="http://jquery-file-upload.appspot.com/" method="POST" enctype="multipart/form-data" class="fileupload-processing">
                        <!-- Redirect browsers with JavaScript disabled to the origin page -->
                        <noscript>&lt;input type="hidden" name="redirect" value="http://blueimp.github.io/jQuery-File-Upload/"&gt;</noscript>
                        <!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
                        <div class="divide-20"></div>
                        <div class="row fileupload-buttonbar">
                            <div class="col-lg-12">
                                <!-- The fileinput-button span is used to style the file input field as button -->
								<span class="btn btn-success fileinput-button">
									<i class="fa fa-plus"></i>
									<span>Add files...</span>
									<input type="file" name="files[]" multiple="">
								</span>
                                <button type="submit" class="btn btn-primary start">
                                    <i class="fa fa-arrow-circle-o-up"></i>
                                    <span>Start</span>
                                </button>
                                <button type="reset" class="btn btn-warning cancel">
                                    <i class="fa fa-ban"></i>
                                    <span>Cancel</span>
                                </button>
                                <button type="button" class="btn btn-danger delete">
                                    <i class="fa fa-trash-o"></i>
                                    <span>Delete</span>
                                </button>
                                <!-- The loading indicator is shown during file processing -->
                                <span class="fileupload-loading"></span>
                            </div>
                            <!-- The global progress information -->
                            <div class="col-lg-5 fileupload-progress fade">
                                <!-- The global progress bar -->
                                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-success" style="width:0%;"></div>
                                </div>
                                <!-- The extended global progress information -->
                                <div class="progress-extended">&nbsp;</div>
                            </div>
                        </div>
                        <!-- The table listing the files available for upload/download -->
                        <table role="presentation" class="table table-striped"><tbody class="files"></tbody></table>
                    </form>

                    <div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls" data-filter=":even">
                        <div class="slides"></div>
                        <h3 class="title"></h3>
                        <a class="prev">‹</a>
                        <a class="next">›</a>
                        <a class="close">×</a>
                        <a class="play-pause"></a>
                        <ol class="indicator"></ol>
                    </div>
                </div>
            </div>
            <!-- /BOX -->
        </div>
        </div>
        <div class="row">
        <div class="col-md-12">
        <!-- BOX -->
        <div class="box border purple">
        <div class="box-title">
            <h4><i class="fa fa-table"></i>All Files</h4>
            <div class="tools hidden-xs">
                <a href="javascript:;" class="reload">
                    <i class="fa fa-refresh"></i>
                </a>
                <a href="javascript:;" class="collapse">
                    <i class="fa fa-chevron-up"></i>
                </a>
                <a href="javascript:;" class="remove">
                    <i class="fa fa-times"></i>
                </a>
            </div>
        </div>
        <div class="box-body">
        <table id="datatable2" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Date</th>
                <th class="hidden-xs">Size</th>
                <th class="hidden-xs">Operate</th>
            </tr>
        </thead>
        <tbody>
            <s:iterator value="mediaList" status="s">
                <tr>
                    <td>${name}</td>
                    <td>${type}</td>
                    <td>${time}</td>
                    <td class="hidden-xs">${size}</td>
                    <td class="hidden-xs dropdown">
                        <button class="btn-special btn-purple dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-cogs"></i>
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#">Download</a>
                            </li>
                            <li>
                                <a href="#">Delete</a>
                            </li>
                            <li>
                                <a href="#">Favorite</a>
                            </li>
                            <li>
                                <a href="#">share</a>
                            </li>
                            <li>
                                <a href="#">Rename</a>
                            </li>
                        </ul>
                    </td>
                </tr>
            </s:iterator>
        </tbody>
        <tfoot>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Date</th>
                <th class="hidden-xs">Size</th>
                <th class="hidden-xs">Operate</th>
            </tr>
        </tfoot>
        </table>
        </div>
        </div>
        <!-- /BOX -->
        </div>
        </div>
        </div><!-- /CONTENT-->
        </div>
    </div>
</div>
</section>
<script id="template-upload" type="text/x-tmpl">
								{% for (var i=0, file; file=o.files[i]; i++) { %}
									<tr class="template-upload fade">
										<td>
											<span class="preview"></span>
										</td>
										<td>
											<p class="name">{%=file.name%}</p>
											{% if (file.error) { %}
												<div><span class="label label-danger">Error</span> {%=file.error%}</div>
											{% } %}
										</td>
										<td>
											<p class="size">{%=o.formatFileSize(file.size)%}</p>
											{% if (!o.files.error) { %}
												<div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
											{% } %}
										</td>
										<td>
											{% if (!o.files.error && !i && !o.options.autoUpload) { %}
												<button class="btn btn-primary start">
													<i class="fa fa-arrow-circle-o-up"></i>
													<span>Start</span>
												</button>
											{% } %}
											{% if (!i) { %}
												<button class="btn btn-warning cancel">
													<i class="fa fa-ban"></i>
													<span>Cancel</span>
												</button>
											{% } %}
										</td>
									</tr>
								{% } %}
					</script>
<!-- The template to display files available for download -->
<script id="template-download" type="text/x-tmpl">
								{% for (var i=0, file; file=o.files[i]; i++) { %}
									<tr class="template-download fade">
										<td>
											<span class="preview">
												{% if (file.thumbnailUrl) { %}
													<a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" data-gallery><img src="{%=file.thumbnailUrl%}"></a>
												{% } %}
											</span>
										</td>
										<td>
											<p class="name">
												{% if (file.url) { %}
													<a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" {%=file.thumbnailUrl?'data-gallery':''%}>{%=file.name%}</a>
												{% } else { %}
													<span>{%=file.name%}</span>
												{% } %}
											</p>
											{% if (file.error) { %}
												<div><span class="label label-danger">Error</span> {%=file.error%}</div>
											{% } %}
										</td>
										<td>
											<span class="size">{%=o.formatFileSize(file.size)%}</span>
										</td>
										<td>
											{% if (file.deleteUrl) { %}
												<button class="btn btn-danger delete" data-type="{%=file.deleteType%}" data-url="{%=file.deleteUrl%}"{% if (file.deleteWithCredentials) { %} data-xhr-fields='{"withCredentials":true}'{% } %}>
													<i class="fa fa-trash-o"></i>
													<span>Delete</span>
												</button>
												<input type="checkbox" name="delete" value="1" class="toggle">
											{% } else { %}
												<button class="btn btn-warning cancel">
													<i class="fa fa-ban"></i>
													<span>Cancel</span>
												</button>
											{% } %}
										</td>
									</tr>
								{% } %}
					</script>
<!--/PAGE -->

</p:checkAndOutException>
<%-- BOTTOM --%>
<%@include file="/WEB-INF/jsp/basicAction/bottom.jspf" %>
