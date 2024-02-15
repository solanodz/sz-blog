/* eslint-disable react/prop-types */

import ReactQuill from 'react-quill'

const Quill = ({ value, onChange }) => {

    const modules = {
        toolbar: [
            // [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            // [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            // [{ 'list': 'ordered' }, { 'list': 'bullet' },
            // { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            // ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
    return (
        <div>
            <ReactQuill
                cols="30"
                rows="10"
                placeholder='Content'
                formats={formats}
                value={value}
                theme='snow'
                modules={modules}
                onChange={onChange}

            />
        </div>
    )
}

export default Quill
