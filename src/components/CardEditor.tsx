import TextareaAutosize from "react-textarea-autosize";
import {useState} from "react";
import EditButtons from "@/components/EditButtons";



const CardEditor = ({onSave, onCancel, onDelete, adding}) => {
    const [text, setText] = useState('')

    const handleChangeText = (e) => {
        setText(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            onSave(text);
        }
    }

    return (
        <div className="Edit-Card">
            <div className="Card">
                <TextareaAutosize
                    autoFocus
                    className="Edit-Card-Textarea"
                    placeholder="Enter the text for this card..."
                    value={text}
                    onChange={handleChangeText}
                    onKeyDown={handleEnter}
                />
            </div>
            <EditButtons
                handleSave={() => onSave(text)}
                saveLabel={adding ? "Add card" : "Save"}
                handleDelete={onDelete}
                handleCancel={onCancel}
            />
        </div>
    );
}

export default CardEditor