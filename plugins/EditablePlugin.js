import { Plugin } from 'ckeditor5/src/core';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import { ButtonView } from 'ckeditor5/src/ui';

export default class EditablePlugin extends Plugin {
	init() {
		console.log( 'EditablePlugin was initialized' );
		const editor = this.editor;

		editor.ui.componentFactory.add( 'EditablePlugin', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert editable',
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
	}
}
