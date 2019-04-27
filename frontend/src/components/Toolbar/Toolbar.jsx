import React from 'react';
import './Toolbar.scss';

const Toolbar = ({ editorState, RichUtils, stateChange,  }) => {
 
    const onInlineStyle = (ev, style) => {
        stateChange(RichUtils.toggleInlineStyle(editorState, style), ev)
    }

    const onBlockType = (ev) => {
        stateChange(RichUtils.toggleBlockType(editorState, ev.target.value), ev);
    }
    return (
        <section className="editor-toolbar" >
            <select onChange={onBlockType}>
                <option value="" label="Normal text"></option>
                <option value="header-one" label="Title"></option>
                <option value="header-two" label="Subtitle"></option>
            </select>
            <button className="btn btn-bold" onClick={(ev) => onInlineStyle(ev, 'BOLD')}>
                <i className="fas fa-bold"></i>
            </button>
            <button className="btn btn-italic" onClick={(ev) => onInlineStyle(ev, 'ITALIC')}>
                <i className="fas fa-italic"></i>
            </button>
            <button className="btn btn-underline" onClick={(ev) => onInlineStyle(ev, 'UNDERLINE')}>
                <i className="fas fa-underline"></i>
            </button>
        </section>
    )
}

export default Toolbar;