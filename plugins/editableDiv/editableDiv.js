import { Plugin } from 'ckeditor5/src/core';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import { ButtonView } from 'ckeditor5/src/ui';

export default class EditableDiv extends Plugin {
	init() {
		console.log( 'EditableDiv was initialized' );
		const editor = this.editor;

		editor.ui.componentFactory.add( 'EditableDiv', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert editable div',
				icon: imageIcon,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', () => {
				editor.model.change( writer => {
					const divElement = writer.createElement( 'div', {
						contenteditable: true,
						innerText: '这个是内容'
					} );

					// Insert the image in the current selection location.
					editor.model.insertContent( divElement, editor.model.document.selection );
				} );
			} );

			return view;
		} );

		this._defineSchema();
		this._defineConverters();
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'editableDiv', {
			// Behaves like a self-contained object (e.g. an image).
			// isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block',
			isBlock: true,
			inheritAllFrom: '$block',
			allowChildren: [ '$text', '$block' ]
			// allowAttributes: [ 'class', 'docsrc' ]
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		conversion.elementToElement( {
			model: 'editableDiv',
			view: {
				name: 'div',
				attributes: {
					contenteditable: 'true'
				}
			}
		} );
	}
}
