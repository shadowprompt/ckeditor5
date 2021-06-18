import { Plugin } from 'ckeditor5/src/core';

const arr1 = [ 'div', 'p', 'tr', 'td', 'tbody', 'span', 'br' ];
const arr2 = [ ];
const arr = [ ...arr1, ...arr2 ];

export default class attrPlugin extends Plugin {
	constructor( props ) {
		super( props );
		this.schemaAndConversion();
		this.addListener();
	}

	init() {
		console.log( ' -> ', 'init', this.editor );
		const editor = this.editor;
		arr2.forEach( item => {
			editor.model.schema.extend( item, {
				allowWhere: '$block',
				allowContentOf: '$root'
			} );
		} );
	}

	schemaAndConversion() {
		const editor = this.editor;
		// Allow <div> elements in the model to have all attributes.
		editor.model.schema.addAttributeCheck( context => {
			const isEndsWith = arr.some( item => {
				const result = context.endsWith( item );
				return result;
			} );
			if ( isEndsWith ) {
				return true;
			}
		} );

		// The view-to-model converter converting a view <div> with all its attributes to the model.
		arr.forEach( item => {
			editor.conversion.for( 'upcast' ).elementToElement( {
				view: item,
				model: ( viewElement, { writer: modelWriter } ) => {
					return modelWriter.createElement( item, viewElement.getAttributes() );
				}
			} );
		} );

		// The model-to-view converter for the <div> element (attributes are converted separately).
		arr.forEach( item => {
			editor.conversion.for( 'downcast' ).elementToElement( {
				model: item,
				view: item
			} );
		} );

		// The model-to-view converter for <div> attributes.
		// Note that a lower-level, event-based API is used here.
		editor.conversion.for( 'downcast' ).add( dispatcher => {
			dispatcher.on( 'attribute', ( evt, data, conversionApi ) => {
				// Convert <div> attributes only.
				if ( !arr.includes( data.item.name ) ) {
					return;
				}

				const viewWriter = conversionApi.writer;
				const viewDiv = conversionApi.mapper.toViewElement( data.item );

				// In the model-to-view conversion we convert changes.
				// An attribute can be added or removed or changed.
				// The below code handles all 3 cases.
				if ( data.attributeNewValue ) {
					viewWriter.setAttribute( data.attributeKey, data.attributeNewValue, viewDiv );
				} else {
					viewWriter.removeAttribute( data.attributeKey, viewDiv );
				}
			} );
		} );
	}

	addListener() {
		console.log( ' -> ', 'addListener', this.editor );
		const editor = this.editor;
		// Allow <div> elements in the model.
		arr1.forEach( item => {
			editor.model.schema.register( item, {
				allowWhere: '$block',
				allowContentOf: '$root'
			} );
		} );
	}
}
