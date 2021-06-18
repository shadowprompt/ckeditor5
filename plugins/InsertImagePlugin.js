import { Plugin } from 'ckeditor5/src/core';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import { ButtonView } from 'ckeditor5/src/ui';

export default class InsertImagePlugin extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'insertImagePlugin', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert image plugin',
				icon: imageIcon,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', () => {
				const imageUrl = prompt( 'Image URL' );

				editor.model.change( writer => {
					const imageElement = writer.createElement( 'image', {
						src: imageUrl
					} );

					// Insert the image in the current selection location.
					editor.model.insertContent( imageElement, editor.model.document.selection );
				} );
			} );

			return view;
		} );
	}
}
