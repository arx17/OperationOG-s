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
import * as CategorieViews from './Categorie'
import * as RecipeViews from './Recipe'
import * as CustomViews from '../custom_views'

export function Lunch_Categorie_Meal_can_create(self:LunchContext) {
  let state = self.state()
  return state.Categorie == "loading" ? false : state.Categorie.CanCreate
}
export function Lunch_Meal_Recipe_can_create(self:LunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanCreate
}
export function Lunch_Categorie_Meal_can_delete(self:LunchContext) {
  let state = self.state()
  return state.Categorie == "loading" ? false : state.Categorie.CanDelete
}
export function Lunch_Meal_Recipe_can_delete(self:LunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? false : state.Recipe.CanDelete
}
export function Lunch_Categorie_Meal_page_index(self:LunchContext) {
  let state = self.state()
  return state.Categorie == "loading" ? 0 : state.Categorie.PageIndex
}
export function Lunch_Meal_Recipe_page_index(self:LunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 0 : state.Recipe.PageIndex
}
export function Lunch_Categorie_Meal_page_size(self:LunchContext) {
  let state = self.state()
  return state.Categorie == "loading" ? 25 : state.Categorie.PageSize
}
export function Lunch_Meal_Recipe_page_size(self:LunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 25 : state.Recipe.PageSize
}
export function Lunch_Categorie_Meal_search_query(self:LunchContext) {
  let state = self.state()
  return state.Categorie == "loading" ? null : state.Categorie.SearchQuery
}
export function Lunch_Meal_Recipe_search_query(self:LunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? null : state.Recipe.SearchQuery
}
export function Lunch_Categorie_Meal_num_pages(self:LunchContext) {
  let state = self.state()
  return state.Categorie == "loading" ? 1 : state.Categorie.NumPages
}
export function Lunch_Meal_Recipe_num_pages(self:LunchContext) {
  let state = self.state()
  return state.Recipe == "loading" ? 1 : state.Recipe.NumPages
}

export function load_relation_Lunch_Categorie_Meal(self:LunchContext, force_first_page:boolean, current_User:Models.User, current_Admin:Models.Admin, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.Categorie != "loading" ?
    (c:() => void) => state.Categorie != "loading" && self.setState({
      ...state,
      Categorie: {...state.Categorie, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_Categorie(current_User, current_Admin) ?
    prelude(() =>
      Api.get_Meal_Categorie_Meals(self.props.entity, Lunch_Categorie_Meal_page_index(self), Lunch_Categorie_Meal_page_size(self), Lunch_Categorie_Meal_search_query(self)).then(Categories =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            Categorie:Utils.raw_page_to_paginated_items<Models.Categorie, Utils.EntityAndSize<Models.Categorie> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.Categorie != "loading" ?
                  (state.Categorie.Items.has(i.Id) ?
                    state.Categorie.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, Categories)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relation_Lunch_Meal_Recipe(self:LunchContext, force_first_page:boolean, current_User:Models.User, current_Admin:Models.Admin, callback?:()=>void) {
  let state = self.state()
  let prelude = force_first_page && state.Recipe != "loading" ?
    (c:() => void) => state.Recipe != "loading" && self.setState({
      ...state,
      Recipe: {...state.Recipe, PageIndex:0 }
    }, c)
    :
    (c:() => void) => c()
  Permissions.can_view_Recipe(current_User, current_Admin) ?
    prelude(() =>
      Api.get_Meal_Meal_Recipes(self.props.entity, Lunch_Meal_Recipe_page_index(self), Lunch_Meal_Recipe_page_size(self), Lunch_Meal_Recipe_search_query(self)).then(Recipes =>
        self.setState({...self.state(), update_count:self.state().update_count+1,
            Recipe:Utils.raw_page_to_paginated_items<Models.Recipe, Utils.EntityAndSize<Models.Recipe> & { shown_relation:string }>((i, i_just_created) => {
              let state = self.state()
              return {
                element:i,
                size: state.Recipe != "loading" ?
                  (state.Recipe.Items.has(i.Id) ?
                    state.Recipe.Items.get(i.Id).size
                  :
                    "preview" /* i_just_created ? "large" : "preview" */)
                  :
                    "preview" /* i_just_created ? "large" : "preview" */,
                shown_relation:"all"}}, Recipes)
            }, callback)))
    :
      prelude(() => callback && callback())
}

export function load_relations_Lunch(self, current_User:Models.User, current_Admin:Models.Admin, callback?:()=>void) {
  load_relation_Lunch_Meal_Recipe(self, false, self.props.current_User, self.props.current_Admin, 
        () => load_relation_Lunch_Categorie_Meal(self, false, self.props.current_User, self.props.current_Admin, 
        () => callback && callback()))
}

export function set_size_Lunch(self:LunchContext, new_size:Utils.EntitySize) {
  self.props.set_size(new_size, () => {
    if (new_size == "fullscreen")
      self.props.push(Lunch_to_page(self.props.entity.Id))
  })
}

export function render_Lunch_Description_editable_minimised(self:LunchContext) : JSX.Element {
  if (!Permissions.can_edit_Lunch(self.props.current_User, self.props.current_Admin)) return render_Lunch_Description_minimised(self)
  else
    return !Permissions.can_view_Lunch_Description(self.props.current_User, self.props.current_Admin) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Lunch:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Lunch(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Lunch_Description(self.props.current_User, self.props.current_Admin),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_Lunch_Description_editable_maximised(self:LunchContext) : JSX.Element {
  if (!Permissions.can_edit_Lunch(self.props.current_User, self.props.current_Admin)) return render_Lunch_Description_maximised(self)
  else
    return !Permissions.can_view_Lunch_Description(self.props.current_User, self.props.current_Admin) ? <div /> :
          <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Lunch:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Lunch(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Lunch_Description(self.props.current_User, self.props.current_Admin),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}


export function render_editable_attributes_minimised_Lunch(self:LunchContext) {
  let attributes = (<div>
      {render_Lunch_Description_editable_minimised(self)}
    </div>)
  return attributes
}

export function render_editable_attributes_maximised_Lunch(self:LunchContext) {
    let state = self.state()
    let attributes = (<div>
        {render_Lunch_Description_editable_maximised(self)}
        
        
        
      </div>)
    return attributes
  }

export function render_breadcrumb_Lunch(self:LunchContext) {
  return <div className="breadcrumb-lunch">Lunch</div>
}

export function render_menu_Lunch(self:LunchContext) {
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

export function render_local_menu_Lunch(self:LunchContext) {
  let state = self.state()
  return <div className="local-menu">
          <div className="local_menu_entries">
            <div className={`local_menu_entry${self.props.shown_relation == "none" ? " local_menu_entry--active" : ""}`}>
              <a onClick={() =>
                  self.props.set_shown_relation("none")
              }>
                {i18next.t('About this Lunch')}
              </a>
            </div>
          
            {!Permissions.can_view_Recipe(self.props.current_User, self.props.current_Admin) ? null :
                  <div key={"Meal_Recipe"} className={`local_menu_entry${self.props.shown_relation == "Meal_Recipe" ? " local_menu_entry--active" : ""}`}>
                    <a onClick={() =>
                      load_relation_Lunch_Meal_Recipe(self,
                        false,
                        self.props.current_User, self.props.current_Admin, 
                        () => self.props.set_shown_relation("Meal_Recipe"))
                    }>
                      {i18next.t('Meal_Recipes')}
                    </a>
                  </div>
                }  
          </div>
        </div>
}

export function render_controls_Lunch(self:LunchContext) {
  return <div className="control">
    {self.props.allow_maximisation && self.props.set_size ? <a className={`"lunch button button--toggle ${self.props.size != 'preview' ? 'button--toggle--open' : ''}`}
          onClick={() => {
            set_size_Lunch(self, self.props.size == "preview" ? "large" : "preview")}
          }>
      </a> : null}
    {self.props.allow_fullscreen && self.props.set_size ? <a className="lunch button button--fullscreen"
        onClick={() => set_size_Lunch(self, self.props.size == "fullscreen" ? "large" : "fullscreen")}>
      </a> : null}
    {Permissions.can_delete_Lunch(self.props.current_User, self.props.current_Admin) && self.props.size == "fullscreen" ? <a className="button button--delete"
      onClick={() => confirm(i18next.t('Are you sure?')) &&
        Api.delete_Lunch(self.props.entity).then(() => self.props.force_reload(() => self.props.pop()))
      }>
    </a> : null}
    {self.props.size == "fullscreen" && self.props.pages_count > 0 ? <a className="lunch button button--close"
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

export function render_content_Lunch(self:LunchContext) {
  let actions:Array<()=>void> =
    [
      self.props.allow_maximisation && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Lunch(self, self.props.size == "preview" ? "large" : "preview")
      :
        null,self.props.allow_fullscreen && self.props.set_size && self.props.size == "preview" ?
        () => set_size_Lunch(self, self.props.size == "fullscreen" ? "large" : "fullscreen")
      :
        null,
    ].filter(a => a != null)
  let content =
    Permissions.can_view_Lunch(self.props.current_User, self.props.current_Admin) ?
      self.props.size == "preview" ?
        render_preview_Lunch(self)
      : self.props.size == "large" ?
        render_large_Lunch(self)
      : self.props.size == "fullscreen" ?
        render_large_Lunch(self)
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

export function render_Lunch_Description_minimised(self:LunchContext) : JSX.Element {
      return !Permissions.can_view_Lunch_Description(self.props.current_User, self.props.current_Admin) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Lunch:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Lunch(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Lunch_Description(self.props.current_User, self.props.current_Admin),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
      
}

export function render_Lunch_Description_maximised(self:LunchContext) : JSX.Element {
        return !Permissions.can_view_Lunch_Description(self.props.current_User, self.props.current_Admin) ? null : <div className="model__attribute description">
  <label className="attribute-label attribute-label-description">{i18next.t(`Lunch:Description`, {context: self.props.inline ? "inline" : ""})}</label>
  <div className="model__attribute-content">
    { Components.String(
        self.props.is_editable && Permissions.can_edit_Lunch(self.props.current_User, self.props.current_Admin) && Permissions.can_edit_Lunch_Description(self.props.current_User, self.props.current_Admin),
        self.props.mode,
        () => self.props.entity.Description,
        v => self.props.set_entity({...self.props.entity, Description:v})) } 
  </div>
</div>
}

export function render_preview_Lunch(self:LunchContext) {
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Lunch(self.props.current_User, self.props.current_Admin))
    attributes = (<div className="model__attributes">
      { render_Lunch_Description_minimised(self) }
    </div>)
  else
    attributes = render_editable_attributes_minimised_Lunch(self)
  return (<div className="block">
      {attributes}
    </div>)
}

export function render_large_Lunch(self:LunchContext) {
  let state = self.state()
  let attributes:JSX.Element = null
  if (self.props.mode == "view" || !Permissions.can_edit_Lunch(self.props.current_User, self.props.current_Admin))
    attributes = (<div className="model__attributes">
      { render_Lunch_Description_maximised(self) }
        
    </div>)
  else
    attributes = render_editable_attributes_maximised_Lunch(self)
  return (<div className="block">
      {self.props.nesting_depth == 0 && self.props.shown_relation != "all" && self.props.shown_relation != "none" ? null : attributes}
      {render_relations_Lunch(self)}
    </div>)
}


export function render_Lunch_Categorie_Meal(self:LunchContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Categorie_Meal") || !Permissions.can_view_Categorie(self.props.current_User, self.props.current_Admin))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("lunch_categorie_meal",
   "Meal",
   "Categorie",
   "Categories",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Categorie != "loading" ?
        state.Categorie.IdsInServerOrder.map(id => state.Categorie != "loading" && state.Categorie.Items.get(id)):
        state.Categorie,
      Lunch_Categorie_Meal_page_index(self),
      Lunch_Categorie_Meal_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Categorie != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Categorie: {
              ...state.Categorie,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Lunch_Categorie_Meal(self, false, self.props.current_User, self.props.current_Admin))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Categorie != "loading" && state.Categorie.JustCreated.has(i_id) && state.Categorie.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
            >
            <div key={i_id}>
              {
                CategorieViews.Categorie({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Categorie_Meal(self.props.current_User, self.props.current_Admin)
                        || Permissions.can_create_Categorie_Meal(self.props.current_User, self.props.current_Admin)
                        || Permissions.can_delete_Categorie_Meal(self.props.current_User, self.props.current_Admin)) ?
                    self.props.mode : "view",
                  is_editable:state.Categorie != "loading" && state.Categorie.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Categorie != "loading" &&
                    self.setState({...self.state(),
                      Categorie:
                        {
                          ...state.Categorie,
                          Items:state.Categorie.Items.set(i_id,{...state.Categorie.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Categorie"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Categorie != "loading" &&
                    self.setState({...self.state(),
                      Categorie:
                        {
                          ...state.Categorie,
                          Items:state.Categorie.Items.set(i_id,
                            {...state.Categorie.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Categorie, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Categorie != "loading" &&
                    self.setState({...self.state(),
                      dirty_Categorie:state.dirty_Categorie.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Categorie:
                        {
                          ...state.Categorie,
                          Items:state.Categorie.Items.set(i_id,{...state.Categorie.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Categorie_Meal(self.props.current_User, self.props.current_Admin) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Categorie_Categorie_Meals(i.element, self.props.entity).then(() =>
                      load_relation_Lunch_Categorie_Meal(self, false, self.props.current_User, self.props.current_Admin))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Categorie(self.props.current_User, self.props.current_Admin) && Permissions.can_create_Categorie_Meal(self.props.current_User, self.props.current_Admin) && Lunch_Categorie_Meal_can_create(self) ? render_new_Lunch_Categorie_Meal(self) : null}
          {Permissions.can_create_Categorie_Meal(self.props.current_User, self.props.current_Admin) ? render_add_existing_Lunch_Categorie_Meal(self) : null}
        </div>)
    }
    
    </div>
}


export function render_Lunch_Meal_Recipe(self:LunchContext, context:"presentation_structure"|"default") {
  if ((context == "default" && self.props.shown_relation != "all" && self.props.shown_relation != "Meal_Recipe") || !Permissions.can_view_Recipe(self.props.current_User, self.props.current_Admin))
    return null
  let state = self.state()
  return <div>
    
    { List.render_relation("lunch_meal_recipe",
   "Meal",
   "Recipe",
   "Recipes",
   self.props.nesting_depth > 0,
   false,
   false,
   false)
  (
      state.Recipe != "loading" ?
        state.Recipe.IdsInServerOrder.map(id => state.Recipe != "loading" && state.Recipe.Items.get(id)):
        state.Recipe,
      Lunch_Meal_Recipe_page_index(self),
      Lunch_Meal_Recipe_num_pages(self),
      new_page_index => {
          let state = self.state()
          state.Recipe != "loading" &&
          self.setState({...self.state(),
            update_count:self.state().update_count+1,
            Recipe: {
              ...state.Recipe,
              PageIndex:new_page_index
            }
          }, () =>  load_relation_Lunch_Meal_Recipe(self, false, self.props.current_User, self.props.current_Admin))
        },
      (i,_) => {
          let i_id = i.element.Id
          let state = self.state()
          return <div key={i_id}
            className={`model-nested__item ${i.size != "preview" ? "model-nested__item--open" : ""}
                        ${state.Recipe != "loading" && state.Recipe.JustCreated.has(i_id) && state.Recipe.JustCreated.get(i_id) ? "newly-created" : ""}` }
          
            >
            <div key={i_id}>
              {
                RecipeViews.Recipe({
                  ...self.props,
                  entity:i.element,
                  inline:false,
                  nesting_depth:self.props.nesting_depth+1,
                  size: i.size,
                  allow_maximisation:true,
                  allow_fullscreen:true,
                  mode:self.props.mode == "edit" && (Permissions.can_edit_Meal_Recipe(self.props.current_User, self.props.current_Admin)
                        || Permissions.can_create_Meal_Recipe(self.props.current_User, self.props.current_Admin)
                        || Permissions.can_delete_Meal_Recipe(self.props.current_User, self.props.current_Admin)) ?
                    self.props.mode : "view",
                  is_editable:state.Recipe != "loading" && state.Recipe.Editable.get(i_id),
                  shown_relation:i.shown_relation,
                  set_shown_relation:(new_shown_relation:string, callback) => {
                    let state = self.state()
                    state.Recipe != "loading" &&
                    self.setState({...self.state(),
                      Recipe:
                        {
                          ...state.Recipe,
                          Items:state.Recipe.Items.set(i_id,{...state.Recipe.Items.get(i_id), shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                  nested_entity_names: self.props.nested_entity_names.push("Recipe"),
                  
                  set_size:(new_size:Utils.EntitySize, callback) => {
                    let new_shown_relation = new_size == "large" ? "all" : i.shown_relation
                    let state = self.state()
                    state.Recipe != "loading" &&
                    self.setState({...self.state(),
                      Recipe:
                        {
                          ...state.Recipe,
                          Items:state.Recipe.Items.set(i_id,
                            {...state.Recipe.Items.get(i_id),
                              size:new_size, shown_relation:new_shown_relation})
                        }
                    }, callback)
                  },
                    
                  toggle_button:undefined,
                  set_mode:undefined,
                  set_entity:(new_entity:Models.Recipe, callback?:()=>void, force_update_count_increment?:boolean) => {
                    let state = self.state()
                    state.Recipe != "loading" &&
                    self.setState({...self.state(),
                      dirty_Recipe:state.dirty_Recipe.set(i_id, new_entity),
                      update_count:force_update_count_increment ? self.state().update_count+1 : state.update_count,
                      Recipe:
                        {
                          ...state.Recipe,
                          Items:state.Recipe.Items.set(i_id,{...state.Recipe.Items.get(i_id), element:new_entity})
                        }
                    }, callback)
                  },
                  delete: undefined,
                  unlink: !Permissions.can_delete_Meal_Recipe(self.props.current_User, self.props.current_Admin) ?
                    null
                    :
                    () => confirm(i18next.t('Are you sure?')) && Api.unlink_Meal_Meal_Recipes(self.props.entity, i.element).then(() =>
                      load_relation_Lunch_Meal_Recipe(self, false, self.props.current_User, self.props.current_Admin))
                })
              }
            </div>
          </div>
        },
      () =>
        <div>
          {Permissions.can_create_Recipe(self.props.current_User, self.props.current_Admin) && Permissions.can_create_Meal_Recipe(self.props.current_User, self.props.current_Admin) && Lunch_Meal_Recipe_can_create(self) ? render_new_Lunch_Meal_Recipe(self) : null}
          {Permissions.can_create_Meal_Recipe(self.props.current_User, self.props.current_Admin) ? render_add_existing_Lunch_Meal_Recipe(self) : null}
        </div>)
    }
    
    </div>
}



export function render_relations_Lunch(self:LunchContext) {
  return <div className="relations">
      { render_Lunch_Meal_Recipe(self, "default") }
      
    </div>
}

export function render_add_existing_Lunch_Categorie_Meal(self:LunchContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Categorie != "open" ?
            <Buttons.Add disabled={state.Categorie == "loading" ? true : state.Categorie.TotalCount >= 1} 
              onClick={() =>
                self.setState({...self.state(), add_step_Categorie:"open"}) }
                  target_name={"Categorie"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"lunch_categorie_meal",
              source_name:"Meal",
              target_name:"Categorie",
              target_plural:"Categories",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Categorie:"saving"}, () =>
                          Api.link_Meal_Categorie_Meals(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Categorie:"closed"}, () =>
                              load_relation_Lunch_Categorie_Meal(self, false, self.props.current_User, self.props.current_Admin))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      CategorieViews.Categorie({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Categorie"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Categorie, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Categorie:"closed"}),
              get_items:[
                { name: "American", get: async(i,s) => Api.get_unlinked_Meal_Categorie_Meals_American(self.props.entity, i, s) }, 
                { name: "Asian", get: async(i,s) => Api.get_unlinked_Meal_Categorie_Meals_Asian(self.props.entity, i, s) }, 
                { name: "Mediterranean", get: async(i,s) => Api.get_unlinked_Meal_Categorie_Meals_Mediterranean(self.props.entity, i, s) }
              ]
            })
        }
      </div>
    :
      null
    }
  
export function render_add_existing_Lunch_Meal_Recipe(self:LunchContext) {
    
    let state = self.state()
    return self.props.mode == "edit" ?
      <div className="button__actions">
        {
          state.add_step_Recipe != "open" ?
            <Buttons.Add 
              onClick={() =>
                self.setState({...self.state(), add_step_Recipe:"open"}) }
                  target_name={"Recipe"} />
          :
          React.createElement(List.AddToRelation,
            {
              relation_name:"lunch_meal_recipe",
              source_name:"Meal",
              target_name:"Recipe",
              target_plural:"Recipes",
              page_size:25,
              render_target:(i,i_id) =>
                <div key={i_id} className="group__item">
                  <a className="group__button button button--existing"
                    onClick={() =>
                        self.setState({...self.state(), add_step_Recipe:"saving"}, () =>
                          Api.link_Meal_Meal_Recipes(self.props.entity, i).then(() =>
                            self.setState({...self.state(), add_step_Recipe:"closed"}, () =>
                              load_relation_Lunch_Meal_Recipe(self, false, self.props.current_User, self.props.current_Admin))))
                      }>
                      Add existing
                  </a>
                  <div className="group__title" disabled={true}>
                    {
                      RecipeViews.Recipe({
                        ...self.props,
                        entity:i,
                        nesting_depth:self.props.nesting_depth+1,
                        size:"preview",
                        mode:"view",
                        is_editable:false,
                        nested_entity_names: self.props.nested_entity_names.push("Recipe"),
                        set_size:undefined,
                        toggle_button:undefined,
                        set_mode:undefined,
                        set_entity:(new_entity:Models.Recipe, callback?:()=>void) => {},
                        unlink: undefined,
                        delete: undefined
                      })
                    }
                  </div>
                </div>,
              cancel:() => self.setState({...self.state(), add_step_Recipe:"closed"}),
              get_items:[
                { name: "Recipe", get: async(i,s) => Api.get_unlinked_Meal_Meal_Recipes(self.props.entity, i, s) },
              ]
            })
        }
      </div>
    :
      null
    }
  

export function render_new_Lunch_Categorie_Meal(self:LunchContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <Buttons.Create target_name={"Categorie"} onClick={() => self.setState({...self.state(), add_step_Categorie:"creating"})}  />
            {
            state.add_step_Categorie != "creating" ?
            null
            :
            <div className="overlay__item overlay__item--new">
              <div className="new-american">
              <button disabled={state.Categorie == "loading" ? true : state.Categorie.TotalCount >= 1} 
                      className="new-american button button--new"
                      onClick={() =>
                          Api.create_linked_Meal_Categorie_Meals_American(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_American(
                                ({ ...e[0], Kind:"American", Description:"" } as Models.American)).then(() =>
                                load_relation_Lunch_Categorie_Meal(self, true, self.props.current_User, self.props.current_Admin, () =>
                                    self.setState({...self.state(), add_step_Categorie:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new American')}
              </button>
            </div>
            <div className="new-asian">
              <button disabled={state.Categorie == "loading" ? true : state.Categorie.TotalCount >= 1} 
                      className="new-asian button button--new"
                      onClick={() =>
                          Api.create_linked_Meal_Categorie_Meals_Asian(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Asian(
                                ({ ...e[0], Kind:"Asian", Description:"" } as Models.Asian)).then(() =>
                                load_relation_Lunch_Categorie_Meal(self, true, self.props.current_User, self.props.current_Admin, () =>
                                    self.setState({...self.state(), add_step_Categorie:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Asian')}
              </button>
            </div>
            <div className="new-mediterranean">
              <button disabled={state.Categorie == "loading" ? true : state.Categorie.TotalCount >= 1} 
                      className="new-mediterranean button button--new"
                      onClick={() =>
                          Api.create_linked_Meal_Categorie_Meals_Mediterranean(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Mediterranean(
                                ({ ...e[0], Kind:"Mediterranean", Description:"" } as Models.Mediterranean)).then(() =>
                                load_relation_Lunch_Categorie_Meal(self, true, self.props.current_User, self.props.current_Admin, () =>
                                    self.setState({...self.state(), add_step_Categorie:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Mediterranean')}
              </button>
            </div>
              <Buttons.Cancel onClick={() => self.setState({...self.state(), add_step_Categorie:"closed"})} />
            </div>
            }
        </div>
      :
      null
    }
  
export function render_new_Lunch_Meal_Recipe(self:LunchContext) {
    let state = self.state()
    return  self.props.mode == "edit" ?
      <div className="button__actions">
        <div className="new-recipe">
              <button 
                      className="new-recipe button button--new"
                      onClick={() =>
                          Api.create_linked_Meal_Meal_Recipes_Recipe(self.props.entity).then(e => {
                              e.length > 0 &&
                              Api.update_Recipe(
                                ({ ...e[0], Picture:"", Name:"", Ingredients:"", Description:"", PreparationTime:0 } as Models.Recipe)).then(() =>
                                load_relation_Lunch_Meal_Recipe(self, true, self.props.current_User, self.props.current_Admin, () =>
                                    self.setState({...self.state(), add_step_Recipe:"closed"})
                                  )
                                )
                          })
                      }>
                  {i18next.t('Create new Recipe')}
              </button>
            </div>
        </div>
      :
      null
    }
  

export function render_saving_animations_Lunch(self:LunchContext) {
  return self.state().dirty_Categorie.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/> : 
    self.state().dirty_Recipe.count() > 0 ?
    <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"red"}} className="saving"/>
    : <div style={{position:"fixed", zIndex:10000, top:0, left:0, width:"20px", height:"20px", backgroundColor:"cornflowerblue"}} className="saved"/>
}

export type LunchContext = {state:()=>LunchState, props:Utils.EntityComponentProps<Models.Lunch>, setState:(new_state:LunchState, callback?:()=>void) => void}

export type LunchState = {
    update_count:number
    add_step_Categorie:"closed"|"open"|"saving"|"adding"|"creating",
      dirty_Categorie:Immutable.Map<number,Models.Categorie>,
      Categorie:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Categorie>>|"loading"
  add_step_Recipe:"closed"|"open"|"saving",
      dirty_Recipe:Immutable.Map<number,Models.Recipe>,
      Recipe:Utils.PaginatedItems<{ shown_relation: string } & Utils.EntityAndSize<Models.Recipe>>|"loading"
  }
export class LunchComponent extends React.Component<Utils.EntityComponentProps<Models.Lunch>, LunchState> {
  constructor(props:Utils.EntityComponentProps<Models.Lunch>, context:any) {
    super(props, context)
    this.state = { update_count:0,add_step_Categorie:"closed", dirty_Categorie:Immutable.Map<number,Models.Categorie>(), Categorie:"loading", add_step_Recipe:"closed", dirty_Recipe:Immutable.Map<number,Models.Recipe>(), Recipe:"loading" }
  }

  get_self() {
    return {state:() => this.state, props:this.props, setState:(ns,c)=>this.setState(ns,c)}
  }

  componentWillReceiveProps(new_props:Utils.EntityComponentProps<Models.Lunch>) {
    if (new_props.size == "breadcrumb") return
    let current_logged_in_entity = this.props.current_User ||this.props.current_Admin || null
    let new_logged_in_entity = new_props.current_User ||new_props.current_Admin || null
    if (new_props.mode != this.props.mode || (new_props.size != this.props.size && (new_props.size == "large" || new_props.size == "fullscreen")) ||
        new_props.logic_frame != this.props.logic_frame ||
        (current_logged_in_entity && !new_logged_in_entity) ||
        (!current_logged_in_entity && new_logged_in_entity) ||
        (current_logged_in_entity && new_logged_in_entity && current_logged_in_entity.Id != new_logged_in_entity.Id)) {
      load_relations_Lunch(this.get_self(),  new_props.current_User, new_props.current_Admin)
    }
  }

  thread:number = null
  componentWillMount() {
    if (this.props.size == "breadcrumb") return
    if (this.props.size != "preview") {
      
      load_relations_Lunch(this.get_self(), this.props.current_User, this.props.current_Admin)
    }

    this.thread = setInterval(() => {
      if (this.state.dirty_Categorie.count() > 0) {
         let first = this.state.dirty_Categorie.first()
         this.setState({...this.state, dirty_Categorie: this.state.dirty_Categorie.remove(first.Id)}, () =>
           Api.update_Categorie(first)
         )
       } else if (this.state.dirty_Recipe.count() > 0) {
         let first = this.state.dirty_Recipe.first()
         this.setState({...this.state, dirty_Recipe: this.state.dirty_Recipe.remove(first.Id)}, () =>
           Api.update_Recipe(first)
         )
       }

    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.thread)
  }

  render() {
    if (this.props.size == "breadcrumb") {
      return Permissions.can_view_Lunch(this.props.current_User, this.props.current_Admin) ?
              render_breadcrumb_Lunch(this.get_self())
              : null
    }

    return <div id={`Lunch_${this.props.entity.Id.toString()}_${this.state.update_count}`} className={`model lunch`}>
      { render_saving_animations_Lunch(this.get_self()) }
      { this.props.nesting_depth == 0 ? render_menu_Lunch(this.get_self()) : null }
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
        { this.props.nesting_depth == 0 ? render_local_menu_Lunch(this.get_self()) : null }
        { render_controls_Lunch(this.get_self()) }
        { render_content_Lunch(this.get_self()) }
      </div>
    </div>
  }
}

export let Lunch = (props:Utils.EntityComponentProps<Models.Lunch>) : JSX.Element =>
  <LunchComponent {...props} />

export let Lunch_to_page = (id:number) => {
  let can_edit = Utils.any_of([Permissions.can_edit_Lunch, Permissions.can_edit_Categorie_Meal, Permissions.can_edit_Meal_Recipe, Permissions.can_edit_Categorie, Permissions.can_edit_Recipe])
  return Utils.scene_to_page<Models.Lunch>(can_edit, Lunch, Api.get_Lunch(id), Api.update_Lunch, "Lunch", "Lunch", `/Lunches/${id}`)
}

export let Lunch_to = (id:number, target_element_id:string, current_User:Models.User, current_Admin:Models.Admin) => {
  Utils.render_page_manager(target_element_id,
    Lunch_to_page(id),
    current_User, current_Admin
  )
}
