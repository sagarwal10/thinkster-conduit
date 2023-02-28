import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux'; 

const mapStateToProps = state => ({
  ...state.editor
});

/**
 * mapDispatchToProps() needs separate actions for 
 * adding/removing tags, submitting an article, updating
 * individual fields and cleaning up after navigating away
 * from the page
 */
const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: 'ADD_TAG' }),
  onLoad: payload => 
    dispatch({ type: 'EDITOR_PAGE_LOADED', payload }),
  onRemoveTag: tag => 
    dispatch({ type: 'REMOVE_TAG', tag }),
  onSubmit: payload => 
    dispatch({ type: 'ARTICLE_SUBMITTED', payload }),
  onUnload: payload =>
    dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  OnUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value })
}); 

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent = 
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('descriptipn');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');

    // When entering tags, hitting enter adds a tag to the list
    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    // When submitting the form we need to correctly format the
    // object and use the right function - if we have a slug, 
    // we're updating an article, otherwise we're creating a new one.
    this.submitForm = ev => {
      ev.preventDefault();
      const article = {
        title: this.props.title,
        description: this.props.description,
        body: this.props.body,
        tagList: this.props.tagList
      };

      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ? 
	agent.Articles.update(Object.assign(article, slug)) :
	agent.Articles.create(article);

      this.props.onSubmit(promise);
   };
  }

  /**
   * React-router has an interesting quirk - if two routes have the
   * same component, react-router will reuse the component when 
   * switching between the two. So if '/editor' ahd '/editor/slug'
   * both use the same Editor component, react-router won't recreate
   * the Editor component if you navigate to '/editor' from '/editor/slug'.
   * To work around this, we need the componentWillReceiveProps() hook
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.parms.slug !== nextParams.params.slug) {
      if (nextProps.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.params.slug));
      }
      this.props.onLoad(null);
    }
  } 

  componentWillMount() {
    if (this.props.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor); 

