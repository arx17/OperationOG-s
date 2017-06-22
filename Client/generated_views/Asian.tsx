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
import * as MealViews from './Meal'


export function Asian_Categories_Meal_can_create(self:AsianContext) {
  let state = self.state()
  return state.Meal == "loading" ? false : state.Meal.CanCreate
}
export function Asian_HomePage_Categories_can_create(self:AsianContext) {
  let state = self.state()
  return state.HomePage == "loading" ? false : state.HomePage.CanCreate
}
export function Asian_Categories_Meal_can_delete(self:AsianContext) {
  let state = self.state()
  return state.Meal == "loading" ? false : state.Meal.CanDelete
}
export function Asian_HomePage_Categories_can_delete(self:AsianContext) {
  let state = self.state()
  return state.HomePage == "loading" ? false : state.HomePage.CanDelete
}
export function Asian_Categories_Meal_page_index(self:AsianContext) {
  let state = self.state()
  return state.Meal == "loading" ? 0 : state.Meal.PageIndex
}
export function Asian_HomePage_Categories_page_index(self:AsianContext) {
  let state = self.state()
  return state.HomePage == "loading" ? 0 : state.HomePage.PageIndex
}
export function Asian_Categories_Meal_page_size(self:AsianContext) {
  let state = self.state()
  return state.Meal == "loading" ? 25 : state.Meal.PageSize
}
export function Asian_HomePage_Categories_page_size(self:AsianContext) {
  let state = self.state()
  return state.HomePage == "loading" ? 25 : state.HomePage.PageSize
}
export function Asian_Categories_Meal_num_pages(self:AsianContext) {
  let state = self.state()
  return state.Meal == "loading" ? 1 : state.Meal.NumPages
}
export function Asian_HomePage_Categories_num_pages(self:AsianContext) {
  let state = self.state()
  return state.HomePage == "loading" ? 1 : state.HomePage.NumPages
}

export function load_relation_Asian_Categories_Meal(self:AsianContext, current_User:Models.User, current_Admin:Models.Admin, callback?:()=>void) {
  Permissions.can_view_Meal(current_User, current_Admin) ?
    Api.get_Categories_Categories_Meals(self.props.entity, Asian_Categories_Meal_page_index(self), Asian_Categories_Meal_page_size(self)).then(Meals =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          Meal:Utils.raw_page_to_paginated_items<Models.Meal, Utils.EntityAndSize<Models.Meal> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.Meal != "loading" && state.Meal.Items.has(i.Id) ? state.Meal.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, Meals)
          }, callback))
  :
    callback && callback()
}

export function load_relation_Asian_HomePage_Categories(self:AsianContext, current_User:Models.User, current_Admin:Models.Admin, callback?:()=>void) {
  Permissions.can_view_HomePage(current_User, current_Admin) ?
    Api.get_Categories_HomePage_Categoriess(self.props.entity, Asian_HomePage_Categories_page_index(self), Asian_HomePage_Categories_page_size(self)).then(HomePages =>
      self.setState({...self.state(), update_count:self.state().update_count+1,
          HomePage:Utils.raw_page_to_paginated_items<Models.HomePage, Utils.EntityAndSize<Models.HomePage> & { shown_relation:string }>(i => {
            let state = self.state()
            return {
              element:i,
              size: state.HomePage != "loading" && state.HomePage.Items.has(i.Id) ? state.HomePage.Items.get(i.Id).size : "preview",
              shown_relation:"all"}}, HomePages)
          }, callback))
  :
    callback && callback()
}

export function load_relations_Asian(self, current_User:Models.User, current_Admin:Models.Admin, callback?:()=>void) {
  load_relation_Asian_HomePage_Categories(self, self.props.current_User, self.props.current_Admin, 
        () => load_relation_Asian_Categories_Meal(self, self.props.current_User, self.props.current_Admin, 
        () => callback && callback()))
}

export function set_size_Asian(self:AsianContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Asian_to_page(self.props.entity.Id))
  })
}

export function render_Asian_Description_editable_minimised(self:AsianContext) : JSX.Element {
  if (!Permissions.can_edit_Asian(self.props.current_User, self.props.current_Admin)) return render_Asian_Description_minimised(self)
  else
    return !Permissions.can_view_Asian_Description(self.props.current_User, self.props.current_Admin) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Asian:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Asian(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Asian_Description(self.props.current_User, self.props.current_Admin),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_Asian_Description_editable_maximised(self:AsianContext) : JSX.Element {
  if (!Permissions.can_edit_Asian(self.props.current_User, self.props.current_Admin)) return render_Asian_Description_maximised(self)
  else
    return !Permissions.can_view_Asian_Description(self.props.current_User, self.props.current_Admin) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Asian:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Asian(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Asian_Description(self.props.current_User, self.props.current_Admin),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_editable_attributes_minimised_Asian(self:AsianContext) {
  let attributes = (<div>
      {render_Asian_Description_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Asian(self:AsianContext) {
    let attributes = (<div>
        {render_Asian_Description_editable_maximised(self)}
      </div>)
    return attributes
  }

export function render_breadcrumb_Asian(self:AsianContext) {
  return <div className="breadcrumb-asian">Asian</div>
}

export function render_menu_Asian(self:AsianContext) {
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
          <div className="menu_entries">
          
            {!Permissions.can_view_Categories(self.props.current_User, self.props.current_Admin) ? null :
                  <div className={`menu_entry${self.props.shown_relation == "HomePage_Categories" ? " active" : ""}`}>
                    <a onClick={() =>
                        {
                            Api.get_HomePages(0, 1).then(e =>
                              e.Items.length > 0 && self.props.set_page(HomePageViews.HomePage_to_page(e.Items[0].Item.Id),
                                () => self.props.set_shown_relation("HomePage_Categories"))
                            )
                        }
                      }>
                      {i18next.t('HomePage_Categoriess')}
                    </a>
                  </div>
                }
                <div className="menu_entry menu_entry--with-sub">
                
                </div>  
          </div>
        </div>
      </div>
}

export function render_local_menu_Asian(self:AsianContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Asian')}
              </a>
            </div>
          
            {!Permissions.can_view_Meal(self.props.current_User, self.props.current_Admin) ? null :
                  <div key={"Categories_Meal"} className={`local_menu_entry${self.props.shown_relation == "Categories_Meal" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_Asian_Categories_Meal(self,
                        self.props.current_User, self.props.current_Admin, 
                        () => self.props.set_shown_relation("Categories_Meal"))
                    }>
                      {i18next.t('Categories_Meals')}
                    </a>
                  </div>
                }  
          </div>
        </div>
}

export function render_controls_Asian(self:AsianContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"asian button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Asian(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {self.props.allow_fullscreen && self.props.set_size ? <a className="asian button button--fullscreen"
        onClick={() => set_size_Asian(self, self.props.size == "fullscreen" ? "large" : "fullscreen")}>
      </a> : null}
    {Permissions.can_delete_Asian(self.props.current_User, self.props.current_Admin) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Asian(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="asian button button--close"
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

export function render_content_Asian(self:AsianContext) {
  return <div className={`${self.props.inline != undefined && self.props.inline ? "" : "model-content"} ${self.props.size == 'preview' ? 'model-content--preview' : ''}`}>
    {Permissions.can_view_Asian(self.props.current_User, self.props.current_Admin) ?
      self.props.size == "preview" ?
        render_preview_Asian(self)
      : self.props.size == "large" ?
        render_large_Asian(self)
      : self.props.size == "fullscreen" ?
        render_large_Asian(self)
      : "Error: unauthorised access to entity."
    : "Error: unauthorised access to entity."
    }
  </div>
}

export function render_Asian_Description_minimised(self:AsianContext) : JSX.Element {
      return !Permissions.can_view_Asian_Description(self.props.current_User, self.props.current_Admin) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Asian:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Asian(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Asian_Description(self.props.current_User, self.props.current_Admin),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
      
}

export function render_Asian_Description_maximised(self:AsianContext) : JSX.Element {
        return !Permissions.can_view_Asian_Description(self.props.current_User, self.props.current_Admin) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Asian:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Asian(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Asian_Description(self.props.current_User, self.props.current_Admin),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}

export function render_preview_Asian(self:AsianContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Asian(self.props.current_User, self.props.current_Admin))
    attributes = (<div className="model__attributes">
      { render_Asian_Description_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Asian(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Asian(self:AsianContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Asian(self.props.current_User, self.props.current_Admin))
    attributes = (<div className="model__attributes">
      { render_Asian_Description_maximised(self) }
    </div>)
  else
    attributes = render_editable_attributes_maximised_Asian(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Asian(self)}
    </div>)
}


export function render_Asian_Categories_Meal(self:AsianContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Categories_Meal") || !Permissions.can_view_Meal(self.props.current_User, self.props.current_Admin))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("asian_categories_meal",
   "Categories",
   "Meal",
   "Meals",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Meal != "loading" ? state.Meal.Items : state.Meal,
      Asian_Categories_Meal_page_index(self),
      Asian_Categories_Meal_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Meal != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Meal: {
              ...state.Meal,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Asian_Categories_Meal(self, self.props.current_User, self.props.current_Admin))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                MealViews.Meal({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Categories_Meal(self.props.current_User, self.props.current_Admin)
                        || Permissions.can_create_Categories_Meal(self.props.current_User, self.props.current_Admin)
                        || Permissions.can_delete_Categories_Meal(self.props.current_User, self.props.current_Admin)) ?
                    self.props.mode : "view",
                  is_editable:state.Meal != "loading" && state.Meal.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Meal != "loading" &&
                    self.setState({...self.state(),
                      Meal:
                        {
                          ...state.Meal,
                          Items:state.Meal.Items.set(i_id,{...state.Meal.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Meal"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Meal != "loading" &&
                    self.setState({...self.state(),
                      Meal:
                        {
                          ...state.Meal,
                          Items:state.Meal.Items.set(i_id,
                            {...state.Meal.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Meal, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Meal != "loading" &&
                    self.setState({...self.state(),
                      dirty_Meal:state.dirty_Meal.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Meal:
                        {
                          ...state.Meal,
                          Items:state.Meal.Items.set(i_id,{...state.Meal.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Categories_Meal(self.props.current_User, self.props.current_Admin) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Categories_Categories_Meals(self.props.entity, i.element).then(() =>
                      load_relation_Asian_Categories_Meal(self, self.props.current_User, self.props.current_Admin))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Meal(self.props.current_User, self.props.current_Admin) && Permissions.can_create_Categories_Meal(self.props.current_User, self.props.current_Admin) && Asian_Categories_Meal_can_create(self) ? render_new_Asian_Categories_Meal(self) : null}
          {Permissions.can_create_Categories_Meal(self.props.current_User, self.props.current_Admin) ? render_add_existing_Asian_Categories_Meal(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Asian_HomePage_Categories(self:AsianContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "HomePage_Categories") || !Permissions.can_view_HomePage(self.props.current_User, self.props.current_Admin))
    return null
  let state = self.state()
  return <div>
    { List.render_relation("asian_homepage_categories",
   "Categories",
   "HomePage",
   "HomePages",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.HomePage != "loading" ? state.HomePage.Items : state.HomePage,
      Asian_HomePage_Categories_page_index(self),
      Asian_HomePage_Categories_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.HomePage != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            HomePage: {
              ...state.HomePage,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Asian_HomePage_Categories(self, self.props.current_User, self.props.current_Admin))
        },
      (i,i_id) => {
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""} ` }
          
            >
            <div key={i_id}>
              {
                HomePageViews.HomePage({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_HomePage_Categories(self.props.current_User, self.props.current_Admin)
                        || Permissions.can_create_HomePage_Categories(self.props.current_User, self.props.current_Admin)
                        || Permissions.can_delete_HomePage_Categories(self.props.current_User, self.props.current_Admin)) ?
                    self.props.mode : "view",
                  is_editable:state.HomePage != "loading" && state.HomePage.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.HomePage != "loading" &&
                    self.setState({...self.state(),
                      HomePage:
                        {
                          ...state.HomePage,
                          Items:state.HomePage.Items.set(i_id,{...state.HomePage.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("HomePage"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.HomePage != "loading" &&
                    self.setState({...self.state(),
                      HomePage:
                        {
                          ...state.HomePage,
                          Items:state.HomePage.Items.set(i_id,
                            {...state.HomePage.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.HomePage, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.HomePage != "loading" &&
                    self.setState({...self.state(),
                      dirty_HomePage:state.dirty_HomePage.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      HomePage:
                        {
                          ...state.HomePage,
                          Items:state.HomePage.Items.set(i_id,{...state.HomePage.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  unlink: undefined,
                    delete: !Permissions.can_delete_HomePage(self.props.current_User, self.props.current_Admin) || !Asian_HomePage_Categories_can_delete(self) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.delete_HomePage(i.element).then(() =>
                      load_relation_Asian_HomePage_Categories(self, self.props.current_User, self.props.current_Admin))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          
          
        </div>)
    }
    
    </div>
}



export function render_relations_Asian(self:AsianContext) {
  return <div className="relations">
      { render_Asian_Categories_Meal(self, "default") }
      
    </div>
}

export function render_add_existing_Asian_Categories_Meal(self:AsianContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Meal != "open" ?
            <Buttons.Add 
              onClick={() =>
                self.setState({...self.state(), add_step_Meal:"open"}) }
                  target_name={"Meal"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"asian_categories_meal",
              source_name:"Categories",
              target_name:"Meal",
              target_plural:"Meals",
              page_size:10,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Meal:"saving"}, () =>
                          Api.link_Categories_Categories_Meals(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Meal:"closed"}, () =>
                              load_relation_Asian_Categories_Meal(self, self.props.current_User, self.props.current_Admin))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      MealViews.Meal({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Meal"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Meal, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Meal:"closed"}),
              get_items:[
                { name: "Lunch", get: async(i,s) => Api.get_unlinked_Categories_Categories_Meals_Lunch(self.props.entity, i, s) }, 
                { name: "Dinner", get: async(i,s) => Api.get_unlinked_Categories_Categories_Meals_Dinner(self.props.entity, i, s) }, 
                { name: "Breakfast", get: async(i,s) => Api.get_unlinked_Categories_Categories_Meals_Breakfast(self.props.entity, i, s) }
              ]
            })
        }
      </div>
    :
      null
    }
  

export function render_new_Asian_Categories_Meal(self:AsianContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <Buttons.Create target_name={"Meal"} onClick={() => self.setState({...self.state(), add_step_Meal:"creating"})}  />
            {
            state.add_step_Meal != "creating" ?
            null
            :
            <div className="overlay__item overlay__item--new">
              <div className="new-lunch">
              <button 
                      className="new-lunch button button--new"
                      onClick={() =>
                          Api.create_linked_Categories_Categories_Meals_Lunch(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Lunch(
                                ({ ...e[0], Kind:"Lunch", Description:"" } as Models.Lunch)).then(() =>
                                load_relation_Asian_Categories_Meal(self, self.props.current_User, self.props.current_Admin, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Lunch')}
              </button>
            </div>
            <div className="new-dinner">
              <button 
                      className="new-dinner button button--new"
                      onClick={() =>
                          Api.create_linked_Categories_Categories_Meals_Dinner(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Dinner(
                                ({ ...e[0], Kind:"Dinner", Description:"" } as Models.Dinner)).then(() =>
                                load_relation_Asian_Categories_Meal(self, self.props.current_User, self.props.current_Admin, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Dinner')}
              </button>
            </div>
            <div className="new-breakfast">
              <button 
                      className="new-breakfast button button--new"
                      onClick={() =>
                          Api.create_linked_Categories_Categories_Meals_Breakfast(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Breakfast(
                                ({ ...e[0], Kind:"Breakfast", Description:"" } as Models.Breakfast)).then(() =>
                                load_relation_Asian_Categories_Meal(self, self.props.current_User, self.props.current_Admin, () =>
                                    self.setState({...self.state(), add_step_Meal:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Breakfast')}
              </button>
            </div>
              <Buttons.Cancel onClick={() => self.setState({...self.state(), add_step_Meal:"closed"})} />
            </div>
            }
        </div>
      :
      null
    }
  

export function render_saving_animations_Asian(self:AsianContext) {
  return self.state().dirty_Meal.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_HomePage.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/>
    : <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"cornflowerblue"}} className="saved"/>
}

export type AsianContext = {state:()=>AsianState, props:Utils.EntityComponentProps<Models.Asian>, setState:(new_state:AsianState, callback?:()=>void) => void}

export type AsianState = {
    update_count:number
    add_step_Meal:"closed"|"open"|"saving"|"adding"|"creating",
      dirty_Meal:Immutable.Map<number,Models.Meal>,
      Meal:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Meal>>|"loading"
  add_step_HomePage:"closed"|"open"|"saving",
      dirty_HomePage:Immutable.Map<number,Models.HomePage>,
      HomePage:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.HomePage>>|"loading"
  }
export class AsianComponent extends React.Component<Utils.EntityComponentProps<Models.Asian>, AsianState> {
  constructor(props:Utils.EntityComponentProps<Models.Asian>, context:any) {
    super(props, context)
    this.state = { update_count:0, add_step_Meal:"closed", dirty_Meal:Immutable.Map<number,Models.Meal>(), Meal:"loading", add_step_HomePage:"closed", dirty_HomePage:Immutable.Map<number,Models.HomePage>(), HomePage:"loading" }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Asian>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User ||this.props.current_Admin || null
    let new_logged_in_entity = new_props.current_User ||new_props.current_Admin || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Asian(this.get_self(), new_props.current_User, new_props.current_Admin)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview")
      load_relations_Asian(this.get_self(), this.props.current_User, this.props.current_Admin)

    this.thread = setInterval(() => {
      if (this.state.dirty_Meal.count() > 0) {
         let first = this.state.dirty_Meal.first()
         this.setState({...this.state, dirty_Meal: this.state.dirty_Meal.remove(first.Id)}, () =>
           Api.update_Meal(first)
         )
       } else if (this.state.dirty_HomePage.count() > 0) {
         let first = this.state.dirty_HomePage.first()
         this.setState({...this.state, dirty_HomePage: this.state.dirty_HomePage.remove(first.Id)}, () =>
           Api.update_HomePage(first)
         )
       }

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Asian(this.props.current_User, this.props.current_Admin) ?
              render_breadcrumb_Asian(this.get_self())
              : null
    }

    return <div id={`Asian_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model asian`}>
      { render_saving_animations_Asian(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Asian(this.get_self()) : null }
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
        { this.props.nesting_depth == 0 ? render_local_menu_Asian(this.get_self()) : null }
        { render_controls_Asian(this.get_self()) }
        { render_content_Asian(this.get_self()) }
      </div>
    </div>
  }
}

export let Asian = (props:Utils.EntityComponentProps<Models.Asian>) : JSX.Element =>
  <AsianComponent {...props} />

export let Asian_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Asian, Permissions.can_edit_Categories_Meal, Permissions.can_edit_HomePage_Categories, Permissions.can_edit_Meal, Permissions.can_edit_HomePage])
  return Utils.scene_to_page<Models.Asian>(can_edit, Asian, Api.get_Asian(id), Api.update_Asian, "Asian", "Asian", `/Asians/${id}`)
}

export let Asian_to = (id:number, target_element_id:string, current_User:Models.User, current_Admin:Models.Admin) => {
  Utils.render_page_manager(target_element_id,
    Asian_to_page(id),
    current_User, current_Admin
  )
}
