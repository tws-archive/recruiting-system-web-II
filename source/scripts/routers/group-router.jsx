'use strict';


var Navigation = require('../component/navigation/navigation.component.jsx');
var Account = require('../component/reuse/get-account.component.jsx');
var page = require('page');

function asyncRenderAction(hash, action, callBack) {
  var element;

  switch (action) {
    case 'index':
      require.ensure([
        "../component/group/group-index.component.jsx",
        "../component/group/group-sidebar.component.jsx"
      ], function (require) {
        var GroupIndex = require("../component/group/group-index.component.jsx");
        var GroupSidebar = require("../component/group/group-sidebar.component.jsx");
        element =
            <div>
              <GroupSidebar action="index" hash={hash} />
              <div className="col-md-9">
                <div id="content">
                  <GroupIndex groupHash={hash}/>
                </div>
              </div>
            </div>;
        callBack(element);
      });
      break;
    case 'paper':
      require.ensure([
        "../component/group/group-papers.component.jsx",
        "../component/group/group-sidebar.component.jsx"
      ], function (require) {
        var GroupPapers = require("../component/group/group-papers.component.jsx");
        var GroupSidebar = require("../component/group/group-sidebar.component.jsx");
        element =
            <div>
              <GroupSidebar action="paper" hash={hash} />
              <div className="col-md-9">
                <div id="content">
                  <GroupPapers />
                </div>
              </div>
            </div>;
        callBack(element);
      });
      break;
    case 'discussion':
      require.ensure([
        "../component/group/group-discussion.component.jsx",
        "../component/group/group-sidebar.component.jsx"
      ], function (require) {
        var GroupDiscussion = require("../component/group/group-discussion.component.jsx");
        var GroupSidebar = require("../component/group/group-sidebar.component.jsx");
        element =
            <div>
              <GroupSidebar action="discussion" hash={hash} />
              <div className="col-md-9">
                <div id="content">
                  <GroupDiscussion />
                </div>
              </div>
            </div>;
        callBack(element);
      });
      break;
    case 'manage':
      require.ensure([
        "../component/group/group-sidebar.component.jsx",
        "../component/group/group-manage.component.jsx"
      ], function (require) {
        var GroupManage = require("../component/group/group-manage.component.jsx");
        var GroupSidebar = require("../component/group/group-sidebar.component.jsx");
        element =
            <div>
              <GroupSidebar action="manage" hash={hash} />
              <div className="col-md-9">
                <div id="content">
                  <GroupManage />
                </div>
              </div>
            </div>;
        callBack(element);
      });
      break;
    case undefined:
      require.ensure([
        "../component/group/group-homepage.component.jsx"
      ], function (require) {
        var GroupHomepage = require("../component/group/group-homepage.component.jsx");
        element = <GroupHomepage />;
        callBack(element);
      });
      break;
    default:
      page.redirect('../404');
  }
}

function render(hash, action, next) {

  asyncRenderAction(hash, action, function (innerElement) {
    var content =
        <div>
          <header>
            <Navigation>
              <Account />
            </Navigation>
          </header>
          {innerElement}
        </div>;
    ReactDom.render(
        content,
        document.getElementById('group')
    );
    next();
  });
}

module.exports = {
  render: function (ctx, next) {
    var action = ctx.params.action;
    var hash = ctx.params.groupHash;
    render(hash, action, next);
  }
};