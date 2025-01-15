import React , {useRef} from 'react'
import { Editor } from '@tinymce/tinymce-react'
import config from "../config/config" 
import { Controller , useForm} from 'react-hook-form'


function RTE({name,control,label,defaultValues = ''}) {
    const editorRef = useRef(null)
  return (
    <>
        {label && <label> {label}</label>}
        <Controller
            name={name || "content"}
            defaultValue={defaultValues}
            control={control}
            render={({field : {onChange}})=>(
                <Editor
                apiKey={config.tinyMceKey}
                onInit={(_evt, editor) => editorRef.current = editor}
                init={
                    {
                        branding:false,
                        plugins:[
                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    }
                }
                onEditorChange={onChange}
                />
            )}
        />
    </>
  )
}

export default RTE