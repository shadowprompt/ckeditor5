const arr = [ 'div', 'p', 'tr', 'td', 'tbody' ];
const arr2 = [ 'table' ];

export default function attrExtraPlugin( editor ) {
	// Allow <div> elements in the model.
	arr.forEach( item => {
		editor.model.schema.register( item, {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );
	} );
	arr2.forEach( item => {
		editor.model.schema.extend( item, {
			allowWhere: '$block',
			allowContentOf: '$root'
		} );
	} );

	// Allow <div> elements in the model to have all attributes.
	editor.model.schema.addAttributeCheck( context => {
		const isEndsWith = arr.some( item => {
		  const result =  context.endsWith( item );
      console.log('addAttributeCheck item extra-> ', [...context.getNames()].join(' '), item, result);
      return result;
    });
		if ( isEndsWith ) {
			return true;
		}
	} );

	// The view-to-model converter converting a view <div> with all its attributes to the model.
	arr.forEach( item => {
		editor.conversion.for( 'upcast' ).elementToElement( {
			view: item,
			model: ( viewElement, { writer: modelWriter } ) => {
			  console.log('upcast extra -> ', item, viewElement.getAttributes());
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
