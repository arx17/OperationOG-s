"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Api = require("../generated_api");
const Components = require("../components/components");
const Permissions = require("./permissions");
const Utils = require("./view_utils");
const i18next = require("i18next");
const CategoryListViews = require("./CategoryList");
const BookmarksViews = require("./Bookmarks");
const CustomViews = require("../custom_views");
function load_relations_HomePage(self, current_User, current_Admin, callback) {
    callback && callback();
}
exports.load_relations_HomePage = load_relations_HomePage;
function set_size_HomePage(self, new_size) {
    self.props.set_size(new_size, () => {
        if (new_size == "fullscreen")
            self.props.push(exports.HomePage_to_page(self.props.entity.Id));
    });
}
exports.set_size_HomePage = set_size_HomePage;
function render_HomePage_AppTest_editable_minimised(self) {
    if (!Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin))
        return render_HomePage_AppTest_minimised(self);
    else
        return !Permissions.can_view_HomePage_AppTest(self.props.current_User, self.props.current_Admin) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute apptest" },
                React.createElement("div", { className: "model__attribute-content" }, CustomViews.AppTest(Object.assign({}, self.props))));
}
exports.render_HomePage_AppTest_editable_minimised = render_HomePage_AppTest_editable_minimised;
function render_HomePage_Test_editable_minimised(self) {
    if (!Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin))
        return render_HomePage_Test_minimised(self);
    else
        return !Permissions.can_view_HomePage_Test(self.props.current_User, self.props.current_Admin) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute test" },
                React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(`HomePage:Test`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_HomePage_Test(self.props.current_User, self.props.current_Admin), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
exports.render_HomePage_Test_editable_minimised = render_HomePage_Test_editable_minimised;
function render_HomePage_AppTest_editable_maximised(self) {
    if (!Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin))
        return render_HomePage_AppTest_maximised(self);
    else
        return !Permissions.can_view_HomePage_AppTest(self.props.current_User, self.props.current_Admin) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute apptest" },
                React.createElement("div", { className: "model__attribute-content" }, CustomViews.AppTest(Object.assign({}, self.props))));
}
exports.render_HomePage_AppTest_editable_maximised = render_HomePage_AppTest_editable_maximised;
function render_HomePage_Test_editable_maximised(self) {
    if (!Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin))
        return render_HomePage_Test_maximised(self);
    else
        return !Permissions.can_view_HomePage_Test(self.props.current_User, self.props.current_Admin) ? React.createElement("div", null) :
            React.createElement("div", { className: "model__attribute test" },
                React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(`HomePage:Test`, { context: self.props.inline ? "inline" : "" })),
                React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_HomePage_Test(self.props.current_User, self.props.current_Admin), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
exports.render_HomePage_Test_editable_maximised = render_HomePage_Test_editable_maximised;
function render_editable_attributes_minimised_HomePage(self) {
    let attributes = (React.createElement("div", null,
        render_HomePage_Test_editable_minimised(self),
        CustomViews.AppTest(Object.assign({}, self.props))));
    return attributes;
}
exports.render_editable_attributes_minimised_HomePage = render_editable_attributes_minimised_HomePage;
function render_editable_attributes_maximised_HomePage(self) {
    let state = self.state();
    let attributes = (React.createElement("div", null,
        render_HomePage_Test_editable_maximised(self),
        CustomViews.AppTest(Object.assign({}, self.props))));
    return attributes;
}
exports.render_editable_attributes_maximised_HomePage = render_editable_attributes_maximised_HomePage;
function render_breadcrumb_HomePage(self) {
    return React.createElement("div", { className: "breadcrumb-homepage" }, "HomePage");
}
exports.render_breadcrumb_HomePage = render_breadcrumb_HomePage;
function render_menu_HomePage(self) {
    let state = self.state();
    return React.createElement("div", { className: "menu" },
        React.createElement("img", { className: "logo", src: "/images/logo.png", alt: "Logo" }),
        React.createElement("div", { className: "pages" },
            !Permissions.can_view_HomePage(self.props.current_User, self.props.current_Admin) ? null :
                React.createElement("div", { className: `menu_entry page_link active-page` },
                    React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('HomePage'))),
            !Permissions.can_view_CategoryList(self.props.current_User, self.props.current_Admin) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_CategoryLists(0, 1).then(e => e.Items.length > 0 && self.props.set_page(CategoryListViews.CategoryList_to_page(e.Items[0].Item.Id))) }, i18next.t('CategoryList'))),
            !Permissions.can_view_Bookmarks(self.props.current_User, self.props.current_Admin) ? null :
                React.createElement("div", { className: `menu_entry page_link` },
                    React.createElement("a", { onClick: () => Api.get_Bookmarkss(0, 1).then(e => e.Items.length > 0 && self.props.set_page(BookmarksViews.Bookmarks_to_page(e.Items[0].Item.Id))) }, i18next.t('Bookmarks'))),
            React.createElement("div", { className: "menu_entries" },
                React.createElement("div", { className: "menu_entry menu_entry--with-sub" }))));
}
exports.render_menu_HomePage = render_menu_HomePage;
function render_local_menu_HomePage(self) {
    let state = self.state();
    return React.createElement("div", { className: "local-menu" },
        React.createElement("div", { className: "local_menu_entries" },
            React.createElement("div", { className: `local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}` },
                React.createElement("a", { onClick: () => self.props.set_shown_relation("none") }, i18next.t('About this HomePage')))));
}
exports.render_local_menu_HomePage = render_local_menu_HomePage;
function render_controls_HomePage(self) {
    return React.createElement("div", { className: "control" },
        self.props.allow_maximisation && self.props.set_size ? React.createElement("a", { className: `"homepage button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`, onClick: () => {
                set_size_HomePage(self, self.props.size == "preview" ? "large" : "preview");
            } }) : null,
        Permissions.can_delete_HomePage(self.props.current_User, self.props.current_Admin) && self.props.size == "fullscreen" ? React.createElement("a", { className: "button button--delete", onClick: () => confirm(i18next.t('Are you sure?')) &&
                Api.delete_HomePage(self.props.entity).then(() => self.props.force_reload(() => self.props.pop())) }) : null,
        self.props.unlink && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--unlink", onClick: () => self.props.unlink() })
            :
                null,
        self.props.delete && self.props.mode != "view" ?
            React.createElement("a", { className: "button button--delete", onClick: () => self.props.delete() })
            :
                null);
}
exports.render_controls_HomePage = render_controls_HomePage;
function render_content_HomePage(self) {
    let actions = [
        self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
            () => set_size_HomePage(self, self.props.size == "preview" ? "large" : "preview")
            :
                null,
    ].filter(a => a != null);
    let content = Permissions.can_view_HomePage(self.props.current_User, self.props.current_Admin) ?
        self.props.size == "preview" ?
            render_preview_HomePage(self)
            : self.props.size == "large" ?
                render_large_HomePage(self)
                : self.props.size == "fullscreen" ?
                    render_large_HomePage(self)
                    : "Error: unauthorised access to entity."
        : "Error: unauthorised access to entity.";
    if (self.props.mode == "view" && actions.length == 1 && !false)
        return React.createElement("a", { onClick: () => actions[0]() },
            React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content));
    else
        return React.createElement("div", { className: `${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}` }, content);
}
exports.render_content_HomePage = render_content_HomePage;
function render_HomePage_AppTest_minimised(self) {
    return !Permissions.can_view_HomePage_AppTest(self.props.current_User, self.props.current_Admin) ? null : React.createElement("div", { className: "model__attribute apptest" },
        React.createElement("div", { className: "model__attribute-content" }, CustomViews.AppTest(Object.assign({}, self.props))));
}
exports.render_HomePage_AppTest_minimised = render_HomePage_AppTest_minimised;
function render_HomePage_Test_minimised(self) {
    return !Permissions.can_view_HomePage_Test(self.props.current_User, self.props.current_Admin) ? null : React.createElement("div", { className: "model__attribute test" },
        React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(`HomePage:Test`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_HomePage_Test(self.props.current_User, self.props.current_Admin), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
exports.render_HomePage_Test_minimised = render_HomePage_Test_minimised;
function render_HomePage_AppTest_maximised(self) {
    return !Permissions.can_view_HomePage_AppTest(self.props.current_User, self.props.current_Admin) ? null : React.createElement("div", { className: "model__attribute apptest" },
        React.createElement("div", { className: "model__attribute-content" }, CustomViews.AppTest(Object.assign({}, self.props))));
}
exports.render_HomePage_AppTest_maximised = render_HomePage_AppTest_maximised;
function render_HomePage_Test_maximised(self) {
    return !Permissions.can_view_HomePage_Test(self.props.current_User, self.props.current_Admin) ? null : React.createElement("div", { className: "model__attribute test" },
        React.createElement("label", { className: "attribute-label attribute-label-test" }, i18next.t(`HomePage:Test`, { context: self.props.inline ? "inline" : "" })),
        React.createElement("div", { className: "model__attribute-content" }, Components.String(self.props.is_editable && Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_HomePage_Test(self.props.current_User, self.props.current_Admin), self.props.mode, () => self.props.entity.Test, v => self.props.set_entity(Object.assign({}, self.props.entity, { Test: v })))));
}
exports.render_HomePage_Test_maximised = render_HomePage_Test_maximised;
function render_preview_HomePage(self) {
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin))
        attributes = (React.createElement("div", { className: "model__attributes" },
            render_HomePage_AppTest_minimised(self),
            render_HomePage_Test_minimised(self)));
    else
        attributes = render_editable_attributes_minimised_HomePage(self);
    return (React.createElement("div", { className: "block" }, attributes));
}
exports.render_preview_HomePage = render_preview_HomePage;
function render_large_HomePage(self) {
    let state = self.state();
    let attributes = null;
    if (self.props.mode == "view" || !Permissions.can_edit_HomePage(self.props.current_User, self.props.current_Admin))
        attributes = (React.createElement("div", { className: "model__attributes" },
            render_HomePage_AppTest_maximised(self),
            render_HomePage_Test_maximised(self)));
    else
        attributes = render_editable_attributes_maximised_HomePage(self);
    return (React.createElement("div", { className: "block" },
        self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes,
        render_relations_HomePage(self)));
}
exports.render_large_HomePage = render_large_HomePage;
function render_relations_HomePage(self) {
    return React.createElement("div", { className: "relations" });
}
exports.render_relations_HomePage = render_relations_HomePage;
function render_saving_animations_HomePage(self) {
    return;
}
exports.render_saving_animations_HomePage = render_saving_animations_HomePage;
class HomePageComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.thread = null;
        this.state = { update_count: 0, };
    }
    get_self() {
        return { state: () => this.state, props: this.props, setState: (ns, c) => this.setState(ns, c) };
    }
    componentWillReceiveProps(new_props) {
        if (new_props.size == "breadcrumb")
            return;
        let current_logged_in_entity = this.props.current_User || this.props.current_Admin || null;
        let new_logged_in_entity = new_props.current_User || new_props.current_Admin || null;
        if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
            new_props.logic_frame != this.props.logic_frame ||
            (current_logged_in_entity && !new_logged_in_entity) ||
            (!current_logged_in_entity && new_logged_in_entity) ||
            (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
            load_relations_HomePage(this.get_self(), new_props.current_User, new_props.current_Admin);
        }
    }
    componentWillMount() {
        if (this.props.size == "breadcrumb")
            return;
        if (this.props.size != "preview") {
            load_relations_HomePage(this.get_self(), this.props.current_User, this.props.current_Admin);
        }
        this.thread = setInterval(() => {
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.thread);
    }
    render() {
        if (this.props.size == "breadcrumb") {
            return Permissions.can_view_HomePage(this.props.current_User, this.props.current_Admin) ?
                render_breadcrumb_HomePage(this.get_self())
                : null;
        }
        return React.createElement("div", { id: `HomePage_${this.props.entity.Id.toString()}_${this.state.update_count}`, className: `model homepage` },
            render_saving_animations_HomePage(this.get_self()),
            this.props.nesting_depth == 0 ? render_menu_HomePage(this.get_self()) : null,
            React.createElement("div", { className: "content" },
                this.props.nesting_depth == 0 && !!this.props.toggle_button ?
                    React.createElement("div", { className: "topbar" },
                        this.props.breadcrumbs(),
                        React.createElement("div", { className: "topbar__buttons" },
                            this.props.toggle_button ? this.props.toggle_button() : null,
                            this.props.authentication_menu()))
                    :
                        null,
                render_controls_HomePage(this.get_self()),
                render_content_HomePage(this.get_self())));
    }
}
exports.HomePageComponent = HomePageComponent;
exports.HomePage = (props) => React.createElement(HomePageComponent, Object.assign({}, props));
exports.HomePage_to_page = (id) => {
    let can_edit = Utils.any_of([Permissions.can_edit_HomePage]);
    return Utils.scene_to_page(can_edit, exports.HomePage, Api.get_HomePage(id), Api.update_HomePage, "HomePage", "HomePage", `/HomePages/${id}`);
};
exports.HomePage_to = (id, target_element_id, current_User, current_Admin) => {
    Utils.render_page_manager(target_element_id, exports.HomePage_to_page(id), current_User, current_Admin);
};
//# sourceMappingURL=HomePage.js.map