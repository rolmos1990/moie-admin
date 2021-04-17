import React from "react"
import Dropzone from "react-dropzone";

const DropZoneIcon = props => {
    const onChange = (files) => {
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                const base64EncodedStr = btoa(fileAsBinaryString);

                if (props.onDrop) {
                    props.onDrop({f:file, base64: `data:image/${file.name.split('.')[1]};base64,${base64EncodedStr}`});
                }
            };
            reader.readAsBinaryString(file);
        });
    }

    const handleView = () => {
        if(props.mode === 'icon'){
            return (
                <div className="needsclick">
                    <i className="display-5 text-muted uil uil-cloud-upload" title={'Subir imagen'}> </i>
                </div>
            );
        }
        return (
            <div style={{minHeight:'375px'}}>
                {props.hasImage ? props.children : (
                    <div className="dz-message needsclick">
                        <div className="mb-3">
                            <i className="display-4 text-muted uil uil-cloud-upload"> </i>
                        </div>
                        <h4>Suelta las imagenes aquí.</h4>
                    </div>
                )}
            </div>
        );
    }

    return (
        <Dropzone
            onDrop={onChange}
            maxFiles={props.maxFiles}>
            {({getRootProps, getInputProps}) => (
                <div className="text-center needsclick" {...getRootProps()} >
                    <input {...getInputProps()} />
                    {handleView()}
                </div>
            )}
        </Dropzone>
    )
}

export default DropZoneIcon
