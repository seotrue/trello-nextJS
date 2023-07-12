import TextareaAutosize from "react-textarea-autosize";
import {useState} from "react";
import EditButtons from "@/components/EditButtons";



const CardEditor = ({onSave, onCancel, onDelete, text}) => {
    const [newText, setNewText] = useState(text)

    const handleChangeText = (e) => {
        setNewText(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            onSave(newText);
        }
    }

    return (
        <div className="Edit-Card">
            <div className="Card">
                <TextareaAutosize
                    autoFocus
                    className="Edit-Card-Textarea"
                    placeholder="Enter the text for this card..."
                    value={newText}
                    onChange={handleChangeText}
                    onKeyDown={handleEnter}
                />
            </div>
            <EditButtons
                handleSave={() => onSave(text)}
                saveLabel={"Add card"}
                handleDelete={onDelete}
                handleCancel={onCancel}
            />
        </div>
    );
}

export default CardEditor