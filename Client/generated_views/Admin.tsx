import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Immutable from "immutable"
import * as Models from '../generated_models'
import * as Api from '../generated_api'
import * as List from '../containers/list'
import * as Components from '../components/components'
import * as Buttons from '../containers/button_utils'
import * as ToggleContainer from '../containers/toggle_container'
import * as Permissions from './permissions'
import * as Utils from './view_utils'
import * as Draft from 'draft-js'
import * as i18next from 'i18next'
import * as Moment from 'moment'
import * as HomePageViews from './HomePage'
import * as CategoryListViews from './CategoryList'
import * as BookmarksViews from './Bookmarks'
import * as CustomViews from '../custom_views'









export function load_relations_Admin(self, current_User:Models.User, current_Admin:Models.Admin, callback?:()=>void) {
  callback && callback()
}

export function set_size_Admin(self:AdminContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Admin_to_page(self.props.entity.Id))
  })
}

export function render_Admin_Username_editable_minimised(self:AdminContext) : JSX.Element {
  if (!Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin)) return render_Admin_Username_minimised(self)
  else
    return !Permissions.can_view_Admin_Username(self.props.current_User, self.props.current_Admin) ? <div /> :
          <div className="model__attribute username">
  <label className="attribute-label attribute-label-username">{i18next.t(`Admin:Username`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        false /* because username and email cannot be edited */,
        self.props.mode,
        () => self.props.entity.Username,
        v => self.props.set_entity({...self.props.entity, Username:v})) } 
  </div>
</div>
}

export function render_Admin_Language_editable_minimised(self:AdminContext) : JSX.Element {
  if (!Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin)) return render_Admin_Language_minimised(self)
  else
    return !Permissions.can_view_Admin_Language(self.props.current_User, self.props.current_Admin) ? <div /> :
          <div className="model__attribute language">
  <label className="attribute-label attribute-label-language">{i18next.t(`Admin:Language`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Union(
          self.props.is_editable && Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Admin_Language(self.props.current_User, self.props.current_Admin),
          self.props.mode,
          Immutable.List<Components.UnionCase>([{ value:"en", label:"en" }]),
          () => self.props.entity.Language,
          (v:string) => self.props.set_entity({...self.props.entity, Language:v})) }
  </div>
</div>
}

export function render_Admin_Email_editable_minimised(self:AdminContext) : JSX.Element {
  if (!Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin)) return render_Admin_Email_minimised(self)
  else
    return !Permissions.can_view_Admin_Email(self.props.current_User, self.props.current_Admin) ? <div /> :
          null
}


export function render_Admin_Username_editable_maximised(self:AdminContext) : JSX.Element {
  if (!Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin)) return render_Admin_Username_maximised(self)
  else
    return !Permissions.can_view_Admin_Username(self.props.current_User, self.props.current_Admin) ? <div /> :
          <div className="model__attribute username">
  <label className="attribute-label attribute-label-username">{i18next.t(`Admin:Username`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        false /* because username and email cannot be edited */,
        self.props.mode,
        () => self.props.entity.Username,
        v => self.props.set_entity({...self.props.entity, Username:v})) } 
  </div>
</div>
}

export function render_Admin_Language_editable_maximised(self:AdminContext) : JSX.Element {
  if (!Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin)) return render_Admin_Language_maximised(self)
  else
    return !Permissions.can_view_Admin_Language(self.props.current_User, self.props.current_Admin) ? <div /> :
          <div className="model__attribute language">
  <label className="attribute-label attribute-label-language">{i18next.t(`Admin:Language`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Union(
          self.props.is_editable && Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Admin_Language(self.props.current_User, self.props.current_Admin),
          self.props.mode,
          Immutable.List<Components.UnionCase>([{ value:"en", label:"en" }]),
          () => self.props.entity.Language,
          (v:string) => self.props.set_entity({...self.props.entity, Language:v})) }
  </div>
</div>
}

export function render_Admin_Email_editable_maximised(self:AdminContext) : JSX.Element {
  if (!Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin)) return render_Admin_Email_maximised(self)
  else
    return !Permissions.can_view_Admin_Email(self.props.current_User, self.props.current_Admin) ? <div /> :
          <div className="model__attribute email">
  <label className="attribute-label attribute-label-email">{i18next.t(`Admin:Email`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Email(
        false,
        self.props.mode,
        () => self.props.entity.Email,
        v => self.props.set_entity({...self.props.entity, Email:v})) } 
  </div>
</div>
}


export function render_editable_attributes_minimised_Admin(self:AdminContext) {
  let attributes = (<div>
      {render_Admin_Username_editable_minimised(self)}
        {render_Admin_Language_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Admin(self:AdminContext) {
    let state = self.state()
    let attributes = (<div>
        {render_Admin_Username_editable_maximised(self)}
        {render_Admin_Language_editable_maximised(self)}
        {render_Admin_Email_editable_maximised(self)}
        <button onClick={() => Api.reset_Admin_password(self.props.entity.Username, self.props.entity.Email).then(() => location.reload())}>{self.props.entity.HasPassword ? i18next.t('common:Reset password') : i18next.t('common:Create password')}</button>
        <button onClick={() => Api.delete_Admin_sessions().then(() => location.reload())}>{i18next.t('common:Delete sessions')}</button>
        {state.active_sessions != "loading" ?
            <div className="active-user-sessions">
              <label className="attribute-label attribute-label-active_sessions">{i18next.t("Active sessions")}</label>
              {
                state.active_sessions.map(s => <div>{s.Item1} - {Moment(s.Item2).format("DD/MM/YYYY")}</div>)
              }
            </div>
          :
            <div className="loading">{i18next.t("loading")}</div>}
      </div>)
    return attributes
  }

export function render_breadcrumb_Admin(self:AdminContext) {
  return <div className="breadcrumb-admin">Admin</div>
}

export function render_menu_Admin(self:AdminContext) {
  let state = self.state()
  return <div className="menu">
        <img className="logo" src={"/images/logo.png"} alt="Logo"/>
        <div className="pages">
          {!Permissions.can_view_HomePage(self.props.current_User, self.props.current_Admin) ? null :
              <div className={`menu_entry page_link`}>
                <a onClick={() => 
                  Api.get_HomePages(0, 1).then(e =>
                    e.Items.length > 0 && self.props.set_page(HomePageViews.HomePage_to_page(e.Items[0].Item.Id))
                  )
                }>
                  {i18next.t('HomePage')}
                </a>
              </div>
            }
        {!Permissions.can_view_CategoryList(self.props.current_User, self.props.current_Admin) ? null :
              <div className={`menu_entry page_link`}>
                <a onClick={() => 
                  Api.get_CategoryLists(0, 1).then(e =>
                    e.Items.length > 0 && self.props.set_page(CategoryListViews.CategoryList_to_page(e.Items[0].Item.Id))
                  )
                }>
                  {i18next.t('CategoryList')}
                </a>
              </div>
            }
        {!Permissions.can_view_Bookmarks(self.props.current_User, self.props.current_Admin) ? null :
              <div className={`menu_entry page_link`}>
                <a onClick={() => 
                  Api.get_Bookmarkss(0, 1).then(e =>
                    e.Items.length > 0 && self.props.set_page(BookmarksViews.Bookmarks_to_page(e.Items[0].Item.Id))
                  )
                }>
                  {i18next.t('Bookmarks')}
                </a>
              </div>
            }
          <div className="menu_entries">
          
            
                <div className="menu_entry menu_entry--with-sub">
                
                </div>  
          </div>
        </div>
      </div>
}

export function render_local_menu_Admin(self:AdminContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Admin')}
              </a>
            </div>
          
              
          </div>
        </div>
}

export function render_controls_Admin(self:AdminContext) {
  return <div className="control">
    {self.props.allow_fullscreen && self.props.set_size ? <a className="admin button button--fullscreen"
        onClick={() => set_size_Admin(self, self.props.size == "fullscreen" ? "large" : "fullscreen")}>
      </a> : null}
    {Permissions.can_delete_Admin(self.props.current_User, self.props.current_Admin) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Admin(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="admin button button--close"
        onClick={() => self.props.pop()}>
    </a> : null}
    {self.props.unlink && self.props.mode != "view" ?
      <a className="button button--unlink"
          onClick={() => self.props.unlink()}>
      </a>
      :
      null
    }
    {self.props.delete && self.props.mode != "view" ?
      <a className="button button--delete"
          onClick={() => self.props.delete()}>
      </a>
      :
      null
    }
  </div>
}

export function render_content_Admin(self:AdminContext) {
  let actions:Array<()=>void> =
    [
      self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Admin(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
      :
        null,
    ].filter(a => a != null)
  let content =
    Permissions.can_view_Admin(self.props.current_User, self.props.current_Admin) ?
      self.props.size == "preview" ?
        render_preview_Admin(self)
      : self.props.size == "large" ?
        render_large_Admin(self)
      : self.props.size == "fullscreen" ?
        render_large_Admin(self)
      : "Error: unauthorised access to entity."
    : "Error: unauthorised access to entity."
  if (self.props.mode == "view" && actions.length == 1 && !false)
    return <a onClick={() => actions[0]()}>
      <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
        {content}
      </div>
    </a>
  else
    return <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
      {content}
    </div>
}

export function render_Admin_Username_minimised(self:AdminContext) : JSX.Element {
      return !Permissions.can_view_Admin_Username(self.props.current_User, self.props.current_Admin) ? null : <div className="model__attribute username">
  <label className="attribute-label attribute-label-username">{i18next.t(`Admin:Username`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        false /* because username and email cannot be edited */,
        self.props.mode,
        () => self.props.entity.Username,
        v => self.props.set_entity({...self.props.entity, Username:v})) } 
  </div>
</div>
      
}
        export function render_Admin_Language_minimised(self:AdminContext) : JSX.Element {
      return !Permissions.can_view_Admin_Language(self.props.current_User, self.props.current_Admin) ? null : <div className="model__attribute language">
  <label className="attribute-label attribute-label-language">{i18next.t(`Admin:Language`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Union(
          self.props.is_editable && Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Admin_Language(self.props.current_User, self.props.current_Admin),
          self.props.mode,
          Immutable.List<Components.UnionCase>([{ value:"en", label:"en" }]),
          () => self.props.entity.Language,
          (v:string) => self.props.set_entity({...self.props.entity, Language:v})) }
  </div>
</div>
      
}
        export function render_Admin_Email_minimised(self:AdminContext) : JSX.Element {
      return null
}

export function render_Admin_Username_maximised(self:AdminContext) : JSX.Element {
        return !Permissions.can_view_Admin_Username(self.props.current_User, self.props.current_Admin) ? null : <div className="model__attribute username">
  <label className="attribute-label attribute-label-username">{i18next.t(`Admin:Username`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        false /* because username and email cannot be edited */,
        self.props.mode,
        () => self.props.entity.Username,
        v => self.props.set_entity({...self.props.entity, Username:v})) } 
  </div>
</div>
}
        export function render_Admin_Language_maximised(self:AdminContext) : JSX.Element {
        return !Permissions.can_view_Admin_Language(self.props.current_User, self.props.current_Admin) ? null : <div className="model__attribute language">
  <label className="attribute-label attribute-label-language">{i18next.t(`Admin:Language`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Union(
          self.props.is_editable && Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Admin_Language(self.props.current_User, self.props.current_Admin),
          self.props.mode,
          Immutable.List<Components.UnionCase>([{ value:"en", label:"en" }]),
          () => self.props.entity.Language,
          (v:string) => self.props.set_entity({...self.props.entity, Language:v})) }
  </div>
</div>
}
        export function render_Admin_Email_maximised(self:AdminContext) : JSX.Element {
        return !Permissions.can_view_Admin_Email(self.props.current_User, self.props.current_Admin) ? null : <div className="model__attribute email">
  <label className="attribute-label attribute-label-email">{i18next.t(`Admin:Email`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.Email(
        false,
        self.props.mode,
        () => self.props.entity.Email,
        v => self.props.set_entity({...self.props.entity, Email:v})) } 
  </div>
</div>
}

export function render_preview_Admin(self:AdminContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin))
    attributes = (<div className="model__attributes">
      { render_Admin_Username_minimised(self) }
        { render_Admin_Language_minimised(self) }
        { render_Admin_Email_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Admin(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Admin(self:AdminContext) {
  let state = self.state()
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Admin(self.props.current_User, self.props.current_Admin))
    attributes = (<div className="model__attributes">
      { render_Admin_Username_maximised(self) }
        { render_Admin_Language_maximised(self) }
        { render_Admin_Email_maximised(self) }
        {state.active_sessions != "loading" ?
            <div className="active-user-sessions">
              <label className="attribute-label attribute-label-active_sessions">{i18next.t("Active sessions")}</label>
              {
                state.active_sessions.map(s => <div>{s.Item1} - {Moment(s.Item2).format("DD/MM/YYYY")}</div>)
              }
            </div>
          :
            <div className="loading">{i18next.t("loading")}</div>}
    </div>)
  else
    attributes = render_editable_attributes_maximised_Admin(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Admin(self)}
    </div>)
}




export function render_relations_Admin(self:AdminContext) {
  return <div className="relations">
      
      
    </div>
}





export function render_saving_animations_Admin(self:AdminContext) {
  return 
    
}

export type AdminContext = {state:()=>AdminState, props:Utils.EntityComponentProps<Models.Admin>, setState:(new_state:AdminState, callback?:()=>void) => void}

export type AdminState = {
    update_count:number
    active_sessions:"loading"|Array<{Item1:string, Item2:Date}>,
    
  }
export class AdminComponent extends React.Component<Utils.EntityComponentProps<Models.Admin>, AdminState> {
  constructor(props:Utils.EntityComponentProps<Models.Admin>, context:any) {
    super(props, context)
    this.state = { update_count:0,active_sessions:"loading",  }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Admin>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User ||this.props.current_Admin || null
    let new_logged_in_entity = new_props.current_User ||new_props.current_Admin || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Admin(this.get_self(),  new_props.current_User, new_props.current_Admin)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview") {
      Api.active_Admin_sessions().then(active_sessions => this.setState({...this.state, active_sessions:active_sessions}))
      load_relations_Admin(this.get_self(), this.props.current_User, this.props.current_Admin)
    }

    this.thread = setInterval(() => {
      

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Admin(this.props.current_User, this.props.current_Admin) ?
              render_breadcrumb_Admin(this.get_self())
              : null
    }

    return <div id={`Admin_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model admin`}>
      { render_saving_animations_Admin(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Admin(this.get_self()) : null }
      <div className="content" >
        {
          this.props.nesting_depth == 0 && !!this.props.toggle_button ?
          <div className="topbar">
            { this.props.breadcrumbs() }
            <div className="topbar__buttons">
              
                {this.props.toggle_button ? this.props.toggle_button() : null}
              { this.props.authentication_menu() }
            </div>
          </div>
          :
          null
        }
        { this.props.nesting_depth == 0 ? render_local_menu_Admin(this.get_self()) : null }
        { render_controls_Admin(this.get_self()) }
        { render_content_Admin(this.get_self()) }
      </div>
    </div>
  }
}

export let Admin = (props:Utils.EntityComponentProps<Models.Admin>) : JSX.Element =>
  <AdminComponent {...props} />

export let Admin_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Admin])
  return Utils.scene_to_page<Models.Admin>(can_edit, Admin, Api.get_Admin(id), Api.update_Admin, "Admin", "Admin", `/Admins/${id}`)
}

export let Admin_to = (id:number, target_element_id:string, current_User:Models.User, current_Admin:Models.Admin) => {
  Utils.render_page_manager(target_element_id,
    Admin_to_page(id),
    current_User, current_Admin
  )
}
