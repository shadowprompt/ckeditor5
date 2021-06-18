import { Plugin } from 'ckeditor5/src/core';
import Image from '@ckeditor/ckeditor5-image/src/image';
import { toImageWidget } from '@ckeditor/ckeditor5-image/src/image/utils';

const arr1 = [ ];
const arr2 = [ 'image' ];
const arr = [ ...arr1, ...arr2 ];

export function createImageViewElement( writer ) {
	const emptyElement = writer.createEmptyElement( 'img' );
	// return emptyElement;
	const figure = writer.createContainerElement( 'figure', { class: 'image-test' } );
	//
	writer.insert( writer.createPositionAt( figure, 0 ), emptyElement );
	return figure;
}

export default class imageAttrPlugin extends Plugin {
	constructor( props ) {
		super( props );
		this.schemaAndConversion();
	}
	static get requires() {
		return [ Image ];
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
				view: 'img',
				model: ( viewElement, { writer: modelWriter } ) => {
					return modelWriter.createElement( item, viewElement.getAttributes() );
				}
			} );
		} );

		// The model-to-view converter for the <div> element (attributes are converted separately).
		// editor.conversion.for( 'dataDowncast' ).elementToElement( {
		// 	model: 'image',
		// 	view: ( modelElement, { writer } ) => createImageViewElement( writer )
		// } );
    //
		// editor.conversion.for( 'editingDowncast' ).elementToElement( {
		// 	model: 'image',
		// 	view: ( modelElement, { writer } ) => toImageWidget( createImageViewElement( writer ), writer, editor.t( 'image widget' ) )
		// 	// view: ( modelElement, { writer } ) => createImageViewElement( writer )
		// } );

		// arr.forEach( item => {
		// 	editor.conversion.for( 'downcast' ).elementToElement( {
		// 		model: item,
		// 		view: 'img'
		// 	} );
		// } );

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
}
