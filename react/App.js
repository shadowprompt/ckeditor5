import React, {useState, useRef, useEffect } from 'react';
// The official <CKEditor> component for React.
import { CKEditor } from '@ckeditor/ckeditor5-react';

// The official CKEditor 5 instance inspector. It helps understand the editor view and model.
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

// The base editor class and features required to run the editor.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

// import EditablePlugin from '../plugins/EditablePlugin';
import InsertImagePlugin from '../plugins/InsertImagePlugin';
import simplebox from '../plugins/simplebox/simplebox';



function App(props) {
	const [editorData, setEditorData] = useState(`
	 <p>This is a simple box:</p>

            <section class="simple-box">
                <h1 class="simple-box-title">Box title</h1>
                <div class="simple-box-description">
                    <p>The description goes here.</p>
                    <ul>
                        <li>It can contain lists,</li>
                        <li>and other block elements like headings.</li>
                    </ul>
                </div>
            </section>
	`);
	const editorRef = useRef(null);
	const [editorConfig, setEditorConfig] = useState({
		plugins: [
			// A set of editor features to be enabled and made available to the user.
			Essentials, Heading, Bold, Italic, Underline,
			Link, Paragraph, Table, TableToolbar, InsertImagePlugin, simplebox
      //
			// // Your custom plugin implementing the widget is loaded here.
			// ProductPreviewEditing
		],
		toolbar: [
			'heading',
			'|',
			'bold', 'italic', 'underline',
			'|',
			'link', 'insertTable', 'insertImage', 'simplebox',
			'|',
			'undo', 'redo'
		],
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		// The configuration of the Products plugin. It specifies a function that will allow
		// the editor to render a React <ProductPreview> component inside a product widget.
		// products: {
		// 	productRenderer: ( id, domElement ) => {
		// 		const product = this.props.products.find( product => product.id === id );
		//
		// 		ReactDOM.render(
		// 			<ProductPreview id={id} {...product} />,
		// 			domElement
		// 		);
		// 	}
		// }
	});

	function handleEditorDataChange(e, editor) {
	  const data = editor.getData();
	  console.log('getData -> ', data);
		setEditorData(data);
	}

	function handleEditorReady(editor) {
		editorRef.current = editor;
		setEditorData(editor.getData());
		CKEditorInspector.attach( editor );
		window.ed = editor;
	}

	function pluginChange() {
    setEditorConfig(
      {
        plugins: [
          // A set of editor features to be enabled and made available to the user.
          Essentials, Heading, Bold, Italic, Underline,
          //
          // // Your custom plugin implementing the widget is loaded here.
          // ProductPreviewEditing
        ],
        toolbar: [
          'heading',
        ],
      }
    )
  }

  useEffect(() => {
    window.ck = ClassicEditor
  }, []);

	return (
	  <div className="app__offer-editor" key="offer-editor">
			<h3>Product offer editor</h3>
			<CKEditor
				editor={ClassicEditor}
				data={editorData}
				config={editorConfig}
				onChange={handleEditorDataChange}
				onReady={handleEditorReady}
			/>

			<h3>Editor data</h3>
      <button onClick={pluginChange}>Change Plugin</button>
			<textarea value={editorData} readOnly={true}/>
		</div>
  );
}

export default App;
