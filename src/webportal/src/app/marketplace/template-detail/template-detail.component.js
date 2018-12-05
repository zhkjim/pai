// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const template = require('./template-detail.component.ejs');
const webportalConfig = require('../../config/webportal.config.js');
require('./template-detail.component.css');
const querystring = require('querystring');

$('#sidebar-menu--template-view').addClass('active');

const context = {
    compileUri: function(uri) {
        if (!/^https?:\/\//.test(uri)) return 'http://hub.docker.com/r/' + uri;
        if (/^https:\/\/github.com\//.test(uri)) return uri.replace('@', '?ref=');
        return uri;
    },
};

$(function() {
    const query = querystring.parse(window.location.href.slice(window.location.href.indexOf('?')+1));
    const type = {
        'job': 'job',
        'docker': 'dockerimage',
        'script': 'script',
        'data': 'data',
    }[query.type] || 'job';
    const name = query.name;
    if (type == null || name == null) return location.href = '/';

    const u = `${webportalConfig.restServerUri}/api/v2/template/${type}/${name}`;
    $.getJSON(u).then(template.bind(context)).then(function(html) {
        $('#content-wrapper').html(html);
    });
});

